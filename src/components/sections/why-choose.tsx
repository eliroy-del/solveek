"use client";

import { motion } from "framer-motion";
import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type WhyItem = {
  title: string;
  description: string;
  icon: string;
};

export function WhyChoose({ items }: { items: WhyItem[] }) {
  return (
    <section className="section-padding relative overflow-hidden bg-[#F3F6FC]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 0% 20%, rgba(19,88,254,0.12), transparent 55%), radial-gradient(ellipse 45% 40% at 100% 80%, rgba(77,130,255,0.1), transparent 50%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,15,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,15,31,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 40%, black 20%, transparent 75%)",
        }}
      />

      <div className="container-premium relative">
        <SectionHeading
          eyebrow="Why SOLVEEK"
          title="Digital partnership without the operational fog"
          description="Clarity in every decision. Craft in every interface. Accountability from brief to launch."
          align="center"
          className="mb-10"
        />

        <Reveal delay={0.08} className="mb-14 flex justify-center">
          <PremiumButton href="/contact" showArrow>
            Let&apos;s Talk Growth
          </PremiumButton>
        </Reveal>

        <ul className="mx-auto max-w-3xl divide-y divide-navy/10 border-y border-navy/10">
          {items.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <Reveal key={item.title} delay={Math.min(index * 0.05, 0.3)}>
                <motion.li
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  className="group relative flex gap-5 py-7 sm:gap-7 sm:py-8"
                >
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-royal transition-transform duration-300 group-hover:scale-y-100"
                  />
                  <span className="font-heading text-2xl tracking-tight text-royal/35 transition-colors group-hover:text-royal sm:text-3xl">
                    {number}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-heading text-xl text-navy">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
