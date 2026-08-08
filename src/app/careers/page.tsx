import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PremiumButton } from "@/components/ui/premium-button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { jobs } from "@/constants/data";
import { IMAGES } from "@/constants/site";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join SOLVEEK and help build premium websites, products, and digital growth systems for ambitious brands.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build digital products people are proud to ship"
        description="Join designers, engineers, strategists, and growth specialists shaping modern brand experiences."
        image={IMAGES.team}
      />
      <section className="section-padding bg-white">
        <div className="container-premium">
          <div className="mb-10 max-w-2xl">
            <h2 className="font-heading text-3xl text-navy">Open roles</h2>
            <p className="mt-3 text-muted-foreground">
              We hire for craft, ownership, and curiosity. Remote-friendly roles are noted below.
            </p>
          </div>
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <Reveal key={job.id} delay={index * 0.05}>
                <article className="rounded-[28px] border border-border bg-surface/50 p-6 shadow-soft transition hover:bg-white hover:shadow-lift md:p-8">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="font-heading text-xl text-navy">{job.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {job.department} · {job.location} · {job.type}
                      </p>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {job.description}
                      </p>
                    </div>
                    <PremiumButton href="/contact" size="md" showArrow>
                      Apply
                    </PremiumButton>
                  </div>
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
