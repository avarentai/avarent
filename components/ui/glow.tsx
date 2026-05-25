import { cn } from "@/lib/utils";

interface GlowProps {
  variant?: "top" | "bottom";
  className?: string;
}

function Glow({ variant = "top", className }: GlowProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-1/2 -translate-x-1/2 select-none",
        variant === "top" && "-top-20",
        variant === "bottom" && "-bottom-20",
        className
      )}
    >
      <div className="h-56 w-[600px] rounded-full bg-gradient-to-r from-amber-500/20 via-orange-500/35 to-amber-500/20 blur-[80px] md:w-[900px]" />
    </div>
  );
}

export { Glow };
