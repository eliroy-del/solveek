import { PROBLEM } from "@/constants/brand";

export function ProblemStatement() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium max-w-3xl">
        <h2 className="title-section text-navy text-balance">
          {PROBLEM.headline}
        </h2>
        <p className="mt-5 max-w-2xl body-md text-muted-foreground">
          {PROBLEM.body}
        </p>
      </div>
    </section>
  );
}
