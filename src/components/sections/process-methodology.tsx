import { PROCESS_STEPS } from "@/constants/brand";

export function ProcessMethodology() {
  return (
    <section className="relative overflow-hidden gradient-navy text-white section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(19,88,254,0.3), transparent 50%)",
        }}
      />

      <div className="container-premium relative">
        <div className="max-w-xl">
          <p className="eyebrow text-cyan">How we work</p>
          <h2 className="mt-2 font-heading text-[clamp(1.6rem,3.2vw,2.25rem)] leading-snug text-white">
            From digital gaps to growth infrastructure.
          </h2>
        </div>

        <ol className="mt-8 grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.step}
              className="relative border-t border-white/10 py-5 pr-3 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-4 lg:pr-3 lg:pt-0 first:lg:border-l-0 first:lg:pl-0"
            >
              <span className="font-heading text-2xl text-royal/80">
                {step.step}
              </span>
              <h3 className="mt-2 font-heading text-base text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
