import Image from "next/image";
import { ECOSYSTEM_LAYERS } from "@/constants/brand";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { AuditCta } from "@/components/sections/audit-cta";
import { StructuredData } from "@/components/seo/structured-data";
import {
  buildBreadcrumbs,
  createPageMetadata,
  serviceCatalogJsonLd,
  webPageJsonLd,
} from "@/lib/seo";

const ecosystemDescription =
  "The Solveek Growth Ecosystem connects Foundation, Automation and Visibility so businesses can build, connect and grow with one digital partner.";

export const metadata = createPageMetadata({
  title: "Growth Ecosystem",
  description: ecosystemDescription,
  path: "/ecosystem",
});

export default function EcosystemPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Growth Ecosystem",
            description: ecosystemDescription,
            path: "/ecosystem",
          }),
          buildBreadcrumbs([
            { name: "Home", path: "/" },
            { name: "Growth Ecosystem" },
          ]),
          serviceCatalogJsonLd(),
        ]}
      />
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
          {ECOSYSTEM_LAYERS.map((layer) => {
            const chip =
              layer.id === "foundation"
                ? "border-royal/25 bg-[#EEF3FF] text-royal hover:border-royal/40"
                : layer.id === "automation"
                  ? "border-cyan/30 bg-[#E8F4FF] text-[#1A6BDB] hover:border-cyan/50"
                  : "border-emerald-500/25 bg-[#ECF8F1] text-emerald-700 hover:border-emerald-500/40";

            return (
              <a
                key={layer.id}
                href={`#${layer.id}`}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-ui ${chip}`}
              >
                {layer.number} {layer.title}
              </a>
            );
          })}
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
          {ECOSYSTEM_LAYERS.map((layer) => {
            const tone =
              layer.id === "foundation"
                ? {
                    card: "border-royal/20 bg-[#EEF3FF]",
                    label: "text-royal",
                    pill: "border-royal/15 bg-white/80 text-royal-deep",
                  }
                : layer.id === "automation"
                  ? {
                      card: "border-cyan/25 bg-[#E8F4FF]",
                      label: "text-[#1A6BDB]",
                      pill: "border-cyan/20 bg-white/80 text-[#0F4AE0]",
                    }
                  : {
                      card: "border-emerald-500/20 bg-[#ECF8F1]",
                      label: "text-emerald-700",
                      pill: "border-emerald-500/15 bg-white/80 text-emerald-900",
                    };

            return (
              <article
                key={layer.id}
                id={layer.id}
                className={`scroll-mt-24 grid gap-5 rounded-xl border p-5 md:p-7 lg:grid-cols-[0.38fr_0.62fr] ${tone.card}`}
              >
                <div>
                  <p
                    className={`text-[11px] font-semibold uppercase tracking-[0.06em] ${tone.label}`}
                  >
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
                  <p className="text-sm leading-relaxed text-navy/70">
                    {layer.description}
                  </p>
                  <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                    {layer.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium ${tone.pill}`}
                      >
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CapabilitiesSection />
      <AuditCta />
    </>
  );
}
