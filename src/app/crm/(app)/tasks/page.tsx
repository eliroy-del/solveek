import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { formatDate } from "@/lib/crm/format";

export const metadata = { title: "Tasks" };

export default async function TasksPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_tasks")
    .select("id, title, status, priority, due_date")
    .is("deleted_at", null)
    .order("due_date", { ascending: true, nullsFirst: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Tasks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Delivery and follow-up work across projects.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No tasks yet"
          description="Tasks will appear here as projects and follow-ups are created."
        />
      ) : (
        <ul className="rounded-xl border border-border bg-white p-4 text-sm">
          {(data ?? []).map((row) => (
            <li key={row.id} className="flex justify-between border-b border-border/70 py-2 last:border-0">
              <span className="font-medium">{row.title}</span>
              <span className="text-xs text-muted-foreground">
                {row.status} · {formatDate(row.due_date)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
