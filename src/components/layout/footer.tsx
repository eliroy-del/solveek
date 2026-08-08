import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { footerNav } from "@/constants/navigation";
import { SITE } from "@/constants/site";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import type { NavService } from "@/lib/content";

export function Footer({ services }: { services: NavService[] }) {
  const serviceLinks = services.slice(0, 6).map((service) => ({
    label: service.label,
    href: service.href,
  }));

  return (
    <footer className="gradient-navy text-white">
      <div className="container-premium section-padding">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,0.8fr)] lg:gap-10">
          <div>
            <Logo variant="light" size="footer" />
            <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">
              {SITE.description}
            </p>
            <p className="mt-4 font-heading text-lg text-white">
              {SITE.tagline}
            </p>
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
                Newsletter
              </p>
              <NewsletterForm />
            </div>
          </div>

          <FooterColumn title="Company" links={footerNav.company} />
          <FooterColumn title="Services" links={serviceLinks} />
          <FooterColumn title="Resources" links={footerNav.resources} />
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/10 pt-10 md:grid-cols-[1fr_auto] md:items-center">
          <div className="space-y-2 text-sm text-white/60">
            <p>
              © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              {footerNav.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {[
              { href: SITE.social.linkedin, label: "in", name: "LinkedIn" },
              { href: SITE.social.twitter, label: "X", name: "X" },
              { href: SITE.social.youtube, label: "YT", name: "YouTube" },
              { href: SITE.social.instagram, label: "IG", name: "Instagram" },
            ].map(({ href, label, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={name}
                className="inline-flex size-10 items-center justify-center rounded-xl bg-white/5 text-xs font-bold text-white/80 ring-1 ring-white/10 transition hover:bg-white/10 hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
        {title}
      </p>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
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
  );
}
