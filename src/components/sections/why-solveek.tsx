import { PRINCIPLES } from "@/constants/brand";

export function WhySolveek() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium">
        <p className="eyebrow text-royal">Why Solveek</p>
        <h2 className="mt-2 max-w-lg font-heading text-[clamp(1.6rem,3.2vw,2.1rem)] leading-snug text-navy">
          Principles that shape every engagement.
        </h2>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle}
              className="flex min-h-[100px] flex-col justify-between bg-white p-5"
            >
              <span className="font-heading text-xs text-royal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-heading text-lg leading-snug text-navy">
                {principle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
