import { ECOSYSTEM_LAYERS } from "@/constants/brand";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { AuditCta } from "@/components/sections/audit-cta";
import { HeaderBackground } from "@/components/ui/header-background";
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
        <HeaderBackground
          mediaClassName="ecosystem-header-media"
          glowClassName="ecosystem-header-glow"
          objectPosition="object-center"
        />

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
                ? "border-transparent bg-royal text-white hover:bg-royal-deep"
                : layer.id === "automation"
                  ? "border-transparent bg-cyan text-white hover:bg-[#3A6FE6]"
                  : "border-transparent bg-emerald-600 text-white hover:bg-emerald-700";

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
                    card: "border-transparent bg-royal text-white",
                    label: "text-white/70",
                    title: "text-white",
                    headline: "text-white/85",
                    body: "text-white/75",
                    pill: "border-white/20 bg-white/15 text-white",
                  }
                : layer.id === "automation"
                  ? {
                      card: "border-transparent bg-cyan text-white",
                      label: "text-white/70",
                      title: "text-white",
                      headline: "text-white/85",
                      body: "text-white/75",
                      pill: "border-white/20 bg-white/15 text-white",
                    }
                  : {
                      card: "border-transparent bg-emerald-600 text-white",
                      label: "text-white/70",
                      title: "text-white",
                      headline: "text-white/85",
                      body: "text-white/75",
                      pill: "border-white/20 bg-white/15 text-white",
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
                  <h2
                    className={`mt-2 font-heading text-xl md:text-2xl ${tone.title}`}
                  >
                    {layer.title}
                  </h2>
                  <p className={`mt-1.5 text-sm font-medium ${tone.headline}`}>
                    {layer.headline}
                  </p>
                </div>
                <div>
                  <p className={`text-sm leading-relaxed ${tone.body}`}>
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
