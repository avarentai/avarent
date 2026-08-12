const allowedEvents = new Set([
  "site page viewed",
  "sample packet opened",
  "primary cta clicked",
  "evaluation form started",
  "evaluation form submitted",
  "evaluation form fallback shown",
]);

const allowedProperties = new Set(["page", "placement", "label", "destination", "form"]);

const clean = (value, max = 80) => typeof value === "string" ? value.slice(0, max) : undefined;

export default async function handler(request) {
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });

  const key = process.env.POSTHOG_PROJECT_KEY;
  if (!key) return new Response(null, { status: 204 });

  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  if (!allowedEvents.has(body.event)) return Response.json({ error: "Unknown event" }, { status: 400 });

  const distinctId = clean(body.distinct_id, 80);
  if (!distinctId || !/^[a-zA-Z0-9-]+$/.test(distinctId)) return Response.json({ error: "Invalid session" }, { status: 400 });

  const properties = {
    $process_person_profile: false,
    $geoip_disable: true,
    source: "avarent-site",
  };
  for (const [name, value] of Object.entries(body.properties || {})) {
    if (allowedProperties.has(name)) properties[name] = clean(value);
  }

  const host = (process.env.POSTHOG_HOST || "https://us.i.posthog.com").replace(/\/$/, "");
  try {
    await fetch(`${host}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: key, event: body.event, distinct_id: distinctId, properties }),
    });
  } catch {
    // Analytics must never block or expose an error to the visitor.
  }
  return new Response(null, { status: 204 });
}
