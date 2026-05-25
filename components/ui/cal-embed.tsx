"use client";

import { useEffect } from "react";

const CAL_NS = "investor-call-reshaping-ai-governance-for-the-2.01-trillion-dollar-lending-market";
const CAL_LINK = `georgetet/${CAL_NS}`;

export const CAL_DATA = {
  "data-cal-link": CAL_LINK,
  "data-cal-namespace": CAL_NS,
  "data-cal-config": '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
} as const;

export function CalEmbed() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;

    // Verbatim Cal.com element-click embed initialisation
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => a.q.push(ar);
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal;
        const ar = arguments;
        if (!cal.loaded) {
          cal.ns = {}; cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api = function () { p(api, arguments); };
          const namespace = ar[1];
          (api as any).q = (api as any).q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar); p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(w, "https://app.cal.com/embed/embed.js", "init");

    w.Cal("init", CAL_NS, { origin: "https://app.cal.com" });
    w.Cal.ns[CAL_NS]("ui", { hideEventTypeDetails: false, layout: "month_view" });
  }, []);

  return null;
}
