import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden pt-28 pb-14 md:pt-36 md:pb-20",
        className
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/85 to-navy/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(19,88,254,0.22),transparent_40%)]" />
      <div className="container-premium relative">
        <Reveal className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-heading text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
