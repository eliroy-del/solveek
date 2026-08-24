import { CAPABILITIES } from "@/constants/brand";

export function CapabilitiesSection() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium">
        <div className="max-w-xl">
          <h2 className="title-section text-navy">What we build</h2>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            Five capabilities inside one growth system, not five separate
            service lines.
          </p>
        </div>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {CAPABILITIES.map((item, index) => (
            <div
              key={item.title}
              className="grid gap-2 py-5 md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] md:items-baseline md:gap-10"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-xs text-royal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-base text-navy md:text-lg">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
