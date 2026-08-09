"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Insight } from "@/types";

export function InsightsList({ items }: { items: Insight[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );

  const filtered = items.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const haystack = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
    const matchesQuery = haystack.includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const featured = filtered.find((item) => item.featured) ?? filtered[0];
  const rest = filtered.filter((item) => item.slug !== featured?.slug);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search insights"
            className="h-12 w-full rounded-2xl border border-border bg-white pl-11 pr-4 text-sm outline-none ring-royal/30 focus:ring-2"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                category === item
                  ? "bg-[#0A0F1F] text-white"
                  : "bg-surface text-navy hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {featured ? (
        <Link
          href={`/insights/${featured.slug}`}
          className="mb-8 grid overflow-hidden rounded-[28px] border border-border bg-white shadow-soft transition hover:shadow-lift lg:grid-cols-2"
        >
          <div className="relative min-h-[280px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
          <div className="flex flex-col justify-center p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-royal">
              Featured · {featured.category}
            </p>
            <h2 className="mt-3 font-heading text-3xl text-navy">{featured.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              {featured.author} · {featured.date} · {featured.readTime}
            </p>
          </div>
        </Link>
      ) : (
        <p className="rounded-3xl border border-border bg-surface p-8 text-sm text-muted-foreground">
          No articles match your filters.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((item) => (
          <Link
            key={item.slug}
            href={`/insights/${item.slug}`}
            className="group overflow-hidden rounded-[28px] border border-border bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width:1280px) 50vw, 33vw"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-royal">
                {item.category}
              </p>
              <h3 className="mt-2 font-heading text-xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.excerpt}
              </p>
              <p className="mt-4 text-xs text-muted-foreground">
                {item.date} · {item.readTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
