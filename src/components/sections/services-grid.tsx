import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

type ServicesGridProps = {
  items: Service[];
  limit?: number;
  showHeading?: boolean;
};

export function ServicesGrid({
  items,
  limit,
  showHeading = true,
}: ServicesGridProps) {
  const list = limit ? items.slice(0, limit) : items;

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        {showHeading ? (
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Digital capabilities that turn ideas into working products"
              description="From brand websites and social systems to e-commerce and SaaS platforms, SOLVEEK delivers design and technology as one connected practice."
            />
            <Reveal delay={0.1}>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline"
              >
                Explore all services
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.slug} delay={Math.min(index * 0.05, 0.3)}>
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col rounded-3xl border border-border bg-white p-7 shadow-soft transition-all duration-300",
                    "hover:-translate-y-1 hover:border-royal/20 hover:shadow-lift"
                  )}
                >
                  <div className="mb-6 inline-flex size-12 items-center justify-center rounded-2xl bg-surface text-royal transition-colors group-hover:gradient-royal group-hover:text-white">
                    <Icon className="size-5 transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <h3 className="font-heading text-xl text-navy">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
