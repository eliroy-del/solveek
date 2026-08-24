"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProjectProductPreview } from "@/components/ui/project-product-preview";
import { CtaButton } from "@/components/ui/cta-button";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

export function WorkShowcase({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const syncScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);

    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-work-card]"));
    if (!cards.length) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let nearest = 0;
    let nearestDist = Number.POSITIVE_INFINITY;
    cards.forEach((card, index) => {
      const mid = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(mid - center);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = index;
      }
    });
    setActive(nearest);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    syncScrollState();
    el.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);
    return () => {
      el.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [syncScrollState, projects.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-work-card]");
    const amount = card ? card.offsetWidth + 16 : el.clientWidth * 0.7;
    el.scrollBy({ left: amount * direction, behavior: "smooth" });
  };

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-navy px-6 py-12 text-center text-white md:px-10">
        <h2 className="font-heading text-2xl text-white">Our Work</h2>
        <p className="mt-2 text-sm text-white/65">
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
    <div className="overflow-hidden rounded-2xl bg-royal px-4 py-8 text-white shadow-lift sm:px-6 md:px-8 md:py-10">
      <div className="mx-auto mb-7 max-w-xl text-center">
        <h1 className="font-heading text-3xl tracking-tight text-white md:text-4xl">
          Our Work
        </h1>
        <p className="mt-2 text-sm text-white/75 md:text-base">
          A selection of signature projects
        </p>
      </div>

      <div className="relative">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Project showcase"
        >
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              data-work-card
              className="group relative w-[min(78vw,280px)] shrink-0 snap-center overflow-hidden rounded-xl bg-white text-navy shadow-soft transition-ui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-royal sm:w-[260px] md:w-[280px]"
            >
              <div className="relative aspect-[4/5] bg-navy">
                <ProjectProductPreview
                  slug={project.slug}
                  industry={project.industry}
                  className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 transition-ui group-hover:opacity-100" />
                <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-white/90 text-royal opacity-0 shadow-soft transition-ui group-hover:opacity-100 group-focus-visible:opacity-100">
                  <ArrowRight className="size-4" />
                </span>
              </div>
              <div className="space-y-1 px-4 py-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-royal">
                  {project.industry}
                </p>
                <h2 className="font-heading text-base leading-snug text-navy">
                  {project.title}
                </h2>
              </div>
            </Link>
          ))}

          <Link
            href="/contact"
            data-work-card
            className="group flex w-[min(78vw,240px)] shrink-0 snap-center flex-col justify-between rounded-xl border border-white/35 bg-white/10 p-5 text-white backdrop-blur-sm transition-ui hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-[220px]"
          >
            <div>
              <p className="eyebrow text-cyan">Next</p>
              <h2 className="mt-3 font-heading text-xl leading-snug text-white">
                Discuss a similar project
              </h2>
              <p className="mt-2 text-sm text-white/70">
                Tell us what you want to build next.
              </p>
            </div>
            <span className="mt-8 inline-flex size-11 items-center justify-center rounded-full bg-white text-royal transition-ui group-hover:translate-x-0.5">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2" aria-label="Slide indicators">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                aria-label={`Go to ${project.title}`}
                aria-current={active === index ? "true" : undefined}
                onClick={() => {
                  const el = trackRef.current;
                  const card = el?.querySelectorAll<HTMLElement>("[data-work-card]")[
                    index
                  ];
                  card?.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
                className={cn(
                  "h-1 cursor-pointer rounded-full transition-ui",
                  active === index ? "w-7 bg-white" : "w-3 bg-white/40 hover:bg-white/70"
                )}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous projects"
              disabled={!canPrev}
              onClick={() => scrollByCard(-1)}
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-ui hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              aria-label="Next projects"
              disabled={!canNext}
              onClick={() => scrollByCard(1)}
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-ui hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WorkShowcaseSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-royal px-6 py-10" aria-hidden>
      <div className="mx-auto mb-8 flex max-w-sm flex-col items-center gap-2">
        <div className="h-8 w-40 rounded bg-white/20" />
        <div className="h-4 w-56 rounded bg-white/15" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-[260px] shrink-0 overflow-hidden rounded-xl bg-white">
            <div className="skeleton aspect-[4/5] rounded-none" />
            <div className="space-y-2 p-4">
              <div className="skeleton h-3 w-20" />
              <div className="skeleton h-5 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
