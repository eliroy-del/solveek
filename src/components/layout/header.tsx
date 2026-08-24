"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { CtaButton } from "@/components/ui/cta-button";
import { mainNav } from "@/constants/navigation";
import { BRAND } from "@/constants/brand";
import { useScrolled } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";

export function Header() {
  const scrolled = useScrolled(16);
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-border/70 bg-white/95 shadow-[0_8px_30px_rgba(7,11,20,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-premium flex h-18 items-center justify-between gap-4 md:h-20">
        <Logo variant={solid ? "color" : "light"} size="header" />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                solid
                  ? "text-navy/75 hover:text-navy"
                  : "text-white/80 hover:text-white",
                pathname === item.href || pathname.startsWith(`${item.href}/`)
                  ? solid
                    ? "text-navy"
                    : "text-white"
                  : null
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <CtaButton
            href={BRAND.primaryCta.href}
            className={cn(
              "h-11 px-5 text-xs uppercase tracking-[0.12em]",
              !solid && "shadow-[0_12px_28px_rgba(19,88,254,0.45)]"
            )}
          >
            {BRAND.primaryCta.label}
          </CtaButton>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-xl lg:hidden",
            solid ? "bg-surface text-navy" : "bg-white/10 text-white"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border/60 bg-white lg:hidden"
          >
            <nav className="container-premium flex flex-col gap-1 py-4" aria-label="Mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 px-1 pb-2">
                <CtaButton
                  href={BRAND.primaryCta.href}
                  className="w-full text-xs uppercase tracking-[0.12em]"
                  onClick={() => setMobileOpen(false)}
                >
                  {BRAND.primaryCta.label}
                </CtaButton>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
