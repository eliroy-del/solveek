import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkGrid, WorkGridSkeleton } from "@/components/sections/selected-work";
import { AuditCta } from "@/components/sections/audit-cta";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Selected Work",
  description:
    "Selected Solveek projects. Digital work built for real businesses and real outcomes.",
  alternates: { canonical: "/work" },
};

async function WorkList() {
  const projects = await getProjects();
  return <WorkGrid projects={projects} />;
}

export default function WorkPage() {
  return (
    <>
      <section className="relative overflow-hidden gradient-navy pt-28 pb-8 text-white md:pt-32 md:pb-10">
        <div className="container-premium relative max-w-2xl">
          <h1 className="title-page text-white">Selected Work</h1>
          <p className="mt-3 text-sm text-white/70 md:text-base">
            Built for real businesses. Designed for real outcomes.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-14">
        <div className="container-premium">
          <Suspense fallback={<WorkGridSkeleton />}>
            <WorkList />
          </Suspense>
        </div>
      </section>

      <AuditCta />
    </>
  );
}
