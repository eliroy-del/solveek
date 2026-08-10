"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import {
  mainNavAfterServices,
  mainNavBeforeServices,
} from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { useScrolled } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import type { NavService } from "@/lib/content";
import { SocialIconLinks } from "@/components/ui/social-icons";

export function Header({ services }: { services: NavService[] }) {
  const scrolled = useScrolled(20);
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
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
      <div className="container-premium flex h-20 items-center justify-between gap-4 md:h-24">
        <Logo variant={solid ? "color" : "light"} size="header" />

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
          {mainNavBeforeServices.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                solid
                  ? "text-navy/80 hover:text-navy"
                  : "text-white/85 hover:text-white",
                pathname === item.href && (solid ? "text-navy" : "text-white")
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300",
                  pathname === item.href && "scale-x-100",
                  "hover:scale-x-100",
                  solid ? "bg-royal" : "bg-cyan"
                )}
              />
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              className={cn(
                "group inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                solid
                  ? "text-navy/80 hover:text-navy"
                  : "text-white/85 hover:text-white"
              )}
              aria-expanded={servicesOpen}
            >
              Services
              <ChevronDown
                className={cn(
                  "size-4 transition-transform",
                  servicesOpen && "rotate-180"
                )}
              />
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100",
                  solid ? "bg-royal" : "bg-cyan"
                )}
              />
            </button>

            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-full z-50 w-[720px] -translate-x-1/2 pt-4"
                >
                  <div className="rounded-3xl border border-border bg-white p-6 shadow-lift">
                    <div className="mb-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
                          Capabilities
                        </p>
                        <h3 className="font-heading text-xl text-navy">
                          Digital services built to grow brands
                        </h3>
                      </div>
                      <Link
                        href="/services"
                        className="text-sm font-semibold text-royal hover:underline"
                      >
                        View all services
                      </Link>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {services.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="rounded-2xl px-3 py-3 transition-colors hover:bg-surface"
                        >
                          <p className="text-sm font-semibold text-navy">
                            {child.label}
                          </p>
                          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                            {child.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {mainNavAfterServices.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-xl px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors",
                solid
                  ? "text-navy/80 hover:text-navy"
                  : "text-white/85 hover:text-white",
                pathname === item.href && (solid ? "text-navy" : "text-white")
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full transition-transform duration-300",
                  pathname === item.href && "scale-x-100",
                  "hover:scale-x-100",
                  solid ? "bg-royal" : "bg-cyan"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <a
            href={`tel:${SITE.phone}`}
            className={cn(
              "flex items-center gap-3 rounded-2xl px-3 py-2 transition",
              solid ? "hover:bg-surface" : "hover:bg-white/10"
            )}
          >
            <span
              className={cn(
                "inline-flex size-10 items-center justify-center rounded-xl",
                solid ? "bg-royal/10 text-royal" : "bg-white/15 text-white"
              )}
            >
              <Phone className="size-4" />
            </span>
            <span className="leading-tight">
              <span
                className={cn(
                  "block text-[10px] font-semibold uppercase tracking-[0.16em]",
                  solid ? "text-muted-foreground" : "text-white/70"
                )}
              >
                Contact us
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  solid ? "text-navy" : "text-white"
                )}
              >
                {SITE.phone}
              </span>
            </span>
          </a>
          <SocialIconLinks
            linkClassName={cn(
              "inline-flex size-10 items-center justify-center rounded-xl ring-1 transition",
              solid
                ? "bg-surface text-navy ring-border hover:bg-royal hover:text-white hover:ring-royal"
                : "bg-white/10 text-white ring-white/20 hover:bg-white/20"
            )}
          />
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex size-11 items-center justify-center rounded-2xl xl:hidden",
            solid ? "bg-surface text-navy" : "bg-white/10 text-white"
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
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
            className="border-t border-border bg-white xl:hidden"
          >
            <div className="container-premium flex max-h-[80vh] flex-col gap-2 overflow-y-auto py-6">
              {mainNavBeforeServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mb-2">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-royal">
                  Services
                </p>
                <div className="grid gap-1 sm:grid-cols-2">
                  {services.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl px-3 py-2 text-sm font-medium text-navy hover:bg-surface"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
              {mainNavAfterServices.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-navy hover:bg-surface"
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${SITE.phone}`}
                className="mt-2 rounded-xl bg-surface px-3 py-3 text-sm font-semibold text-navy"
              >
                Call {SITE.phone}
              </a>
              <SocialIconLinks linkClassName="inline-flex size-10 items-center justify-center rounded-xl bg-surface text-navy ring-1 ring-border transition hover:bg-royal hover:text-white hover:ring-royal" />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
