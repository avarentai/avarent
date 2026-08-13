import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const target = join(root, "output", "pdf", "avarent-synthetic-evidence-packet.pdf");

const W = 612;
const H = 792;
const colors = {
  paper: [0.957, 0.969, 0.973],
  ink: [0.125, 0.212, 0.255],
  muted: [0.34, 0.43, 0.47],
  rule: [0.79, 0.84, 0.86],
  iris: [0.365, 0.337, 0.8],
  dark: [0.11, 0.2, 0.25],
  light: [0.95, 0.97, 0.98],
  celadon: [0.44, 0.66, 0.61],
  ochre: [0.72, 0.59, 0.22],
};

const rgb = (c, stroke = false) => `${c.map((v) => v.toFixed(3)).join(" ")} ${stroke ? "RG" : "rg"}`;
const esc = (value) => String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
const yPdf = (top) => H - top;

function wrap(text, size, width, mono = false) {
  const factor = mono ? 0.6 : 0.51;
  const max = Math.max(8, Math.floor(width / (size * factor)));
  const words = text.split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) { lines.push(line); line = word; }
    else line = next;
  }
  if (line) lines.push(line);
  return lines;
}

function page() {
  const commands = [rgb(colors.paper), `0 0 ${W} ${H} re f`];
  const text = (value, x, top, size = 10, font = "F1", color = colors.ink) => {
    commands.push(`BT /${font} ${size} Tf ${rgb(color)} 1 0 0 1 ${x} ${yPdf(top)} Tm (${esc(value)}) Tj ET`);
  };
  const block = (value, x, top, width, size = 10, leading = 14, font = "F1", color = colors.muted) => {
    const lines = wrap(value, size, width, font === "F3");
    lines.forEach((line, index) => text(line, x, top + index * leading, size, font, color));
    return top + lines.length * leading;
  };
  const line = (x1, top1, x2, top2, color = colors.rule, width = 1) => {
    commands.push(`${rgb(color, true)} ${width} w ${x1} ${yPdf(top1)} m ${x2} ${yPdf(top2)} l S`);
  };
  const rect = (x, top, width, height, fill, stroke = null, radius = 0) => {
    const y = H - top - height;
    if (!radius) commands.push(`${rgb(fill)} ${stroke ? rgb(stroke, true) : ""} ${x} ${y} ${width} ${height} re ${stroke ? "B" : "f"}`);
    else {
      const r = Math.min(radius, width / 2, height / 2);
      const k = 0.5522848 * r;
      commands.push(`${rgb(fill)} ${stroke ? rgb(stroke, true) : ""} ${x + r} ${y} m ${x + width - r} ${y} l ${x + width - r + k} ${y} ${x + width} ${y + r - k} ${x + width} ${y + r} c ${x + width} ${y + height - r} l ${x + width} ${y + height - r + k} ${x + width - r + k} ${y + height} ${x + width - r} ${y + height} c ${x + r} ${y + height} l ${x + r - k} ${y + height} ${x} ${y + height - r + k} ${x} ${y + height - r} c ${x} ${y + r} l ${x} ${y + r - k} ${x + r - k} ${y} ${x + r} ${y} c ${stroke ? "B" : "f"}`);
    }
  };
  return { commands, text, block, line, rect };
}

function brand(p, top = 48, light = false) {
  const ink = light ? colors.light : colors.ink;
  p.commands.push(`${rgb(ink, true)} 2 w 45 ${yPdf(top + 3)} m 41 ${yPdf(top + 3)} l 38 ${yPdf(top + 6)} l 38 ${yPdf(top + 20)} l 41 ${yPdf(top + 23)} l 45 ${yPdf(top + 23)} l S`);
  p.commands.push(`${rgb(ink, true)} 2 w 53 ${yPdf(top + 3)} m 57 ${yPdf(top + 3)} l 60 ${yPdf(top + 6)} l 60 ${yPdf(top + 20)} l 57 ${yPdf(top + 23)} l 53 ${yPdf(top + 23)} l S`);
  p.commands.push(`${rgb(colors.iris)} 49 ${yPdf(top + 8)} m 54 ${yPdf(top + 13)} l 49 ${yPdf(top + 18)} l 44 ${yPdf(top + 13)} l h f`);
  p.text("Avarent", 72, top + 19, 15, "F2", ink);
}

