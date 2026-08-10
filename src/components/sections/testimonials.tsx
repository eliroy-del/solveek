import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import type { Testimonial } from "@/types";

export function Testimonials({ items }: { items: Testimonial[] }) {
  if (!items.length) return null;

  return (
    <section className="bg-white px-6 py-10 md:py-12">
      <div className="container-premium">
        <Reveal>
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <h2 className="font-heading text-2xl leading-tight text-navy sm:text-3xl">
              Trusted by teams building modern digital brands
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.06}>
              <figure className="flex h-full flex-col border-t-2 border-royal pt-5">
                <blockquote className="flex-1 font-heading text-lg leading-snug text-navy">
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-navy">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.role}, {item.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
