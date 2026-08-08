import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IMAGES } from "@/constants/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore SOLVEEK IT services including website design, social media management, e-commerce, SaaS products, branding, UX, and digital marketing.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="IT solutions designed for modern brands and product teams"
        description="Website design, social media, e-commerce, SaaS, and more—delivered with strategy, craft, and measurable outcomes."
        image={IMAGES.design}
      />
      <ServicesGrid showHeading={false} />
      <CtaBanner />
    </>
  );
}
