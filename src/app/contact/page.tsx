import type { Metadata } from "next";
import { Clock3, Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { IMAGES, SITE } from "@/constants/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact SOLVEEK for website design, social media, e-commerce, SaaS, and digital growth projects.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about your next digital move"
        description="Whether you need a new website, a social growth system, an online store, or a SaaS product, our team is ready to help."
        image={IMAGES.office}
      />
      <section className="section-padding bg-white">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <Reveal>
            <div className="rounded-[28px] border border-border bg-surface/40 p-6 shadow-soft md:p-8">
              <h2 className="font-heading text-2xl text-navy">Send a message</h2>
              <p className="mt-2 mb-6 text-sm text-muted-foreground">
                We typically respond within one business day.
              </p>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-[28px] border border-border bg-white p-6 shadow-soft">
              <h3 className="font-heading text-xl text-navy">Direct lines</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-royal" />
                  <a href={`tel:${SITE.phone}`} className="hover:text-royal">
                    {SITE.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="size-4 text-royal" />
                  <a href={`mailto:${SITE.salesEmail}`} className="hover:text-royal">
                    {SITE.salesEmail}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock3 className="size-4 text-royal" />
                  <span>Mon–Fri · 9:00–18:00 local time</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
