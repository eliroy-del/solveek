import type { Metadata } from "next";
import { WorkGrid } from "@/components/sections/selected-work";
import { AuditCta } from "@/components/sections/audit-cta";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected Solveek projects. Digital work built for real businesses and real outcomes.",
  alternates: { canonical: "/work" },
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <>
      <section className="relative overflow-hidden gradient-navy pt-24 pb-10 text-white md:pt-28">
        <div className="container-premium relative max-w-2xl">
          <p className="eyebrow text-cyan">Portfolio</p>
          <h1 className="mt-3 font-heading text-[clamp(1.85rem,4vw,2.75rem)] leading-snug text-white">
            Selected Work
          </h1>
          <p className="mt-3 text-sm text-white/70 sm:text-base">
            Built for real businesses. Designed for real outcomes.
          </p>
        </div>
      </section>

      <section className="bg-surface section-padding">
        <div className="container-premium">
          <WorkGrid projects={projects} />
        </div>
      </section>

      <AuditCta />
    </>
  );
}
