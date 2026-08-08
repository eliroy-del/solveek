import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
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
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
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

        <div className="grid gap-6 lg:grid-cols-3">
          {list.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.08}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width:1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/70 to-transparent" />
                  <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                    {project.industry}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl text-navy">{project.title}</h3>
                  <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                    {project.location}
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.challenge}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                    View case study
                    <ArrowUpRight className="size-4" />
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
