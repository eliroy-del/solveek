import { CtaButton } from "@/components/ui/cta-button";
import { AUDIT, BRAND } from "@/constants/brand";

export function AuditCta() {
  return (
    <section className="relative overflow-hidden bg-white section-padding">
      <div className="container-premium">
        <div className="relative overflow-hidden rounded-[1.75rem] gradient-navy px-8 py-14 text-white md:px-14 md:py-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 100% 0%, rgba(19,88,254,0.45), transparent 45%)",
            }}
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              Digital Growth Audit
            </p>
            <h2 className="mt-4 font-heading text-[clamp(1.85rem,3.5vw,2.75rem)] leading-tight text-white">
              {AUDIT.headline}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
              {AUDIT.body}
            </p>
            <div className="mt-9">
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
