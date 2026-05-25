import { motion } from "motion/react";
import { Eye, ShieldCheck, GitBranch, Zap } from "lucide-react";
import { SolutionDashboard } from "@/components/ui/solution-dashboard";
import { ScaledMockup } from "@/components/ui/scaled-mockup";

export function SolutionFeatures() {
  return (
    <section className="py-16 md:py-32 bg-background text-foreground">
      <div className="mx-auto max-w-5xl space-y-12 px-6">
        <motion.div
          className="relative z-10 grid items-center gap-4 md:grid-cols-2 md:gap-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="text-4xl font-semibold tracking-tight">
            The decision records are there. The analysis is not.
          </h2>
          <p className="max-w-sm sm:ml-auto text-muted-foreground">
            Avarent surfaces which analyses can run on your current data, calculates disparity metrics in real time, and compiles the evidence packet before the exam starts.
          </p>
        </motion.div>

        <div className="relative rounded-3xl p-3 md:-mx-8">
          <div className="relative overflow-hidden rounded-2xl h-auto">
            <div className="bg-gradient-to-t z-20 from-background absolute bottom-0 left-0 right-0 h-16 pointer-events-none" />
            <ScaledMockup designWidth={900}>
              <SolutionDashboard />
            </ScaledMockup>
          </div>
        </div>

        <div className="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4">
          {[
            { icon: <Eye className="size-4" />, title: "Know what analysis is possible", desc: "Analysis readiness scoring surfaces which statistical analyses can run on current data fields and which are blocked — before the team presents to leadership." },
            { icon: <ShieldCheck className="size-4" />, title: "Disparity at the four-fifths threshold", desc: "Calculates approval-rate disparity and the disparate impact ratio with plain-language labels alongside technical outputs." },
            { icon: <GitBranch className="size-4" />, title: "Adverse action that holds up to Reg B", desc: "Validates reason-code completeness and specificity across decline cohorts against CFPB Circular 2023-03 requirements." },
            { icon: <Zap className="size-4" />, title: "The exam package, prebuilt", desc: "Cohort context, open findings, methodology references, and limitations compiled into a format structured for MRM and fair-lending exam teams." },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              className="space-y-2"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
            >
              <div className="flex items-center gap-2">
                {f.icon}
                <h3 className="text-sm font-medium">{f.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
