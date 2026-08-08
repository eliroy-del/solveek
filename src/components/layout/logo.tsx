import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
  size?: "header" | "footer";
};

export function Logo({
  className,
  variant = "dark",
  size = "header",
}: LogoProps) {
  const isFooter = size === "footer";

  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
      aria-label="SOLVEEK home"
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-black",
          isFooter ? "p-2.5" : "p-1.5 sm:p-2",
          variant === "light" && "ring-1 ring-white/10"
        )}
      >
        <Image
          src="/solveek-logo.png"
          alt="SOLVEEK"
          width={160}
          height={160}
          priority={size === "header"}
          unoptimized
          className={cn(
            "w-auto object-contain",
            isFooter
              ? "h-24 sm:h-28"
              : "h-[4.25rem] sm:h-[4.75rem] md:h-[5.25rem]"
          )}
        />
      </span>
    </Link>
  );
}
