"use client";

const metrics = [
  { label: "Decisions Today", value: "2,847", change: "+12%", up: true },
  { label: "Approval Rate", value: "68.4%", change: "+2.1%", up: true },
  { label: "Fairness Score", value: "94.2", change: "-0.3", up: false },
  { label: "Avg Confidence", value: "87.1%", change: "+1.8%", up: true },
];

const segments = [
  { label: "Prime", rate: 84, fairness: 96, count: "1,204" },
  { label: "Near-Prime", rate: 71, fairness: 93, count: "892" },
  { label: "Subprime", rate: 42, fairness: 91, count: "537" },
  { label: "Thin File", rate: 38, fairness: 88, count: "214" },
];

const recentDecisions = [
  { id: "APP-8821", score: 742, outcome: "Approved", confidence: "96%", flag: false },
  { id: "APP-8820", score: 618, outcome: "Approved", confidence: "81%", flag: false },
  { id: "APP-8819", score: 541, outcome: "Review", confidence: "63%", flag: true },
  { id: "APP-8818", score: 489, outcome: "Declined", confidence: "88%", flag: false },
  { id: "APP-8817", score: 703, outcome: "Approved", confidence: "94%", flag: false },
  { id: "APP-8816", score: 655, outcome: "Approved", confidence: "89%", flag: false },
  { id: "APP-8815", score: 523, outcome: "Review", confidence: "71%", flag: true },
  { id: "APP-8814", score: 698, outcome: "Approved", confidence: "92%", flag: false },
  { id: "APP-8813", score: 476, outcome: "Declined", confidence: "85%", flag: false },
  { id: "APP-8812", score: 715, outcome: "Approved", confidence: "95%", flag: false },
  { id: "APP-8811", score: 589, outcome: "Approved", confidence: "78%", flag: false },
  { id: "APP-8810", score: 512, outcome: "Review", confidence: "66%", flag: true },
];

const bars = [76, 54, 88, 42, 65, 91, 73, 58, 84, 47, 69, 82];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function DashboardMockup() {
  return (
    <div className="w-full h-full bg-zinc-950 text-white font-sans overflow-hidden flex flex-col text-[11px]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-zinc-900/80 shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[12px] text-white tracking-tight">Avarent</span>
          {["Overview", "Fairness", "Models", "Reports"].map((tab, i) => (
            <span
              key={tab}
              className={`text-[10px] cursor-pointer ${i === 0 ? "text-white font-medium border-b border-amber-400 pb-0.5" : "text-white/40 hover:text-white/70"}`}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white/5 rounded px-2 py-1 text-white/40 text-[10px]">
            <span>Retail Credit</span>
            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
          <div className="w-5 h-5 rounded-full bg-amber-500/80 flex items-center justify-center text-[8px] font-bold text-black">A</div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden p-3 flex flex-col gap-2.5">
        {/* Metric cards */}
        <div className="grid grid-cols-4 gap-2 shrink-0">
          {metrics.map((m) => (
            <div key={m.label} className="bg-zinc-900 rounded-lg p-2.5 border border-white/5">
              <div className="text-white/40 text-[9px] mb-1">{m.label}</div>
              <div className="text-white font-semibold text-[14px] leading-none">{m.value}</div>
              <div className={`text-[9px] mt-1 ${m.up ? "text-emerald-400" : "text-amber-400"}`}>
                {m.change} vs last week
              </div>
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex gap-2 flex-1 min-h-0">
          {/* Chart */}
          <div className="flex-1 bg-zinc-900 rounded-lg border border-white/5 p-3 flex flex-col min-w-0">
            <div className="flex items-center justify-between mb-1.5 shrink-0">
              <div className="flex items-center gap-3">
                <span className="text-white/70 font-medium text-[10px]">Decision Volume</span>
                <div className="flex items-center gap-2 text-[8px] text-white/30">
                  <span className="flex items-center gap-1"><span className="inline-block w-2 h-1.5 rounded-sm bg-amber-500/80" />Approved</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-2 h-1.5 rounded-sm bg-white/20" />Declined</span>
                  <span className="flex items-center gap-1"><span className="inline-block w-2 h-[1px] bg-emerald-400" />Fairness</span>
                </div>
              </div>
              <span className="text-white/30 text-[9px]">Last 12 months</span>
            </div>
            {/* Y-axis + bars */}
            <div className="flex flex-1 min-h-0 gap-1">
              {/* Y labels */}
              <div className="flex flex-col justify-between text-right pr-1 shrink-0 py-1">
                {["3k","2k","1k","0"].map(l => (
                  <span key={l} className="text-white/20 text-[7px] leading-none">{l}</span>
                ))}
              </div>
              {/* Chart body */}
              <div className="flex-1 relative min-w-0">
                {/* Grid lines */}
                {[0,33,66,100].map(p => (
                  <div key={p} className="absolute left-0 right-0 border-t border-white/5" style={{ top: `${p}%` }} />
                ))}
                {/* SVG trend line */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={bars.map((h, i) => `${(i / (bars.length - 1)) * 100},${100 - h}`).join(" ")}
                    fill="none"
                    stroke="rgb(52 211 153)"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    opacity="0.7"
                    vectorEffect="non-scaling-stroke"
                  />
                  {bars.map((h, i) => (
                    <circle
                      key={i}
                      cx={(i / (bars.length - 1)) * 100}
                      cy={100 - h}
                      r="1"
                      fill="rgb(52 211 153)"
                      opacity="0.9"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
                {/* Bars */}
                <div className="absolute inset-0 flex items-end gap-0.5 px-0.5 pb-0">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-sm ${i === 11 ? "bg-amber-500" : "bg-amber-500/35"}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* X labels */}
            <div className="flex gap-0.5 px-5 mt-1 shrink-0">
              {months.map((m, i) => (
                <div key={i} className="flex-1 text-center">
                  <span className={`text-[7px] ${i === 11 ? "text-amber-400" : "text-white/20"}`}>{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="w-[42%] flex flex-col gap-2">
            {/* Segment fairness */}
            <div className="bg-zinc-900 rounded-lg border border-white/5 p-3 shrink-0">
              <div className="text-white/70 font-medium text-[10px] mb-2">Fairness by Segment</div>
              <div className="flex flex-col gap-1.5">
                {segments.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-white/40 text-[9px] w-16 shrink-0">{s.label}</span>
                    <div className="flex-1 bg-white/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-emerald-400"
                        style={{ width: `${s.fairness}%` }}
                      />
                    </div>
                    <span className="text-white/50 text-[9px] w-6 text-right">{s.fairness}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent decisions */}
            <div className="bg-zinc-900 rounded-lg border border-white/5 p-3 flex-1 min-h-0 overflow-hidden">
              <div className="text-white/70 font-medium text-[10px] mb-2">Recent Decisions</div>
              <div className="flex flex-col gap-1.5">
                {recentDecisions.map((d) => (
                  <div key={d.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {d.flag && <div className="w-1 h-1 rounded-full bg-amber-400 shrink-0" />}
                      {!d.flag && <div className="w-1 h-1 rounded-full bg-transparent shrink-0" />}
                      <span className="text-white/40 text-[9px] font-mono">{d.id}</span>
                    </div>
                    <span className="text-white/30 text-[9px]">{d.score}</span>
                    <span className={`text-[9px] font-medium ${
                      d.outcome === "Approved" ? "text-emerald-400" :
                      d.outcome === "Review" ? "text-amber-400" : "text-red-400"
                    }`}>{d.outcome}</span>
                    <span className="text-white/30 text-[9px]">{d.confidence}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
