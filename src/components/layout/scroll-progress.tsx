"use client";

import { useEffect, useState } from "react";
import { useScrollProgress } from "@/hooks/use-scroll";

export function ScrollProgress() {
  const progress = useScrollProgress();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (reduceMotion) return null;

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left gradient-royal"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
