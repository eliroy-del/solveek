import { PRINCIPLES } from "@/constants/brand";

export function WhySolveek() {
  return (
    <section className="bg-white section-padding">
      <div className="container-premium">
        <h2 className="max-w-lg title-section text-navy">
          Principles that shape every engagement.
        </h2>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg bg-border sm:grid-cols-2">
          {PRINCIPLES.map((principle) => (
            <li
              key={principle}
              className="flex min-h-[110px] items-end bg-white p-6"
            >
              <p className="font-heading text-xl leading-snug text-navy">
                {principle}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
