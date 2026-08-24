import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectProductPreview } from "@/components/ui/project-product-preview";
import { CtaButton } from "@/components/ui/cta-button";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

type SelectedWorkProps = {
  projects: Project[];
  featured?: boolean;
};

export function SelectedWork({ projects, featured = true }: SelectedWorkProps) {
  const list = projects.slice(0, featured ? 4 : 6);
  const [primary, ...rest] = list;

  if (!primary) {
    return (
      <section className="bg-surface section-padding">
        <div className="container-premium text-center">
          <h2 className="font-heading text-3xl text-navy">Selected Work</h2>
          <p className="mt-4 text-muted-foreground">
            Case studies are being prepared. Meanwhile, start with a Digital
            Growth Audit.
          </p>
          <div className="mt-8 flex justify-center">
            <CtaButton href="/contact">Book a Digital Growth Audit</CtaButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface section-padding">
      <div className="container-premium">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
              Selected Work
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.25rem)] leading-tight text-navy">
              Built for real businesses. Designed for real outcomes.
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-royal"
          >
            See all work
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <article className="mt-12 overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-border/80">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[280px] bg-navy lg:min-h-[420px]">
              <ProjectProductPreview
                slug={primary.slug}
                industry={primary.industry}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
                {primary.industry}
                {primary.location ? ` · ${primary.location}` : ""}
              </p>
              <h3 className="mt-3 font-heading text-3xl text-navy">
                {primary.title}
              </h3>
              <dl className="mt-8 space-y-5">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Challenge
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/80">
                    {primary.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    What Solveek did
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-navy/80">
                    {primary.solution}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/work/${primary.slug}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-royal"
              >
                View project
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </article>

        {rest.length > 0 ? (
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-border/80 transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] bg-navy">
                  <ProjectProductPreview
                    slug={project.slug}
                    industry={project.industry}
                    className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-royal">
                    {project.industry}
                  </p>
                  <h3 className="mt-2 font-heading text-lg text-navy">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={cn(
            "group overflow-hidden rounded-2xl bg-white shadow-soft ring-1 ring-border/80 transition hover:-translate-y-0.5 hover:shadow-lift",
            index === 0 && "md:col-span-2"
          )}
        >
          <div
            className={cn(
              "relative bg-navy",
              index === 0 ? "aspect-[21/9]" : "aspect-[16/10]"
            )}
          >
            <ProjectProductPreview
              slug={project.slug}
              industry={project.industry}
              className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-royal">
              {project.industry}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <h2 className="mt-2 font-heading text-2xl text-navy md:text-3xl">
              {project.title}
            </h2>
            <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
              {project.challenge}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
