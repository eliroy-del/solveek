import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className, variant = "dark" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center transition-transform duration-300 hover:scale-[1.02]",
        className
      )}
      aria-label="SOLVEEK home"
    >
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-xl",
          variant === "dark" ? "bg-black px-2.5 py-1.5" : "bg-transparent"
        )}
      >
        <Image
          src="/solveek-logo.png"
          alt="SOLVEEK"
          width={160}
          height={160}
          priority
          unoptimized
          className="h-9 w-auto object-contain sm:h-10"
        />
      </span>
    </Link>
  );
}
