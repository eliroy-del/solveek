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
    <section className="section-padding relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#F3F6FC]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 55% at 8% 12%, rgba(19,88,254,0.14), transparent 55%), radial-gradient(ellipse 55% 50% at 92% 88%, rgba(77,130,255,0.12), transparent 50%), radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,15,31,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(10,15,31,0.035) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 85% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(19,88,254,0.18),transparent_68%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(77,130,255,0.14),transparent_70%)] blur-2xl"
      />

      <div className="container-premium relative">
        {showHeading ? (
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Services"
              title="Digital capabilities that turn ideas into working products"
              description="From brand websites and social systems to e-commerce and search growth, SOLVEEK delivers design and technology as one connected practice."
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

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((service, index) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.slug} delay={Math.min(index * 0.05, 0.3)}>
                <Link
                  href={`/services/${service.slug}`}
                  className={cn(
                    "group relative flex h-full flex-col rounded-2xl border border-white/80 bg-white/90 p-5 shadow-soft backdrop-blur-sm transition-all duration-300",
                    "hover:-translate-y-1 hover:border-royal/20 hover:shadow-lift"
                  )}
                >
                  <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-surface text-royal transition-colors group-hover:gradient-royal group-hover:text-white">
                    <Icon className="size-4 transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <h3 className="font-heading text-lg text-navy">{service.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
