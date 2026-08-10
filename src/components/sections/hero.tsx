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
    <section className="relative isolate">
      <div className="relative overflow-hidden bg-navy-dark">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <Image
            src={IMAGES.hero}
            alt="Ghanaian tech team collaborating around a laptop"
            fill
            priority
            className="object-cover object-[center_30%]"
            sizes="100vw"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-[#070B14]/75 to-[#1358FE]/25" />

        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(19,88,254,0.55)_0%,rgba(77,130,255,0.18)_45%,transparent_70%)] blur-[2px] md:left-[4%] md:h-[640px] md:w-[640px]"
        />

        <div className="container-premium relative flex min-h-[70vh] items-center pb-36 pt-28 lg:min-h-[74vh] lg:pb-44 lg:pt-32">
          <div className="relative z-10 max-w-2xl">
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
              className="font-heading text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              We bring great
              <span className="block">ideas to life</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base"
            >
              SOLVEEK delivers website design, social media management,
              e-commerce, and digital systems that help brands grow with clarity
              and craft.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.18 }}
              className="mt-7 flex flex-wrap gap-3"
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

      {/* Straddles the hero / next-section boundary */}
      <div className="relative z-30 -mt-20 px-0 md:-mt-28">
        <div className="container-premium">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
                    className="group flex h-full flex-col rounded-2xl border border-border/80 bg-white p-4 shadow-[0_16px_40px_rgba(7,11,20,0.14)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(19,88,254,0.18)]"
                  >
                    <div className="mb-3 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#E8F1FF] to-[#D9F6FF] text-royal transition group-hover:from-royal group-hover:to-cyan group-hover:text-white">
                      <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h2 className="font-heading text-base text-navy">
                      {item.title}
                    </h2>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {item.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
                      Learn more
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
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
