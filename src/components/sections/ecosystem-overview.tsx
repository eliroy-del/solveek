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
        compact ? "section-padding pt-6" : "section-padding"
      )}
      id="ecosystem"
    >
      <div className="container-premium relative">
        {!compact ? (
          <div className="mb-10 max-w-xl">
            <p className="eyebrow text-royal">Growth Ecosystem</p>
            <h2 className="mt-2 font-heading text-[clamp(1.6rem,3.2vw,2.25rem)] leading-snug text-navy">
              The Solveek Growth Ecosystem
            </h2>
            <p className="mt-3 text-sm text-muted-foreground sm:text-base">
              One connected setup for your digital presence, business systems,
              and growth.
            </p>
          </div>
        ) : null}

        <div className="relative mx-auto max-w-2xl">
          <div
            aria-hidden
            className="absolute left-4 top-3 bottom-3 w-px bg-royal/25 md:left-1/2 md:-translate-x-px"
          />

          <ol className="space-y-4">
            {ECOSYSTEM_LAYERS.map((layer, index) => (
              <li key={layer.id} className="relative">
                <div
                  className={cn(
                    "grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6",
                    index % 2 === 1 && "md:[&>*:first-child]:order-3"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-xl bg-white p-5 ring-1 ring-border/80",
                      index % 2 === 1 ? "md:text-left" : "md:text-right"
                    )}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-royal">
                      {layer.number} {layer.verb}
                    </p>
                    <h3 className="mt-1.5 font-heading text-lg text-navy">
                      {layer.title}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-navy/80">
                      {layer.headline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                    <ul
                      className={cn(
                        "mt-4 flex flex-wrap gap-1.5",
                        index % 2 === 0 && "md:justify-end"
                      )}
                    >
                      {layer.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-medium text-navy/70"
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 flex justify-start md:justify-center">
                    <span className="flex size-8 items-center justify-center rounded-full bg-royal font-heading text-xs font-semibold text-white">
                      {layer.number}
                    </span>
                  </div>

                  <div className="hidden md:block" />
                </div>
              </li>
            ))}
          </ol>

          <div className="relative mt-6 flex flex-col items-start gap-2.5 pl-12 md:items-center md:pl-0">
            <div className="flex flex-wrap gap-1.5">
              {["Measure", "Optimize", "Scale"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-navy/10 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-navy/70"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="max-w-md text-sm text-muted-foreground md:text-center">
              Start at the layer your business needs most. Solveek connects the
              rest.
            </p>
            {!compact ? (
              <Link
                href="/ecosystem"
                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-royal"
              >
                Explore the full ecosystem
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
