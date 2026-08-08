import { PremiumButton } from "@/components/ui/premium-button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 pt-28">
      <div className="max-w-lg text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-royal">
          404
        </p>
        <h1 className="mt-4 font-heading text-4xl text-navy">
          This route is off the map
        </h1>
        <p className="mt-4 text-muted-foreground">
          The page you requested doesn&apos;t exist. Let&apos;s get you back to a
          known gateway.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <PremiumButton href="/" showArrow>
            Back home
          </PremiumButton>
          <PremiumButton href="/contact" variant="secondary">
            Contact us
          </PremiumButton>
        </div>
      </div>
    </section>
  );
}
