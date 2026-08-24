import { PROBLEM } from "@/constants/brand";

export function ProblemStatement() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium max-w-3xl">
        <h2 className="title-section text-navy text-balance md:text-[clamp(1.85rem,3.2vw,2.75rem)]">
          {PROBLEM.headline}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
          {PROBLEM.body}
        </p>
      </div>
    </section>
  );
}
