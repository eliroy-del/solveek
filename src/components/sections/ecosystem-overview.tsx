import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ECOSYSTEM_LAYERS } from "@/constants/brand";
import { cn } from "@/lib/utils";

type EcosystemOverviewProps = {
  compact?: boolean;
};

export function EcosystemOverview({ compact = false }: EcosystemOverviewProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-surface",
        compact ? "py-10" : "section-padding"
      )}
      id="ecosystem"
    >
      <div className="container-premium relative">
        {!compact ? (
          <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <h2 className="title-section text-navy">
                The Solveek Growth Ecosystem
              </h2>
              <p className="mt-2 text-sm text-muted-foreground md:text-base">
                One connected system for presence, operations, and growth.
              </p>
            </div>
            <Link
              href="/ecosystem"
              className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-sm font-semibold text-royal"
            >
              Full ecosystem overview
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        ) : null}

        <ol className="grid gap-3 md:grid-cols-3 md:gap-0">
          {ECOSYSTEM_LAYERS.map((layer, index) => (
            <li
              key={layer.id}
              className={cn(
                "relative rounded-lg bg-white p-5 ring-1 ring-border/80 md:rounded-none md:p-6",
                index === 0 && "md:rounded-l-lg",
                index === ECOSYSTEM_LAYERS.length - 1 && "md:rounded-r-lg",
                index > 0 && "md:border-l md:border-border/80"
              )}
            >
              <div className="flex items-center gap-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-royal">
                  {layer.verb}
                </p>
                {index < ECOSYSTEM_LAYERS.length - 1 ? (
                  <span aria-hidden className="ml-auto hidden text-royal/40 md:inline">
                    →
                  </span>
                ) : null}
              </div>

              <h3 className="mt-3 font-heading text-lg text-navy">{layer.title}</h3>
              <p className="mt-0.5 text-sm font-medium text-navy/75">
                {layer.headline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {layer.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {layer.capabilities.map((cap) => (
                  <li
                    key={cap}
                    className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-navy/70"
                  >
                    {cap}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
