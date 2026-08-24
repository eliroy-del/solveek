import { CAPABILITIES } from "@/constants/brand";
import { cn } from "@/lib/utils";

export function CapabilitiesSection() {
  const [featured, second, third, fourth, fifth] = CAPABILITIES;

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container-premium">
        <div className="mb-7 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <h2 className="title-section text-navy">What we build</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Five capabilities inside one growth system.
            </p>
          </div>
          <p className="hidden max-w-xs text-right text-xs leading-relaxed text-muted-foreground md:block">
            Not five separate service lines. One connected stack for presence,
            operations, and growth.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-12 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">
          <CapabilityTile
            index={1}
            title={featured.title}
            description={featured.description}
            tone="dark"
            className="md:col-span-5 md:row-span-2"
            featured
          />
          <CapabilityTile
            index={2}
            title={second.title}
            description={second.description}
            className="md:col-span-7"
          />
          <CapabilityTile
            index={3}
            title={third.title}
            description={third.description}
            className="md:col-span-7"
          />
          <CapabilityTile
            index={4}
            title={fourth.title}
            description={fourth.description}
            className="md:col-span-6"
          />
          <CapabilityTile
            index={5}
            title={fifth.title}
            description={fifth.description}
            className="md:col-span-6"
          />
        </div>
      </div>
    </section>
  );
}

function CapabilityTile({
  index,
  title,
  description,
  tone = "light",
  featured = false,
  className,
}: {
  index: number;
  title: string;
  description: string;
  tone?: "light" | "dark";
  featured?: boolean;
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-xl p-4 transition-ui md:p-5",
        dark
          ? "bg-navy text-white"
          : "border border-border bg-surface hover:border-royal/25 hover:bg-white",
        featured && "flex min-h-[220px] flex-col justify-between md:min-h-full md:p-7",
        className
      )}
    >
      {dark ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 top-0 size-44 rounded-full bg-royal/30 blur-3xl transition-ui group-hover:bg-royal/45"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-royal transition-transform duration-300 group-hover:scale-x-100"
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <span
          className={cn(
            "font-heading",
            featured
              ? "text-4xl text-white/20 md:text-5xl"
              : "text-xs text-royal"
          )}
        >
          {String(index).padStart(2, "0")}
        </span>
        {!featured ? (
          <span
            aria-hidden
            className="mt-0.5 size-1.5 rounded-full bg-royal/70 opacity-0 transition-ui group-hover:opacity-100"
          />
        ) : null}
      </div>

      <div className={cn("relative", featured ? "mt-8 md:mt-auto" : "mt-3")}>
        <h3
          className={cn(
            "font-heading leading-snug",
            featured
              ? "text-xl text-white md:text-2xl"
              : "text-base text-navy md:text-lg"
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-2 text-sm leading-relaxed",
            dark ? "max-w-sm text-white/65" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      </div>
    </article>
  );
}
