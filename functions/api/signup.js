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

  try {
    const passwordHash = await hashPassword(password);
    await db
      .prepare("INSERT INTO users (email, password_hash, created_at) VALUES (?1, ?2, datetime('now'))")
      .bind(email, passwordHash)
      .run();
    const created = await db
      .prepare("SELECT id, email FROM users WHERE email = ?1")
      .bind(email)
      .first();
    const token = await createSignedToken(
      {
        userId: created.id,
        email: created.email,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
      },
      sessionSecret
    );

    return new Response(
      JSON.stringify({
        ok: true,
        message: "Account created. You can now start a membership checkout.",
        user: { id: created.id, email: created.email }
      }),
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          "set-cookie": `member_session=${encodeURIComponent(token)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
        }
      }
    );
  } catch {
    return json({ ok: false, message: "That email may already be registered." }, 400);
  }
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
