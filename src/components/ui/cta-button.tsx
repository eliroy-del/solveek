import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline-light" | "tertiary";
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
  const isExternal = /^https?:\/\//.test(href);
  const classes = cn(
    "group inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-ui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-royal focus-visible:ring-offset-2",
    variant === "primary" && "bg-royal text-white hover:bg-royal-deep",
    variant === "secondary" &&
      "bg-white text-navy ring-1 ring-border hover:bg-surface",
    variant === "ghost" &&
      "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white/15",
    variant === "outline-light" &&
      "border border-white/35 bg-transparent text-white hover:bg-white/10",
    variant === "tertiary" && "h-auto px-0 text-royal hover:text-royal-deep",
    className
  );

  const content = (
    <>
      {children}
      {showArrow ? (
        <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={classes}>
      {content}
    </Link>
  );
}
