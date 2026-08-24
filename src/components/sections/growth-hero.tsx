import { CtaButton } from "@/components/ui/cta-button";
import { BRAND } from "@/constants/brand";

export function GrowthHero() {
  return (
    <section className="relative overflow-hidden gradient-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 45% at 75% 15%, rgba(19,88,254,0.28), transparent), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "auto, 56px 56px, 56px 56px",
        }}
      />

      <div className="container-premium relative grid min-h-[88svh] items-center gap-10 pb-16 pt-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-20 lg:pt-32">
        <div>
          <p className="eyebrow text-cyan">{BRAND.category}</p>
          <h1 className="mt-3 font-heading text-[clamp(2.15rem,5.5vw,3.5rem)] leading-[1.05] tracking-tight text-white">
            Build. Connect. Grow.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/70 sm:text-base">
            {BRAND.promise}
          </p>
          <div className="mt-7 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <CtaButton href={BRAND.primaryCta.href} showArrow>
              {BRAND.primaryCta.label}
            </CtaButton>
            <CtaButton href={BRAND.secondaryCta.href} variant="outline-light">
              {BRAND.secondaryCta.label}
            </CtaButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <HeroSystemVisual />
        </div>
      </div>
    </section>
  );
}

function HeroSystemVisual() {
  const nodes = [
    { label: "Foundation", verb: "Build", top: "10%", left: "16%" },
    { label: "Automation", verb: "Connect", top: "44%", left: "54%" },
    { label: "Visibility", verb: "Grow", top: "74%", left: "20%" },
  ] as const;

  return (
    <div
      className="relative aspect-square w-full rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      aria-hidden
    >
      <svg
        className="absolute inset-5 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M28 18 C 48 28, 62 38, 68 48"
          stroke="rgba(77,130,255,0.4)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
        <path
          d="M68 52 C 58 62, 42 70, 32 78"
          stroke="rgba(77,130,255,0.4)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
        <circle cx="28" cy="18" r="1.8" fill="#4d82ff" />
        <circle cx="68" cy="48" r="1.8" fill="#1358fe" />
        <circle cx="32" cy="78" r="1.8" fill="#4d82ff" />
      </svg>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute rounded-lg border border-white/15 bg-navy/85 px-3 py-2 backdrop-blur"
          style={{ top: node.top, left: node.left }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-wide text-cyan">
            {node.verb}
          </p>
          <p className="mt-0.5 font-heading text-xs text-white">{node.label}</p>
        </div>
      ))}

      <div className="absolute bottom-5 right-5 rounded-md border border-royal/40 bg-royal/20 px-2.5 py-1.5">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-white/90">
          Growth
        </p>
      </div>
    </div>
  );
}
