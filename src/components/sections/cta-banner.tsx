import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { AUDIT, BRAND } from "@/constants/brand";

export function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-premium">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl gradient-navy px-5 py-9 text-center md:px-10 md:py-11">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,88,254,0.25),transparent_40%)]" />
            <div className="relative mx-auto max-w-xl">
              <h2 className="font-heading text-xl text-white sm:text-2xl">
                {AUDIT.headline}
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/70">
                {AUDIT.body}
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <CtaButton href={BRAND.primaryCta.href} showArrow>
                  {AUDIT.cta}
                </CtaButton>
                <CtaButton href={BRAND.secondaryCta.href} variant="outline-light">
                  {BRAND.secondaryCta.label}
                </CtaButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
