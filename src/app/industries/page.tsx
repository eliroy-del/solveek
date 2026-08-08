import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { industries } from "@/constants/data";
import { getIcon } from "@/lib/icons";
import { IMAGES } from "@/constants/site";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "SOLVEEK digital solutions for startups, e-commerce brands, SaaS companies, professional services, healthcare, education, and more.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Industry-aware digital solutions that fit how you grow"
        description="We adapt our website, product, commerce, and marketing expertise to the realities of your market—not a one-size-fits-all template."
        image={IMAGES.saas}
      />
      <section className="section-padding bg-white">
        <div className="container-premium grid gap-6 md:grid-cols-2">
          {industries.map((industry, index) => {
            const Icon = getIcon(industry.icon);
            return (
              <Reveal key={industry.slug} delay={Math.min(index * 0.04, 0.28)}>
                <article className="overflow-hidden rounded-[28px] border border-border bg-surface/40 shadow-soft transition hover:shadow-lift">
                  <div className="relative h-52">
                    <Image
                      src={industry.image}
                      alt={industry.title}
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 to-transparent" />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 text-white">
                      <Icon className="size-5" />
                      <h2 className="font-heading text-2xl">{industry.title}</h2>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {industry.description}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
