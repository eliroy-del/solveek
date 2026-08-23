import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { AuditForm } from "@/components/forms/audit-form";
import { ECOSYSTEM_LAYERS, AUDIT, BRAND } from "@/constants/brand";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Book a Digital Growth Audit",
  description:
    "Book a Solveek Digital Growth Audit. We assess your digital presence, visibility, customer journey and systems to identify high-impact opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-navy pt-32 pb-16 text-white md:pt-40 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 10%, rgba(19,88,254,0.4), transparent 45%)",
          }}
        />
        <div className="container-premium relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            {BRAND.primaryCta.label}
          </p>
          <h1 className="mt-5 font-heading text-[clamp(2.25rem,4.5vw,3.5rem)] leading-[1.08] text-white">
            {AUDIT.contactHeadline}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            {AUDIT.contactBody}
          </p>
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <aside className="space-y-8">
            <div className="rounded-2xl bg-navy p-7 text-white md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan">
                Where do you need help?
              </p>
              <ul className="mt-6 space-y-5">
                {ECOSYSTEM_LAYERS.map((layer) => (
                  <li key={layer.id}>
                    <p className="font-heading text-lg text-white">
                      {layer.title}
                    </p>
                    <p className="mt-1 text-sm text-white/60">{layer.headline}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 border-t border-white/10 pt-6 text-sm text-white/70">
                Not sure? Let us assess it — that&apos;s what the audit is for.
              </p>
            </div>

            <div className="space-y-3 rounded-2xl border border-border bg-white p-6">
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 text-sm text-navy transition hover:text-royal"
              >
                <Phone className="size-4 text-royal" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-3 text-sm text-navy transition hover:text-royal"
              >
                <Mail className="size-4 text-royal" />
                {SITE.email}
              </a>
            </div>
          </aside>

          <div className="rounded-[1.5rem] border border-border bg-white p-6 shadow-soft md:p-9">
            <h2 className="font-heading text-2xl text-navy">
              Request your audit
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Share a few details so we can prepare a focused conversation.
            </p>
            <div className="mt-8">
              <AuditForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
