import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { IMAGES } from "@/constants/site";

const QuoteForm = dynamic(
  () =>
    import("@/components/forms/quote-form").then((m) => m.QuoteForm),
  {
    loading: () => (
      <div className="skeleton min-h-[24rem] rounded-[28px]" aria-hidden />
    ),
  }
);

export const metadata: Metadata = {
  title: "Request Quote",
  description:
    "Request a SOLVEEK quote for website design, social media, e-commerce, branding, and digital growth projects.",
};

type Props = {
  searchParams: Promise<{ service?: string; package?: string }>;
};

export default async function QuotePage({ searchParams }: Props) {
  const params = await searchParams;
  const packageName = params.package?.trim();
  const service = params.service?.trim();

  return (
    <>
      <PageHero
        title="Tell us what you want to build. We’ll shape the plan."
        description="Share your goals, timeline, and preferred services. A SOLVEEK specialist will respond with a clear next step."
        image={IMAGES.product}
      />
      <section className="section-padding bg-white">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <div className="rounded-[28px] gradient-navy p-8 text-white">
              <h2 className="font-heading text-3xl">What you can expect</h2>
              <ul className="mt-6 space-y-4 text-sm text-white/75">
                <li>A scoped recommendation across design, tech, and growth</li>
                <li>Clear timeline and delivery milestones</li>
                <li>Transparent commercial options</li>
                <li>A dedicated specialist for next steps</li>
              </ul>
              <div className="mt-8 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
                <p className="text-xs uppercase tracking-[0.18em] text-cyan">
                  Typical turnaround
                </p>
                <p className="mt-2 font-heading text-2xl">Within 1 business day</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-[28px] border border-border bg-surface/40 p-6 shadow-soft md:p-8">
              <QuoteForm
                defaultService={service}
                defaultPackage={packageName}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
