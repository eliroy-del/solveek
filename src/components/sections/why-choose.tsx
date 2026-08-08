"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { getIcon } from "@/lib/icons";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

type WhyItem = {
  title: string;
  description: string;
  icon: string;
};

export function WhyChoose({ items }: { items: WhyItem[] }) {
  const ref = useGsapReveal<HTMLDivElement>();

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Why SOLVEEK"
          title="Digital partnership without the operational fog"
          description="Clarity in every decision. Craft in every interface. Accountability from brief to launch."
          align="center"
          className="mb-14"
        />
        <div ref={ref} className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <article
                key={item.title}
                data-gsap-item
                className="group h-full rounded-3xl border border-border bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lift"
              >
                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl bg-white text-royal shadow-soft transition group-hover:gradient-royal group-hover:text-white">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-heading text-lg text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
