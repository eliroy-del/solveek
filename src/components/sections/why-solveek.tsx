import { PRINCIPLES } from "@/constants/brand";

export function WhySolveek() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium">
        <p className="eyebrow text-royal">Why Solveek</p>
        <h2 className="mt-2 max-w-lg title-section text-navy">
          Principles that shape every engagement.
        </h2>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle}
              className="flex min-h-[110px] flex-col justify-between bg-white p-6"
            >
              <span className="font-heading text-xs text-royal">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-heading text-xl leading-snug text-navy">
                {principle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
