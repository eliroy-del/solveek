import Link from "next/link";
import { cn } from "@/lib/utils";

export function CrmEmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  className,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed border-border bg-white px-6 py-12 text-center",
        className
      )}
    >
      <h2 className="font-heading text-lg text-navy">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        {description}
      </p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className="mt-5 inline-flex h-10 items-center rounded-lg bg-royal px-4 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
