"use client";

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import {
  Eye,
  ShieldCheck,
  GitBranch,
  FileText,
  Layers,
} from "lucide-react";

const solutionData = [
  {
    id: 1,
    title: "Ingest",
    date: "Step 1",
    content:
      "Connect your model outputs, decision logs, and applicant data in minutes. Works with any scoring system or decisioning engine.",
    category: "Data",
    icon: Layers,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Detect",
    date: "Step 2",
    content:
      "Real-time fairness auditing. Calculates Disparate Impact Ratio and Equalized Odds on every decision as it happens.",
    category: "Analysis",
    icon: Eye,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Monitor",
    date: "Step 3",
    content:
      "Continuous drift detection. Alerts you when model bias shifts beyond defined thresholds before it becomes a regulatory problem.",
    category: "Monitoring",
    icon: GitBranch,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 4,
    title: "Explain",
    date: "Step 4",
    content:
      "Converts raw SHAP values into legally defensible adverse action notices. Compliant with CFPB Circular 2023-03 specificity requirements.",
    category: "Explainability",
    icon: FileText,
    relatedIds: [3, 5],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 5,
    title: "Report",
    date: "Step 5",
    content:
      "Generates your full regulatory exam package. Bias logs, BIFSG methodology docs, and AIR alerts ready for SR 11-7 review.",
    category: "Compliance",
    icon: ShieldCheck,
    relatedIds: [4],
    status: "pending" as const,
    energy: 40,
  },
];

export function SolutionSection() {
  return (
    <section className="bg-background text-foreground py-16 md:py-24 px-4">
      <div className="mx-auto max-w-[var(--max-w-container)]">
        <div className="text-center mb-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Features
          </p>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Everything you need, connected
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            Five integrated capabilities that work together to give you complete control over your decision intelligence.
          </p>
        </div>
        <RadialOrbitalTimeline timelineData={solutionData} />
      </div>
    </section>
  );
}
