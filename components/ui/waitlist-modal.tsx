"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setStatus("idle");
      setEmail("");
      setErrorMsg("");
    };
    window.addEventListener("open-waitlist", handler);
    return () => window.removeEventListener("open-waitlist", handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Panel */}
      <div className="relative z-10 w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {status === "success" ? (
          <div className="text-center space-y-3 py-4">
            <div className="text-2xl">✓</div>
            <h2 className="text-lg font-semibold text-white">You&apos;re on the list.</h2>
            <p className="text-sm text-white/50 leading-relaxed">
              We&apos;ll reach out when your pilot access is ready. Check your inbox for a confirmation.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 space-y-1.5">
              <h2 className="text-xl font-semibold text-white">Join the Waitlist</h2>
              <p className="text-sm text-white/50 leading-relaxed">
                Get early access to the Avarent evidence packet pilot.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="waitlist-email" className="text-xs font-medium text-white/60 uppercase tracking-wider">
                  Work email
                </label>
                <input
                  ref={inputRef}
                  id="waitlist-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@institution.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                />
              </div>

              {status === "error" && (
                <p className="text-xs text-red-400">{errorMsg}</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-white text-black text-sm font-medium rounded-lg py-2.5 hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Submitting…" : "Request Access"}
              </button>

              <p className="text-xs text-white/30 text-center">
                No spam. Just pilot access when it&apos;s ready.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
