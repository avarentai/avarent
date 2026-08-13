import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const LEADS_PATH = process.env.OUTREACH_LEADS_PATH
  ? path.resolve(process.env.OUTREACH_LEADS_PATH)
  : path.join(ROOT, "ops", "outreach", "leads.csv");
const COMMAND = process.argv[2] || "help";
const ACTIVE_STATUSES = new Set(["READY", "DRAFTED", "CONTACTED"]);
const TERMINAL_STATUSES = new Set(["REPLIED", "QUALIFIED", "NOT_NOW", "CLOSED", "DO_NOT_CONTACT"]);
const HEADERS = [
  "Institution", "First Name", "Last Name", "Email", "Role", "Institution Type",
  "Specific Signal", "Source URL", "Pain Hypothesis", "Personalization", "Status",
  "Sequence Step", "Subject", "Last Sent At", "Next Action At", "Reply Detected At",
  "Draft ID", "Owner", "Notes",
];

function env(name, fallback = "") {
  return String(process.env[name] || fallback).trim();
}

function requireEnv(names) {
  const missing = names.filter((name) => !env(name));
  if (missing.length) throw new Error(`Missing configuration: ${missing.join(", ")}`);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (quoted) {
      if (char === '"' && text[index + 1] === '"') { field += '"'; index += 1; }
      else if (char === '"') quoted = false;
      else field += char;
    } else if (char === '"') quoted = true;
    else if (char === ",") { row.push(field); field = ""; }
    else if (char === "\n") { row.push(field.replace(/\r$/, "")); rows.push(row); row = []; field = ""; }
    else field += char;
  }
  if (field || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  const [headers = [], ...data] = rows.filter((item) => item.some((value) => value !== ""));
  return data.map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] || ""])));
}

function escapeCsv(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function serializeCsv(rows) {
  return `${HEADERS.join(",")}\n${rows.map((row) => HEADERS.map((header) => escapeCsv(row[header])).join(",")).join("\n")}${rows.length ? "\n" : ""}`;
}

async function loadLeads() {
  const text = await readFile(LEADS_PATH, "utf8");
  return parseCsv(text).map((lead) => ({ ...Object.fromEntries(HEADERS.map((header) => [header, ""])), ...lead }));
}

async function saveLeads(leads) {
  await writeFile(LEADS_PATH, serializeCsv(leads), "utf8");
}

function cleanSentence(value) {
  return String(value || "").trim().replace(/\s+/g, " ").replace(/[.?!]+$/, "");
}

function subjectFor(lead) {
  return lead.Subject || `Avarent | synthetic review for ${cleanSentence(lead.Institution)}`;
}

function signature() {
  const sender = env("OUTREACH_SENDER_NAME", "George");
  return `${sender}\nCo-founder, Avarent\nhttps://avarent.app`;
}

function initialMessage(lead) {
  const firstName = cleanSentence(lead["First Name"]);
  const personalization = cleanSentence(lead.Personalization) ||
    `I noticed that ${cleanSentence(lead["Specific Signal"])}. ${cleanSentence(lead["Pain Hypothesis"])}`;
  return `Hi ${firstName},

${personalization}.

Avarent runs a fixed-scope, synthetic-first review for one lending workflow. The output is a reproducible finding and an inspectable evidence packet, without replacing the decision model or beginning with a production integration.

Would it be useful if I sent the four-page synthetic sample for a quick review?

If this is outside your role, tell me and I will not follow up.

${signature()}`;
}

function followupMessage(lead, step) {
  const firstName = cleanSentence(lead["First Name"]);
  if (step === 2) {
    return `Hi ${firstName},

Closing the loop on this. The smallest useful starting point is one evaluation question, one synthetic or approved de-identified extract, and success criteria agreed before access.

Our public methodology shows exactly how the measurements and limitations are presented: https://avarent.app/methodology

Would a 20-minute review be relevant to your team?

${signature()}`;
  }
  return `Hi ${firstName},

I will leave this here. If fair-lending evidence for algorithmic credit is not a current priority, no reply is needed and I will not follow up again.

The public diligence packet is available if the timing changes: https://avarent.app/diligence

${signature()}`;
}

function validateLead(lead) {
  const required = ["Institution", "First Name", "Email", "Specific Signal", "Source URL", "Pain Hypothesis"];
  return required.filter((field) => !String(lead[field] || "").trim());
}

function iso(value) {
  const date = new Date(Number(value) || value);
  return Number.isNaN(date.getTime()) ? "" : date.toISOString();
}

function addBusinessDays(value, count) {
  const date = new Date(value);
  let remaining = Number(count);
  while (remaining > 0) {
    date.setUTCDate(date.getUTCDate() + 1);
    const day = date.getUTCDay();
    if (day !== 0 && day !== 6) remaining -= 1;
  }
  return date.toISOString();
}

let accessToken = "";
async function getAccessToken() {
  if (accessToken) return accessToken;
  requireEnv(["ZOHO_CLIENT_ID", "ZOHO_CLIENT_SECRET", "ZOHO_REFRESH_TOKEN"]);
  const base = env("ZOHO_ACCOUNTS_BASE", "https://accounts.zoho.com");
  const params = new URLSearchParams({
    refresh_token: env("ZOHO_REFRESH_TOKEN"),
    grant_type: "refresh_token",
    client_id: env("ZOHO_CLIENT_ID"),
    client_secret: env("ZOHO_CLIENT_SECRET"),
  });
  const response = await fetch(`${base}/oauth/v2/token?${params}`, { method: "POST" });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) throw new Error(`Zoho token refresh failed: ${payload.error || response.status}`);
  accessToken = payload.access_token;
  return accessToken;
}

