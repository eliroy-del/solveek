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
        "relative isolate overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28",
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,194,255,0.18),transparent_40%)]" />
      <div className="container-premium relative">
        <Reveal className="max-w-3xl">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-heading text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
              {description}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