function footer(p, number) {
  p.line(38, 748, 574, 748);
  p.text("SYNTHETIC SAMPLE - NOT A CUSTOMER RESULT", 38, 768, 7.5, "F3", colors.muted);
  p.text(`0${number}`, 558, 768, 8, "F3", colors.muted);
}

const pages = [];

{
  const p = page();
  brand(p);
  p.text("ILLUSTRATIVE EVIDENCE PACKET", 38, 144, 9, "F3", colors.iris);
  p.block("Approval-rate disparity review", 38, 194, 500, 36, 39, "F2", colors.ink);
  p.block("A concrete example of how one screening result can preserve its comparison, scope, limitations, and human next step.", 38, 300, 450, 15, 21, "F1", colors.muted);
  p.rect(38, 414, 536, 154, colors.dark, null, 10);
  p.text("EVALUATION BOUNDARY", 60, 448, 8, "F3", colors.celadon);
  p.text("Synthetic input only", 60, 486, 13, "F2", colors.light);
  p.text("No underwriting change", 236, 486, 13, "F2", colors.light);
  p.text("Human review", 438, 486, 13, "F2", colors.light);
  p.line(60, 510, 552, 510, colors.muted, 0.6);
  p.block("This packet demonstrates an evidence structure. It is not legal advice, certification, a customer result, or proof that unlawful discrimination occurred.", 60, 536, 470, 10, 15, "F1", colors.light);
  p.text("VERSION", 38, 650, 8, "F3", colors.muted);
  p.text("1.0 / August 2026", 38, 670, 10, "F2", colors.ink);
  p.text("METHOD", 224, 650, 8, "F3", colors.muted);
  p.text("Adverse impact ratio", 224, 670, 10, "F2", colors.ink);
  p.text("SOURCE", 410, 650, 8, "F3", colors.muted);
  p.text("Representative synthetic data", 410, 670, 10, "F2", colors.ink);
  footer(p, 1);
  pages.push(p.commands.join("\n"));
}

{
  const p = page();
  brand(p);
  p.text("01 / FINDING OVERVIEW", 38, 126, 9, "F3", colors.iris);
  p.block("The configured screening threshold was crossed.", 38, 166, 500, 25, 29, "F2", colors.ink);
  p.text("0.77", 38, 296, 72, "F3", colors.ochre);
  p.text("ADVERSE IMPACT RATIO", 268, 265, 8, "F3", colors.muted);
  p.block("Illustrative comparison-group favorable outcome rate divided by the reference-group rate.", 268, 290, 270, 11, 16, "F1", colors.muted);
  p.line(38, 366, 574, 366, colors.ink, 0.8);
  const cols = [[38, "REFERENCE RATE", "82.4%"], [180, "COMPARISON RATE", "63.5%"], [322, "WINDOW", "Jan-Mar sample"], [464, "THRESHOLD", "0.80"]];
  cols.forEach(([x, label, value], index) => {
    if (index) p.line(x - 16, 386, x - 16, 462);
    p.text(label, x, 402, 7.5, "F3", colors.muted);
    p.text(value, x, 432, 14, "F2", colors.ink);
  });
  p.rect(38, 512, 536, 146, [0.92, 0.94, 0.95], colors.rule, 8);
  p.text("SCREENING INTERPRETATION", 60, 544, 8, "F3", colors.iris);
  p.block("The result is below the configured 0.80 review threshold. That creates an investigation trigger, not a legal determination.", 60, 578, 480, 13, 19, "F2", colors.ink);
  p.block("A qualified reviewer should examine population definition, sample size, policy context, data quality, and plausible alternative explanations before deciding what the result means.", 60, 628, 480, 10, 15, "F1", colors.muted);
  footer(p, 2);
  pages.push(p.commands.join("\n"));
}

