"use client";

import { cn } from "@/lib/utils";
import { ReactNode, useEffect, useRef } from "react";

interface HorizontalMarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  reverse?: boolean;
  className?: string;
  speed?: number;
}

function HorizontalMarquee({
  children,
  pauseOnHover = false,
  reverse = false,
  className,
  speed = 35,
}: HorizontalMarqueeProps) {
  const trackStyle: React.CSSProperties = {
    animation: `marquee ${speed}s linear infinite`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div className={cn("group flex overflow-hidden", className)}>
      <div
        className={cn("flex shrink-0", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={trackStyle}
      >
        {children}
      </div>
      <div
        className={cn("flex shrink-0", pauseOnHover && "group-hover:[animation-play-state:paused]")}
        style={trackStyle}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}

interface CTAWithTextMarqueeProps {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryCalData?: Record<string, string>;
  onPrimaryClick?: () => void;
  marqueeItems: string[];
  speed?: number;
}

export function CTAWithTextMarquee({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  secondaryCalData,
  onPrimaryClick,
  marqueeItems,
  speed = 35,
}: CTAWithTextMarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = marqueeRef.current;
    if (!container) return;

    const tick = () => {
      const items = container.querySelectorAll<HTMLElement>(".marquee-item-h");
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      items.forEach((item) => {
        const ir = item.getBoundingClientRect();
        const dist = Math.abs(centerX - (ir.left + ir.width / 2));
        item.style.opacity = String(1 - Math.min(dist / (rect.width / 2), 1) * 0.75);
      });
      requestAnimationFrame(tick);
    };

    const frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="bg-background text-foreground py-16 md:py-24 overflow-hidden">
      {/* Top: text + buttons */}
      <div className="flex flex-col items-center text-center gap-7 px-6 max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
          {title}
        </h2>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center w-full sm:w-auto">
          <a
            href={onPrimaryClick ? "#" : primaryHref}
            onClick={onPrimaryClick ? (e) => { e.preventDefault(); onPrimaryClick(); } : undefined}
            className="group relative px-5 py-2.5 bg-foreground text-background rounded-md text-sm font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="relative z-10">{primaryLabel}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </a>
          <a
            href={secondaryCalData ? "#" : secondaryHref}
            className="group relative px-5 py-2.5 bg-transparent text-foreground rounded-md text-sm font-medium overflow-hidden transition-all duration-300 hover:scale-105 border border-border hover:border-foreground/30"
            {...(secondaryCalData ?? {})}
          >
            <span className="relative z-10">{secondaryLabel}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
          </a>
        </div>
      </div>

      {/* Bottom: horizontal marquee */}
      <div ref={marqueeRef} className="relative w-full">
        <HorizontalMarquee speed={speed}>
          {marqueeItems.map((item, i) => (
            <div
              key={i}
              className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight px-10 marquee-item-h whitespace-nowrap text-foreground/80"
            >
              {item}
            </div>
          ))}
        </HorizontalMarquee>

        {/* vignettes */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </div>
  );
}
