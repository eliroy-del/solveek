import { CAPABILITIES } from "@/constants/brand";

export function CapabilitiesSection() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
            Capabilities
          </p>
          <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.25rem)] leading-tight text-navy">
            What we build
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Five capabilities inside one growth system — not five disconnected
            service lines.
          </p>
        </div>

        <div className="mt-14 divide-y divide-border border-y border-border">
          {CAPABILITIES.map((item, index) => (
            <div
              key={item.title}
              className="grid gap-4 py-8 md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:items-baseline md:gap-12"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-sm text-royal/80">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-xl text-navy md:text-2xl">
                  {item.title}
                </h3>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
