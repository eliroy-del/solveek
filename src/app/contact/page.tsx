import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { AuditForm } from "@/components/forms/audit-form";
import { ECOSYSTEM_LAYERS, AUDIT, BRAND } from "@/constants/brand";
import { SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Book a Digital Growth Audit",
  description:
    "Book a Solveek Digital Growth Audit. We review your digital presence, visibility, customer journey and systems to show where to focus first.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-navy pt-24 pb-12 text-white md:pt-28 md:pb-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 80% 10%, rgba(19,88,254,0.35), transparent 45%)",
          }}
        />
        <div className="container-premium relative max-w-2xl">
          <p className="eyebrow text-cyan">{BRAND.primaryCta.label}</p>
          <h1 className="mt-3 font-heading text-[clamp(1.75rem,3.8vw,2.5rem)] leading-snug text-white">
            {AUDIT.contactHeadline}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
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
                className="flex items-center gap-2.5 text-sm text-navy transition hover:text-royal"
              >
                <Phone className="size-3.5 text-royal" />
                {SITE.phone}
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-center gap-2.5 text-sm text-navy transition hover:text-royal"
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
