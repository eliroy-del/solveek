import { CtaButton } from "@/components/ui/cta-button";
import { AUDIT, BRAND } from "@/constants/brand";

export function AuditCta() {
  return (
    <section className="relative overflow-hidden bg-white section-padding">
      <div className="container-premium">
        <div className="relative overflow-hidden rounded-xl gradient-navy px-6 py-10 text-white md:px-10 md:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 50% 0%, rgba(19,88,254,0.35), transparent 50%)",
            }}
          />
          <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
            <h2 className="title-section text-center text-white">
              {AUDIT.headline}
            </h2>
            <p className="mt-4 max-w-2xl text-center body-md text-white/70">
              {AUDIT.body}
            </p>
            <div className="mt-6">
              <CtaButton href={BRAND.primaryCta.href} showArrow>
                {AUDIT.cta}
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
