import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PremiumButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline-light";
  size?: "md" | "lg";
  showArrow?: boolean;
  className?: string;
};

export function PremiumButton({
  href,
  children,
  variant = "primary",
  size = "lg",
  showArrow = false,
  className,
}: PremiumButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "btn-shine group inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2",
        size === "lg" ? "h-11 px-6 text-sm" : "h-10 px-4 text-sm",
        variant === "primary" &&
          "bg-[#1358FE] text-white shadow-[0_12px_30px_rgba(19,88,254,0.35)] hover:-translate-y-0.5 hover:bg-[#0F4AE0] hover:shadow-[0_18px_40px_rgba(19,88,254,0.45)]",
        variant === "secondary" &&
          "bg-white text-navy shadow-soft hover:-translate-y-0.5 hover:shadow-lift",
        variant === "ghost" &&
          "bg-white/10 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/20",
        variant === "outline-light" &&
          "border border-white/40 bg-transparent text-white hover:bg-white/10",
        className
      )}
    >
      {children}
      {showArrow ? (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
