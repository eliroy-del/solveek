import Image from "next/image";
import { CAPABILITIES } from "@/constants/brand";

export function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-16">
      <Image
        src="/images/process-tech-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
        priority={false}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-navy/92 via-navy/88 to-[#0a1a3a]/90"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 0%, rgba(19,88,254,0.35), transparent 45%)",
        }}
      />

      <div className="container-premium relative">
        <div className="max-w-lg">
          <h2 className="font-heading text-2xl leading-snug text-white md:text-3xl">
            What we build
          </h2>
          <p className="mt-2 text-sm text-white/65 md:text-base">
            Five capabilities inside one growth system, not five separate
            service lines.
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, index) => (
            <li
              key={item.title}
              className="rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <span className="font-heading text-xs text-cyan">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-heading text-base text-white md:text-lg">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
