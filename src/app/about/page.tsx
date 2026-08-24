import type { Metadata } from "next";
import { CtaButton } from "@/components/ui/cta-button";
import { AuditCta } from "@/components/sections/audit-cta";
import { ABOUT, BRAND, PRINCIPLES } from "@/constants/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Solveek is a digital growth partner. We believe businesses need connected systems, not disconnected digital services.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-navy pt-28 pb-14 text-white md:pt-32 md:pb-16">
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
          <h1 className="mt-3 title-page text-white">{ABOUT.headline}</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
            {ABOUT.subhead}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <CtaButton href={BRAND.primaryCta.href} showArrow>
              {BRAND.primaryCta.label}
            </CtaButton>
            <CtaButton href={BRAND.secondaryCta.href} variant="outline-light">
              {BRAND.secondaryCta.label}
            </CtaButton>
          </div>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-premium max-w-3xl">
          <p className="eyebrow text-royal">Philosophy</p>
          <h2 className="mt-2 title-section text-navy">
            How Solveek thinks about digital growth
          </h2>
          <div className="mt-10 space-y-8">
            {ABOUT.philosophy.map((item, index) => (
              <article
                key={item.title}
                className="border-t border-border pt-8 first:border-t-0 first:pt-0"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-heading text-xs text-royal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-xl text-navy">{item.title}</h3>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium">
          <p className="eyebrow text-royal">Principles</p>
          <h2 className="mt-2 max-w-lg title-section text-navy">
            What shapes every engagement
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <li
                key={principle}
                className="flex min-h-[110px] flex-col justify-between bg-white p-6"
              >
                <span className="font-heading text-xs text-royal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-4 font-heading text-xl leading-snug text-navy">
                  {principle}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <AuditCta />
    </>
  );
}
