import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { CtaBanner } from "@/components/sections/cta-banner";
import { getInsightBySlug, getInsights } from "@/lib/content";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const insights = await getInsights();
  return insights.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero
        title={article.title}
        description={`${article.author} · ${article.date} · ${article.readTime}`}
        image={article.image}
      />
      <section className="section-padding bg-white">
        <div className="container-premium grid gap-10 lg:grid-cols-[1fr_280px]">
          <Reveal className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed text-muted-foreground">{article.excerpt}</p>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-navy/80">
              <p>
                Strong digital products reward teams that connect brand, experience, and
                delivery. At SOLVEEK, we see the same pattern across high-performing
                companies: clear positioning, intentional UX, and systems that make
                iteration sustainable.
              </p>
              <p>
                This article explores practical moves across design decisions, content systems,
                and product patterns that help teams ship with confidence without
                sacrificing craft.
              </p>
              <p>
                Whether you are launching a website, growing a social presence, building
                an e-commerce engine, or scaling a SaaS product, the advantage comes from
                integrating strategy and execution.
              </p>
            </div>
          </Reveal>
          <aside className="h-fit rounded-3xl border border-border bg-surface p-6">
            <Image
              src={article.image}
              alt=""
              width={400}
              height={280}
              className="mb-4 h-40 w-full rounded-2xl object-cover"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Article details
            </p>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Author</dt>
                <dd className="font-semibold text-navy">{article.author}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-semibold text-navy">{article.category}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Published</dt>
                <dd className="font-semibold text-navy">{article.date}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
