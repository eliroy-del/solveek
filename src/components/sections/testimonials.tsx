"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { testimonials } from "@/constants/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => clearInterval(id);
  }, [paused]);

  const item = testimonials[index];

  return (
    <section className="section-padding gradient-navy">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Clients"
          title="Trusted by teams building modern digital brands"
          light
          align="center"
          className="mb-12"
        />
        <div
          className="mx-auto max-w-4xl"
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
              className="glass rounded-[28px] p-8 text-white md:p-12"
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-warning text-warning" />
                ))}
              </div>
              <blockquote className="font-heading text-2xl leading-relaxed md:text-3xl">
                “{item.quote}”
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="size-14 rounded-2xl object-cover"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-white/65">
                    {item.role}, {item.company}
                  </p>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
          <div className="mt-6 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                aria-label={`Show testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-cyan" : "w-2.5 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
