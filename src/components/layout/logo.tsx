import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark" | "color";
  size?: "header" | "footer";
};

const LOGO_SRC = {
  light: "/solveek-logo.png",
  dark: "/solveek-logo-dark.png",
  color: "/solveek-logo-color.png",
} as const;

export function Logo({
  className,
  variant = "color",
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
      <Image
        src={LOGO_SRC[variant]}
        alt="SOLVEEK"
        width={320}
        height={180}
        priority={size === "header"}
        unoptimized
        className={cn(
          "w-auto object-contain",
          isFooter ? "h-12 sm:h-14" : "h-9 sm:h-10 md:h-11"
        )}
      />
    </Link>
  );
}
