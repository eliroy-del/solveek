import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Reveal } from "@/components/ui/reveal";
import type { Stat } from "@/types";

export function Stats({ items }: { items: Stat[] }) {
  return (
    <section className="section-padding gradient-navy">
      <div className="container-premium">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            Performance
          </p>
          <h2 className="font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
            Results that prove the craft is working.
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-8 text-center backdrop-blur">
                <p className="font-heading text-4xl text-white lg:text-5xl">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.decimals ?? 0}
                  />
                </p>
                <p className="mt-3 text-sm text-white/65">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
