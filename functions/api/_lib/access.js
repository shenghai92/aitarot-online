const encoder = new TextEncoder();

function toBase64Url(value) {
  return btoa(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  return atob(padded);
}

async function signValue(value, secret) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  const bytes = Array.from(new Uint8Array(signature));
  return toBase64Url(String.fromCharCode(...bytes));
}

export async function createSignedToken(payload, secret) {
  const body = toBase64Url(JSON.stringify(payload));
  const signature = await signValue(body, secret);
  return `${body}.${signature}`;
}

export async function verifySignedToken(token, secret) {
  if (!token || !token.includes(".")) return null;
  const [body, signature] = token.split(".");
  const expected = await signValue(body, secret);
  if (signature !== expected) return null;

  try {
    return JSON.parse(fromBase64Url(body));
  } catch {
    return null;
  }
}

export function parseCookie(cookieHeader, name) {
  if (!cookieHeader) return "";
  const parts = cookieHeader.split(";").map((part) => part.trim());
  const match = parts.find((part) => part.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.slice(name.length + 1)) : "";
}

export async function readMemberSession(request, secret) {
  const token = parseCookie(request.headers.get("cookie"), "member_session");
  const payload = await verifySignedToken(token, secret);
  if (!payload || !payload.email || !payload.userId) return null;
  return payload;
}

export async function readSingleAccess(request, secret) {
  const token = parseCookie(request.headers.get("cookie"), "single_access");
  const payload = await verifySignedToken(token, secret);
  if (!payload || !payload.tier || !payload.orderId) return null;
  return payload;
}

export async function readMemberAccess(request, secret) {
  const token = parseCookie(request.headers.get("cookie"), "member_access");
  const payload = await verifySignedToken(token, secret);
  if (!payload || !payload.tier || !payload.customerId) return null;
  return payload;
}
