import { cn } from "@/lib/utils";

interface MockupFrameProps {
  children: React.ReactNode;
  className?: string;
  size?: "small" | "large";
}

function MockupFrame({ children, className, size = "large" }: MockupFrameProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-neutral-900 shadow-2xl overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center gap-1.5 border-b border-white/10 bg-neutral-950/50",
          size === "small" ? "px-3 py-2" : "px-4 py-3"
        )}
      >
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        <div className="ml-2 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/30 max-w-[200px]">
          app.example.com
        </div>
      </div>
      {children}
    </div>
  );
}

interface MockupProps {
  children: React.ReactNode;
  type?: "responsive" | "browser";
}

function Mockup({ children, type = "responsive" }: MockupProps) {
  return (
    <div className={cn("overflow-hidden", type === "browser" && "rounded-b-lg")}>
      {children}
    </div>
  );
}

export { Mockup, MockupFrame };
