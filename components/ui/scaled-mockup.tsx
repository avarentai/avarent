"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

export function ScaledMockup({ designWidth, children }: { designWidth: number; children: ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const update = () => {
      if (!outerRef.current) return;
      setScale(Math.min(1, outerRef.current.offsetWidth / designWidth));
    };
    update();
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={outerRef} className="relative w-full h-full overflow-hidden">
      <div
        style={{
          width: designWidth,
          transformOrigin: "top left",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
