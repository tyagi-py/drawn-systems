export interface Env {
  DB: D1Database;
  DISCORD_WEBHOOK_URL: string;
  ALLOWED_ORIGIN: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

function json(
  data: unknown,
  status: number,
  headers: Record<string, string>,
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "Content-Type": "application/json" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const headers = corsHeaders(env.ALLOWED_ORIGIN);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers });
    }

    let body: { email?: string; company?: string };
    try {
      body = await request.json();
    } catch {
      return json({ ok: false, error: "Invalid request body" }, 400, headers);
    }

    // Honeypot: real visitors never see or fill this field, bots usually do.
    if (body.company) {
      return json({ ok: true }, 200, headers);
    }

    const email = (body.email ?? "").trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json(
        { ok: false, error: "Enter a valid email address" },
        400,
        headers,
      );
    }

    const existing = await env.DB.prepare(
      "SELECT 1 FROM subscribers WHERE email = ?",
    )
      .bind(email)
      .first();

    if (!existing) {
      await env.DB.prepare("INSERT INTO subscribers (email) VALUES (?)")
        .bind(email)
        .run();

      if (env.DISCORD_WEBHOOK_URL) {
        await fetch(env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 New newsletter subscriber: ${email}`,
          }),
        }).catch(() => {});
      }
    }

    return json({ ok: true }, 200, headers);
  },
};
