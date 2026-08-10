import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
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
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <PageHero
        title={project.title}
        description={project.location}
        image={project.image}
      />
      <section className="section-padding bg-white">
        <div className="container-premium grid gap-10 lg:grid-cols-3">
          <Reveal className="rounded-3xl border border-border bg-surface p-6 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Challenge
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="rounded-3xl border border-border bg-surface p-6 lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Solution
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.solution}
            </p>
          </Reveal>
        </div>
        <div className="container-premium mt-10">
          <Reveal>
            <h2 className="font-heading text-2xl text-navy">Results</h2>
            <ul className="mt-4 grid gap-4 md:grid-cols-3">
              {project.results.map((result) => (
                <li
                  key={result}
                  className="rounded-3xl border border-border bg-white p-5 text-sm font-semibold text-navy shadow-soft"
                >
                  {result}
                </li>
              ))}
            </ul>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {project.gallery.map((image, index) => (
              <Reveal key={image} delay={index * 0.06}>
                <Image
                  src={image}
                  alt={`${project.title} gallery ${index + 1}`}
                  width={700}
                  height={500}
                  className="h-56 w-full rounded-3xl object-cover shadow-soft"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
