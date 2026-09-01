import Image from "next/image";
import { IMAGES } from "@/constants/site";
import { cn } from "@/lib/utils";

type HeaderBackgroundProps = {
  /** CSS class for the drifting media layer */
  mediaClassName?: string;
  /** CSS class for the pulse glow layer */
  glowClassName?: string;
  /** Prefer loading for above-the-fold heroes */
  priority?: boolean;
  /** Focal point for object-position */
  objectPosition?: string;
};

/**
 * Full-bleed animated header background for hero / page headers.
 * Uses the Solveek network atmosphere asset with brand-safe left text space.
 */
export function HeaderBackground({
  mediaClassName = "hero-network",
  glowClassName = "hero-network-glow",
  priority = true,
  objectPosition = "object-[72%_center] sm:object-center",
}: HeaderBackgroundProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      <div className={cn("absolute inset-0", mediaClassName)}>
        <Image
          src={IMAGES.heroHeader}
          alt=""
          fill
          priority={priority}
          sizes="100vw"
          className={cn("object-cover", objectPosition)}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/88 to-navy/35 sm:via-navy/80 sm:to-navy/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-navy/40" />
      <div className={cn("absolute inset-0", glowClassName)} />
    </div>
  );
}
