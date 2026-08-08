import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { AboutPreview } from "@/components/sections/about-preview";
import { ServicesGrid } from "@/components/sections/services-grid";
import { WhyChoose } from "@/components/sections/why-choose";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaBanner } from "@/components/sections/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <AboutPreview />
      <ServicesGrid limit={6} />
      <WhyChoose />
      <section className="relative overflow-hidden bg-surface">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(0,87,217,0.08), transparent 35%), radial-gradient(circle at 80% 0%, rgba(0,194,255,0.1), transparent 30%), linear-gradient(rgba(10,35,66,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(10,35,66,0.04) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 48px 48px, 48px 48px",
          }}
        />
        <IndustriesGrid />
      </section>
      <Process />
      <Stats />
      <FeaturedProjects />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
