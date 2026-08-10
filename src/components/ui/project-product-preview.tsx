import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
} from "@/components/ui/social-icons";

type PreviewKind = "ecommerce" | "branding" | "social" | "website";

function resolveKind(slug: string, industry: string): PreviewKind {
  const key = `${slug} ${industry}`.toLowerCase();
  if (key.includes("commerce") || key.includes("e-commerce") || key.includes("ecommerce")) {
    return "ecommerce";
  }
  if (key.includes("brand") || key.includes("lumen") || key.includes("identity")) {
    return "branding";
  }
  if (key.includes("social") || key.includes("atelier")) {
    return "social";
  }
  return "website";
}

function EcommercePreview() {
  return (
    <div className="relative h-full w-full bg-[#F7F4EF]">
      <Image
        src="/images/project-northline-commerce.png"
        alt="Customer shopping an apparel storefront on a laptop"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

function BrandingPreview() {
  return (
    <div className="flex h-full flex-col bg-[#F7F4EF] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-navy/45">
            Brand system
          </p>
          <p className="font-heading text-sm text-navy">Lumen Identity</p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-xl bg-navy text-xs font-bold tracking-wide text-white">
          LN
        </div>
      </div>

      <div className="mb-3 grid grid-cols-4 gap-2">
        {[
          "bg-[#1358FE]",
          "bg-[#0B1220]",
          "bg-[#C4A484]",
          "bg-[#E8EEF8]",
        ].map((tone) => (
          <div key={tone} className={cn("h-10 rounded-lg", tone)} />
        ))}
      </div>

      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="rounded-xl bg-white p-3 shadow-sm">
          <p className="font-heading text-2xl leading-none text-navy">Aa</p>
          <p className="mt-2 text-[10px] text-muted-foreground">Display</p>
          <div className="mt-2 h-1.5 w-12 rounded-full bg-navy/10" />
        </div>
        <div className="rounded-xl bg-navy p-3 text-white shadow-sm">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
            Voice
          </p>
          <p className="mt-2 font-heading text-sm leading-snug">
            Clear. Warm. Confident.
          </p>
        </div>
      </div>
    </div>
  );
}

function SocialPreview() {
  return (
    <div className="flex h-full flex-col bg-[#F4F6FB] p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-royal">
            Social management
          </p>
          <p className="font-heading text-sm text-navy">This week</p>
        </div>
        <div className="flex gap-1">
          {[InstagramIcon, FacebookIcon, LinkedInIcon].map((Icon, index) => (
            <span
              key={index}
              className="inline-flex size-6 items-center justify-center rounded-md bg-white text-navy shadow-sm"
            >
              <Icon className="size-3" />
            </span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-1.5">
        {Array.from({ length: 14 }).map((_, i) => {
          const filled = [0, 2, 3, 5, 8, 10, 12].includes(i);
          return (
            <div
              key={i}
              className={cn(
                "rounded-lg border",
                filled
                  ? "border-royal/20 bg-royal/10"
                  : "border-border bg-white"
              )}
            >
              {filled ? (
                <div className="m-1 h-full min-h-8 rounded-md bg-royal/80" />
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
        <span className="text-[11px] font-medium text-navy">Engagement</span>
        <span className="font-heading text-sm text-royal">+3.2x</span>
      </div>
    </div>
  );
}

function WebsitePreview() {
  return (
    <div className="relative h-full w-full bg-[#0B1220]">
      <Image
        src="/images/project-brightpath-website.png"
        alt="Developer working on website code on a laptop"
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

const PREVIEWS: Record<PreviewKind, () => ReactNode> = {
  ecommerce: EcommercePreview,
  branding: BrandingPreview,
  social: SocialPreview,
  website: WebsitePreview,
};

export function ProjectProductPreview({
  slug,
  industry,
  className,
}: {
  slug: string;
  industry: string;
  className?: string;
}) {
  const Preview = PREVIEWS[resolveKind(slug, industry)];

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Preview />
    </div>
  );
}
