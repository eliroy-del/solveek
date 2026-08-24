import type { Metadata } from "next";
import { CtaButton } from "@/components/ui/cta-button";
import { AuditCta } from "@/components/sections/audit-cta";
import { ABOUT, BRAND, PRINCIPLES } from "@/constants/brand";

export const metadata: Metadata = {
  title: "About",
  description:
    "Solveek is a digital growth partner. Our mission and vision guide how we help businesses build connected digital systems.",
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

      <section className="bg-white py-14 md:py-16">
        <div className="container-premium">
          <div className="mb-8 max-w-xl">
            <h2 className="title-section text-navy">Mission and vision</h2>
            <p className="mt-2 text-sm text-muted-foreground md:text-base">
              What drives every engagement, and where we are headed.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="relative overflow-hidden rounded-xl bg-navy p-6 text-white md:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-royal/25 blur-2xl"
              />
              <p className="eyebrow relative text-cyan">{ABOUT.mission.title}</p>
              <h3 className="relative mt-3 font-heading text-2xl leading-snug text-white md:text-[1.75rem]">
                {ABOUT.mission.statement}
              </h3>
              <p className="relative mt-4 text-sm leading-relaxed text-white/65 md:text-[0.95rem]">
                {ABOUT.mission.body}
              </p>
            </article>

            <article className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 md:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 size-36 rounded-full bg-royal/10 blur-2xl"
              />
              <p className="eyebrow relative text-royal">{ABOUT.vision.title}</p>
              <h3 className="relative mt-3 font-heading text-2xl leading-snug text-navy md:text-[1.75rem]">
                {ABOUT.vision.statement}
              </h3>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground md:text-[0.95rem]">
                {ABOUT.vision.body}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 md:py-16">
        <div className="container-premium">
          <p className="eyebrow text-royal">Principles</p>
          <h2 className="mt-2 max-w-lg title-section text-navy">
            What shapes every engagement
          </h2>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <li
                key={principle}
                className="flex min-h-[100px] flex-col justify-between bg-white p-5"
              >
                <span className="font-heading text-xs text-royal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 font-heading text-lg leading-snug text-navy">
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
