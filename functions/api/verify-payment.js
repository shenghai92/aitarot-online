import { createSignedToken } from "./_lib/access.js";

const oneTimeProducts = {
  prod_61I74fvu3kUngyK4quyBSm: "starter",
  prod_4gUAL3Aw2Ye9t2G3fbAsRn: "core",
  prod_3esjB6J1OpLSmjHBt0SiHW: "deep",
  prod_4iLmyD1r3XkpXM9TayTYhU: "love",
  prod_2Mrtx7uQlHhdJcrnRgw6OQ: "career"
};

const memberProducts = {
  prod_51P5FmR4mmpy83it7vgh76: "monthly",
  prod_3RH7Z74dRNrKdXeqrwbbCH: "quarterly",
  prod_S2r9T21BKRvOxzUjxrIzS: "yearly"
};

export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams.entries());
  const apiKey = env.CREEM_API_KEY;
  const sessionSecret = env.SESSION_SECRET;

  if (!apiKey || !sessionSecret) {
    return json({ ok: false, message: "Payment verification is not configured yet." }, 500);
  }

  if (!(await verifyRedirectSignature(params, apiKey))) {
    return json({ ok: false, message: "Payment redirect verification failed." }, 401);
  }

  const tier = oneTimeProducts[params.product_id] || memberProducts[params.product_id];
  if (!tier) {
    return json({ ok: false, message: "Unknown product in payment redirect." }, 400);
  }

  const isMember = Boolean(memberProducts[params.product_id]);
  const ttlDays = isMember ? (tier === "monthly" ? 31 : tier === "quarterly" ? 93 : 366) : 2;
  const token = await createSignedToken(
    isMember
      ? {
          tier,
          customerId: params.customer_id || "",
          subscriptionId: params.subscription_id || "",
          orderId: params.order_id || "",
          expiresAt: Date.now() + ttlDays * 24 * 60 * 60 * 1000
        }
      : {
          tier,
          orderId: params.order_id || "",
          checkoutId: params.checkout_id || "",
          expiresAt: Date.now() + ttlDays * 24 * 60 * 60 * 1000
        },
    sessionSecret
  );

  const cookieName = isMember ? "member_access" : "single_access";
  const cookie = `${cookieName}=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${ttlDays * 24 * 60 * 60}`;
  const redirectUrl = new URL("/", url.origin);
  redirectUrl.searchParams.set("purchase", "success");
  redirectUrl.searchParams.set("tier", tier);
  redirectUrl.hash = "reading-room";

  return new Response(null, {
    status: 302,
    headers: {
      location: redirectUrl.toString(),
      "set-cookie": cookie,
      "cache-control": "no-store"
    }
  });
}

async function verifyRedirectSignature(params, apiKey) {
  if (!params.signature) return false;
  const { signature, ...rest } = params;
  const canonical = Object.entries(rest)
    .filter(([, value]) => value !== null && value !== undefined && value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .concat(`salt=${apiKey}`)
    .join("|");

  return (await sha256Hex(canonical)) === signature;
}

async function sha256Hex(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return bytesToHex(new Uint8Array(digest));
}

function bytesToHex(bytes) {
  return Array.from(bytes).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=UTF-8" }
  });
}
