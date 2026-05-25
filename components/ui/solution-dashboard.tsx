"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";

function CountUp({ target, duration = 1.2 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1);
      setVal(Math.round(progress * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{val.toLocaleString()}</span>;
}

const features = [
  { label: "Credit Utilization", value: 82, direction: "neg" },
  { label: "Payment History",    value: 67, direction: "pos" },
  { label: "Derogatory Marks",   value: 54, direction: "neg" },
  { label: "Account Age",        value: 38, direction: "pos" },
  { label: "Inquiry Count",      value: 29, direction: "neg" },
  { label: "Balance Ratio",      value: 21, direction: "neg" },
];

const segments = [
  { label: "Prime",      pass: 94, review: 4,  decline: 2  },
  { label: "Near-Prime", pass: 81, review: 11, decline: 8  },
  { label: "Subprime",   pass: 63, review: 22, decline: 15 },
  { label: "Thin File",  pass: 57, review: 24, decline: 19 },
];

const recent = [
  { id: "APP-0042", score: 741, outcome: "Approved",  conf: "96%", flag: false },
  { id: "APP-0043", score: 618, outcome: "Approved",  conf: "81%", flag: false },
  { id: "APP-0044", score: 541, outcome: "Review",    conf: "63%", flag: true  },
  { id: "APP-0045", score: 489, outcome: "Declined",  conf: "88%", flag: false },
  { id: "APP-0046", score: 703, outcome: "Approved",  conf: "94%", flag: false },
  { id: "APP-0047", score: 512, outcome: "Review",    conf: "59%", flag: true  },
];

const outcomeColor: Record<string, string> = {
  Approved: "text-emerald-400",
  Declined:  "text-red-400",
  Review:    "text-amber-400",
};

export function SolutionDashboard() {
  return (
    <div className="w-full h-full bg-zinc-950 rounded-xl border border-white/10 flex overflow-hidden text-white font-sans select-none">

      {/* Left – Feature Importance */}
      <div className="w-[28%] border-r border-white/5 flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Explanation</span>
          <span className="text-[9px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">APP-0044</span>
        </div>

        <div className="bg-zinc-900 rounded-lg border border-white/5 p-3 shrink-0">
          <div className="text-[9px] text-white/40 mb-1">Decision</div>
          <div className="text-amber-400 font-semibold text-sm">Under Review</div>
          <div className="text-[9px] text-white/30 mt-0.5">Confidence 63% · Score 541</div>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-h-0">
          <div className="text-[9px] text-white/40 uppercase tracking-widest">Top contributing factors</div>
          {features.map((f) => (
            <div key={f.label} className="flex flex-col gap-0.5">
              <div className="flex justify-between text-[8px]">
                <span className="text-white/60">{f.label}</span>
                <span className={f.direction === "neg" ? "text-red-400" : "text-emerald-400"}>
                  {f.direction === "neg" ? "↓" : "↑"} {f.value}%
                </span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-1 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${f.direction === "neg" ? "bg-red-500/60" : "bg-emerald-500/60"}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${f.value}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 + features.indexOf(f) * 0.07, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Center – Segment Fairness */}
      <div className="flex-1 border-r border-white/5 flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Fairness by Segment</span>
          <span className="text-[9px] text-white/30">Last 30 days</span>
        </div>

        <div className="flex flex-col gap-2 flex-1 min-h-0 overflow-hidden">
          {segments.map((s) => (
            <div key={s.label} className="bg-zinc-900 rounded-lg border border-white/5 p-3">
              <div className="flex justify-between mb-2">
                <span className="text-[10px] font-medium text-white/70">{s.label}</span>
                <div className="flex gap-3 text-[8px] text-white/40">
                  <span className="text-emerald-400">{s.pass}% pass</span>
                  <span className="text-amber-400">{s.review}% review</span>
                  <span className="text-red-400">{s.decline}% decline</span>
                </div>
              </div>
              <div className="flex w-full h-1.5 rounded-full overflow-hidden gap-px">
                <motion.div className="bg-emerald-500/70 rounded-l-full" initial={{ width: 0 }} whileInView={{ width: `${s.pass}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: segments.indexOf(s) * 0.1, ease: "easeOut" }} />
                <motion.div className="bg-amber-500/70" initial={{ width: 0 }} whileInView={{ width: `${s.review}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: segments.indexOf(s) * 0.1 + 0.05, ease: "easeOut" }} />
                <motion.div className="bg-red-500/70 rounded-r-full" initial={{ width: 0 }} whileInView={{ width: `${s.decline}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: segments.indexOf(s) * 0.1 + 0.1, ease: "easeOut" }} />
              </div>
            </div>
          ))}
        </div>

        {/* Disparate Impact indicator */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2 shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-[9px] text-amber-400 font-medium">⚠ Disparate Impact Detected</span>
            <span className="text-[8px] text-white/30">Thin File vs Prime</span>
          </div>
          <div className="text-[8px] text-white/40 mt-1">Approval rate ratio 0.61 — below 0.80 EEOC threshold</div>
        </div>
      </div>

      {/* Right – Recent Decisions */}
      <div className="w-[28%] flex flex-col p-4 gap-3">
        <div className="flex items-center justify-between shrink-0">
          <span className="text-[10px] font-semibold text-white/60 uppercase tracking-widest">Decision Log</span>
          <span className="text-[9px] text-white/30">Live</span>
        </div>

        <div className="flex flex-col gap-1.5 flex-1 min-h-0 overflow-hidden">
          {recent.map((r) => (
            <div key={r.id} className={`flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900 border ${r.flag ? "border-amber-500/30" : "border-white/5"}`}>
              <div className="flex items-center gap-2">
                {r.flag && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                {!r.flag && <span className="w-1.5 h-1.5 rounded-full bg-white/10 shrink-0" />}
                <span className="text-[9px] text-white/50 font-mono">{r.id}</span>
              </div>
              <span className="text-[9px] text-white/30">{r.score}</span>
              <span className={`text-[9px] font-medium ${outcomeColor[r.outcome]}`}>{r.outcome}</span>
              <span className="text-[9px] text-white/30">{r.conf}</span>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900 rounded-lg border border-white/5 p-3 shrink-0">
          <div className="text-[9px] text-white/40 mb-2">Today&apos;s summary</div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-emerald-400 font-semibold text-xs"><CountUp target={1842} /></div>
              <div className="text-[8px] text-white/30">Approved</div>
            </div>
            <div>
              <div className="text-amber-400 font-semibold text-xs"><CountUp target={312} /></div>
              <div className="text-[8px] text-white/30">Review</div>
            </div>
            <div>
              <div className="text-red-400 font-semibold text-xs"><CountUp target={693} /></div>
              <div className="text-[8px] text-white/30">Declined</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
