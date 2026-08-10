"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
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
    <section className="gradient-navy px-6 py-14 md:py-16">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Clients"
          title="Trusted by teams building modern digital brands"
          light
          align="center"
          className="mb-8 max-w-2xl"
        />
        <div
          className="mx-auto max-w-xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45 }}
              className="glass rounded-3xl p-5 text-white md:p-6"
            >
              <div className="mb-3 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-3.5 fill-warning text-warning" />
                ))}
              </div>
              <blockquote className="font-heading text-lg leading-snug md:text-xl">
                “{item.quote}”
              </blockquote>
              <div className="mt-5 flex items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-xl object-cover"
                />
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-xs text-white/65">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="mt-4 flex justify-center gap-2">
            {items.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-cyan" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
