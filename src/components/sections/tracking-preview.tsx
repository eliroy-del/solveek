"use client";

import { motion } from "framer-motion";
import {
  FileText,
  MapPinned,
  Navigation,
  Thermometer,
  Truck,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { PremiumButton } from "@/components/ui/premium-button";

const milestones = [
  { label: "Picked up", done: true },
  { label: "Departed origin", done: true },
  { label: "In transit", done: true },
  { label: "Customs", done: false },
  { label: "Out for delivery", done: false },
];

export function TrackingPreview() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-premium grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Visibility"
            title="A live command view for every shipment that matters"
            description="Track milestones, ETAs, documents, and cold-chain telemetry in one premium dashboard experience."
          />
          <Reveal delay={0.1} className="mt-8">
            <PremiumButton href="/tracking" showArrow>
              Open tracking
            </PremiumButton>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="rounded-[28px] border border-border bg-white p-6 shadow-lift md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-royal">
                  Dashboard preview
                </p>
                <h3 className="font-heading text-2xl text-navy">SVK-77201</h3>
              </div>
              <span className="rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">
                ETA 16:40 UTC
              </span>
            </div>

            <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy-dark to-[#0d355f] p-5 text-white">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="size-4 text-cyan" />
                  Frankfurt Hub
                </span>
                <span className="inline-flex items-center gap-2">
                  <Navigation className="size-4 text-cyan" />
                  Lyon DC
                </span>
              </div>
              <div className="relative h-28 rounded-2xl bg-white/5 ring-1 ring-white/10">
                <svg className="absolute inset-0 h-full w-full" aria-hidden>
                  <motion.path
                    d="M20 80 C 80 20, 160 20, 220 55 S 320 100, 380 40"
                    fill="none"
                    stroke="rgba(0,194,255,0.8)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.6 }}
                  />
                </svg>
                <motion.span
                  className="absolute top-[42%] left-[48%] size-3 -translate-x-1/2 rounded-full bg-cyan shadow-[0_0_20px_rgba(0,194,255,0.8)]"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-2">
              {milestones.map((item) => (
                <span
                  key={item.label}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                    item.done
                      ? "bg-success/15 text-success"
                      : "bg-surface text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: Truck, label: "Vehicle", value: "TRK-441 · Refrigerated" },
                { icon: Thermometer, label: "Temperature", value: "4.2°C stable" },
                { icon: FileText, label: "Documents", value: "BOL · Packing list" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-border bg-surface/70 p-4"
                >
                  <Icon className="mb-2 size-4 text-royal" />
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-navy">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
