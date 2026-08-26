import Image from "next/image";
import { ECOSYSTEM_LAYERS } from "@/constants/brand";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { AuditCta } from "@/components/sections/audit-cta";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Growth Ecosystem",
  description:
    "The Solveek Growth Ecosystem connects Foundation, Automation and Visibility so businesses can build, connect and grow with one digital partner.",
  path: "/ecosystem",
});

export default function EcosystemPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-14 text-white md:pt-32 md:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="ecosystem-header-media absolute inset-0">
            <Image
              src="/images/ecosystem-header.png"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/35" />
          <div className="ecosystem-header-glow absolute inset-0" />
        </div>

        <div className="container-premium relative max-w-2xl">
          <h1 className="title-page text-white">
            The Solveek Growth Ecosystem
          </h1>
          <p className="mt-4 body-md text-white/70">
            Deep dive: how Foundation, Automation, and Visibility work together.
            Start where you need help most.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-white py-6">
        <div className="container-premium flex flex-wrap gap-2">
          {ECOSYSTEM_LAYERS.map((layer) => (
            <a
              key={layer.id}
              href={`#${layer.id}`}
              className="rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-navy/80 transition-ui hover:border-royal/30 hover:text-navy"
            >
              {layer.number} {layer.title}
            </a>
          ))}
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium mb-8 max-w-xl">
          <p className="text-sm text-muted-foreground md:text-base">
            Foundation, then Automation, then Visibility. After that: measure,
            optimize, and scale. We meet you at the stage that fits your
            business.
          </p>
        </div>

        <div className="container-premium space-y-6">
          {ECOSYSTEM_LAYERS.map((layer) => (
            <article
              key={layer.id}
              id={layer.id}
              className="scroll-mt-24 grid gap-5 rounded-xl border border-border bg-white p-5 md:p-7 lg:grid-cols-[0.38fr_0.62fr]"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-royal">
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
