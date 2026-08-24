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
                "radial-gradient(ellipse at 100% 0%, rgba(19,88,254,0.35), transparent 45%)",
            }}
          />
          <div className="relative max-w-xl">
            <p className="eyebrow text-cyan">Digital Growth Audit</p>
            <h2 className="mt-2 title-section text-white md:text-[clamp(1.5rem,2.8vw,2rem)]">
              {AUDIT.headline}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
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