async function zohoRequest(endpoint, options = {}) {
  const token = await getAccessToken();
  const base = env("ZOHO_MAIL_BASE", "https://mail.zoho.com/api");
  const response = await fetch(`${base}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Zoho-oauthtoken ${token}`,
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || (payload.status?.code && Number(payload.status.code) >= 400)) {
    throw new Error(`Zoho API error ${response.status}: ${payload.status?.description || payload.error || "unknown error"}`);
  }
  return payload;
}

async function listAccounts() {
  const payload = await zohoRequest("/accounts");
  const accounts = Array.isArray(payload.data) ? payload.data : [];
  if (!accounts.length) console.log("No accounts returned. Confirm the ZohoMail.accounts.READ scope and data-center host.");
  for (const account of accounts) console.log(`${account.accountId || account.accountID || "unknown"}\t${account.primaryEmailAddress || account.emailAddress || account.accountName || ""}`);
}

async function createDraft(lead, body) {
  requireEnv(["ZOHO_ACCOUNT_ID", "ZOHO_FROM_EMAIL"]);
  const payload = await zohoRequest(`/accounts/${encodeURIComponent(env("ZOHO_ACCOUNT_ID"))}/messages`, {
    method: "POST",
    body: JSON.stringify({
      mode: "draft",
      fromAddress: env("ZOHO_FROM_EMAIL"),
      toAddress: lead.Email,
      subject: subjectFor(lead),
      content: body,
      mailFormat: "plaintext",
      askReceipt: "no",
      encoding: "UTF-8",
    }),
  });
  return payload.data?.messageId || payload.data?.draftId || payload.data?.mailId || "created";
}

async function searchMessages(searchKey) {
  requireEnv(["ZOHO_ACCOUNT_ID"]);
  const params = new URLSearchParams({ searchKey, start: "1", limit: "50", includeto: "true" });
  const payload = await zohoRequest(`/accounts/${encodeURIComponent(env("ZOHO_ACCOUNT_ID"))}/messages/search?${params}`);
  return Array.isArray(payload.data) ? payload.data : [];
}

async function syncLeads(leads) {
  const ownAddress = env("ZOHO_FROM_EMAIL").toLowerCase();
  let changed = 0;
  for (const lead of leads) {
    const status = String(lead.Status || "").toUpperCase();
    if (!ACTIVE_STATUSES.has(status) || !lead.Email || !lead.Subject) continue;
    const email = lead.Email.toLowerCase();
    const subject = cleanSentence(lead.Subject).replaceAll('"', "");
    const inboundMessages = await searchMessages(`subject:"${subject}"::sender:${email}`);
    const inbound = inboundMessages.filter((message) => String(message.fromAddress || "").toLowerCase() === email);
    if (inbound.length) {
      const latest = Math.max(...inbound.map((message) => Number(message.receivedTime || message.receivedtime || message.sentDateInGMT || 0)));
      lead.Status = "REPLIED";
      lead["Reply Detected At"] = iso(latest || Date.now());
      lead["Next Action At"] = "";
      lead["Draft ID"] = "";
      changed += 1;
      continue;
    }
    const sentMessages = await searchMessages(`in:Sent::subject:"${subject}"::to:${email}`);
    const sent = sentMessages.filter((message) => String(message.fromAddress || "").toLowerCase() === ownAddress);
    const step = Math.min(3, sent.length);
    if (step > Number(lead["Sequence Step"] || 0)) {
      const latest = Math.max(...sent.map((message) => Number(message.sentDateInGMT || message.receivedTime || message.receivedtime || 0)));
      const sentAt = iso(latest || Date.now());
      lead.Status = "CONTACTED";
      lead["Sequence Step"] = String(step);
      lead["Last Sent At"] = sentAt;
      lead["Draft ID"] = "";
      if (step === 1) lead["Next Action At"] = addBusinessDays(sentAt, env("OUTREACH_FOLLOWUP_1_BUSINESS_DAYS", "4"));
      else if (step === 2) lead["Next Action At"] = addBusinessDays(sentAt, env("OUTREACH_FOLLOWUP_2_BUSINESS_DAYS", "7"));
      else lead["Next Action At"] = "";
      changed += 1;
    }
  }
  return changed;
}