{
  const p = page();
  brand(p);
  p.text("02 / TRACEABLE RECORD", 38, 126, 9, "F3", colors.iris);
  p.block("Every finding retains the context needed to reproduce and challenge it.", 38, 166, 510, 24, 29, "F2", colors.ink);
  const rows = [
    ["POPULATION", "Representative synthetic installment-loan applicants"],
    ["DECISION FIELD", "Favorable outcome: approved"],
    ["COMPARISON", "Selected synthetic cohort against documented reference cohort"],
    ["MEASURE", "Adverse impact ratio, two-decimal display"],
    ["RULE", "Flag values below the configured 0.80 screening threshold"],
    ["OWNER", "Assigned institutional reviewer"],
  ];
  let top = 290;
  rows.forEach(([label, value]) => {
    p.line(38, top - 18, 574, top - 18);
    p.text(label, 38, top + 5, 7.5, "F3", colors.muted);
    p.block(value, 190, top + 5, 370, 11, 15, "F2", colors.ink);
    top += 58;
  });
  p.text("REVIEW QUESTIONS", 38, 655, 8, "F3", colors.iris);
  p.block("Is the cohort definition appropriate? Is the sample stable enough? Did policy or channel mix change? Are missing or inferred attributes affecting the result?", 38, 682, 520, 10, 15, "F1", colors.muted);
  footer(p, 3);
  pages.push(p.commands.join("\n"));
}

{
  const p = page();
  brand(p);
  p.text("03 / HUMAN REVIEW AND EXPORT", 38, 126, 9, "F3", colors.iris);
  p.block("The output becomes useful when ownership and limitations travel with it.", 38, 166, 510, 24, 29, "F2", colors.ink);
  p.text("REVIEW CHECKLIST", 38, 278, 8, "F3", colors.muted);
  const checks = ["Confirm population and reference group", "Assess sample size and data quality", "Document plausible explanations", "Record disposition and owner", "Set follow-up date or close rationale"];
  checks.forEach((item, index) => {
    const top = 314 + index * 42;
    p.rect(38, top - 13, 15, 15, colors.paper, colors.rule, 3);
    p.text(item, 68, top, 11, "F2", colors.ink);
  });
  p.rect(330, 278, 244, 242, colors.dark, null, 9);
  p.text("EXPORT MANIFEST", 352, 312, 8, "F3", colors.celadon);
  ["Method and version", "Population definition", "Metric inputs and result", "Threshold configuration", "Reviewer action", "Known limitations"].forEach((item, index) => {
    p.text(`0${index + 1}`, 352, 352 + index * 27, 7.5, "F3", colors.celadon);
    p.text(item, 382, 352 + index * 27, 10, "F1", colors.light);
  });
  p.line(38, 572, 574, 572, colors.ink, 0.8);
  p.text("KNOWN LIMITATIONS", 38, 606, 8, "F3", colors.iris);
  p.block("Observed disparity does not identify cause. Small samples may be unstable. Missing or inferred demographic attributes can change results. Supplied data and configuration determine output quality.", 38, 638, 520, 11, 16, "F1", colors.muted);
  p.text("Methodology and current primary references: avarent.app/methodology", 38, 714, 9, "F2", colors.ink);
  footer(p, 4);
  pages.push(p.commands.join("\n"));
}

function buildPdf(streams) {
  const objects = [];
  const add = (body) => { objects.push(body); return objects.length; };
  const catalogId = add("");
  const pagesId = add("");
  const pageIds = [];
  const contentIds = [];
  for (const stream of streams) {
    pageIds.push(add(""));
    contentIds.push(add(`<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`));
  }
  const regularId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  const boldId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  const monoId = add("<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>");
  objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
  objects[pagesId - 1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageIds.length} >>`;
  pageIds.forEach((id, index) => {
    objects[id - 1] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 ${regularId} 0 R /F2 ${boldId} 0 R /F3 ${monoId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`;
  });
  let pdf = "%PDF-1.4\n%AVARENT\n";
  const offsets = [0];
  objects.forEach((body, index) => {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xref = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => { pdf += `${String(offset).padStart(10, "0")} 00000 n \n`; });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(pdf, "binary");
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, buildPdf(pages));
console.log(`Built ${target}`);
