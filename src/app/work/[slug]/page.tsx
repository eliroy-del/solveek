import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectProductPreview } from "@/components/ui/project-product-preview";
import { CtaButton } from "@/components/ui/cta-button";
import { AuditCta } from "@/components/sections/audit-cta";
import { StructuredData } from "@/components/seo/structured-data";
import { getProjectBySlug, getProjects } from "@/lib/content";
import {
  buildBreadcrumbs,
  createPageMetadata,
  creativeWorkJsonLd,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { robots: { index: false, follow: false } };

  const description =
    project.challenge.length > 155
      ? `${project.challenge.slice(0, 152).trimEnd()}…`
      : project.challenge;

  return createPageMetadata({
    title: project.title,
    description,
    path: `/work/${project.slug}`,
    image: project.image || undefined,
  });
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const outcomes = project.results.filter(Boolean);
  const path = `/work/${project.slug}`;

  return (
    <>
      <StructuredData
        data={[
          buildBreadcrumbs([
            { name: "Home", path: "/" },
            { name: "Work", path: "/work" },
            { name: project.title },
          ]),
          creativeWorkJsonLd({
            name: project.title,
            description: project.challenge,
            path,
            image: project.image,
            industry: project.industry,
          }),
        ]}
      />
      <section className="pt-28 md:pt-32">
        <div className="container-premium">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-navy"
          >
            <ArrowLeft className="size-4" />
            All work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
                {project.industry}
                {project.location ? ` · ${project.location}` : ""}
              </p>
              <h1 className="mt-4 font-heading text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] text-navy">
                {project.title}
              </h1>
              {project.websiteUrl ? (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-royal transition-ui hover:text-royal-deep"
                >
                  Visit live site
                  <ArrowUpRight className="size-3.5" />
                </a>
              ) : null}
            </div>
            <p className="text-base leading-relaxed text-muted-foreground lg:text-lg">
              {project.challenge}
            </p>
          </div>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-[1.5rem] bg-navy shadow-lift">
            <ProjectProductPreview
              slug={project.slug}
              industry={project.industry}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-premium grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className="font-heading text-sm uppercase tracking-[0.16em] text-royal">
              Challenge
            </h2>
            <p className="mt-4 text-base leading-relaxed text-navy/80">
              {project.challenge}
            </p>
          </div>
          <div className="lg:col-span-2">
            <h2 className="font-heading text-sm uppercase tracking-[0.16em] text-royal">
              What Solveek did
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-navy/80">
              {project.solution}
            </p>
          </div>
        </div>

        {outcomes.length > 0 ? (
          <div className="container-premium mt-14">
            <h2 className="font-heading text-sm uppercase tracking-[0.16em] text-royal">
              What changed
            </h2>
            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {outcomes.map((result) => (
                <li
                  key={result}
                  className="rounded-2xl border border-border bg-surface p-5 text-sm font-medium leading-relaxed text-navy"
                >
                  {result}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="container-premium mt-14 flex flex-col gap-3 sm:flex-row sm:items-center">
          {project.websiteUrl ? (
            <CtaButton href={project.websiteUrl} showArrow>
              Visit live site
            </CtaButton>
          ) : null}
          <CtaButton
            href="/contact"
            showArrow={!project.websiteUrl}
            variant={project.websiteUrl ? "secondary" : "primary"}
          >
            Discuss a similar project
          </CtaButton>
        </div>
      </section>

      <AuditCta />
    </>
  );
}
