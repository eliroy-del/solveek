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
    "group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-ui focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7B2CBF] focus-visible:ring-offset-2 md:text-[0.95rem]",
    variant === "primary" &&
      "bg-[#7B2CBF] text-white hover:bg-[#3C1361] hover:shadow-[0_12px_28px_rgba(60,19,97,0.28)]",
    variant === "secondary" &&
      "bg-white text-[#11112F] ring-1 ring-border hover:bg-[#7B2CBF] hover:text-white hover:ring-[#7B2CBF]",
    variant === "ghost" &&
      "bg-white/10 text-white ring-1 ring-white/25 hover:bg-white hover:text-[#11112F]",
    variant === "outline-light" &&
      "border border-white/35 bg-transparent text-white hover:border-white hover:bg-white hover:text-[#11112F]",
    variant === "tertiary" && "h-auto px-0 text-[#7B2CBF] hover:text-[#3C1361]",
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
