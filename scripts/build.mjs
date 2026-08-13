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

const urls = Object.keys(pages).map((route) => `${site.url}${route === "/" ? "" : route}`);
await writeFile(join(out, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${url}</loc><lastmod>2026-08-12</lastmod></url>`).join("")}</urlset>`);
await writeFile(join(out, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${site.url}/sitemap.xml\n`);
await writeFile(join(out, "llms.txt"), `# Avarent\n\n> Avarent helps lending teams evaluate fairness, explanation, and model-risk evidence for AI and algorithmic credit decisions.\n\n## Canonical pages\n- ${site.url}/methodology: Metric definitions, limitations, and primary sources.\n- ${site.url}/trust: Evidence status, unclaimed credentials, and company transparency.\n- ${site.url}/security: Security-review sequence and diligence scope.\n- ${site.url}/pilot: Synthetic-first evaluation stages and boundaries.\n- ${site.url}/sample-evidence-packet.pdf: Four-page synthetic evidence packet showing a reviewable finding.\n\n## Important boundaries\n- Avarent provides analytical tooling, not legal advice or a guarantee of compliance.\n- A metric threshold is a screening signal, not a standalone legal conclusion.\n- The product can be evaluated with synthetic data before broader access is considered.\n- Avarent does not currently claim SOC 2 certification or regulatory approval.\n\nSales: ${site.emails.sales}\nEnterprise: ${site.emails.enterprise}\nSecurity: ${site.emails.security}\n`);
await mkdir(join(out, ".well-known"), { recursive: true });
await writeFile(join(out, ".well-known", "security.txt"), `Contact: mailto:${site.emails.security}\nCanonical: ${site.url}/.well-known/security.txt\nPreferred-Languages: en\nExpires: 2027-08-12T00:00:00.000Z\nPolicy: ${site.url}/security\n`);
await writeFile(join(out, "favicon.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="13" fill="#1d3340"/><g transform="translate(8 8) scale(1.5)" fill="none" stroke="#f4f7f8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h3M21 5h3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-3"/><path d="m16 11 5 5-5 5-5-5 5-5Z" fill="#7770df" stroke="none"/></g></svg>`);

console.log(`Built ${Object.keys(pages).length} routes in public/`);
