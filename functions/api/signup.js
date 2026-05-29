export async function onRequestPost(context) {
  const db = context.env.DB;
  if (!db) {
    return json({ ok: false, message: "D1 database is not bound yet." }, 500);
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
    return json({ ok: true, message: "Account created. Membership access can be attached after payment." });
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
