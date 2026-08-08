import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { InsightsList } from "@/components/sections/insights-list";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IMAGES } from "@/constants/site";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "SOLVEEK insights on website conversion, SaaS onboarding, social systems, e-commerce, design systems, and AI in digital products.",
};

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Ideas for teams building modern digital brands"
        description="Practical perspectives on design, product, commerce, and growth—written for decision makers who ship."
        image={IMAGES.analytics}
      />
      <section className="section-padding bg-white">
        <div className="container-premium">
          <InsightsList />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
