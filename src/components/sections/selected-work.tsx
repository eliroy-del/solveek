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
          <h2 className="font-heading text-xl text-navy">Selected Work</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Case studies are coming soon. In the meantime, book a Digital Growth
            Audit.
          </p>
          <div className="mt-5 flex justify-center">
            <CtaButton href="/contact">Book a Digital Growth Audit</CtaButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface section-padding">
      <div className="container-premium">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow text-royal">Selected Work</p>
            <h2 className="mt-2 font-heading text-[clamp(1.6rem,3.2vw,2.25rem)] leading-snug text-navy">
              Built for real businesses. Designed for real outcomes.
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-royal"
          >
            See all work
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        <article className="mt-8 overflow-hidden rounded-xl bg-white ring-1 ring-border/80">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative min-h-[220px] bg-navy lg:min-h-[320px]">
              <ProjectProductPreview
                slug={primary.slug}
                industry={primary.industry}
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div className="flex flex-col justify-center p-5 md:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-royal">
                {primary.industry}
                {primary.location ? ` · ${primary.location}` : ""}
              </p>
              <h3 className="mt-2 font-heading text-xl text-navy md:text-2xl">
                {primary.title}
              </h3>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    Challenge
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-navy/80">
                    {primary.challenge}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    What Solveek did
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-navy/80">
                    {primary.solution}
                  </dd>
                </div>
              </dl>
              <Link
                href={`/work/${primary.slug}`}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal"
              >
                View project
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>
        </article>

        {rest.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {rest.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group overflow-hidden rounded-xl bg-white ring-1 ring-border/80 transition hover:ring-royal/30"
              >
                <div className="relative aspect-[16/10] bg-navy">
                  <ProjectProductPreview
                    slug={project.slug}
                    industry={project.industry}
                    className="absolute inset-0 h-full w-full"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-royal">
                    {project.industry}
                  </p>
                  <h3 className="mt-1.5 font-heading text-base text-navy">
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
    <div className="grid gap-4 md:grid-cols-2">
      {projects.map((project, index) => (
        <Link
          key={project.slug}
          href={`/work/${project.slug}`}
          className={cn(
            "group overflow-hidden rounded-xl bg-white ring-1 ring-border/80 transition hover:ring-royal/30",
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
              className="absolute inset-0 h-full w-full"
            />
          </div>
          <div className="p-4 md:p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-royal">
              {project.industry}
              {project.location ? ` · ${project.location}` : ""}
            </p>
            <h2 className="mt-1.5 font-heading text-lg text-navy md:text-xl">
              {project.title}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
              {project.challenge}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
