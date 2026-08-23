import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline-light";
  showArrow?: boolean;
  className?: string;
  onClick?: () => void;
};

export function CtaButton({
  href,
  children,
  variant = "primary",
  showArrow = false,
  className,
  onClick,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "btn-shine group inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-royal text-white shadow-[0_12px_30px_rgba(19,88,254,0.35)] hover:-translate-y-0.5 hover:bg-[#0F4AE0]",
        variant === "secondary" &&
          "bg-white text-navy ring-1 ring-border hover:-translate-y-0.5 hover:shadow-soft",
        variant === "ghost" &&
          "bg-white/10 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white/15",
        variant === "outline-light" &&
          "border border-white/35 bg-transparent text-white hover:bg-white/10",
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
