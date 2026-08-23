import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { CtaButton } from "@/components/ui/cta-button";
import { SocialIconLinks } from "@/components/ui/social-icons";
import { BRAND } from "@/constants/brand";
import { footerNav } from "@/constants/navigation";
import { SITE } from "@/constants/site";

export function Footer() {
  return (
    <footer className="gradient-navy text-white">
      <div className="container-premium section-padding">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_auto] lg:items-start lg:gap-16">
          <div>
            <Logo variant="light" size="footer" />
            <p className="mt-5 font-heading text-2xl tracking-tight text-white">
              {SITE.tagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              Digital growth infrastructure for businesses ready to move forward.
            </p>
            <div className="mt-8">
              <CtaButton href={BRAND.primaryCta.href} showArrow>
                {BRAND.primaryCta.label}
              </CtaButton>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              Navigate
            </p>
            <ul className="space-y-3">
              {footerNav.primary.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              Connect
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-sm text-white/70 transition-colors hover:text-white"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="mt-2 block text-sm text-white/70 transition-colors hover:text-white"
            >
              {SITE.phone}
            </a>
            <div className="mt-6">
              <SocialIconLinks linkClassName="inline-flex size-10 items-center justify-center rounded-xl bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="text-xs uppercase tracking-[0.16em] text-white/40">
            {SITE.category}
          </p>
        </div>
      </div>
    </footer>
  );
}
