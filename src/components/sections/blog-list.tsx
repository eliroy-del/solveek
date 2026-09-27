"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Insight } from "@/types";

export function BlogList({ items }: { items: Insight[] }) {
  const [query, setQuery] = useState("");

  const filtered = items.filter((item) => {
    const haystack = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  const featured = filtered.find((item) => item.featured) ?? filtered[0];
  const rest = filtered.filter((item) => item.slug !== featured?.slug);

  return (
    <div>
      <div className="mb-10">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles"
            className="h-11 w-full rounded-lg border border-border bg-white pl-11 pr-4 text-sm outline-none transition-ui focus:border-royal focus:ring-2 focus:ring-royal/20"
          />
        </div>
      </div>

      {featured ? (
        <Link
          href={`/blog/${featured.slug}`}
          className="mb-8 grid overflow-hidden rounded-xl border border-border bg-white shadow-soft transition-ui hover:shadow-lift lg:grid-cols-2"
        >
          <div className="relative min-h-[240px]">
            <Image
              src={featured.image}
              alt={featured.title}
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h2 className="font-heading text-2xl text-navy md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {featured.excerpt}
            </p>
            <p className="mt-6 text-xs text-muted-foreground">
              {featured.author} · {featured.date} · {featured.readTime}
            </p>
          </div>
        </Link>
      ) : (
        <p className="rounded-xl border border-border bg-surface p-8 text-sm text-muted-foreground">
          No articles match your search.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group overflow-hidden rounded-xl border border-border bg-white shadow-soft transition-ui hover:-translate-y-0.5 hover:shadow-lift"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width:1280px) 50vw, 33vw"
              />
            </div>
            <div className="p-5">
              <h3 className="font-heading text-xl text-navy">{item.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
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
