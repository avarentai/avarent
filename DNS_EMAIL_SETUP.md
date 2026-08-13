# Avarent email authentication status

Checked August 12, 2026.

## Observed DNS

- Inbound mail uses Zoho (`mx.zoho.com`, `mx2.zoho.com`, and `mx3.zoho.com`).
- Root SPF exists: `v=spf1 include:zohomail.com ~all`.
- No DMARC TXT record was returned at `_dmarc.avarent.app`.
- No Resend DKIM record was returned at `resend._domainkey.avarent.app`.

## Safe setup sequence

1. Keep the existing Zoho MX records. Do not add Resend receiving MX records to the root domain.
2. Add `avarent.app` or a deliberate sending subdomain in the Resend Domains dashboard.
3. Copy Resend's generated SPF, DKIM, and return-path records exactly. Do not guess record names or values.
4. Confirm the Resend domain reports `verified` before enabling production form delivery.
5. Add a monitoring DMARC record at `_dmarc.avarent.app`:

   `v=DMARC1; p=none; rua=mailto:security@avarent.app;`

6. Confirm Zoho and Resend messages pass SPF or DKIM alignment, then move DMARC toward `quarantine` or `reject` only after reviewing reports.
7. Test inbound delivery for `sales@`, `enterprise@`, `security@`, `george@`, and `lucas@`.

## Important boundary

Publish only one SPF TXT record for a given hostname. Resend normally supplies records on a sending or return-path subdomain; use the exact dashboard instructions instead of replacing the existing Zoho root SPF record.

Official references:

- Resend domain verification: https://resend.com/docs/dashboard/domains/introduction
- Resend DMARC setup: https://resend.com/docs/dashboard/domains/dmarc
- Zoho DMARC policy: https://www.zoho.com/mail/help/adminconsole/dmarc-policy.html
