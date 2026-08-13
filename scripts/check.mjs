import { access, readFile } from "node:fs/promises";
import { pages } from "../src/pages.mjs";

let failures = 0;
const knownPaths = new Set([...Object.keys(pages), "/sample-evidence-packet.pdf", "/favicon.svg", "/styles.css"]);
for (const [route, html] of Object.entries(pages)) {
  const label = route || "/";
  const rules = [
    [/<title>[^<]{10,65}<\/title>/, "title length or title missing"],
    [/<meta name="description" content="[^"]{50,170}">/, "meta description length or description missing"],
    [/<link rel="canonical" href="https:\/\/avarent\.app/, "canonical missing"],
    [/<h1>[\s\S]*?<\/h1>/, "h1 missing"],
  ];
  for (const [pattern, message] of rules) if (!pattern.test(html)) { console.error(`${label}: ${message}`); failures += 1; }
  if (html.includes("—")) { console.error(`${label}: em dash found`); failures += 1; }
  if (/href="#"/.test(html)) { console.error(`${label}: placeholder link found`); failures += 1; }
  for (const [, href] of html.matchAll(/href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const normalized = href || "/";
    if (!knownPaths.has(normalized)) { console.error(`${label}: unknown internal link ${normalized}`); failures += 1; }
  }
}

for (const file of ["public/robots.txt", "public/sitemap.xml", "public/llms.txt", "public/.well-known/security.txt", "public/sample-evidence-packet.pdf"]) {
  try { await access(file); } catch { console.error(`${file}: missing`); failures += 1; }
}

const css = await readFile("src/styles.css", "utf8");
if (!css.includes("overflow-x: clip")) { console.error("CSS: mobile overflow guard missing"); failures += 1; }
if (css.includes("background-clip: text")) { console.error("CSS: gradient text pattern found"); failures += 1; }

if (failures) process.exit(1);
console.log(`Checked ${Object.keys(pages).length} routes: no structural failures.`);
