"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/data";

export function FaqList() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(faqs.map((item) => item.category)))],
    []
  );

  const filtered = faqs.filter((item) => {
    const matchesCategory = category === "All" || item.category === category;
    const haystack = `${item.question} ${item.answer}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  });

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-md flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search FAQs"
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
                  ? "bg-royal text-white"
                  : "bg-surface text-navy hover:bg-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <Accordion className="space-y-3">
          {filtered.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="rounded-3xl border border-border bg-white px-5 shadow-soft"
            >
              <AccordionTrigger className="py-5 text-left font-heading text-base text-navy hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="rounded-3xl border border-border bg-surface p-8 text-sm text-muted-foreground">
          No FAQs match your search.
        </p>
      )}
    </div>
  );
}
