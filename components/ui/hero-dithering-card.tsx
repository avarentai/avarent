import { ArrowRight } from "lucide-react";
import { lazy, Suspense, useState } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((module) => ({ default: module.Dithering })),
);

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false);
  const reducedMotion = typeof window !== "undefined"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section className="hero-card-section" aria-label="Avarent overview">
      <div
        className="hero-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Suspense fallback={<div className="hero-shader-fallback" aria-hidden="true" />}>
          <div className="hero-shader" aria-hidden="true">
            <Dithering
              colorBack="#f4f7f8"
              colorFront="#7770df"
              shape="warp"
              type="4x4"
              speed={reducedMotion ? 0 : isHovered ? 0.6 : 0.2}
              size={2}
              scale={0.78}
              width="100%"
              height="100%"
              fit="cover"
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        <div className="hero-card-content">
          <a className="hero-badge" href="/" aria-label="Avarent home">
            <svg viewBox="0 0 32 32" aria-hidden="true"><path d="M11 5H8a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h3M21 5h3a3 3 0 0 1 3 3v16a3 3 0 0 1-3 3h-3" /><path className="hero-badge-decision" d="m16 11 5 5-5 5-5-5 5-5Z" /></svg>
            <span>Avarent</span>
          </a>
          <h1>Find decision risk before it becomes an examination problem.</h1>
          <p>Avarent helps lending teams measure outcome disparities, investigate explanation risk, and assemble evidence a qualified reviewer can inspect.</p>
          <div className="hero-card-actions">
            <a className="hero-card-cta" href="#request" data-conversion-cta data-cta-label="Hero request">
              <span>Start with one question</span><ArrowRight aria-hidden="true" size={20} />
            </a>
            <a className="hero-card-link" href="/sample-evidence-packet.pdf" data-sample-packet>Inspect a sample packet <ArrowRight aria-hidden="true" size={17} /></a>
          </div>
          <div className="hero-card-boundary" aria-label="Evaluation boundaries">
            <span>Synthetic data first</span><span>No model changes</span><span>Decisions stay human-owned</span>
          </div>
        </div>
      </div>
    </section>
  );
}
