import Link from "next/link";
import { requireCrmUser } from "@/lib/crm/auth";
import {
  CONTENT_EDITOR_ROLES,
  CONTENT_TYPES,
} from "@/lib/crm/content-types";
import { createCrmAuthClient } from "@/lib/supabase/crm-server";

export const metadata = { title: "Content" };

export default async function ContentHubPage() {
  await requireCrmUser([...CONTENT_EDITOR_ROLES]);
  const supabase = await createCrmAuthClient();

  const counts = await Promise.all(
    CONTENT_TYPES.map(async (type) => {
      const { count } = await supabase
        .from(type.table)
        .select("id", { count: "exact", head: true });
      return { key: type.key, count: count ?? 0 };
    })
  );

  const countMap = Object.fromEntries(counts.map((c) => [c.key, c.count]));

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Website content</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          Edit site content here. For Work, Blog, Services, and similar types,
          use Publish to make drafts visible on the live site. Site blocks save
          immediately.
        </p>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {CONTENT_TYPES.map((type) => (
          <Link
            key={type.key}
            href={`/crm/content/${type.key}`}
            className="rounded-xl border border-border bg-white p-4 transition-colors hover:border-royal/40"
          >
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-heading text-lg text-navy">{type.label}</h2>
              <span className="rounded-md bg-surface px-2 py-0.5 text-xs font-medium text-navy">
                {countMap[type.key] ?? 0}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {type.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
