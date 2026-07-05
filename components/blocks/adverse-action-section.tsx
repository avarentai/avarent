"use client";

import { motion } from "motion/react";
import { Layers, ListChecks, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CAL_DATA } from "@/components/ui/cal-embed";

const proofPoints = [
  {
    icon: <Layers className="h-4 w-4 text-white/80" />,
    title: "Works on any model",
    description:
      "Sits downstream of your existing underwriting. No model swap, no vendor lock — even black-box models that return a score and nothing else.",
  },
  {
    icon: <ListChecks className="h-4 w-4 text-white/80" />,
    title: "A set of reasons, not a guess",
    description:
      "For each denial we surface a ranked set of plausible, data-grounded reasons — your compliance officer reviews and selects, keeping a human in the loop.",
  },
  {
    icon: <ShieldCheck className="h-4 w-4 text-white/80" />,
    title: "Built for the specificity standard",
    description:
      "Every candidate reason is grounded in the applicant's own data and written to the CFPB Circular 2023-03 behavioral-specificity bar.",
  },
];

const candidateReasons = [
  {
    reason: "Debt-to-income ratio above program threshold",
    detail: "Monthly obligations / stated income = 47%",
    confidence: "High",
    selected: true,
  },
  {
    reason: "Length of credit history below minimum",
    detail: "Oldest tradeline opened 14 months ago",
    confidence: "High",
    selected: false,
  },
  {
    reason: "Recent delinquency on revolving account",
    detail: "30-day late reported within last 6 months",
    confidence: "Medium",
    selected: false,
  },
];

export function AdverseActionSection() {
  return (
    <section className="relative z-20 bg-[#0A0A0A] px-4 py-20 md:py-28">
      <div className="mx-auto grid max-w-[var(--max-w-container)] items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column — copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/60">
            Adverse Action · Our differentiator
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            When your model denies but can&apos;t say why.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
            Most AI models return a score with no usable reason — and generic buckets like
            &ldquo;credit history&rdquo; fail examiners. Avarent reads the denied application and
            surfaces a set of plausible, data-grounded reasons your compliance officer can actually
            use. Model vendors only explain the models they built. Consultants aren&apos;t
            always-on. Avarent is neither.
          </p>

          <div className="mt-8 space-y-5">
            {proofPoints.map((point, index) => (
              <motion.div
                key={point.title}
                className="flex gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.1 + index * 0.08, ease: "easeOut" }}
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  {point.icon}
                </div>
                <div>
                  <h3 className="text-[15px] font-medium tracking-tight text-white">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm leading-snug text-white/50">{point.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-9">
            <Button size="lg" variant="glow" className="h-10 px-4" {...CAL_DATA}>
              Book a Demo
            </Button>
          </div>
        </motion.div>

        {/* Right column — denial → candidate reasons mockup */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <div className="rounded-2xl border border-white/6 bg-[#111111] p-3 md:p-4">
            {/* Browser chrome */}
            <div className="rounded-lg border border-white/6 bg-[#0F0F0F]">
              <div className="flex items-center gap-1.5 border-b border-white/6 px-3 py-2">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-[11px] text-white/30">Adverse Action</span>
              </div>

              <div className="p-4">
                {/* Denial event */}
                <div className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.02] px-3 py-2.5">
                  <div>
                    <p className="text-xs font-medium text-white/80">
                      Application #4821 · Denied by model
                    </p>
                    <p className="text-[11px] text-white/35">No reason returned</p>
                  </div>
                  <span className="rounded px-1.5 py-0.5 text-[10px] font-medium bg-[#C45C00]/20 text-[#C45C00]">
                    Denied
                  </span>
                </div>

                {/* Connector label */}
                <div className="my-2.5 flex items-center gap-2 px-1">
                  <div className="h-px flex-1 bg-white/6" />
                  <span className="text-[10px] uppercase tracking-wider text-white/30">
                    Candidate reasons
                  </span>
                  <div className="h-px flex-1 bg-white/6" />
                </div>

                {/* Candidate reason cards */}
                <div className="space-y-2">
                  {candidateReasons.map((item, index) => (
                    <motion.div
                      key={item.reason}
                      className={`rounded-lg border px-3 py-2.5 transition-colors ${
                        item.selected
                          ? "border-[#C45C00]/40 bg-[#C45C00]/[0.06]"
                          : "border-white/6 bg-white/[0.02]"
                      }`}
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: 0.25 + index * 0.12, ease: "easeOut" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span
                            className={`mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border ${
                              item.selected
                                ? "border-[#C45C00] bg-[#C45C00]"
                                : "border-white/20"
                            }`}
                          >
                            {item.selected && (
                              <svg viewBox="0 0 12 12" className="h-2 w-2 text-black" fill="none">
                                <path
                                  d="M2.5 6.2 5 8.5 9.5 3.5"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                          <div>
                            <p className="text-xs font-medium text-white/80">{item.reason}</p>
                            <p className="mt-0.5 text-[11px] text-white/35">{item.detail}</p>
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${
                            item.confidence === "High"
                              ? "bg-white/10 text-white/60"
                              : "bg-white/[0.06] text-white/40"
                          }`}
                        >
                          {item.confidence}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Human-in-the-loop footer */}
                <div className="mt-3 flex items-center gap-2 px-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-[11px] text-white/40">
                    Compliance officer reviews and selects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
