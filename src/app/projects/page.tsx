import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { CtaBanner } from "@/components/sections/cta-banner";
import { IMAGES } from "@/constants/site";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore SOLVEEK case studies across website design, e-commerce, SaaS products, and social growth systems.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title="Work that proves great ideas can ship and scale"
        description="Selected engagements where SOLVEEK aligned design, technology, and growth around clear commercial outcomes."
        image={IMAGES.product}
      />
      <FeaturedProjects items={projects} limit={4} />
      <CtaBanner />
    </>
  );
}
