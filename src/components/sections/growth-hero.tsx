import Image from "next/image";
import { CtaButton } from "@/components/ui/cta-button";
import { BRAND } from "@/constants/brand";

export function GrowthHero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="hero-network absolute inset-0">
          <Image
            src="/images/hero-network.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center] sm:object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/35 sm:via-navy/80 sm:to-navy/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40" />
        <div className="hero-network-glow absolute inset-0" />
      </div>

      <div className="container-premium relative flex min-h-[92svh] items-center pb-16 pt-28 lg:pb-24 lg:pt-32">
        <div className="max-w-xl">
          <p className="eyebrow text-cyan">{BRAND.category}</p>
          <h1 className="mt-4 display text-white">
            Build.
            <br />
            Connect.
            <br />
            Grow.
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
            {BRAND.promise}
          </p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <CtaButton href={BRAND.primaryCta.href} showArrow>
              {BRAND.primaryCta.label}
            </CtaButton>
            <CtaButton href={BRAND.secondaryCta.href} variant="outline-light">
              {BRAND.secondaryCta.label}
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
