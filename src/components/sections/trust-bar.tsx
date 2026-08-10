"use client";

import { motion } from "framer-motion";

export function TrustBar({ items }: { items: string[] }) {
  if (!items.length) return null;
  const loop = [...items, ...items];

  return (
    <section className="relative z-0 border-b border-border bg-surface py-6 overflow-hidden">
      <div className="container-premium mb-4">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Trusted capabilities across the digital lifecycle
        </p>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface to-transparent" />
        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 28, ease: "linear", repeat: Infinity }}
        >
          {loop.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex h-12 items-center rounded-2xl bg-white px-5 text-sm font-semibold text-navy shadow-soft"
            >
              {item}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
