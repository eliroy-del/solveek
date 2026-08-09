import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PreviewKind = "ecommerce" | "saas" | "social" | "website";

function resolveKind(slug: string, industry: string): PreviewKind {
  const key = `${slug} ${industry}`.toLowerCase();
  if (key.includes("commerce") || key.includes("e-commerce") || key.includes("ecommerce")) {
    return "ecommerce";
  }
  if (key.includes("saas") || key.includes("analytics") || key.includes("pulse")) {
    return "saas";
  }
  if (key.includes("social") || key.includes("atelier")) {
    return "social";
  }
  return "website";
}

function EcommercePreview() {
  return (
    <div className="flex h-full flex-col bg-[#F7F4EF] p-4">
      <div className="mb-3 flex items-center justify-between rounded-xl bg-white px-3 py-2 shadow-sm">
        <span className="font-heading text-[11px] font-semibold tracking-wide text-navy">
          NORTHLINE
        </span>
        <div className="flex gap-1.5">
          <span className="h-1.5 w-8 rounded-full bg-navy/10" />
          <span className="h-1.5 w-8 rounded-full bg-navy/10" />
          <span className="size-4 rounded-full bg-royal/15" />
        </div>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-2.5">
        {[
          { tone: "bg-[#D9C7B2]", label: "Linen Set" },
          { tone: "bg-[#1F2937]", label: "Studio Jacket" },
          { tone: "bg-[#B8C4B0]", label: "Weekend Tee" },
          { tone: "bg-[#C4A484]", label: "Travel Tote" },
        ].map((item) => (
          <div
            key={item.label}
            className="overflow-hidden rounded-xl bg-white shadow-sm"
          >
            <div className={cn("h-14", item.tone)} />
            <div className="space-y-1.5 p-2">
              <p className="text-[10px] font-semibold text-navy">{item.label}</p>
              <div className="h-1.5 w-10 rounded-full bg-navy/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaasPreview() {
  return (
    <div className="flex h-full flex-col bg-[#0B1220] p-4 text-white">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
            Pulseboard
          </p>
          <p className="font-heading text-sm">Activation overview</p>
        </div>
        <span className="rounded-full bg-royal px-2.5 py-1 text-[10px] font-semibold">
          Live
        </span>
      </div>
      <div className="mb-3 grid grid-cols-3 gap-2">
        {[
          { label: "Activation", value: "68%" },
          { label: "Trials", value: "1.2k" },
          { label: "NPS", value: "54" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-white/10 bg-white/5 px-2.5 py-2"
          >
            <p className="text-[9px] text-white/45">{stat.label}</p>
            <p className="font-heading text-base">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="relative flex flex-1 items-end gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 pb-3 pt-6">
        {[40, 55, 48, 72, 64, 88, 76, 92].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-md bg-gradient-to-t from-royal to-[#4D82FF]"
            style={{ height: `${h}%` }}
          />
        ))}
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

const PREVIEWS: Record<PreviewKind, () => React.ReactNode> = {
  ecommerce: EcommercePreview,
  saas: SaasPreview,
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
