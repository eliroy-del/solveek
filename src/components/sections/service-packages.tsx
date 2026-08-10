import { Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { PremiumButton } from "@/components/ui/premium-button";
import { cn } from "@/lib/utils";
import type { ServicePackage } from "@/types";

export function ServicePackages({
  items,
  eyebrow = "Packages",
  title = "Website design packages built for clear outcomes",
  description = "Choose a starting point that matches your scope. Every package includes discovery, design, and a production-ready build.",
}: {
  items: ServicePackage[];
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
          className="mb-14"
        />

        <div className="grid gap-6 lg:grid-cols-3">
          {items.map((pkg, index) => (
            <Reveal key={pkg.name} delay={Math.min(index * 0.08, 0.24)}>
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-[28px] border p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift",
                  pkg.highlighted
                    ? "border-royal/30 bg-white ring-1 ring-royal/20"
                    : "border-border bg-white/90"
                )}
              >
                {pkg.highlighted ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-royal px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                    Most popular
                  </span>
                ) : null}

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
                  {pkg.name}
                </p>
                <h3 className="mt-3 font-heading text-2xl text-navy">
                  {pkg.tagline}
                </h3>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-heading text-3xl text-navy sm:text-4xl">
                    {pkg.price}
                  </span>
                  {pkg.priceNote ? (
                    <span className="text-sm text-muted-foreground">
                      {pkg.priceNote}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {pkg.description}
                </p>

                <ul className="mt-7 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-navy/80"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-royal" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <PremiumButton
                    href={`/quote?service=Website%20Design&package=${encodeURIComponent(pkg.name)}`}
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
            Need something larger, such as a platform or multi-brand system?{" "}
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
