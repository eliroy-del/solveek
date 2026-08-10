import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";

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
                Accelerate innovation with world-class digital solutions
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                Tell us about your website, product, or growth goals. Our team
                will craft a clear plan with design, technology, and delivery included.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <PremiumButton href="/quote" showArrow>
                  Get a free quote
                </PremiumButton>
                <PremiumButton href="/contact" variant="outline-light">
                  Talk to our team
                </PremiumButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
