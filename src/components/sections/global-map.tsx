"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const hubs = [
  { name: "Houston", x: "22%", y: "48%" },
  { name: "Rotterdam", x: "48%", y: "32%" },
  { name: "Dubai", x: "62%", y: "52%" },
  { name: "Singapore", x: "78%", y: "62%" },
  { name: "Shanghai", x: "82%", y: "42%" },
  { name: "São Paulo", x: "34%", y: "72%" },
];

export function GlobalMap() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium">
        <SectionHeading
          eyebrow="Coverage"
          title="A connected network across the world’s critical trade lanes"
          description="Hover hubs to explore gateway presence. Animated corridors represent active SOLVEEK lanes."
          align="center"
          className="mb-12"
        />
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] border border-border bg-navy-dark p-4 shadow-lift md:p-8">
            <div
              className="relative aspect-[16/9] w-full rounded-[24px] bg-[radial-gradient(circle_at_30%_30%,rgba(0,87,217,0.35),transparent_35%),radial-gradient(circle_at_70%_60%,rgba(0,194,255,0.2),transparent_40%),linear-gradient(160deg,#081b33,#0a2342)]"
              role="img"
              aria-label="Interactive stylized world map of SOLVEEK hubs"
            >
              <svg
                className="absolute inset-0 h-full w-full opacity-40"
                viewBox="0 0 800 450"
                aria-hidden
              >
                <motion.path
                  d="M180 210 C 280 120, 360 140, 430 170 S 560 230, 650 190"
                  fill="none"
                  stroke="#00C2FF"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  whileInView={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 2 }}
                />
                <motion.path
                  d="M180 220 C 260 280, 340 300, 420 270 S 560 250, 620 300"
                  fill="none"
                  stroke="#0057D9"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0, opacity: 0.2 }}
                  whileInView={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2.2, delay: 0.2 }}
                />
                <motion.path
                  d="M390 150 C 460 180, 520 210, 620 190"
                  fill="none"
                  stroke="#00C2FF"
                  strokeWidth="1.2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1.8, delay: 0.35 }}
                />
              </svg>

              {hubs.map((hub, index) => (
                <button
                  key={hub.name}
                  type="button"
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: hub.x, top: hub.y }}
                  aria-label={`${hub.name} hub`}
                >
                  <span className="relative flex size-3.5 items-center justify-center">
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan/40" />
                    <span className="size-3.5 rounded-full bg-cyan shadow-[0_0_16px_rgba(0,194,255,0.8)]" />
                  </span>
                  <span
                    className="pointer-events-none absolute left-1/2 top-5 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-xs font-semibold text-navy opacity-0 shadow-soft transition group-hover:opacity-100 group-focus-visible:opacity-100"
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {hub.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
