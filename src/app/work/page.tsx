import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import {
  WorkShowcase,
  WorkShowcaseSkeleton,
} from "@/components/sections/work-showcase";
import { IMAGES } from "@/constants/site";
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
      <section className="relative isolate overflow-hidden pt-28 pb-14 text-white md:pt-32 md:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="work-header-media absolute inset-0">
            <Image
              src={IMAGES.workHeader}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/35" />
          <div className="work-header-glow absolute inset-0" />
        </div>

        <div className="container-premium relative max-w-2xl">
          <h1 className="title-page text-white">Our Work</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
            A selection of signature projects — digital systems built for real
            businesses and real outcomes.
          </p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-premium max-w-[1100px]">
          <Suspense fallback={<WorkShowcaseSkeleton />}>
            <WorkList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
