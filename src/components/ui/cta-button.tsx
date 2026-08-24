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
        "group inline-flex h-10 items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2",
        variant === "primary" &&
          "bg-royal text-white hover:bg-[#0F4AE0]",
        variant === "secondary" &&
          "bg-white text-navy ring-1 ring-border hover:bg-surface",
        variant === "ghost" &&
          "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15",
        variant === "outline-light" &&
          "border border-white/35 bg-transparent text-white hover:bg-white/10",
        className
      )}
    >
      {children}
      {showArrow ? (
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </Link>
  );
}