async function createInitialDrafts(leads, previewOnly = false) {
  const cap = Math.max(1, Number(env("OUTREACH_DAILY_DRAFT_CAP", "8")) || 8);
  let created = 0;
  for (const lead of leads) {
    if (String(lead.Status || "").toUpperCase() !== "READY" || created >= cap) continue;
    const missing = validateLead(lead);
    if (missing.length) { console.warn(`Skipped ${lead.Institution || lead.Email || "row"}: missing ${missing.join(", ")}`); continue; }
    lead.Subject = subjectFor(lead);
    const body = initialMessage(lead);
    if (previewOnly) console.log(`\n--- ${lead.Email} | ${lead.Subject} ---\n${body}\n`);
    else {
      lead["Draft ID"] = String(await createDraft(lead, body));
      lead.Status = "DRAFTED";
      console.log(`Created initial draft for ${lead.Email}`);
    }
    created += 1;
  }
  return created;
}

async function createFollowupDrafts(leads, previewOnly = false) {
  const now = Date.now();
  const cap = Math.max(1, Number(env("OUTREACH_DAILY_DRAFT_CAP", "8")) || 8);
  let created = 0;
  for (const lead of leads) {
    if (String(lead.Status || "").toUpperCase() !== "CONTACTED" || created >= cap) continue;
    const currentStep = Number(lead["Sequence Step"] || 0);
    const due = new Date(lead["Next Action At"] || 0).getTime();
    if (![1, 2].includes(currentStep) || !due || due > now || lead["Draft ID"]) continue;
    const nextStep = currentStep + 1;
    const body = followupMessage(lead, nextStep);
    if (previewOnly) console.log(`\n--- FOLLOW-UP ${nextStep - 1}: ${lead.Email} | Re: ${lead.Subject} ---\n${body}\n`);
    else {
      const followupLead = { ...lead, Subject: `Re: ${lead.Subject.replace(/^Re:\s*/i, "")}` };
      lead["Draft ID"] = String(await createDraft(followupLead, body));
      console.log(`Created follow-up ${nextStep - 1} draft for ${lead.Email}`);
    }
    created += 1;
  }
  return created;
}

function checkLocal(leads) {
  const counts = {};
  const seen = new Map();
  let problems = 0;
  for (const lead of leads) {
    const status = String(lead.Status || "RESEARCHING").toUpperCase();
    counts[status] = (counts[status] || 0) + 1;
    if (lead.Email) {
      const email = lead.Email.toLowerCase();
      if (seen.has(email)) { console.warn(`Duplicate email: ${lead.Email}`); problems += 1; }
      seen.set(email, true);
    }
    if ((ACTIVE_STATUSES.has(status) || TERMINAL_STATUSES.has(status)) && !lead.Email) { console.warn(`Missing email for ${lead.Institution || "row"}`); problems += 1; }
    if (status === "READY") {
      const missing = validateLead(lead);
      if (missing.length) { console.warn(`READY lead ${lead.Institution || lead.Email} is missing: ${missing.join(", ")}`); problems += 1; }
    }
  }
  console.log(JSON.stringify({ leads: leads.length, statuses: counts, problems }, null, 2));
  return problems;
}

async function main() {
  if (COMMAND === "accounts") return listAccounts();
  const leads = await loadLeads();
  if (COMMAND === "check") { process.exitCode = checkLocal(leads) ? 1 : 0; return; }
  if (COMMAND === "preview") { await createInitialDrafts(leads, true); await createFollowupDrafts(leads, true); return; }
  if (COMMAND === "sync") { console.log(`Updated ${await syncLeads(leads)} lead(s)`); await saveLeads(leads); return; }
  if (COMMAND === "drafts") { console.log(`Created ${await createInitialDrafts(leads)} draft(s)`); await saveLeads(leads); return; }
  if (COMMAND === "followups") { console.log(`Created ${await createFollowupDrafts(leads)} follow-up draft(s)`); await saveLeads(leads); return; }
  if (COMMAND === "run") {
    const updated = await syncLeads(leads);
    const initial = await createInitialDrafts(leads);
    const followups = await createFollowupDrafts(leads);
    await saveLeads(leads);
    console.log(JSON.stringify({ updated, initialDrafts: initial, followupDrafts: followups }));
    return;
  }
  console.log("Usage: node zoho-outreach.mjs <check|preview|accounts|sync|drafts|followups|run>");
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
