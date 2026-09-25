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
 * Uses the Solveek atmosphere asset with brand-safe left text space.
 */
export function HeaderBackground({
  mediaClassName = "hero-network",
  glowClassName = "hero-network-glow",
  priority = true,
  objectPosition = "object-[78%_center] sm:object-[70%_center]",
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent sm:via-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
      <div className={cn("absolute inset-0", glowClassName)} />
    </div>
  );
}
