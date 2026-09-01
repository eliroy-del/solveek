import { CtaButton } from "@/components/ui/cta-button";
import { HeaderBackground } from "@/components/ui/header-background";
import { BRAND } from "@/constants/brand";

export function GrowthHero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <HeaderBackground />

      <div className="container-premium relative flex min-h-[92svh] items-center pb-16 pt-32 lg:pb-24 lg:pt-36">
        <div className="max-w-3xl">
          <h1 className="display text-white">
            Build.
            <br />
            Connect.
            <br />
            Grow.
          </h1>
          <p className="mt-6 max-w-xl body-lg text-white/75">
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
