import { site } from "./site.mjs";

const esc = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

export const button = (label, href, kind = "primary") =>
  `<a class="button button--${kind}" href="${href}" data-conversion-cta data-cta-label="${esc(label)}">${label}<span aria-hidden="true">→</span></a>`;

export const status = (label, tone = "neutral") =>
  `<span class="status status--${tone}"><span aria-hidden="true"></span>${label}</span>`;

const logoMark = () => `<svg class="logo-mark" viewBox="0 0 32 32" aria-hidden="true" focusable="false">
  <path class="logo-boundary" d="M11 5H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h3M21 5h3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-3"/>
  <path class="logo-decision" d="m16 11 5 5-5 5-5-5 5-5Z"/>
</svg>`;

export function inquiryForm(source = "website") {
  return `
    <form class="inquiry-form" action="/api/contact" method="post" data-contact-form>
      <input type="hidden" name="source" value="${esc(source)}">
      <input type="hidden" name="data_scope" value="To be agreed after scoped review">
      <div class="form-trap" aria-hidden="true"><label>Leave this empty<input name="company_website" tabindex="-1" autocomplete="off"></label></div>
      <div class="form-grid">
        <label><span>Work email</span><input name="email" type="email" autocomplete="email" required placeholder="you@institution.com"></label>
        <label><span>Institution</span><input name="institution" autocomplete="organization" required placeholder="Bank, credit union, or fintech"></label>
      </div>
      <label><span>One evaluation question</span><textarea name="message" rows="4" required placeholder="For example: can we make adverse-action reasons more specific and reviewable?"></textarea></label>
      <div class="form-submit">
        <button class="button button--primary" type="submit" data-conversion-cta data-cta-label="Submit scoped review"><span data-submit-label>Request a scoped review</span><span aria-hidden="true">↗</span></button>
        <p>No newsletter or automated sequence. No production data belongs in this form.</p>
      </div>
      <div class="form-status" role="status" aria-live="polite" data-form-status></div>
    </form>`;
}

function footer() {
  return `<footer class="site-footer">
    <div><a class="wordmark wordmark--footer" href="/">${logoMark()}<span>Avarent</span></a><p>Find disparate lending outcomes and package the evidence.</p></div>
    <div><strong>Evaluate</strong><a href="/ai-credit-fair-lending-review">AI credit review guide</a><a href="/glossary">Fair-lending glossary</a><a href="/sample-evidence-packet.pdf" data-sample-packet>Sample evidence packet</a><a href="/methodology">Methodology</a><a href="/pilot">Pilot plan</a></div>
    <div><strong>Contact</strong><a href="mailto:${site.emails.sales}?subject=Avarent%20evaluation">Sales</a><a href="mailto:${site.emails.enterprise}?subject=Avarent%20enterprise%20inquiry">Enterprise</a><a href="mailto:${site.emails.security}?subject=Security%20report">Security</a></div>
    <div><strong>Company</strong><a href="/about">About Avarent</a><a href="/trust">Trust center</a><a href="/security">Security review</a><a href="/diligence">Diligence packet</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
    <p class="footer-note">Avarent provides analytical tooling, not legal advice or a guarantee of regulatory compliance. © ${new Date().getUTCFullYear()} Avarent.</p>
  </footer>`;
}

function jsonLd(page, schemas = []) {
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: site.url,
    logo: { "@type": "ImageObject", url: `${site.url}/og-card.png`, width: 1200, height: 630 },
    email: site.email,
    founder: site.founders.map((name) => ({ "@type": "Person", name })),
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: [
      "Fair lending",
      "Algorithmic credit decisioning",
      "Adverse impact ratio",
      "Statistical parity difference",
      "Adverse-action reason review",
      "Model-risk evidence",
    ],
    contactPoint: [
      { "@type": "ContactPoint", contactType: "sales", email: site.emails.sales, availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "enterprise sales", email: site.emails.enterprise, availableLanguage: "English" },
      { "@type": "ContactPoint", contactType: "security", email: site.emails.security, availableLanguage: "English" },
    ],
    description: site.description,
  };
  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: site.url,
    description: site.description,
    publisher: { "@id": organizationId },
    inLanguage: "en-US",
  };
  const webPage = {
    "@context": "https://schema.org",
    "@type": page.path === "/about" ? "AboutPage" : "WebPage",
    "@id": `${page.canonical}#webpage`,
    url: page.canonical,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": organizationId },
    primaryImageOfPage: { "@type": "ImageObject", url: `${site.url}/og-card.png` },
    dateModified: site.contentUpdated,
    inLanguage: "en-US",
  };
  return [organization, website, webPage, ...schemas]
    .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`)
    .join("");
}

export function layout({ title, description, path, body, schemas = [], theme = "paper" }) {
  const canonical = `${site.url}${path === "/" ? "" : path}`;
  return `<!doctype html>
<html lang="en" data-theme="${theme}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website"><meta property="og:site_name" content="Avarent"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${site.url}/og-card.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Avarent: fair-lending evidence for AI credit decisions">
  <meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${site.url}/og-card.png"><meta name="twitter:image:alt" content="Avarent: fair-lending evidence for AI credit decisions">
  <meta name="theme-color" content="#f4f7f8">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="sitemap" type="application/xml" href="/sitemap.xml">
  <link rel="stylesheet" href="/styles.css">
  ${jsonLd({ path, canonical, title, description }, schemas)}
</head>
<body>
  <a class="skip-link" href="#content">Skip to content</a>
  <main id="content" data-page="${esc(path)}">${body}</main>
  ${footer()}
  ${path === "/" ? '<script src="/hero.js" type="module"></script>' : ""}
  <script src="/site.js" type="module"></script>
</body>
</html>`;
}
