import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";
import {
  getFeaturedCapabilities,
  getIndustries,
  getServices,
  getTestimonials,
  getTrustItems,
} from "@/lib/content";

export default async function HomePage() {
  const [
    capabilities,
    trustItems,
    services,
    industries,
    testimonials,
  ] = await Promise.all([
    getFeaturedCapabilities(),
    getTrustItems(),
    getServices(),
    getIndustries(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero capabilities={capabilities} />
      <TrustBar items={trustItems} />
      <ServicesGrid items={services} limit={6} />
      <AboutPreview />
      <section className="relative overflow-hidden bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(19,88,254,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(77,130,255,0.1), transparent 30%), linear-gradient(rgba(7,11,20,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(7,11,20,0.04) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 48px 48px, 48px 48px",
          }}
        />
        <IndustriesGrid items={industries} />
      </section>
      <Testimonials items={testimonials} />
      <CtaBanner />
    </>
  );
}
