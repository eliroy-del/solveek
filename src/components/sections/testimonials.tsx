"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import type { Testimonial } from "@/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length === 0) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5200);
    return () => clearInterval(id);
  }, [paused, items.length]);

  if (!items.length) return null;
  const item = items[index] ?? items[0];

  return (
    <section className="gradient-navy px-6 py-8 md:py-10">
      <div className="container-premium">
        <h2 className="mx-auto mb-5 max-w-xl text-center font-heading text-xl leading-snug text-white sm:text-2xl">
          Trusted by teams building modern digital brands
        </h2>
        <div
          className="mx-auto max-w-lg"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="glass rounded-2xl p-4 text-white md:p-5"
            >
              <div className="mb-2 flex gap-0.5">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-3 fill-warning text-warning" />
                ))}
              </div>
              <blockquote className="font-heading text-base leading-snug md:text-lg">
                “{item.quote}”
              </blockquote>
              <div className="mt-4 flex items-center gap-2.5">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={32}
                  height={32}
                  className="size-8 rounded-lg object-cover"
                />
                <div>
                  <p className="text-sm font-semibold leading-tight">{item.name}</p>
                  <p className="text-[11px] text-white/65">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="mt-3 flex justify-center gap-1.5">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-cyan" : "w-1.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
