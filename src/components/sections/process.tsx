import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { ProcessStep } from "@/types";

export function Process({ items }: { items: ProcessStep[] }) {
  return (
    <section className="relative isolate overflow-hidden px-6 py-10 md:py-12">
      <Image
        src="/images/process-tech-bg.jpg"
        alt=""
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-navy/82" />
      <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/75 to-[#0A1A3A]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(19,88,254,0.32),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(77,130,255,0.18),transparent_35%)]" />

      <div className="container-premium relative">
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <h2 className="font-heading text-2xl leading-tight text-white sm:text-3xl">
            A clear path from discovery to launch and beyond
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
            Structured enough for stakeholder alignment. Flexible enough for
            real product decisions.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((step, index) => (
            <Reveal key={step.step} delay={Math.min(index * 0.04, 0.24)}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-royal/50 hover:bg-white/14">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="font-heading text-3xl leading-none text-cyan transition group-hover:text-white">
                    {String(step.step).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                </div>
                <h3 className="font-heading text-lg text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
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
