"use client";

import { HeroSection } from "@/components/blocks/hero-section";
import { ProblemSection } from "@/components/blocks/problem-section";
import { CTASection } from "@/components/blocks/cta-section";
import { FAQSection } from "@/components/blocks/faq-section";
import { SocialProofBridge } from "@/components/blocks/social-proof-bridge";
import { SolutionFeatures } from "@/components/blocks/solution-features";
import { SolutionSection } from "@/components/blocks/solution-section";
import { Icons } from "@/components/ui/icons";
import { CalEmbed, CAL_DATA } from "@/components/ui/cal-embed";
import { WaitlistModal } from "@/components/ui/waitlist-modal";

function Blend() {
  return (
    <div className="relative h-32 pointer-events-none -mt-16 -mb-16 z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative bg-background">
      <CalEmbed />
      <WaitlistModal />
      <HeroSection
        badge={{
          text: "Introducing our new components",
          action: {
            text: "Learn more",
            href: "/docs",
          },
        }}
        title="See what your decision data already shows."
        description="Compliance teams currently assemble fair-lending evidence by hand — pulling exports from systems they do not own, arriving at exams with gaps they did not know existed. Avarent turns the decision records you already collect into a structured evidence packet, without requiring direct model access or storing raw applicant PII."
        actions={[
          {
            text: "Join the Waitlist",
            href: "#",
            variant: "default",
            onClick: () => window.dispatchEvent(new CustomEvent("open-waitlist")),
          },
          {
            text: "Book a Call with the Founder",
            href: "#",
            variant: "glow",
            calData: CAL_DATA,
          },
        ]}
      />
      <Blend />
      <ProblemSection />
      <Blend />
      <SolutionFeatures />
      <Blend />
      <SolutionSection />
      <Blend />
      <SocialProofBridge />
      <Blend />
      <FAQSection />
      <Blend />
      <CTASection />
    </div>
  );
}
