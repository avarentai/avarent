import { CTAWithTextMarquee } from "@/components/ui/cta-with-text-marquee";
import { CAL_DATA } from "@/components/ui/cal-embed";

const marqueeItems = [
  "Credit Risk Teams",
  "Compliance Officers",
  "Model Validators",
  "Fintech Founders",
  "Risk Managers",
  "Data Scientists",
  "Audit Teams",
];

export function CTASection() {
  return (
    <CTAWithTextMarquee
      title="See your exam readiness before the examiner does."
      description="Request access to the evidence packet pilot. Get the structured analysis your team needs before anyone external asks for it."
      primaryLabel="Join the Waitlist"
      primaryHref="#"
      onPrimaryClick={() => window.dispatchEvent(new CustomEvent("open-waitlist"))}
      secondaryLabel="Book a Call with the Founder"
      secondaryHref="#"
      secondaryCalData={CAL_DATA}
      marqueeItems={marqueeItems}
    />
  );
}
