import { createSignedToken } from "./_lib/access.js";

export async function onRequestPost(context) {
  const db = context.env.DB;
  const sessionSecret = context.env.SESSION_SECRET;
  if (!db) {
    return json({ ok: false, message: "D1 database is not bound yet." }, 500);
  }
  if (!sessionSecret) {
    return json({ ok: false, message: "Session secret is not configured yet." }, 500);
  }

  const body = await context.request.json();
  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "").trim();

  if (!email || !password) {
    return json({ ok: false, message: "Email and password are required." }, 400);
  }

  const passwordHash = await hashPassword(password);
  const row = await db
    .prepare("SELECT id, email FROM users WHERE email = ?1 AND password_hash = ?2")
    .bind(email, passwordHash)
    .first();

  if (!row) {
    return json({ ok: false, message: "Login failed. Check your email or password." }, 401);
  }

  const token = await createSignedToken(
    {
      userId: row.id,
      email: row.email,
      expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
    },
    sessionSecret
  );

  return new Response(
    JSON.stringify({
      ok: true,
      message: "Login succeeded. You can now start a membership checkout.",
      user: { id: row.id, email: row.email }
    }),
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
        "set-cookie": `member_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
      }
    }
  );
}

async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((value) => value.toString(16).padStart(2, "0")).join("");
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=UTF-8" }
  });
}
