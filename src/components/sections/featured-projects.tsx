import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectProductPreview } from "@/components/ui/project-product-preview";
import type { Project } from "@/types";

export function FeaturedProjects({
  items,
  limit = 3,
}: {
  items: Project[];
  limit?: number;
}) {
  const list = items.slice(0, limit);

  return (
    <section className="section-padding bg-white">
      <div className="container-premium">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Selected work with measurable outcomes"
            description="Websites, products, commerce, and growth systems where SOLVEEK paired craft with commercial results."
          />
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-royal hover:underline"
            >
              View all case studies
              <ArrowUpRight className="size-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {list.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative h-44 overflow-hidden border-b border-border">
                  <div className="absolute inset-0 transition duration-500 group-hover:scale-[1.03]">
                    <ProjectProductPreview
                      slug={project.slug}
                      industry={project.industry}
                    />
                  </div>
                  <span className="absolute bottom-3 left-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
                    {project.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-heading text-lg text-navy">{project.title}</h3>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {project.location}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                    View case study
                    <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
