"use client";

import Image from "next/image";
import { CheckCircle2, Play } from "lucide-react";
import { motion } from "framer-motion";
import { IMAGES } from "@/constants/site";
import { PremiumButton } from "@/components/ui/premium-button";
import { Reveal } from "@/components/ui/reveal";

export function AboutPreview({ highlights }: { highlights: string[] }) {
  return (
    <section className="section-padding relative overflow-hidden bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute left-[8%] top-24 h-40 w-40 bg-[radial-gradient(circle,#CBD5E1_1.5px,transparent_1.6px)] [background-size:14px_14px] opacity-60"
      />
      <div className="container-premium grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto max-w-xl">
            <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-4">
              <div className="relative mt-8 overflow-hidden rounded-[28px] shadow-lift">
                <Image
                  src={IMAGES.team}
                  alt="SOLVEEK designers collaborating"
                  width={520}
                  height={640}
                  className="h-[420px] w-full object-cover"
                />
              </div>
              <div className="relative overflow-hidden rounded-[28px] shadow-soft">
                <Image
                  src={IMAGES.teamAlt}
                  alt="SOLVEEK product workshop"
                  width={420}
                  height={520}
                  className="h-[340px] w-full object-cover"
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
              is coherent—from brand story to product experience.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-5">
            <div className="flex items-center gap-3 rounded-2xl border border-border bg-surface px-4 py-3">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
                alt="Amelia Vance"
                width={48}
                height={48}
                className="size-12 rounded-full object-cover"
              />
              <div>
                <p className="font-heading text-lg italic text-royal">Amelia Vance</p>
                <p className="text-xs text-muted-foreground">CEO, SOLVEEK</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8 space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm font-medium text-navy">
                <CheckCircle2 className="size-5 shrink-0 text-royal" />
                {item}
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.2} className="mt-9">
            <PremiumButton href="/about" showArrow>
              Discover our story
            </PremiumButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
