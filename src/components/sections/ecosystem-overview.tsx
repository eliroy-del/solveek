import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="title-section text-white">
              The Solveek Growth Ecosystem
            </h2>
            <p className="mt-2 body-md text-white/70">
              One connected system for presence, operations, and growth.
            </p>
          </div>
          {!compact ? (
            <Link
              href="/ecosystem"
              className="group inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-base font-semibold text-white"
            >
              Full ecosystem overview
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
