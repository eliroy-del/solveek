import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { CookieSettingsButton } from "@/components/analytics/cookie-settings-button";
import { SocialIconLinks } from "@/components/ui/social-icons";
import { mainNav } from "@/constants/navigation";
import { SITE } from "@/constants/site";

const footerLinks = [{ label: "Home", href: "/" }, ...mainNav] as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container-premium flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:py-10">
        <Logo variant="color" size="footer" />

        <nav
          className="flex flex-wrap items-center gap-x-5 gap-y-2 md:justify-center"
          aria-label="Footer"
        >
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-[0.08em] text-navy/70 transition-ui hover:text-royal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <SocialIconLinks
          className="md:justify-end"
          linkClassName="inline-flex size-9 items-center justify-center rounded-lg text-navy/70 transition-ui hover:bg-surface hover:text-royal"
        />
      </div>

      <div className="bg-navy">
        <div className="container-premium flex flex-col items-center justify-center gap-2 py-3.5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-white/70">
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <CookieSettingsButton className="cursor-pointer text-xs text-white/50 transition-ui hover:text-white/80" />
        </div>
      </div>
    </footer>
  );
}
