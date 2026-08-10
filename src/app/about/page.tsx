import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IMAGES } from "@/constants/site";
import { getBrandValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how SOLVEEK helps brands digitise with website design, social media, e-commerce, SaaS products, and premium digital systems.",
};

export default async function AboutPage() {
  const values = await getBrandValues();

  return (
    <>
      <PageHero
        title="A digital partner for brands that want clarity, craft, and growth"
        description="We combine strategy, design, and engineering to help companies launch websites, products, and campaigns that feel premium and perform."
        image={IMAGES.team}
      />

      <section className="section-padding bg-white">
        <div className="container-premium grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Our story"
            title="Built to turn ambitious ideas into working digital products"
            description="Solveek delivers smart, scalable and secure IT solutions that empower businesses to innovate, connect and grow in a digital world."
          />
          <Reveal>
            <Image
              src="/images/about-story.png"
              alt="Designer reviewing a visual portfolio on a desktop computer"
              width={900}
              height={700}
              className="h-[420px] w-full rounded-[28px] object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Core values"
            title="Principles that shape every engagement"
            className="mb-12"
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 0.06}>
                <article className="h-full rounded-3xl border border-border bg-white p-6 shadow-soft">
                  <h3 className="font-heading text-xl text-navy">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
