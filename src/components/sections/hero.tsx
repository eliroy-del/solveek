"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/constants/site";
import { getIcon } from "@/lib/icons";
import { PremiumButton } from "@/components/ui/premium-button";

type Capability = {
  slug: string;
  title: string;
  description: string;
  icon: string;
};

export function Hero({ capabilities }: { capabilities: Capability[] }) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate overflow-hidden bg-navy-dark">
      <div className="relative min-h-[88vh] lg:min-h-[92vh]">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={IMAGES.hero}
            alt="Accra skyline and modern Ghanaian city life"
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#070B14]/75 to-[#1358FE]/25" />

        {/* Soft blue circular accent */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(19,88,254,0.55)_0%,rgba(77,130,255,0.18)_45%,transparent_70%)] blur-[2px] md:left-[4%] md:h-[640px] md:w-[640px]"
        />

        <div className="container-premium relative flex min-h-[88vh] items-center pb-40 pt-36 lg:min-h-[92vh] lg:pb-48 lg:pt-40">
          <div className="relative z-10 max-w-2xl">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="font-heading text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl"
            >
              We bring great
              <span className="block">ideas to life</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg"
            >
              SOLVEEK delivers website design, social media management,
              e-commerce, SaaS products, and digital systems that help brands
              grow with clarity and craft.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              <PremiumButton href="/quote" showArrow>
                Start a project
              </PremiumButton>
              <PremiumButton href="/services" variant="ghost">
                Explore services
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Overlapping capability cards */}
      <div className="relative z-20 -mt-28 pb-6 md:-mt-36">
        <div className="container-premium">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {capabilities.map((item, index) => {
              const Icon = getIcon(item.icon);
              return (
                <motion.div
                  key={item.slug}
                  initial={reduce ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.2 + index * 0.08 }}
                >
                  <Link
                    href={`/services/${item.slug}`}
                    className="group flex h-full flex-col rounded-[24px] border border-white/70 bg-white p-6 shadow-[0_18px_50px_rgba(7,11,20,0.14)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(19,88,254,0.18)]"
                  >
                    <div className="mb-5 inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#E8F1FF] to-[#D9F6FF] text-royal transition group-hover:from-royal group-hover:to-cyan group-hover:text-white">
                      <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h2 className="font-heading text-lg text-navy">{item.title}</h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                      Learn more
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
