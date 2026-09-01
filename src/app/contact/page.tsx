import dynamic from "next/dynamic";
import { Mail, Phone } from "lucide-react";
import { HeaderBackground } from "@/components/ui/header-background";
import { StructuredData } from "@/components/seo/structured-data";
import { ECOSYSTEM_LAYERS, AUDIT } from "@/constants/brand";
import { SITE } from "@/constants/site";
import {
  buildBreadcrumbs,
  createPageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const AuditForm = dynamic(
  () =>
    import("@/components/forms/audit-form").then((m) => m.AuditForm),
  {
    loading: () => (
      <div className="skeleton min-h-[28rem] rounded-xl" aria-hidden />
    ),
  }
);

const contactDescription =
  "Book a Solveek Digital Growth Audit. We review your digital presence, visibility, customer journey and systems to show where to focus first.";

export const metadata = createPageMetadata({
  title: "Book a Digital Growth Audit",
  description: contactDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Book a Digital Growth Audit",
            description: contactDescription,
            path: "/contact",
          }),
          buildBreadcrumbs([
            { name: "Home", path: "/" },
            { name: "Contact" },
          ]),
          {
            "@type": "Service",
            name: "Digital Growth Audit",
            description: contactDescription,
            url: `${SITE.url}/contact`,
            provider: { "@id": `${SITE.url}/#organization` },
            areaServed: { "@type": "Country", name: "Ghana" },
          },
        ]}
      />
      <section className="relative isolate overflow-hidden pt-28 pb-12 text-white md:pt-32 md:pb-14">
        <HeaderBackground
          mediaClassName="contact-header-media"
          glowClassName="contact-header-glow"
          objectPosition="object-center"
        />

        <div className="container-premium relative max-w-2xl">
          <h1 className="title-page text-white">{AUDIT.contactHeadline}</h1>
          <p className="mt-4 body-md text-white/70">
            {AUDIT.contactBody}
          </p>
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <aside className="space-y-5">
            <div className="rounded-xl bg-navy p-5 text-white md:p-6">
              <p className="eyebrow text-cyan">Where do you need help?</p>
              <ul className="mt-4 space-y-4">
                {ECOSYSTEM_LAYERS.map((layer) => (
                  <li key={layer.id}>
                    <p className="font-heading text-base text-white">
                      {layer.title}
                    </p>
                    <p className="mt-0.5 text-sm text-white/60">
                      {layer.headline}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-white/10 pt-4 text-sm text-white/70">
                Not sure? That is fine. The audit is built for that.
              </p>
            </div>

            <div className="space-y-2.5 rounded-xl border border-border bg-white p-4">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 text-sm text-navy transition-ui hover:text-royal"
              >
                <Phone className="size-3.5 text-royal" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-sm text-navy transition-ui hover:text-royal"
              >
                <Mail className="size-3.5 text-royal" />
                {SITE.email}
              </a>
            </div>
          </aside>

          <div className="rounded-xl border border-border bg-white p-5 shadow-soft md:p-7">
            <h2 className="font-heading text-xl text-navy">Request your audit</h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              A few details help us prepare a useful conversation.
            </p>
            <div className="mt-5">
              <AuditForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
