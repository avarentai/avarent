"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Glow } from "@/components/ui/glow";
import { DashboardMockup } from "@/components/ui/dashboard-mockup";
import { cn } from "@/lib/utils";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
  calData?: Record<string, string>;
  onClick?: () => void;
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image?: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  return (
    <section
      className={cn(
        "bg-background text-foreground",
        "py-12 sm:py-24 md:py-32 px-4"
      )}
    >
      <div className="mx-auto flex max-w-[var(--max-w-container)] flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-12">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-muted-foreground">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-3xl font-semibold leading-tight text-transparent drop-shadow-2xl sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight max-w-2xl">
            {title}
          </h1>

          {/* Description */}
          <p className="text-sm relative z-10 max-w-[550px] animate-appear font-medium text-muted-foreground opacity-0 [animation-delay:100ms] sm:text-base lg:text-lg">
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex flex-wrap animate-appear justify-center gap-3 opacity-0 [animation-delay:300ms] w-full px-4">
            {actions.map((action, index) => (
              <Button key={index} variant={action.variant} size="lg" asChild>
                <a href={action.href} className="flex items-center gap-2" {...(action.calData ?? {})} onClick={action.onClick ? (e) => { e.preventDefault(); action.onClick!(); } : undefined}>
                  {action.icon}
                  {action.text}
                </a>
              </Button>
            ))}
          </div>

          {/* Image with Scroll Animation */}
          <div className="relative w-full">
            <Glow variant="top" className="animate-appear-zoom opacity-0 [animation-delay:700ms]" />
            <ContainerScroll
              titleComponent={<></>}
              containerClassName="!h-auto md:!h-auto !p-0 md:!p-4"
              cardClassName="!bg-transparent !border !border-white/10 !rounded-xl !p-1 !shadow-none !aspect-video !-mt-4"
              cardInnerClassName="!bg-transparent !p-0"
            >
              <DashboardMockup />
            </ContainerScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
