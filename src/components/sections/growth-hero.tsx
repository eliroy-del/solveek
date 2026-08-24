import { CtaButton } from "@/components/ui/cta-button";
import { BRAND } from "@/constants/brand";

export function GrowthHero() {
  return (
    <section className="relative overflow-hidden gradient-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 70% 20%, rgba(19,88,254,0.35), transparent), radial-gradient(circle at 15% 80%, rgba(77,130,255,0.12), transparent 40%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "auto, auto, 64px 64px, 64px 64px",
        }}
      />

      <div className="container-premium relative grid min-h-[100svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28 lg:pt-36">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
            {BRAND.category}
          </p>
          <h1 className="mt-5 font-heading text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-tight text-white">
            Build.
            <br />
            Connect.
            <br />
            Grow.
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
            {BRAND.promise}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton href={BRAND.primaryCta.href} showArrow>
              {BRAND.primaryCta.label}
            </CtaButton>
            <CtaButton href={BRAND.secondaryCta.href} variant="outline-light">
              {BRAND.secondaryCta.label}
            </CtaButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <HeroSystemVisual />
        </div>
      </div>
    </section>
  );
}

function HeroSystemVisual() {
  const nodes = [
    { label: "Foundation", verb: "Build", top: "8%", left: "18%" },
    { label: "Automation", verb: "Connect", top: "42%", left: "58%" },
    { label: "Visibility", verb: "Grow", top: "72%", left: "22%" },
  ] as const;

  return (
    <div
      className="relative aspect-square w-full rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm"
      aria-hidden
    >
      <svg
        className="absolute inset-6 h-[calc(100%-3rem)] w-[calc(100%-3rem)]"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M28 18 C 48 28, 62 38, 68 48"
          stroke="rgba(77,130,255,0.45)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
        <path
          d="M68 52 C 58 62, 42 70, 32 78"
          stroke="rgba(77,130,255,0.45)"
          strokeWidth="0.6"
          strokeDasharray="2 2"
        />
        <path
          d="M30 22 C 22 48, 24 68, 30 78"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.5"
        />
        <circle cx="28" cy="18" r="2.2" fill="#4d82ff" />
        <circle cx="68" cy="48" r="2.2" fill="#1358fe" />
        <circle cx="32" cy="78" r="2.2" fill="#4d82ff" />
      </svg>

      {nodes.map((node) => (
        <div
          key={node.label}
          className="absolute rounded-2xl border border-white/15 bg-navy/80 px-4 py-3 shadow-lift backdrop-blur"
          style={{ top: node.top, left: node.left }}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan">
            {node.verb}
          </p>
          <p className="mt-1 font-heading text-sm text-white">{node.label}</p>
        </div>
      ))}

      <div className="absolute bottom-6 right-6 rounded-xl border border-royal/40 bg-royal/20 px-3 py-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
          Growth
        </p>
      </div>
    </div>
  );
}
