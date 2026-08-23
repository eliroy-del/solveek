import { CtaButton } from "@/components/ui/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { AUDIT, BRAND } from "@/constants/brand";

export function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-premium">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl gradient-navy px-6 py-12 text-center md:px-12 md:py-14">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(19,88,254,0.28),transparent_40%)]" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "42px 42px",
              }}
            />
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-heading text-2xl text-white sm:text-3xl lg:text-4xl">
                {AUDIT.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                {AUDIT.body}
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
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
