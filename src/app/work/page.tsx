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
      <section className="relative overflow-hidden gradient-navy pt-32 pb-16 text-white md:pt-40">
        <div className="container-premium relative max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            Portfolio
          </p>
          <h1 className="mt-5 font-heading text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-white">
            Selected Work
          </h1>
          <p className="mt-6 text-lg text-white/70">
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
