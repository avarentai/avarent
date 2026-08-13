# Avarent site

A low-maintenance generated site with a small Render-compatible Node server for static pages, contact delivery, and analytics forwarding.

## Local development

```sh
npm install
npm run dev
```

`npm run build` generates the seven routes, search-engine files, bundled JavaScript, favicon, and synthetic evidence PDF in `public/`. `npm run check` verifies the core page structure and required public artifacts.

## Deployment

Deploy this directory as a Render web service. `render.yaml` defines the build command, start command, health check, and environment-variable names:

- `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` for contact delivery.
- `POSTHOG_PROJECT_KEY` and optionally `POSTHOG_HOST` for anonymous conversion events.

Public email routing is intentionally separated: `sales@avarent.app` receives evaluation requests, `enterprise@avarent.app` handles procurement conversations, `security@avarent.app` receives vulnerability reports, and founder diligence can reach George and Lucas directly.

See `.env.example` for the expected names. If analytics is not configured, `/api/event` quietly does nothing. If contact delivery fails, the form presents a prefilled email fallback instead of losing the request. The production server binds to Render's `PORT` on `0.0.0.0`.

## Maintenance boundaries

- There is no newsletter, CMS, blog, user account, or recurring content obligation.
- The evidence packet is generated from `scripts/build_sample_pdf.mjs`; edit that source and rebuild rather than editing the PDF manually.
- All site copy lives in `src/pages.mjs`; shared layout and forms live in `src/render.mjs`.
- Only anonymous, allowlisted conversion events are forwarded. Form values are never included in analytics.
- The `diligence/` templates convert qualified interest into a scoped, reviewable pilot without requiring a CRM or newsletter.
- Use `LAUNCH_CHECKLIST.md` for the one-time production and domain steps.
