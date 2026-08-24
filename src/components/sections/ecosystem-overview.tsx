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
        compact ? "section-padding pt-8" : "section-padding"
      )}
      id="ecosystem"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 0%, rgba(19,88,254,0.08), transparent 40%), radial-gradient(circle at 90% 100%, rgba(7,11,20,0.05), transparent 35%)",
        }}
      />

      <div className="container-premium relative">
        {!compact ? (
          <div className="mb-14 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-royal">
              Growth Ecosystem
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2rem,4vw,3.25rem)] leading-tight text-navy">
              The Solveek Growth Ecosystem
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              One connected ecosystem for your digital presence, business systems
              and growth.
            </p>
          </div>
        ) : null}

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden
            className="absolute left-[1.35rem] top-4 bottom-4 w-px bg-gradient-to-b from-royal via-royal/40 to-royal/10 md:left-1/2 md:-translate-x-px"
          />

          <ol className="space-y-6">
            {ECOSYSTEM_LAYERS.map((layer, index) => (
              <li key={layer.id} className="relative">
                <div
                  className={cn(
                    "grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8",
                    index % 2 === 1 && "md:[&>*:first-child]:order-3"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-2xl bg-white p-6 shadow-soft ring-1 ring-border/80 md:p-8",
                      index % 2 === 1 ? "md:text-left" : "md:text-right"
                    )}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-royal">
                      {layer.number} {layer.verb}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl text-navy">
                      {layer.title}
                    </h3>
                    <p className="mt-1 text-base font-medium text-navy/80">
                      {layer.headline}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {layer.description}
                    </p>
                    <ul
                      className={cn(
                        "mt-5 flex flex-wrap gap-2",
                        index % 2 === 0 && "md:justify-end"
                      )}
                    >
                      {layer.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="rounded-lg bg-surface px-2.5 py-1 text-xs font-medium text-navy/70"
                        >
                          {cap}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative z-10 flex justify-start md:justify-center">
                    <span className="flex size-11 items-center justify-center rounded-full bg-royal font-heading text-sm font-semibold text-white shadow-[0_10px_24px_rgba(19,88,254,0.4)]">
                      {layer.number}
                    </span>
                  </div>

                  <div className="hidden md:block" />
                </div>
              </li>
            ))}
          </ol>

          <div className="relative mt-8 flex flex-col items-start gap-3 pl-14 md:items-center md:pl-0">
            <div className="flex flex-wrap gap-2">
              {["Measure", "Optimize", "Scale"].map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-navy/10 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-navy/70"
                >
                  {label}
                </span>
              ))}
            </div>
            <p className="max-w-md text-sm text-muted-foreground md:text-center">
              Enter at the layer your business needs most. Solveek connects the
              rest.
            </p>
            {!compact ? (
              <Link
                href="/ecosystem"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-royal"
              >
                Explore the full ecosystem
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
