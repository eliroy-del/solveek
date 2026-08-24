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
      <div className="mx-auto max-w-lg text-center">
        <h2 className="title-section text-navy">Signature projects</h2>
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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <h2 className="title-section text-navy">Signature projects</h2>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            Browse the work, then open a project for challenge, solution, and
            outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous projects"
            disabled={!canPrev}
            onClick={() => scrollByCard(-1)}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-navy transition-ui hover:border-royal/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next projects"
            disabled={!canNext}
            onClick={() => scrollByCard(1)}
            className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full border border-border bg-surface text-navy transition-ui hover:border-royal/30 hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Project showcase"
      >
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            data-work-card
            className="group relative w-[min(82vw,300px)] shrink-0 snap-center overflow-hidden rounded-xl bg-navy text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2 sm:w-[280px] md:w-[300px]"
          >
            <div className="relative aspect-[4/5]">
              <ProjectProductPreview
                slug={project.slug}
                industry={project.industry}
                className="absolute inset-0 h-full w-full transition-transform duration-300 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/35 to-transparent" />
              <span className="absolute left-4 top-4 font-heading text-[11px] text-cyan">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-royal text-white opacity-0 shadow-soft transition-ui group-hover:opacity-100 group-focus-visible:opacity-100">
                <ArrowRight className="size-4" />
              </span>
              <div className="absolute inset-x-0 bottom-0 space-y-1.5 p-4 md:p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-white/65">
                  {project.industry}
                </p>
                <h3 className="font-heading text-lg leading-snug text-white md:text-xl">
                  {project.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}

        <Link
          href="/contact"
          data-work-card
          className="group flex w-[min(82vw,260px)] shrink-0 snap-center flex-col justify-between rounded-xl border border-royal/40 bg-surface p-5 transition-ui hover:border-royal hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal sm:w-[240px]"
        >
          <div>
            <p className="eyebrow text-royal">Next</p>
            <h3 className="mt-3 font-heading text-xl leading-snug text-navy">
              Discuss a similar project
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Tell us what you want to build next.
            </p>
          </div>
          <span className="mt-8 inline-flex size-11 items-center justify-center rounded-full bg-royal text-white transition-ui group-hover:translate-x-0.5">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>

      <div
        className="mt-5 flex items-center gap-2"
        aria-label="Slide indicators"
      >
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
              active === index
                ? "w-7 bg-royal"
                : "w-3 bg-border hover:bg-royal/40"
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function WorkShowcaseSkeleton() {
  return (
    <div aria-hidden>
      <div className="mb-8 space-y-2">
        <div className="skeleton h-8 w-56" />
        <div className="skeleton h-4 w-80 max-w-full" />
      </div>
      <div className="flex gap-4 overflow-hidden">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-[280px] shrink-0 overflow-hidden rounded-xl bg-navy"
          >
            <div className="skeleton aspect-[4/5] rounded-none opacity-40" />
          </div>
        ))}
      </div>
    </div>
  );
}
