"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
      <motion.div
        className="h-full origin-left gradient-royal"
        style={{ scaleX: progress / 100 }}
      />
    </div>
  );
}
