import type { Metadata } from "next";
import { CtaButton } from "@/components/ui/cta-button";
import { BRAND, ECOSYSTEM_LAYERS } from "@/constants/brand";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { AuditCta } from "@/components/sections/audit-cta";

export const metadata: Metadata = {
  title: "Growth Ecosystem",
  description:
    "The Solveek Growth Ecosystem connects Foundation, Automation and Visibility so businesses can build, connect and grow with one digital partner.",
  alternates: { canonical: "/ecosystem" },
};

export default function EcosystemPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-navy pt-24 pb-12 text-white md:pt-28 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 20%, rgba(19,88,254,0.3), transparent 50%)",
          }}
        />
        <div className="container-premium relative max-w-2xl">
          <p className="eyebrow text-cyan">{BRAND.category}</p>
          <h1 className="mt-3 font-heading text-[clamp(1.85rem,4vw,2.75rem)] leading-snug text-white">
            The Solveek Growth Ecosystem
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
            One connected setup for your digital presence, business systems, and
            growth. Start where you need help most: Foundation, Automation, or
            Visibility.
          </p>
          <div className="mt-6">
            <CtaButton href={BRAND.primaryCta.href} showArrow>
              {BRAND.primaryCta.label}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-6">
        <div className="container-premium flex flex-wrap gap-2">
          {ECOSYSTEM_LAYERS.map((layer) => (
            <a
              key={layer.id}
              href={`#${layer.id}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy/80 transition hover:border-royal/30 hover:text-navy"
            >
              {layer.number} {layer.title}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium mb-8 max-w-xl">
          <p className="text-sm text-muted-foreground sm:text-base">
            Foundation, then Automation, then Visibility. After that: measure,
            optimize, and scale. We meet you at the stage that fits your
            business, without forcing every capability onto every client.
          </p>
        </div>

        <div className="container-premium space-y-8">
          {ECOSYSTEM_LAYERS.map((layer) => (
            <article
              key={layer.id}
              id={layer.id}
              className="scroll-mt-24 grid gap-5 rounded-xl border border-border bg-white p-5 md:p-7 lg:grid-cols-[0.4fr_0.6fr]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-royal">
                  {layer.number} {layer.verb}
                </p>
                <h2 className="mt-2 font-heading text-xl text-navy md:text-2xl">
                  {layer.title}
                </h2>
                <p className="mt-1.5 text-sm font-medium text-navy/80">
                  {layer.headline}
                </p>
              </div>
              <div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {layer.description}
                </p>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {layer.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="rounded-lg border border-border bg-surface px-3 py-2 text-sm font-medium text-navy"
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CapabilitiesSection />
      <AuditCta />
    </>
  );
}
