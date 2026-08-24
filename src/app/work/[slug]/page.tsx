import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectProductPreview } from "@/components/ui/project-product-preview";
import { CtaButton } from "@/components/ui/cta-button";
import { AuditCta } from "@/components/sections/audit-cta";
import { getProjectBySlug, getProjects } from "@/lib/content";

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
  if (!project) return {};
  return {
    title: project.title,
    description: project.challenge,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const outcomes = project.results.filter(Boolean);

  return (
    <>
      <section className="pt-24 md:pt-28">
        <div className="container-premium">
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-navy"
          >
            <ArrowLeft className="size-3.5" />
            All work
          </Link>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-royal">
                {project.industry}
                {project.location ? ` · ${project.location}` : ""}
              </p>
              <h1 className="mt-2 font-heading text-[clamp(1.75rem,3.8vw,2.75rem)] leading-snug text-navy">
                {project.title}
              </h1>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-navy">
            <ProjectProductPreview
              slug={project.slug}
              industry={project.industry}
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-premium grid gap-8 lg:grid-cols-3">
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-royal">
              Challenge
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/80">
              {project.challenge}
            </p>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-royal">
              What Solveek did
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy/80 md:text-base">
              {project.solution}
            </p>
          </div>
        </div>

        {outcomes.length > 0 ? (
          <div className="container-premium mt-8">
            <h2 className="text-[11px] font-semibold uppercase tracking-wide text-royal">
              What changed
            </h2>
            <ul className="mt-3 grid gap-3 md:grid-cols-3">
              {outcomes.map((result) => (
                <li
                  key={result}
                  className="rounded-lg border border-border bg-surface p-4 text-sm font-medium leading-relaxed text-navy"
                >
                  {result}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="container-premium mt-8">
          <CtaButton href="/contact" showArrow>
            Discuss a similar project
          </CtaButton>
        </div>
      </section>

      <AuditCta />
    </>
  );
}
