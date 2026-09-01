import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";
import {
  CONTENT_EDITOR_ROLES,
  getContentType,
} from "@/lib/crm/content-types";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { togglePublishContent } from "@/app/crm/(app)/content/actions";

export const metadata = { title: "Content type" };

export default async function ContentTypeListPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string; error?: string }>;
}) {
  const { type } = await params;
  const query = await searchParams;
  const { supabase } = await requireCrmUser([...CONTENT_EDITOR_ROLES]);
  const config = getContentType(type);
  if (!config) notFound();

  let request = supabase.from(config.table).select("*");
  if (config.orderBy) {
    request = request.order(config.orderBy.column, {
      ascending: config.orderBy.ascending ?? true,
    });
  }
  const { data: rows } = await request;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <Link href="/crm/content" className="hover:text-royal">
              Content
            </Link>
          </p>
          <h1 className="font-heading text-2xl text-navy">{config.label}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {config.description}
          </p>
        </div>
        <Link
          href={`/crm/content/${config.key}/new`}
          className="inline-flex h-10 items-center rounded-lg bg-royal px-4 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Add {config.label.toLowerCase()}
        </Link>
      </div>

      {query.saved ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Saved. Published items are live on the site.
        </p>
      ) : null}
      {query.deleted ? (
        <p className="rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy">
          Deleted.
        </p>
      ) : null}
      {query.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Something went wrong. Try again.
        </p>
      ) : null}

      {(rows ?? []).length === 0 ? (
        <CrmEmptyState
          title={`No ${config.label.toLowerCase()} yet`}
          description="Create the first item, then publish it when ready for the live site."
          actionHref={`/crm/content/${config.key}/new`}
          actionLabel="Create"
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Item</th>
                {config.hasPublished ? (
                  <th className="px-4 py-3 font-medium">Status</th>
                ) : null}
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map((row) => {
                const title = String(
                  row[config.titleField] ?? row.id ?? "Untitled"
                );
                const isPublished = Boolean(row.published);
                return (
                  <tr key={row.id} className="border-b border-border/70">
                    <td className="px-4 py-3">
                      <Link
                        href={`/crm/content/${config.key}/${row.id}`}
                        className="font-medium text-navy hover:text-royal"
                      >
                        {title}
                      </Link>
                      {"slug" in row && row.slug ? (
                        <p className="text-xs text-muted-foreground">
                          /{String(row.slug)}
                        </p>
                      ) : null}
                    </td>
                    {config.hasPublished ? (
                      <td className="px-4 py-3">
                        <StatusBadge tone={isPublished ? "success" : "warning"}>
                          {isPublished ? "Published" : "Draft"}
                        </StatusBadge>
                      </td>
                    ) : null}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/crm/content/${config.key}/${row.id}`}
                          className="text-sm font-medium text-royal"
                        >
                          Edit
                        </Link>
                        {config.hasPublished ? (
                          <form action={togglePublishContent}>
                            <input type="hidden" name="type" value={config.key} />
                            <input type="hidden" name="id" value={row.id} />
                            <input
                              type="hidden"
                              name="published"
                              value={isPublished ? "false" : "true"}
                            />
                            <button
                              type="submit"
                              className="text-sm font-medium text-navy"
                            >
                              {isPublished ? "Unpublish" : "Publish"}
                            </button>
                          </form>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
