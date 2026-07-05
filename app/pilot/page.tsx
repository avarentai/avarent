"use client";

import Link from "next/link";
import { ArrowLeft, Check, Database, Building2, Radar, ShieldCheck, Lock } from "lucide-react";
import { CalEmbed, CAL_DATA } from "@/components/ui/cal-embed";
import { PilotSignup } from "@/components/ui/pilot-signup";

const getItems = [
  "The full Avarent platform — nothing held back",
  "White-glove onboarding and setup help",
  "Free for the entire 3-month pilot",
  "No contract, no lock-in, cancel anytime",
];

const askItems = [
  "Run it on real or synthetic lending data",
  "A couple of short feedback conversations",
  "Permission to use your name as a design partner",
];

const steps = [
  {
    icon: Building2,
    title: "Create your organization",
    body: "Sign in and spin up your workspace in a couple of minutes. You become the admin.",
  },
  {
    icon: Database,
    title: "Connect or upload loan data",
    body: "Bring your own decision records, or start with synthetic data to see it in action.",
  },
  {
    icon: Radar,
    title: "Monitor adverse-action risk",
    body: "Watch disparate impact, generate adverse-action notices, and stay exam-ready.",
  },
];

export default function PilotPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0A0A0A] text-white">
      <CalEmbed />

      {/* Ambient brand glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-orange-600/[0.08] blur-[100px]" />
        <div className="absolute bottom-1/4 -left-24 h-72 w-72 rounded-full bg-amber-700/[0.08] blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-12">
        {/* Top strip */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img src="/avarent-logo.png" alt="Avarent" width={32} height={32} className="h-8 w-8" />
            <span className="text-sm font-semibold tracking-tight text-white/80">Avarent</span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-white/40 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>
        </div>

        {/* Hero */}
        <div className="mx-auto mt-16 max-w-3xl text-center md:mt-24">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span className="font-mono text-[11px] uppercase tracking-wider text-amber-300/90">
              Pilot Program · Free for 3 months
            </span>
          </div>
          <h1 className="bg-gradient-to-b from-white via-white to-white/55 bg-clip-text text-4xl font-semibold leading-[1.08] tracking-tight text-transparent md:text-6xl">
            Run Avarent free for three months.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
            Avarent is a fully-built, production platform for fair-lending compliance. We&apos;re
            inviting a small group of lenders to run it as design partners — you get the whole
            product and hands-on onboarding, we get your feedback to make it sharper.
          </p>
        </div>

        {/* What you get / What we ask */}
        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-amber-400/90">
              What you get
            </h2>
            <ul className="mt-5 space-y-3">
              {getItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 md:p-8">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">
              What we ask
            </h2>
            <ul className="mt-5 space-y-3">
              {askItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                  <span className="text-sm leading-relaxed text-white/70">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16 md:mt-24">
          <h2 className="text-center text-sm font-semibold uppercase tracking-wider text-white/50">
            How it works
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
                    <step.icon className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="font-mono text-[11px] text-white/30">0{i + 1}</span>
                </div>
                <h3 className="mt-4 text-base font-medium text-white">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/50">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mx-auto mt-16 max-w-lg md:mt-24">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] md:p-8">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold text-white">Start your free pilot</h2>
              <p className="mt-1.5 text-sm text-white/50">
                Tell us where to reach you, then create your organization.
              </p>
            </div>
            <PilotSignup />
          </div>
          <p className="mt-5 text-center text-sm text-white/40">
            Prefer to talk first?{" "}
            <a
              href="#"
              {...CAL_DATA}
              className="text-amber-400/90 underline-offset-4 transition-colors hover:text-amber-300 hover:underline"
            >
              Book a demo instead
            </a>
          </p>
        </div>

        {/* Reassurance footer */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/[0.06] pt-8 md:mt-24">
          <div className="flex items-center gap-2 text-white/40">
            <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
            <span className="font-mono text-[10px] uppercase tracking-wide md:text-[11px]">
              No direct model access required
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/40">
            <Lock className="h-3.5 w-3.5 shrink-0 text-amber-500/70" />
            <span className="font-mono text-[10px] uppercase tracking-wide md:text-[11px]">
              No raw PII storage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
