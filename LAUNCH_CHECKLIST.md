# Avarent launch checklist

## Domain and deployment

- [ ] Deploy `avarent-overhaul` to the production Vercel project.
- [ ] Point `avarent.app` and `www.avarent.app` at the deployment.
- [ ] Choose one canonical host and redirect the other.
- [ ] Confirm HTTPS and the response headers in `vercel.json`.
- [ ] Test all eight routes, the sample PDF, favicon, sitemap, robots file, `llms.txt`, and `security.txt` in production.

## Email delivery

- [ ] Follow `DNS_EMAIL_SETUP.md`; current DNS has Zoho SPF but no published DMARC or detected Resend DKIM record.
- [ ] Verify `avarent.app` as a sending domain in Resend.
- [ ] Publish the provider's SPF and DKIM records.
- [ ] Publish a DMARC policy and reporting address appropriate for the domain.
- [ ] Confirm delivery to `sales@`, `enterprise@`, `security@`, `george@`, and `lucas@`.
- [ ] Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL` in Vercel.
- [ ] Submit a real website inquiry and confirm reply-to points to the prospect.

## Analytics

- [ ] Set `POSTHOG_PROJECT_KEY` in Vercel.
- [ ] Confirm the website conversion dashboard receives a page view, sample open, form start, and test submission.
- [ ] Confirm no email, institution, question text, or other form value appears in PostHog.

## Contracting and trust

- [ ] Confirm the legal entity and legally authorized signatory with qualified counsel.
- [ ] Name the technical, security, commercial, and escalation owners.
- [ ] Review the public diligence page for accuracy after production deployment.
- [ ] Complete the pilot data plan and success/exit plan before accepting non-synthetic data.

## Search visibility

- [ ] Add and verify the domain in Google Search Console and Bing Webmaster Tools.
- [ ] Submit `https://avarent.app/sitemap.xml`.
- [ ] Request indexing for the home, methodology, trust, security, diligence, and pilot pages.

## Final conversion test

- [ ] Open the site on a phone and desktop in a private browser session.
- [ ] Follow the sample packet path and the direct request path.
- [ ] Confirm form success and email fallback are both readable.
- [ ] Reply using `diligence/FIRST_RESPONSE_PLAYBOOK.md`.
