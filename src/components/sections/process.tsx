import { Reveal } from "@/components/ui/reveal";
import type { ProcessStep } from "@/types";

export function Process({ items }: { items: ProcessStep[] }) {
  return (
    <section className="relative isolate overflow-hidden bg-navy px-6 py-10 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 35%, transparent 78%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-royal/30 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-cyan/20 blur-3xl"
      />

      <div className="container-premium relative">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <h2 className="font-heading text-2xl leading-tight text-white sm:text-3xl">
            A clear path from discovery to launch and beyond
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/65 sm:text-base">
            Structured enough for stakeholder alignment. Flexible enough for
            real product decisions.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((step, index) => (
            <Reveal key={step.step} delay={Math.min(index * 0.04, 0.24)}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-royal/40 hover:bg-white/[0.07]">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-heading text-3xl leading-none text-royal/80 transition group-hover:text-cyan">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
                </div>
                <h3 className="font-heading text-lg text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
