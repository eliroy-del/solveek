import { GrowthHero } from "@/components/sections/growth-hero";
import { ProblemStatement } from "@/components/sections/problem-statement";
import { EcosystemOverview } from "@/components/sections/ecosystem-overview";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { SelectedWork } from "@/components/sections/selected-work";
import { AuditCta } from "@/components/sections/audit-cta";
import { getProjects } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Growth Partner",
  description:
    "Solveek builds the digital tools and systems businesses need to get found, talk to customers, and grow. Book a Digital Growth Audit.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <GrowthHero />
      <ProblemStatement />
      <EcosystemOverview />
      <CapabilitiesSection />
      <SelectedWork projects={projects} />
      <AuditCta />
    </>
  );
}
