import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Stats } from "@/components/sections/stats";
import { IMAGES } from "@/constants/site";
import { getBrandValues, getStats, getTimeline } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how SOLVEEK helps brands digitise with website design, social media, e-commerce, SaaS products, and premium digital systems.",
};

export default async function AboutPage() {
  const [timeline, stats, values] = await Promise.all([
    getTimeline(),
    getStats(),
    getBrandValues(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="About SOLVEEK"
        title="A digital partner for brands that want clarity, craft, and growth"
        description="We combine strategy, design, and engineering to help companies launch websites, products, and campaigns that feel premium—and perform."
        image={IMAGES.team}
      />

      <section className="section-padding bg-white">
        <div className="container-premium grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="Our story"
            title="Built to turn ambitious ideas into working digital products"
            description="SOLVEEK started as a design-led studio and grew into a full IT solutions partner. Today we help startups and established brands ship websites, social systems, commerce platforms, and SaaS products with one accountable team."
          />
          <Reveal>
            <Image
              src={IMAGES.meeting}
              alt="Ghanaian tech team collaborating on a digital project"
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

      <section className="section-padding bg-white">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Timeline"
            title="Milestones that shaped SOLVEEK"
            align="center"
            className="mb-14"
          />
          <div className="mx-auto max-w-3xl space-y-6">
            {timeline.map((item, index) => (
              <Reveal key={item.year} delay={index * 0.05}>
                <div className="grid gap-4 rounded-3xl border border-border bg-surface/70 p-6 md:grid-cols-[120px_1fr]">
                  <p className="font-heading text-2xl text-royal">{item.year}</p>
                  <div>
                    <h3 className="font-heading text-xl text-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats items={stats} />
      <CtaBanner />
    </>
  );
}
