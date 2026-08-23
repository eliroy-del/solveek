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
      <section className="relative overflow-hidden gradient-navy pt-32 pb-20 text-white md:pt-40 md:pb-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 70% 20%, rgba(19,88,254,0.35), transparent 50%)",
          }}
        />
        <div className="container-premium relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            {BRAND.category}
          </p>
          <h1 className="mt-5 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white">
            The Solveek Growth Ecosystem
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            One connected ecosystem for your digital presence, business systems
            and growth. Enter where you need help most — Foundation, Automation,
            or Visibility.
          </p>
          <div className="mt-10">
            <CtaButton href={BRAND.primaryCta.href} showArrow>
              {BRAND.primaryCta.label}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-10">
        <div className="container-premium flex flex-wrap gap-3">
          {ECOSYSTEM_LAYERS.map((layer) => (
            <a
              key={layer.id}
              href={`#${layer.id}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-navy/80 transition hover:border-royal/30 hover:text-navy"
            >
              {layer.number} {layer.title}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium mb-10 max-w-2xl">
          <p className="text-lg text-muted-foreground">
            Foundation → Automation → Visibility → Measure → Optimize → Scale.
            Solveek can enter at different points depending on your maturity —
            without forcing every capability on every client.
          </p>
        </div>

        <div className="container-premium space-y-16">
          {ECOSYSTEM_LAYERS.map((layer) => (
            <article
              key={layer.id}
              id={layer.id}
              className="scroll-mt-28 grid gap-8 rounded-[1.5rem] border border-border bg-white p-8 shadow-soft md:p-10 lg:grid-cols-[0.4fr_0.6fr]"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
                  {layer.number} — {layer.verb}
                </p>
                <h2 className="mt-3 font-heading text-3xl text-navy md:text-4xl">
                  {layer.title}
                </h2>
                <p className="mt-3 text-lg font-medium text-navy/80">
                  {layer.headline}
                </p>
              </div>
              <div>
                <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                  {layer.description}
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {layer.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="rounded-xl border border-border bg-surface px-4 py-3 text-sm font-medium text-navy"
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
