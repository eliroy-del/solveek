import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import type { ProcessStep } from "@/types";

export function Process({ items }: { items: ProcessStep[] }) {
  return (
    <section className="relative isolate overflow-hidden px-6 py-10 md:py-12">
      <Image
        src="/images/service-maintenance-support.png"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-navy/88" />
      <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/80 to-navy/92" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(19,88,254,0.28),transparent_42%)]" />

      <div className="container-premium relative">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="font-heading text-2xl leading-tight text-white sm:text-3xl">
            A clear path from discovery to launch and beyond
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Structured enough for stakeholder alignment. Flexible enough for
            real product decisions.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-royal via-cyan to-royal/20 md:left-1/2" />
          <div className="space-y-4">
            {items.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.04}>
                <div
                  className={`relative grid gap-3 md:grid-cols-2 md:gap-8 ${
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
                      className={`inline-flex rounded-2xl border border-white/10 bg-white p-4 shadow-lift ${
                        index % 2 === 1 ? "" : "md:ml-auto"
                      }`}
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-royal">
                          Step {step.step}
                        </p>
                        <h3 className="mt-1.5 font-heading text-lg text-navy">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-5 top-6 flex size-2.5 -translate-x-1/2 items-center justify-center md:left-1/2">
                    <span className="size-2.5 rounded-full bg-royal ring-4 ring-navy/90" />
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""} />
                </div>
                {index < items.length - 1 ? (
                  <div className="flex justify-center py-0.5 text-cyan/50 md:hidden">
                    <ArrowDown className="size-3.5" />
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
