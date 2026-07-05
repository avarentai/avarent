"use client";

import { HeroSection } from "@/components/blocks/hero-section";
import { RegulatoryRiskSection } from "@/components/blocks/regulatory-risk-section";
import { SolutionFeatures } from "@/components/blocks/solution-features";
import { HowItWorksSection } from "@/components/blocks/how-it-works-section";
import { SolutionSection } from "@/components/blocks/solution-section";
import { MetricsSection } from "@/components/blocks/metrics-section";
import { FAQSection } from "@/components/blocks/faq-section";
import { CTASection } from "@/components/blocks/cta-section";
import { CalEmbed, CAL_DATA } from "@/components/ui/cal-embed";
import { WaitlistModal } from "@/components/ui/waitlist-modal";
import { ContactSalesModal } from "@/components/ui/contact-sales-modal";
import { PilotFab } from "@/components/ui/pilot-fab";

function Blend({ pull = true }: { pull?: boolean }) {
  return (
    <div
      className={`relative pointer-events-none z-10 h-32${pull ? " -my-16" : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative bg-background">
      <CalEmbed />
      <WaitlistModal />
      <ContactSalesModal />
      <PilotFab />
      <HeroSection
        title="Monitor every AI lending decision before regulators do."
        description="Avarent continuously monitors AI-powered lending decisions, detects disparate impact in real time, generates compliant adverse action notices, and prepares your institution for CFPB examinations without replacing your existing models."
        actions={[
          {
            text: "Book a Demo",
            href: "#",
            variant: "default",
            calData: CAL_DATA,
          },
          {
            text: "View Platform",
            href: "#platform",
            variant: "glow",
          },
        ]}
      />
      <Blend pull={false} />
      <RegulatoryRiskSection />
      <Blend />
      <SolutionFeatures />
      <Blend />
      <HowItWorksSection />
      <Blend />
      <SolutionSection />
      <Blend />
      <MetricsSection />
      <Blend />
      <FAQSection />
      <Blend />
      <CTASection />
    </div>
  );
}
