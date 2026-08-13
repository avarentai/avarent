const MAX = { name: 120, email: 254, institution: 180, role: 120, data_scope: 120, message: 4000, source: 120 };

const clean = (value, max) => String(value || "").trim().slice(0, max);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readBody(request) {
  const contentType = request.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return request.json();
  const form = await request.formData();
  return Object.fromEntries(form.entries());
}

export default async function handler(request) {
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: { Allow: "POST" } });

  let input;
  try { input = await readBody(request); } catch { return Response.json({ error: "Invalid request" }, { status: 400 }); }
  if (input.company_website) return Response.json({ ok: true });

  const data = Object.fromEntries(Object.entries(MAX).map(([key, max]) => [key, clean(input[key], max)]));
  if (!emailPattern.test(data.email) || !data.institution || !data.message) {
    return Response.json({ error: "Complete the required fields with a valid work email." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "sales@avarent.app";
  const from = process.env.CONTACT_FROM_EMAIL || "Avarent <sales@avarent.app>";
  if (!apiKey) return Response.json({ error: "Form delivery is not configured." }, { status: 503 });

  const text = [
    `Source: ${data.source}`,
    `Work email: ${data.email}`,
    `Institution: ${data.institution}`,
    `Starting scope: ${data.data_scope || "To be agreed after scoped review"}`,
    "",
    "Evaluation question:",
    data.message,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `Avarent evaluation request · ${data.institution}`,
      text,
    }),
  });

  if (!response.ok) return Response.json({ error: "Delivery failed. Use the direct email link." }, { status: 502 });
  return Response.json({ ok: true }, { status: 200 });
}
