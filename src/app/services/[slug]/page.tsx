import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PremiumButton } from "@/components/ui/premium-button";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ServicePackages } from "@/components/sections/service-packages";
import { getIcon } from "@/lib/icons";
import { getServiceBySlug, getServicePackages, getServices } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = getIcon(service.icon);
  const packages = await getServicePackages(slug);

  const packageCopyBySlug: Record<
    string,
    { quoteService: string; title: string; description: string }
  > = {
    "website-design": {
      quoteService: "Website Design",
      title: "Website design packages built for clear outcomes",
      description:
        "Choose a starting point that matches your scope. Every package includes discovery, design, and a production-ready build.",
    },
    ecommerce: {
      quoteService: "E-commerce",
      title: "E-commerce packages built to sell",
      description:
        "From a focused storefront to a growth-ready commerce system. Every package includes product UX, checkout, and a launch-ready build.",
    },
    "social-media-management": {
      quoteService: "Social Media",
      title: "Social media packages that keep brands consistent",
      description:
        "Strategy, content, and community management with a clear monthly rhythm and reporting.",
    },
    "branding-identity": {
      quoteService: "Branding",
      title: "Branding packages that make you unmistakable",
      description:
        "From a focused identity refresh to a full brand system your team can use everywhere.",
    },
    "seo-content": {
      quoteService: "SEO & Content",
      title: "SEO and content packages that compound",
      description:
        "Technical foundations, content systems, and ongoing optimization built for durable discovery.",
    },
    "maintenance-support": {
      quoteService: "Maintenance & Support",
      title: "Care packages that keep products healthy",
      description:
        "Updates, monitoring, and iterative improvements so your digital products stay secure and fast.",
    },
  };

  const packageCopy = packageCopyBySlug[slug] ?? {
    quoteService: service.title,
    title: `${service.title} packages`,
    description:
      "Choose a starting point that matches your scope. Every package includes discovery, design, and a production-ready build.",
  };

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
      {packages.length ? (
        <ServicePackages
          items={packages}
          quoteService={packageCopy.quoteService}
          title={packageCopy.title}
          description={packageCopy.description}
        />
      ) : null}
      <CtaBanner />
    </>
  );
}
