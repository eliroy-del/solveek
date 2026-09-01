import { Suspense } from "react";
import {
  WorkShowcase,
  WorkShowcaseSkeleton,
} from "@/components/sections/work-showcase";
import { HeaderBackground } from "@/components/ui/header-background";
import { StructuredData } from "@/components/seo/structured-data";
import { getProjects } from "@/lib/content";
import {
  buildBreadcrumbs,
  createPageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const workDescription =
  "A selection of Solveek signature projects. Digital work built for real businesses and real outcomes.";

export const metadata = createPageMetadata({
  title: "Our Work",
  description: workDescription,
  path: "/work",
});

async function WorkList() {
  const projects = await getProjects();
  return <WorkShowcase projects={projects} />;
}

export default function WorkPage() {
  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Our Work",
            description: workDescription,
            path: "/work",
          }),
          buildBreadcrumbs([{ name: "Home", path: "/" }, { name: "Work" }]),
        ]}
      />
      <section className="relative isolate overflow-hidden pt-28 pb-14 text-white md:pt-32 md:pb-16">
        <HeaderBackground
          mediaClassName="work-header-media"
          glowClassName="work-header-glow"
          objectPosition="object-center"
        />

        <div className="container-premium relative max-w-2xl">
          <h1 className="title-page text-white">Our Work</h1>
          <p className="mt-4 body-md text-white/70">
            A selection of signature projects: digital systems built for real
            businesses and real outcomes.
          </p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-premium">
          <Suspense fallback={<WorkShowcaseSkeleton />}>
            <WorkList />
          </Suspense>
        </div>
      </section>
    </>
  );
}
