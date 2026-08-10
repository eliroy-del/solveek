import { Reveal } from "@/components/ui/reveal";
import { getIcon } from "@/lib/icons";
import type { Industry } from "@/types";

export function IndustriesGrid({
  items,
  compact = false,
}: {
  items: Industry[];
  compact?: boolean;
}) {
  return (
    <section className={compact ? "py-6" : "px-6 py-8 md:py-10"}>
      <div className="container-premium relative">
        {!compact ? (
          <div className="mb-6 max-w-2xl md:mb-7">
            <h2 className="font-heading text-xl leading-tight text-navy sm:text-2xl">
              Accelerate innovation with world-class digital expertise
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Whether you are launching a brand, scaling a store, or shipping a
              product, we tailor delivery to your industry and growth stage.
            </p>
          </div>
        ) : null}
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((industry, index) => {
            const Icon = getIcon(industry.icon);
            return (
              <Reveal key={industry.slug} delay={Math.min(index * 0.03, 0.2)}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-3.5 shadow-soft">
                  <Icon className="mb-2.5 size-4 text-royal" />
                  <h3 className="font-heading text-sm text-navy">
                    {industry.title}
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
