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
      <div className="relative overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          initial={reduce ? false : { scale: 1.08, opacity: 0.85 }}
          animate={
            reduce
              ? { scale: 1, opacity: 1 }
              : {
                  scale: [1.04, 1.1, 1.05],
                  y: ["0%", "1.5%", "-0.8%"],
                  opacity: [0.92, 1, 0.95],
                }
          }
          transition={
            reduce
              ? { duration: 0.6 }
              : {
                  duration: 14,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        >
          <Image
            src={IMAGES.heroHeader}
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_50%_100%,rgba(123,44,191,0.55)_0%,rgba(123,44,191,0.18)_40%,transparent_70%)]"
          animate={
            reduce
              ? undefined
              : {
                  opacity: [0.45, 0.9, 0.55],
                  scale: [1, 1.06, 1.02],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
          style={{ transformOrigin: "50% 100%" }}
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,#000000cc_0%,#00000033_42%,#7B2CBF22_100%)]"
        />

        <div className="container-premium relative flex min-h-[68vh] items-center pb-40 pt-28 lg:min-h-[72vh] lg:pb-48 lg:pt-32">
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
                Let&apos;s Talk Growth
              </PremiumButton>
              <PremiumButton href="/services" variant="ghost">
                Explore services
              </PremiumButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Centered on the dark/light boundary */}
      <div className="pointer-events-none relative z-30 h-0">
        <div className="pointer-events-auto absolute inset-x-0 top-0 -translate-y-1/2">
          <div className="container-premium">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {capabilities.map((item, index) => {
                const Icon = getIcon(item.icon);
                return (
                  <motion.div
                    key={item.slug}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55, delay: 0.2 + index * 0.08 }}
                    className="h-full"
                  >
                    <Link
                      href={`/services/${item.slug}`}
                      className="group flex h-full min-h-[210px] flex-col rounded-2xl border border-border/70 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-royal/20"
                    >
                      <div className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F0E8FA] to-[#E8D5F7] text-[#7B2CBF] transition group-hover:from-[#7B2CBF] group-hover:to-[#9B4DDB] group-hover:text-white">
                        <Icon className="size-4 transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <h2 className="font-heading text-[15px] leading-snug text-navy">
                        {item.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-royal">
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
      </div>

      {/* Spacer so following content clears the hanging cards */}
      <div className="h-[120px] bg-surface md:h-[130px]" aria-hidden />
    </section>
  );
}
