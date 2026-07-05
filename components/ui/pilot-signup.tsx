"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMSUBMIT_EMAIL = "george@avarent.app";

// Where a captured lead is sent after signing up. Single source of truth so it
// can be swapped for a custom domain (e.g. https://app.avarent.app) later.
const PRODUCT_URL = "https://avarent.onrender.com";

interface PilotForm {
  email: string;
  name: string;
  company: string;
}

const emptyForm: PilotForm = { email: "", name: "", company: "" };

/**
 * Pilot email capture. Records the lead via FormSubmit (same transport as
 * ContactSalesModal — no API key / infra needed), then forwards the visitor to
 * the product where WorkOS handles sign-in and self-serve org creation.
 * A capture failure never blocks entry: the "Continue to Avarent" link is always
 * exposed once submitted.
 */
export function PilotSignup() {
  const [form, setForm] = useState<PilotForm>(emptyForm);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const updateField = (field: keyof PilotForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          company: form.company,
          _subject: "Avarent — New pilot signup",
          _template: "table",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }

      // TODO (optional): also POST to /api/waitlist for a branded confirmation
      // email to the applicant — requires RESEND_API_KEY set on Render.
      setStatus("success");
    } catch (err: unknown) {
      // Capture failed, but never trap the user — surface the continue link anyway.
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (status === "success" || status === "error") {
    return (
      <div className="space-y-4 text-center">
        {status === "success" ? (
          <>
            <div className="text-2xl text-amber-400">✓</div>
            <h3 className="text-lg font-semibold text-white">You&apos;re in.</h3>
            <p className="text-sm leading-relaxed text-white/50">
              Continue to Avarent to create your organization. We&apos;ll be in touch to help you
              get set up.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-white">Let&apos;s get you started.</h3>
            <p className="text-sm leading-relaxed text-white/50">
              {errorMsg} You can still continue to Avarent below.
            </p>
          </>
        )}
        <Button variant="default" size="lg" asChild className="w-full">
          <a href={PRODUCT_URL} className="flex items-center justify-center gap-2">
            Continue to Avarent
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="space-y-1.5">
        <label
          htmlFor="pilot-email"
          className="text-xs font-medium uppercase tracking-wider text-white/60"
        >
          Work email
        </label>
        <input
          id="pilot-email"
          type="email"
          required
          value={form.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="you@institution.com"
          className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="pilot-name"
            className="text-xs font-medium uppercase tracking-wider text-white/60"
          >
            Name <span className="text-white/25">(optional)</span>
          </label>
          <input
            id="pilot-name"
            type="text"
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Jane Smith"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="pilot-company"
            className="text-xs font-medium uppercase tracking-wider text-white/60"
          >
            Institution <span className="text-white/25">(optional)</span>
          </label>
          <input
            id="pilot-company"
            type="text"
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="Your bank or fintech"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 transition-colors focus:border-white/30 focus:outline-none"
          />
        </div>
      </div>

      <Button
        type="submit"
        variant="default"
        size="lg"
        disabled={status === "loading"}
        className="w-full"
      >
        {status === "loading" ? "Setting up…" : "Start free pilot"}
      </Button>

      <p className="text-center text-xs text-white/30">
        Free for 3 months. No card required. You&apos;ll create your organization on the next step.
      </p>
    </form>
  );
}
