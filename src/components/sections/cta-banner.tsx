import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";

export function CtaBanner() {
  return (
    <section className="section-padding">
      <div className="container-premium">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] gradient-navy px-8 py-16 text-center md:px-16 md:py-20">
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
            <div className="relative mx-auto max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
                Let’s build
              </p>
              <h2 className="font-heading text-3xl text-white sm:text-4xl lg:text-5xl">
                Accelerate innovation with world-class digital solutions
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70">
                Tell us about your website, product, or growth goals. Our team
                will craft a clear plan—design, technology, and delivery included.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4">
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
