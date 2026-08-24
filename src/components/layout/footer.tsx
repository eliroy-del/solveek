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
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.7fr_auto] lg:items-start lg:gap-12">
          <div>
            <Logo variant="light" size="footer" />
            <p className="mt-4 font-heading text-xl tracking-tight text-white">
              {SITE.tagline}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/65">
              Digital systems for businesses ready to grow.
            </p>
            <div className="mt-6">
              <CtaButton href={BRAND.primaryCta.href} showArrow>
                {BRAND.primaryCta.label}
              </CtaButton>
            </div>
          </div>

          <div>
            <p className="eyebrow mb-3 text-cyan">Navigate</p>
            <ul className="space-y-2">
              {footerNav.primary.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-ui hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-3 text-cyan">Connect</p>
            <a
              href={`mailto:${SITE.email}`}
              className="block text-sm text-white/70 transition-ui hover:text-white"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="mt-1.5 block text-sm text-white/70 transition-ui hover:text-white"
            >
              {SITE.phone}
            </a>
            <div className="mt-4">
              <SocialIconLinks linkClassName="inline-flex size-9 items-center justify-center rounded-lg bg-white/5 text-white/80 ring-1 ring-white/10 transition-ui hover:bg-white/10 hover:text-white" />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </p>
          <p className="uppercase tracking-[0.06em] text-white/40">
            {SITE.category}
          </p>
        </div>
      </div>
    </footer>
  );
}
