import { ArrowDown } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import type { ProcessStep } from "@/types";

export function Process({ items }: { items: ProcessStep[] }) {
  return (
    <section className="section-padding bg-navy">
      <div className="container-premium">
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from discovery to launch and beyond"
          description="Structured enough for stakeholder alignment. Flexible enough for real product decisions."
          align="center"
          light
          className="mb-14"
        />
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute bottom-0 left-6 top-0 w-px bg-gradient-to-b from-royal via-cyan to-royal/20 md:left-1/2" />
          <div className="space-y-8">
            {items.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.05}>
                <div
                  className={`relative grid gap-4 md:grid-cols-2 md:gap-10 ${
                    index % 2 === 1 ? "md:text-right" : ""
                  }`}
                >
                  <div
                    className={`${
                      index % 2 === 1
                        ? "md:order-2 md:text-left"
                        : "md:text-right"
                    }`}
                  >
                    <div
                      className={`inline-flex rounded-3xl border border-white/10 bg-white p-6 shadow-lift ${
                        index % 2 === 1 ? "" : "md:ml-auto"
                      }`}
                    >
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
                          Step {step.step}
                        </p>
                        <h3 className="mt-2 font-heading text-xl text-navy">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-6 top-8 flex size-3 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <span className="size-3 rounded-full bg-royal ring-4 ring-navy" />
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""} />
                </div>
                {index < items.length - 1 ? (
                  <div className="flex justify-center py-1 text-cyan/50 md:hidden">
                    <ArrowDown className="size-4" />
                  </div>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
