"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "@/constants/site";
import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";

export function AboutPreview() {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-24 h-40 w-40 bg-[radial-gradient(circle,#CBD5E1_1.5px,transparent_1.6px)] [background-size:14px_14px] opacity-60"
      />
      <div className="container-premium grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto max-w-xl">
            <div className="relative grid grid-cols-[1.1fr_0.9fr] items-stretch gap-4">
              <div className="relative mt-8 min-h-[420px] overflow-hidden rounded-[28px] shadow-lift">
                <Image
                  src={IMAGES.team}
                  alt="Ghanaian developers pair-programming in the office"
                  fill
                  sizes="(max-width: 768px) 60vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[420px] overflow-hidden rounded-[28px] shadow-soft">
                <Image
                  src={IMAGES.code}
                  alt="Software engineers reviewing product code together"
                  fill
                  sizes="(max-width: 768px) 40vw, 280px"
                  className="object-cover"
                />
              </div>
            </div>

            <motion.a
              href="/about"
              whileHover={{ scale: 1.05 }}
              className="absolute right-[8%] top-1/2 z-10 flex size-16 -translate-y-1/2 items-center justify-center rounded-full bg-royal text-white shadow-[0_16px_40px_rgba(19,88,254,0.45)]"
              aria-label="Learn more about SOLVEEK"
            >
              <Play className="ml-0.5 size-6 fill-current" />
            </motion.a>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-royal">
              Who we are
            </p>
            <h2 className="font-heading text-3xl leading-tight text-navy sm:text-4xl lg:text-[2.75rem]">
              We specialise in helping our customers digitise their business
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              SOLVEEK is a technology and design partner for brands that want
              more than a template. We craft websites, social systems,
              e-commerce platforms, and SaaS products that feel premium and
              perform commercially.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our teams blend strategy, design, and engineering so every launch
              is coherent, from brand story to product experience.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-9">
            <PremiumButton href="/about" showArrow>
              Discover our story
            </PremiumButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
