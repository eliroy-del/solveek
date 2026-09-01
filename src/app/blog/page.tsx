import Image from "next/image";
import { BlogList } from "@/components/sections/blog-list";
import { AuditCta } from "@/components/sections/audit-cta";
import { StructuredData } from "@/components/seo/structured-data";
import { IMAGES } from "@/constants/site";
import { getInsights } from "@/lib/content";
import {
  buildBreadcrumbs,
  createPageMetadata,
  webPageJsonLd,
} from "@/lib/seo";

const blogDescription =
  "Practical articles from Solveek on websites, growth systems, e-commerce, and digital brands building in Ghana and beyond.";

export const metadata = createPageMetadata({
  title: "Blog",
  description: blogDescription,
  path: "/blog",
});

export default async function BlogPage() {
  const articles = await getInsights();

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: "Blog",
            description: blogDescription,
            path: "/blog",
          }),
          buildBreadcrumbs([{ name: "Home", path: "/" }, { name: "Blog" }]),
        ]}
      />
      <section className="relative isolate overflow-hidden pt-28 pb-14 text-white md:pt-32 md:pb-16">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Image
            src={IMAGES.process}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-navy/35" />
        </div>
        <div className="container-premium relative max-w-2xl">
          <h1 className="title-page text-white">Blog</h1>
          <p className="mt-4 body-md text-white/70">
            Ideas and practical guidance for teams building digital presence,
            operations, and growth.
          </p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-premium">
          <BlogList items={articles} />
        </div>
      </section>

      <AuditCta />
    </>
  );
}
