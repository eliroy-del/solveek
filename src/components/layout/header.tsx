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
      <div className="container-premium flex h-14 items-center justify-between gap-4 md:h-16">
        <Logo variant={solid ? "color" : "light"} size="header" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
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
          <CtaButton href={BRAND.primaryCta.href} className="h-9 px-3.5 text-xs">
            {BRAND.primaryCta.label}
          </CtaButton>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-lg lg:hidden",
            solid ? "bg-surface text-navy" : "bg-white/10 text-white"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-4" /> : <Menu className="size-4" />}
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
            <nav className="container-premium flex flex-col gap-0.5 py-3" aria-label="Mobile">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-1.5 px-1 pb-1">
                <CtaButton
                  href={BRAND.primaryCta.href}
                  className="w-full text-xs"
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
