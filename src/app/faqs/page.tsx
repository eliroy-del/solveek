import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { FaqList } from "@/components/sections/faq-list";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IMAGES } from "@/constants/site";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Answers to common questions about SOLVEEK services, process, pricing, technology, and post-launch support.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Clear answers for teams evaluating a digital partner"
        description="Search by topic or keyword. Still need detail? Our specialists are ready to help."
        image={IMAGES.office}
      />
      <section className="section-padding bg-white">
        <div className="container-premium max-w-4xl">
          <FaqList />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
