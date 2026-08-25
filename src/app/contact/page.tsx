import type { Metadata } from "next";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { AuditForm } from "@/components/forms/audit-form";
import { ECOSYSTEM_LAYERS, AUDIT } from "@/constants/brand";
import { IMAGES, SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Book a Digital Growth Audit",
  description:
    "Book a Solveek Digital Growth Audit. We review your digital presence, visibility, customer journey and systems to show where to focus first.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden pt-28 pb-12 text-white md:pt-32 md:pb-14">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="contact-header-media absolute inset-0">
            <Image
              src={IMAGES.contactHeader}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/35" />
          <div className="contact-header-glow absolute inset-0" />
        </div>

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
