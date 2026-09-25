import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AuditCta } from "@/components/sections/audit-cta";
import { StructuredData } from "@/components/seo/structured-data";
import { getInsightBySlug, getInsights } from "@/lib/content";
import {
  articleJsonLd,
  buildBreadcrumbs,
  createPageMetadata,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const articles = await getInsights();
  return articles.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) return {};
  return createPageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/blog/${article.slug}`,
    image: article.image,
  });
}

function paragraphs(body: string): string[] {
  return body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function renderBlock(block: string, index: number) {
  if (block.startsWith("### ")) {
    return (
      <h3
        key={`h3-${index}`}
        className="pt-2 font-heading text-xl text-navy md:text-2xl"
      >
        {block.replace(/^###\s+/, "")}
      </h3>
    );
  }

  if (block.startsWith("## ")) {
    return (
      <h2
        key={`h2-${index}`}
        className="pt-4 font-heading text-2xl text-navy md:text-3xl"
      >
        {block.replace(/^##\s+/, "")}
      </h2>
    );
  }

  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul
        key={`ul-${index}`}
        className="list-disc space-y-2 pl-5 text-base leading-relaxed text-navy/75"
      >
        {lines.map((line) => (
          <li key={line}>{line.replace(/^- /, "")}</li>
        ))}
      </ul>
    );
  }

  return (
    <p key={`p-${index}`} className="text-base leading-relaxed text-navy/75">
      {block}
    </p>
  );
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug);
  if (!article) notFound();

  const bodyParagraphs = paragraphs(
    article.body?.trim() ||
      [
        "Strong digital products reward teams that connect brand, experience, and delivery. At Solveek, we see the same pattern across high-performing companies: clear positioning, intentional UX, and systems that make iteration sustainable.",
        "Whether you are launching a website, growing a social presence, building an e-commerce engine, or scaling a SaaS product, the advantage comes from integrating strategy and execution.",
      ].join("\n\n")
  );

  return (
    <>
      <StructuredData
        data={[
          articleJsonLd({
            title: article.title,
            description: article.excerpt,
            path: `/blog/${article.slug}`,
            image: article.image,
            datePublished: article.date,
            author: article.author,
          }),
          buildBreadcrumbs([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: article.title },
          ]),
        ]}
      />

      <article>
        <section className="bg-white pt-28 pb-10 md:pt-32 md:pb-12">
          <div className="container-premium max-w-3xl">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-navy"
            >
              <ArrowLeft className="size-4" />
              All articles
            </Link>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.08em] text-royal">
              {article.category}
            </p>
            <h1 className="mt-3 font-heading text-[clamp(2rem,4vw,3.25rem)] leading-[1.1] text-navy">
              {article.title}
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              {article.author} · {article.date} · {article.readTime}
            </p>
          </div>
        </section>

        <div className="container-premium max-w-3xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-surface">
            <Image
              src={article.image}
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        </div>

        <section className="bg-white section-padding">
          <div className="container-premium max-w-3xl">
            <p className="text-lg leading-relaxed text-navy/80">
              {article.excerpt}
            </p>
            <div className="mt-8 space-y-5">
              {bodyParagraphs.map((block, index) => renderBlock(block, index))}
            </div>
          </div>
        </section>
      </article>

      <AuditCta />
    </>
  );
}
