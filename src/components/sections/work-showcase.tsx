import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import type { Project } from "@/types";

function projectPreview(project: Project) {
  return project.image || "/images/project-brightpath-website.png";
}

export function WorkShowcase({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return (
      <div className="mx-auto max-w-lg text-center">
        <h2 className="title-section text-navy">Our Featured Work</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Case studies are coming soon. Start with a Digital Growth Audit while
          we prepare them.
        </p>
        <div className="mt-6 flex justify-center">
          <CtaButton href="/contact" showArrow>
            Book a Digital Growth Audit
          </CtaButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-center title-section text-navy">
        Our Featured Work
      </h2>

      <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:mt-14 lg:gap-x-10 lg:gap-y-14">
        {projects.map((project) => {
          const href = project.websiteUrl || `/work/${project.slug}`;
          const external = Boolean(project.websiteUrl);

          return (
            <li key={project.slug}>
              <a
                href={href}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-4"
              >
                <div className="relative aspect-[16/11] overflow-hidden bg-surface shadow-[0_8px_30px_rgba(7,11,20,0.08)] transition-ui group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_36px_rgba(7,11,20,0.12)]">
                  <Image
                    src={projectPreview(project)}
                    alt={`${project.title} homepage`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-base italic text-navy/55 transition-ui group-hover:text-navy">
                    {project.title}
                  </p>
                  {project.challenge ? (
                    <p className="mx-auto mt-2 max-w-[22rem] text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {project.challenge}
                    </p>
                  ) : null}
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function WorkShowcaseSkeleton() {
  return (
    <div aria-hidden>
      <div className="mx-auto skeleton h-9 w-64" />
      <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i}>
            <div className="skeleton aspect-[16/11] rounded-none" />
            <div className="mx-auto mt-4 skeleton h-4 w-28" />
            <div className="mx-auto mt-2 skeleton h-3 w-48" />
            <div className="mx-auto mt-1.5 skeleton h-3 w-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
