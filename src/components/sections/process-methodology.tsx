import { PROCESS_STEPS } from "@/constants/brand";

export function ProcessMethodology() {
  return (
    <section className="relative overflow-hidden gradient-navy text-white section-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 0%, rgba(19,88,254,0.3), transparent 50%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "auto, 48px 48px, 48px 48px",
        }}
      />

      <div className="container-premium relative">
        <div className="max-w-xl">
          <h2 className="title-section text-white">
            From digital gaps to growth infrastructure.
          </h2>
        </div>

        <ol className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-5">
          {PROCESS_STEPS.map((step) => (
            <li
              key={step.step}
              className="relative border-t border-white/10 py-6 pr-3 lg:border-t-0 lg:border-l lg:border-white/10 lg:pl-5 lg:pr-3 lg:pt-0 first:lg:border-l-0 first:lg:pl-0"
            >
              <h3 className="font-heading text-base text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
