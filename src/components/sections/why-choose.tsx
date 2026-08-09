"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IMAGES } from "@/constants/site";
import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";
import { getIcon } from "@/lib/icons";

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
        className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(10,15,31,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,15,31,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "linear-gradient(90deg, transparent, black 30%)",
        }}
      />

      <div className="container-premium relative grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:col-span-5">
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-royal">
              Why SOLVEEK
            </p>
            <h2 className="font-heading text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]">
              Digital partnership without the operational fog
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Clarity in every decision. Craft in every interface. Accountability
              from brief to launch.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="mt-8">
            <PremiumButton href="/contact" showArrow>
              Start a conversation
            </PremiumButton>
          </Reveal>

          <Reveal delay={0.14} className="mt-10 hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
              <Image
                src={IMAGES.code}
                alt="SOLVEEK team engineering at the workstation"
                fill
                sizes="(max-width: 1024px) 0vw, 420px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy/55 via-transparent to-transparent"
              />
              <p className="absolute bottom-5 left-5 right-5 font-heading text-lg text-white">
                One team for design, build, and growth.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-navy/10 border-y border-navy/10">
            {items.map((item, index) => {
              const Icon = getIcon(item.icon);
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
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-royal shadow-soft transition-colors group-hover:bg-royal group-hover:text-white">
                          <Icon className="size-4" />
                        </span>
                        <div>
                          <h3 className="font-heading text-xl text-navy">
                            {item.title}
                          </h3>
                          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
