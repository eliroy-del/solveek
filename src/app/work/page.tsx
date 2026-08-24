import type { Metadata } from "next";
import { Suspense } from "react";
import {
  WorkShowcase,
  WorkShowcaseSkeleton,
} from "@/components/sections/work-showcase";
import { AuditCta } from "@/components/sections/audit-cta";
import { getProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A selection of Solveek signature projects. Digital work built for real businesses and real outcomes.",
  alternates: { canonical: "/work" },
};

async function WorkList() {
  const projects = await getProjects();
  return <WorkShowcase projects={projects} />;
}

export default function WorkPage() {
  return (
    <>
      <section className="bg-surface pt-24 pb-12 md:pt-28 md:pb-16">
        <div className="container-premium">
          <Suspense fallback={<WorkShowcaseSkeleton />}>
            <WorkList />
          </Suspense>
        </div>
      </section>

      <AuditCta />
    </>
  );
}
