import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
            Content OS
          </p>
          <p className="font-heading text-sm text-navy">This week</p>
        </div>
        <div className="flex gap-1">
          {["IG", "X", "LI"].map((channel) => (
            <span
              key={channel}
              className="rounded-md bg-white px-1.5 py-1 text-[9px] font-semibold text-navy shadow-sm"
            >
              {channel}
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
    <div className="flex h-full flex-col bg-white p-4">
      <div className="mb-3 flex items-center gap-1.5 rounded-t-xl border border-border bg-[#F4F6FB] px-3 py-2">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 h-3 flex-1 rounded-full bg-white" />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden rounded-b-xl border border-t-0 border-border">
        <div className="bg-gradient-to-br from-navy to-[#13224A] px-4 py-5 text-white">
          <p className="text-[10px] uppercase tracking-[0.16em] text-white/50">
            BrightPath
          </p>
          <p className="mt-1 font-heading text-base leading-snug">
            Learn with clarity
          </p>
          <div className="mt-3 h-6 w-20 rounded-lg bg-royal" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 p-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-surface p-2">
              <div className="mb-2 h-8 rounded-md bg-royal/10" />
              <div className="h-1.5 w-full rounded-full bg-navy/10" />
              <div className="mt-1.5 h-1.5 w-2/3 rounded-full bg-navy/10" />
            </div>
          ))}
        </div>
      </div>
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
