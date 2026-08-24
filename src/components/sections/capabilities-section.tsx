import { CAPABILITIES } from "@/constants/brand";
import { cn } from "@/lib/utils";

export function CapabilitiesSection() {
  const [featured, ...rest] = CAPABILITIES;

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

        <div className="grid gap-3 md:grid-cols-6 md:grid-rows-[auto_auto]">
          <article className="group relative overflow-hidden rounded-xl bg-navy p-5 text-white md:col-span-3 md:row-span-2 md:p-7">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 top-0 size-40 rounded-full bg-royal/30 blur-3xl transition-ui group-hover:bg-royal/45"
            />
            <span className="relative font-heading text-4xl text-white/15 md:text-5xl">
              01
            </span>
            <h3 className="relative mt-6 font-heading text-xl text-white md:mt-10 md:text-2xl">
              {featured.title}
            </h3>
            <p className="relative mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              {featured.description}
            </p>
            <div
              aria-hidden
              className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-100 bg-royal transition-transform duration-300 group-hover:scale-x-100"
            />
          </article>

          {rest.map((item, index) => (
            <article
              key={item.title}
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-surface p-4 transition-ui hover:border-royal/30 hover:bg-white md:col-span-3 md:p-5",
                index >= 2 && "md:col-span-1.5"
              )}
              style={
                index >= 2
                  ? { gridColumn: "span 1.5" }
                  : undefined
              }
            >
              {/* Fix: use proper col spans for last two */}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
