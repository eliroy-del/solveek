import { PRINCIPLES } from "@/constants/brand";

export function WhySolveek() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
          Why Solveek
        </p>
        <h2 className="mt-4 max-w-xl font-heading text-[clamp(2rem,4vw,3rem)] leading-tight text-navy">
          Principles that shape every engagement.
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle}
              className="flex min-h-[140px] flex-col justify-between bg-white p-8"
            >
              <span className="font-heading text-sm text-royal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-6 font-heading text-2xl leading-snug text-navy">
                {principle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
