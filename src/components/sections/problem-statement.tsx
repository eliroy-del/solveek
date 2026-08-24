import { PROBLEM } from "@/constants/brand";

export function ProblemStatement() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium max-w-3xl">
        <h2 className="font-heading text-[clamp(1.6rem,3.2vw,2.25rem)] leading-snug tracking-tight text-navy">
          {PROBLEM.headline}
        </h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {PROBLEM.body}
        </p>
      </div>
    </section>
  );
}
