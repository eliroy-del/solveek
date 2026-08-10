import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { PremiumButton } from "@/components/ui/premium-button";
import { cn } from "@/lib/utils";
import type { ServicePackage } from "@/types";

export function ServicePackages({
  items,
  quoteService = "Website Design",
  eyebrow = "Packages",
  title = "Packages built for clear outcomes",
  description = "Choose a starting point that matches your scope. Every package includes discovery, design, and a production-ready build.",
}: {
  items: ServicePackage[];
  quoteService?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  if (!items.length) return null;

  return (
    <section className="section-padding relative overflow-hidden bg-[#F3F6FC]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 10% 10%, rgba(19,88,254,0.1), transparent 55%), radial-gradient(ellipse 45% 40% at 90% 90%, rgba(77,130,255,0.1), transparent 50%)",
        }}
      />
      <div className="container-premium relative">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
          className="mb-10"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {items.map((pkg, index) => (
            <Reveal key={pkg.name} delay={Math.min(index * 0.08, 0.24)}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-lift",
                  pkg.highlighted
                    ? "border-royal/30 bg-white ring-1 ring-royal/20"
                    : "border-border bg-white/90"
                )}
              >
                {pkg.highlighted ? (
                  <span className="absolute -top-2.5 left-5 rounded-full bg-royal px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Most popular
                  </span>
                ) : null}

                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-royal">
                  {pkg.name}
                </p>
                <h3 className="mt-2 font-heading text-xl text-navy">
                  {pkg.tagline}
                </h3>
                <div className="mt-3 flex items-baseline gap-1.5">
                  <span className="font-heading text-2xl text-navy sm:text-3xl">
                    {pkg.price}
                  </span>
                  {pkg.priceNote ? (
                    <span className="text-sm text-muted-foreground">
                      {pkg.priceNote}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {pkg.description}
                </p>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-navy/80"
                    >
                      <Check className="mt-0.5 size-3.5 shrink-0 text-royal" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <PremiumButton
                    href={`/quote?service=${encodeURIComponent(quoteService)}&package=${encodeURIComponent(pkg.name)}`}
                    showArrow
                    variant={pkg.highlighted ? "primary" : "secondary"}
                    className="w-full"
                  >
                    {pkg.cta}
                  </PremiumButton>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Need something larger, such as a marketplace or multi-brand system?{" "}
            <a href="/contact" className="font-semibold text-royal hover:underline">
              Talk to us for a custom proposal
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
