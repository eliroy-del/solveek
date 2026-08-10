import { SectionHeading } from "@/components/ui/section-heading";
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
    <section className={compact ? "py-8" : "section-padding"}>
      <div className="container-premium relative">
        {!compact ? (
          <SectionHeading
            title="Accelerate innovation with world-class digital expertise"
            description="Whether you are launching a brand, scaling a store, or shipping a SaaS product, we tailor delivery to your industry and growth stage."
            className="mb-14"
          />
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((industry, index) => {
            const Icon = getIcon(industry.icon);
            return (
              <Reveal key={industry.slug} delay={Math.min(index * 0.04, 0.28)}>
                <article className="flex h-full flex-col rounded-3xl border border-border bg-white p-5 shadow-soft">
                  <Icon className="mb-4 size-5 text-royal" />
                  <h3 className="font-heading text-base text-navy">{industry.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
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
