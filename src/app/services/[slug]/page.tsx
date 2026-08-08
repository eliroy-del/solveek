import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PremiumButton } from "@/components/ui/premium-button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { services } from "@/constants/data";
import { getIcon } from "@/lib/icons";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.description}
        image={service.image}
      />
      <section className="section-padding bg-white">
        <div className="container-premium grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <Reveal>
              <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-surface text-royal">
                <Icon className="size-6" />
              </div>
              <h2 className="font-heading text-3xl text-navy sm:text-4xl">
                How SOLVEEK approaches {service.title.toLowerCase()}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {service.longDescription}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-10">
              <h3 className="font-heading text-xl text-navy">Capabilities</h3>
              <ul className="mt-4 space-y-3">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-royal" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.15} className="mt-10">
              <h3 className="font-heading text-xl text-navy">Business outcomes</h3>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-4">
              <PremiumButton href="/quote" showArrow>
                Request quote
              </PremiumButton>
              <PremiumButton href="/contact" variant="secondary">
                Talk to an expert
              </PremiumButton>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Image
              src={service.image}
              alt={service.title}
              width={800}
              height={1000}
              className="h-[520px] w-full rounded-[28px] object-cover shadow-lift"
            />
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
