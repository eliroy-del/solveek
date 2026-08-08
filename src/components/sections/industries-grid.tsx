import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { industries } from "@/constants/data";
import { getIcon } from "@/lib/icons";

export function IndustriesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "py-8" : "section-padding"}>
      <div className="container-premium relative">
        {!compact ? (
          <SectionHeading
            eyebrow="Solutions"
            title="Accelerate innovation with world-class digital expertise"
            description="Whether you are launching a brand, scaling a store, or shipping a SaaS product—we tailor delivery to your industry and growth stage."
            className="mb-14"
          />
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry, index) => {
            const Icon = getIcon(industry.icon);
            return (
              <Reveal key={industry.slug} delay={Math.min(index * 0.04, 0.28)}>
                <Link
                  href="/industries"
                  className="group flex h-full flex-col rounded-3xl border border-border bg-white p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
                >
                  <Icon className="mb-4 size-5 text-royal transition-transform group-hover:scale-110" />
                  <h3 className="font-heading text-base text-navy">{industry.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
