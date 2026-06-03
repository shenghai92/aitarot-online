import { readMemberSession } from "./_lib/access.js";

const productIds = {
  starter: "prod_61I74fvu3kUngyK4quyBSm",
  core: "prod_4gUAL3Aw2Ye9t2G3fbAsRn",
  deep: "prod_3esjB6J1OpLSmjHBt0SiHW",
  love: "prod_4iLmyD1r3XkpXM9TayTYhU",
  career: "prod_2Mrtx7uQlHhdJcrnRgw6OQ",
  monthly: "prod_51P5FmR4mmpy83it7vgh76",
  quarterly: "prod_3RH7Z74dRNrKdXeqrwbbCH",
  yearly: "prod_S2r9T21BKRvOxzUjxrIzS"
};

const memberTiers = new Set(["monthly", "quarterly", "yearly"]);

export async function onRequestPost(context) {
  const { request, env } = context;
  const body = await request.json();
  const tier = String(body.tier || "").trim();
  const focus = String(body.focus || "").trim() || tier;
  const productId = productIds[tier];

  if (!productId) {
    return json({ ok: false, message: "Unknown product tier." }, 400);
  }

  const apiKey = env.CREEM_API_KEY;
  const sessionSecret = env.SESSION_SECRET;

  if (!apiKey || !sessionSecret) {
    return json({ ok: false, message: "Checkout is not configured yet." }, 500);
  }

  let member = null;
  if (memberTiers.has(tier)) {
    member = await readMemberSession(request, sessionSecret);
    if (!member) {
      return json({ ok: false, message: "Please log in before starting a membership checkout." }, 401);
    }
  }

  const url = new URL(request.url);
  const origin = `${url.protocol}//${url.host}`;
  const requestId = `${tier}:${Date.now()}`;
  const successUrl = `${origin}/api/verify-payment`;

  const payload = {
    product_id: productId,
    request_id: requestId,
    success_url: successUrl,
    metadata: {
      tier,
      focus,
      accessKind: memberTiers.has(tier) ? "membership" : "single"
    }
  };

  if (member?.email) {
    payload.customer = { email: member.email };
  }

  try {
    const response = await fetch("https://api.creem.io/v1/checkouts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return json({ ok: false, message: `Creem checkout failed: ${errorText}` }, 502);
    }

    const data = await response.json();
    return json({
      ok: true,
      checkoutUrl: data.checkout_url,
      requestId
    });
  } catch {
    return json({ ok: false, message: "Could not reach Creem checkout." }, 502);
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=UTF-8" }
  });
}
