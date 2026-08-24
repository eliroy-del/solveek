import { PROBLEM } from "@/constants/brand";

export function ProblemStatement() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium max-w-4xl">
        <h2 className="font-heading text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-tight text-navy text-balance">
          {PROBLEM.headline}
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {PROBLEM.body}
        </p>
      </div>
    </section>
  );
}
