import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ECOSYSTEM_LAYERS } from "@/constants/brand";
import { IMAGES } from "@/constants/site";
import { cn } from "@/lib/utils";

type EcosystemOverviewProps = {
  compact?: boolean;
};

export function EcosystemOverview({ compact = false }: EcosystemOverviewProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        compact ? "py-10" : "section-padding"
      )}
      id="ecosystem"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={IMAGES.ecosystemTeam}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-navy/78" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/55 via-transparent to-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/35" />
      </div>

      <div className="container-premium relative">
        {!compact ? (
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="title-section text-white">
                The Solveek Growth Ecosystem
              </h2>
              <p className="mt-2 body-md text-white/70">
                One connected system for presence, operations, and growth.
              </p>
            </div>
            <Link
              href="/ecosystem"
              className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-base font-semibold text-cyan"
            >
              Full ecosystem overview
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : null}

        <ol className="grid gap-3 md:grid-cols-3 md:gap-0">
          {ECOSYSTEM_LAYERS.map((layer, index) => {
            const tone =
              layer.id === "foundation"
                ? {
                    card: "bg-[#EEF3FF]/95 ring-royal/25",
                    label: "text-royal",
                    arrow: "text-royal/40",
                    pill: "bg-white/80 text-royal-deep",
                  }
                : layer.id === "automation"
                  ? {
                      card: "bg-[#E8F4FF]/95 ring-cyan/30",
                      label: "text-[#1A6BDB]",
                      arrow: "text-cyan/50",
                      pill: "bg-white/80 text-[#0F4AE0]",
                    }
                  : {
                      card: "bg-[#ECF8F1]/95 ring-emerald-500/25",
                      label: "text-emerald-700",
                      arrow: "text-emerald-600/40",
                      pill: "bg-white/80 text-emerald-900",
                    };

            return (
              <li
                key={layer.id}
                className={cn(
                  "relative rounded-lg p-5 shadow-soft ring-1 backdrop-blur-sm md:rounded-none md:p-7 md:shadow-none",
                  tone.card,
                  index === 0 && "md:rounded-l-lg",
                  index === ECOSYSTEM_LAYERS.length - 1 && "md:rounded-r-lg",
                  index > 0 && "md:border-l md:border-white/40"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <p className={cn("eyebrow", tone.label)}>{layer.verb}</p>
                  {index < ECOSYSTEM_LAYERS.length - 1 ? (
                    <span
                      aria-hidden
                      className={cn("ml-auto hidden md:inline", tone.arrow)}
                    >
                      →
                    </span>
                  ) : null}
                </div>

                <h3 className="mt-3 font-heading text-xl text-navy md:text-2xl">
                  {layer.title}
                </h3>
                <p className="mt-1 text-base font-medium text-navy/75">
                  {layer.headline}
                </p>
                <p className="mt-3 text-base leading-relaxed text-navy/65">
                  {layer.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {layer.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className={cn(
                        "rounded-md px-2.5 py-1 text-xs font-medium",
                        tone.pill
                      )}
                    >
                      {cap}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
