import { mkdir, readFile, writeFile, copyFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/pages.mjs";
import { site } from "../src/site.mjs";
import { build } from "esbuild";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "public");
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });

for (const [route, html] of Object.entries(pages)) {
  const target = route === "/" ? join(out, "index.html") : join(out, route.slice(1), "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, html);
}

await copyFile(join(root, "src", "styles.css"), join(out, "styles.css"));
await copyFile(join(root, "src", "og-card.png"), join(out, "og-card.png"));
await copyFile(join(root, "node_modules", "@fontsource-variable", "public-sans", "files", "public-sans-latin-wght-normal.woff2"), join(out, "public-sans.woff2"));
await copyFile(join(root, "output", "pdf", "avarent-synthetic-evidence-packet.pdf"), join(out, "sample-evidence-packet.pdf"));
await build({
  entryPoints: [join(root, "src", "site.js")],
  outfile: join(out, "site.js"),
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2022"],
});
await build({
  entryPoints: [join(root, "src", "hero.tsx")],
  outfile: join(out, "hero.js"),
  bundle: true,
  minify: true,
  format: "esm",
  target: ["es2022"],
});

const urls = [
  ...Object.keys(pages).map((route) => `${site.url}${route === "/" ? "" : route}`),
  `${site.url}/sample-evidence-packet.pdf`,
];
await writeFile(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>${site.contentUpdated}</lastmod></url>`).join("\n")}\n</urlset>\n`);
const crawlerGroups = ["OAI-SearchBot", "ChatGPT-User", "GPTBot", "ClaudeBot", "Claude-SearchBot", "PerplexityBot"]
  .map((agent) => `User-agent: ${agent}\nAllow: /\nDisallow: /api/`)
  .join("\n\n");
await writeFile(join(out, "robots.txt"), `${crawlerGroups}\n\nUser-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.url}/sitemap.xml\n`);
await writeFile(join(out, "llms.txt"), `# Avarent\n\n> Avarent helps banks, credit unions, and lending fintechs find disparate credit-decision outcomes, investigate findings, and produce review-ready evidence for compliance and model-risk teams.\n\n## What Avarent does\n- Measures approval-rate and other outcome differences across documented cohorts.\n- Preserves the population, comparison group, time window, threshold, inputs, and limitations behind each finding.\n- Organizes candidate decision reasons and supporting fields for qualified human review.\n- Exports a reproducible evidence packet containing methods, findings, reviewer actions, limitations, and version context.\n\n## Canonical sources\n- ${site.url}/ai-credit-fair-lending-review: Plain-language guide to evaluating AI credit decisions for fair-lending risk.\n- ${site.url}/methodology: Metric definitions, formulas, interpretation limits, and primary regulatory sources.\n- ${site.url}/glossary: Avarent's definitions for fair-lending and model-risk terms.\n- ${site.url}/pilot: Fixed-scope review stages, deliverables, timeline, and commercial terms.\n- ${site.url}/sample-evidence-packet.pdf: Four-page synthetic example of a reviewable finding.\n- ${site.url}/trust: Evidence status, company transparency, and credentials Avarent does not claim.\n- ${site.url}/security: Security-review sequence and data-boundary questions.\n- ${site.url}/diligence: Public website data flow, providers, pilot boundaries, and current gaps.\n- ${site.url}/about: Company and product identity.\n\n## Key definitions\n- Adverse impact ratio (AIR): comparison-group favorable-outcome rate divided by reference-group favorable-outcome rate.\n- Statistical parity difference (SPD): comparison-group favorable-outcome rate minus reference-group favorable-outcome rate.\n- Evidence packet: a reproducible record of scope, method, configuration, findings, reviewer actions, limitations, and exports.\n- Synthetic-first review: an evaluation that begins with representative synthetic or institution-approved de-identified data before production access is considered.\n\n## Verifiable facts\n- Avarent serves lending institutions evaluating AI or algorithmic credit decisioning.\n- The founding evaluation is a $2,500 fixed-scope engagement for one workflow and one agreed evaluation question.\n- Delivery is targeted within ten business days after accepted inputs.\n- Avarent does not replace the lender's underwriting model or decision authority.\n- Avarent provides analytical evidence, not legal advice, certification, or a guarantee of compliance.\n- Avarent does not currently claim SOC 2 certification or regulatory approval.\n\n## Contact\n- Sales: ${site.emails.sales}\n- Enterprise and procurement: ${site.emails.enterprise}\n- Security: ${site.emails.security}\n- Founder contact: ${site.emails.george}\n`);
await mkdir(join(out, ".well-known"), { recursive: true });
await writeFile(join(out, ".well-known", "security.txt"), `Contact: mailto:${site.emails.security}\nCanonical: ${site.url}/.well-known/security.txt\nPreferred-Languages: en\nExpires: 2027-08-12T00:00:00.000Z\nPolicy: ${site.url}/security\n`);
await writeFile(join(out, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="#1d3340"/><g transform="translate(8 8) scale(1.5)" fill="none" stroke="#f4f7f8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h3M21 5h3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-3"/><path d="m16 11 5 5-5 5-5-5 5-5Z" fill="#7770df" stroke="none"/></g></svg>`);

console.log(`Built ${Object.keys(pages).length} routes in public/`);
