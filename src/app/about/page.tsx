import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IMAGES } from "@/constants/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how SOLVEEK helps brands digitise with website design, social media, e-commerce, and premium digital systems.",
};

const missionVision = [
  {
    title: "Mission",
    description:
      "To help ambitious brands digitise with clarity—delivering websites, social systems, e-commerce, and brand experiences that look premium and perform commercially.",
  },
  {
    title: "Vision",
    description:
      "To be the digital partner Ghanaian and African brands trust to turn ideas into lasting products, presence, and growth.",
  },
] as const;

export default function AboutPage() {
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
            title="Mission and vision"
            description="What drives every engagement—and where we’re headed."
            className="mb-10"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {missionVision.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-[28px] border border-border bg-white p-7 shadow-soft md:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-royal">
                    {item.title}
                  </p>
                  <h3 className="mt-4 font-heading text-2xl leading-snug text-navy">
                    {item.title === "Mission"
                      ? "Digitise with clarity and craft"
                      : "Build lasting digital advantage"}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {item.description}
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
