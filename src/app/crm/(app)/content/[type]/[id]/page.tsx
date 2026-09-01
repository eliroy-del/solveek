import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";
import {
  CONTENT_EDITOR_ROLES,
  getContentType,
} from "@/lib/crm/content-types";
import { ContentEditorForm } from "@/components/crm/content/content-editor-form";
import { StatusBadge } from "@/components/crm/shared/status-badge";

export const metadata = { title: "Edit content" };

export default async function ContentEditPage({
  params,
  searchParams,
}: {
  params: Promise<{ type: string; id: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  const { type, id } = await params;
  const query = await searchParams;
  const { supabase } = await requireCrmUser([...CONTENT_EDITOR_ROLES]);
  const config = getContentType(type);
  if (!config) notFound();

  const isNew = id === "new";
  let record: Record<string, unknown> | null = null;

  if (!isNew) {
    const { data } = await supabase
      .from(config.table)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (!data) notFound();
    record = data as Record<string, unknown>;
  }

  const title = isNew
    ? `New ${config.label}`
    : String(record?.[config.titleField] ?? "Edit");

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <Link href="/crm/content" className="hover:text-royal">
            Content
          </Link>
          {" / "}
          <Link href={`/crm/content/${config.key}`} className="hover:text-royal">
            {config.label}
          </Link>
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-2xl text-navy">{title}</h1>
          {config.hasPublished && record ? (
            <StatusBadge
              tone={record.published ? "success" : "warning"}
            >
              {record.published ? "Published" : "Draft"}
            </StatusBadge>
          ) : null}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {config.hasPublished
            ? "Save drafts freely. Publish when the live site should show this item."
            : "Saving updates the live site immediately."}
        </p>
      </div>

      {query.saved ? (
        <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          Saved successfully.
        </p>
      ) : null}
      {query.error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          Could not save. Check required fields and JSON validity, then try again.
        </p>
      ) : null}

      <ContentEditorForm config={config} record={record} id={id} />
    </div>
  );
}
