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
        "fixed inset-x-0 top-0 z-50 transition-ui",
        solid
          ? "border-b border-border/70 bg-white/95 shadow-soft backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-premium flex h-16 items-center justify-between gap-4 md:h-18">
        <Logo variant={solid ? "color" : "light"} size="header" />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {mainNav.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-ui",
                  solid
                    ? active
                      ? "bg-surface text-navy"
                      : "text-navy/70 hover:text-navy"
                    : active
                      ? "bg-white/10 text-white"
                      : "text-white/75 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <CtaButton href={BRAND.primaryCta.href} className="h-10 px-4 text-xs">
            {BRAND.primaryCta.label}
          </CtaButton>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-10 cursor-pointer items-center justify-center rounded-lg lg:hidden",
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
            <nav
              className="container-premium flex flex-col gap-0.5 py-3"
              aria-label="Mobile"
            >
              {mainNav.map((item) => {
                const active =
                  pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-surface",
                      active && "bg-surface font-semibold"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <div className="mt-2 border-t border-border px-1 pt-3 pb-1">
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
