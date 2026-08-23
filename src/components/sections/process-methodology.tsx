import { PROCESS_STEPS } from "@/constants/brand";

export function ProcessMethodology() {
  return (
    <section className="relative overflow-hidden gradient-navy text-white section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(19,88,254,0.35), transparent 50%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "auto, 48px 48px, 48px 48px",
        }}
      />

      <div className="container-premium relative">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
            How we work
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.25rem)] leading-tight text-white">
            From digital gaps to growth infrastructure.
          </h2>
        </div>

        <ol className="mt-14 grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.step}
              className="relative border-t border-white/10 py-8 pr-4 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-6 lg:pr-4 lg:pt-0 first:lg:border-l-0 first:lg:pl-0"
            >
              <span className="font-heading text-4xl text-royal/80">
                {step.step}
              </span>
              <h3 className="mt-4 font-heading text-xl text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
              {index < PROCESS_STEPS.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute -right-1 top-10 hidden text-cyan/50 lg:block"
                >
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
