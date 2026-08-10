import type { Metadata } from "next";
import { ArrowUpRight, Clock3, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { SocialIconLinks } from "@/components/ui/social-icons";
import { IMAGES, SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SOLVEEK for website design, social media, e-commerce, SaaS, and digital growth projects.",
};

const directLines = [
  {
    label: "Call us",
    value: SITE.phone,
    href: `tel:${SITE.phone}`,
    icon: Phone,
  },
  {
    label: "Email sales",
    value: SITE.salesEmail,
    href: `mailto:${SITE.salesEmail}`,
    icon: Mail,
  },
  {
    label: "Office hours",
    value: "Mon–Fri · 9:00–18:00 local time",
    href: null,
    icon: Clock3,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your next digital move"
        description="Whether you need a new website, a social growth system, an online store, or a SaaS product, our team is ready to help."
        image={IMAGES.office}
      />

      <section className="section-padding relative overflow-hidden bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle at 12% 20%, rgba(19,88,254,0.08), transparent 34%), radial-gradient(circle at 88% 0%, rgba(7,11,20,0.06), transparent 28%)",
          }}
        />

        <div className="container-premium relative grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <Reveal>
            <aside className="flex h-full flex-col justify-between overflow-hidden rounded-[28px] bg-navy p-7 text-white md:p-9">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">
                  Direct lines
                </p>
                <h2 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
                  Prefer to reach us straight away?
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
                  Share a quick brief by phone or email, or send a message and
                  we’ll reply with clear next steps.
                </p>

                <ul className="mt-8 space-y-3">
                  {directLines.map(({ label, value, href, icon: Icon }) => {
                    const content = (
                      <>
                        <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-cyan ring-1 ring-white/10">
                          <Icon className="size-4" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
                            {label}
                          </span>
                          <span className="mt-1 block truncate text-sm font-medium text-white">
                            {value}
                          </span>
                        </span>
                        {href ? (
                          <ArrowUpRight className="size-4 shrink-0 text-white/40 transition group-hover:text-cyan" />
                        ) : null}
                      </>
                    );

                    return (
                      <li key={label}>
                        {href ? (
                          <a
                            href={href}
                            className="group flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10 transition hover:bg-white/10"
                          >
                            {content}
                          </a>
                        ) : (
                          <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10">
                            {content}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
                  Follow SOLVEEK
                </p>
                <SocialIconLinks
                  className="mt-3"
                  linkClassName="inline-flex size-10 items-center justify-center rounded-xl bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
                />
                <p className="mt-5 text-sm text-white/55">
                  Typical response within{" "}
                  <span className="font-semibold text-white">1 business day</span>.
                </p>
              </div>
            </aside>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-[28px] border border-border bg-white p-7 shadow-soft md:p-9">
              <h2 className="font-heading text-3xl text-navy sm:text-4xl">
                Send a message
              </h2>
              <p className="mt-3 mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
                Tell us what you’re building and what success looks like. We’ll
                come back with a clear recommendation.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
