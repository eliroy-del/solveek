import { CtaButton } from "@/components/ui/cta-button";
import { BRAND } from "@/constants/brand";

export default function NotFound() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center px-6 pt-28">
      <div className="max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-royal">
          404
        </p>
        <h1 className="mt-4 font-heading text-4xl text-navy md:text-5xl">
          Looks like we&apos;ve hit a dead end.
        </h1>
        <p className="mt-4 text-muted-foreground">
          Let&apos;s get your digital growth back on track.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
