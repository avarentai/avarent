"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Floating top-right call-to-action that funnels visitors into the pilot.
 * Mounted per-page (home) rather than in the root layout so it does not
 * appear on /pilot itself, where the page already carries the CTA.
 */
export function PilotFab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
      className="fixed top-4 right-4 z-40"
    >
      <Button
        variant="glow"
        size="lg"
        asChild
        className="rounded-full shadow-[0_8px_30px_-8px_rgba(245,158,11,0.35)] hover:border-amber-500/40 hover:ring-1 hover:ring-amber-500/30"
      >
        <Link href="/pilot" className="flex items-center gap-2">
          Start free pilot
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </motion.div>
  );
}
