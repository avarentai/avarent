"use client";

import { motion } from "motion/react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";
import {
  AlertTriangle,
  EyeOff,
  ShieldX,
  GitBranch,
  Scale,
  FileSearch,
} from "lucide-react";

const problems: BentoItem[] = [
  {
    title: "ML models outran your oversight function",
    meta: "Institutional lag",
    description:
      "Model risk management was built for logistic regression. Gradient-boosted trees making thousands of micro-decisions across protected-class cohorts require a different kind of monitoring — one most internal teams do not yet have.",
    icon: <EyeOff className="w-4 h-4 text-amber-500" />,
    status: "Exposure",
    tags: ["Model Risk", "SR 11-7"],
    colSpan: 2,
    hasPersistentHover: true,
    cta: "See how →",
  },
  {
    title: "Disparity runs without an alert",
    meta: "Disparate impact",
    description:
      "Approval rates diverge across protected-class cohorts without triggering any internal flag. The disparity is in your data right now.",
    icon: <Scale className="w-4 h-4 text-red-400" />,
    status: "Undetected",
    tags: ["ECOA", "DIR"],
    cta: "Explore →",
  },
  {
    title: "71% of adverse action notices fail the standard",
    meta: "CFPB Circular 2023-03",
    description:
      "Behavioral specificity is required. \"Insufficient income\" is not compliant. The reason codes exist — the defensible language does not.",
    icon: <FileSearch className="w-4 h-4 text-orange-400" />,
    status: "Non-compliant",
    tags: ["Adverse Action", "Reg B"],
    cta: "Learn more →",
  },
  {
    title: "The evidence pack is built by one person with a spreadsheet",
    meta: "Spreadsheet status quo",
    description:
      "CSVs from the LOS, joined to bureau data, analyzed with pivot tables and undocumented methodology. Gaps surface during the exam, not before it.",
    icon: <ShieldX className="w-4 h-4 text-rose-500" />,
    status: "Unsustainable",
    tags: ["Fair Lending", "Audit"],
    colSpan: 2,
    cta: "See how →",
  },
  {
    title: "You don\u2019t know what\u2019s missing until you\u2019re presenting",
    meta: "Analysis readiness",
    description:
      "Which statistical analyses are blocked by missing fields? Nobody knows until leadership asks a question the data cannot answer.",
    icon: <GitBranch className="w-4 h-4 text-yellow-400" />,
    status: "Unknown",
    tags: ["Data Quality", "Readiness"],
    colSpan: 2,
  },
  {
    title: "Regulators already have a view of your data",
    meta: "Information asymmetry",
    description:
      "HMDA submissions and complaint databases give examiners a structured picture of your decisions before the exam starts. Avarent gives you the same picture first.",
    icon: <AlertTriangle className="w-4 h-4 text-orange-400" />,
    status: "Critical",
    tags: ["HMDA", "Exams"],
  },
];

export function ProblemSection() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 px-4">
      <div className="mx-auto max-w-[var(--max-w-container)]">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            The problem
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            The gap between deployment speed and oversight capacity
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Lenders have deployed non-linear machine learning models faster than their internal teams can monitor them. That gap is where regulatory exposure lives.
          </p>
        </motion.div>
        <BentoGrid items={problems} />
      </div>
    </section>
  );
}
