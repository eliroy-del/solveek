import { CtaButton } from "@/components/ui/cta-button";
import { BRAND } from "@/constants/brand";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-5 pt-24">
      <div className="max-w-md text-center">
        <p className="eyebrow text-royal">404</p>
        <h1 className="mt-3 font-heading text-2xl text-navy md:text-3xl">
          Looks like we hit a dead end.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Let&apos;s get your digital growth back on track.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row">
          <CtaButton href="/" showArrow>
            Back to Solveek
          </CtaButton>
          <CtaButton href={BRAND.primaryCta.href} variant="secondary">
            {BRAND.primaryCta.label}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
