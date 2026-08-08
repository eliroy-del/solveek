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
        "group inline-flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight",
        variant === "light" ? "text-white" : "text-navy",
        className
      )}
      aria-label="SOLVEEK home"
    >
      <span
        className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-royal shadow-soft transition-transform duration-300 group-hover:scale-105"
        aria-hidden
      >
        <span className="font-heading text-sm font-bold text-white">S</span>
      </span>
      <span>
        SOLVEEK
        <span
          className={cn(
            "mt-0.5 block text-[10px] font-medium uppercase tracking-[0.24em]",
            variant === "light" ? "text-white/70" : "text-muted-foreground"
          )}
        >
          Digital Solutions
        </span>
      </span>
    </Link>
  );
}
