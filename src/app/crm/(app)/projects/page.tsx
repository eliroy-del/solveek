import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";

export const metadata = { title: "Projects" };

export default async function ProjectsPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_projects")
    .select("id, name, status, priority, target_completion")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Projects</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Delivery work after opportunities are won.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No projects yet"
          description="Create a project when a client engagement starts implementation."
        />
      ) : (
        <ul className="rounded-xl border border-border bg-white p-4 text-sm">
          {(data ?? []).map((row) => (
            <li key={row.id} className="border-b border-border/70 py-2 last:border-0">
              <p className="font-medium">{row.name}</p>
              <p className="text-xs capitalize text-muted-foreground">
                {row.status} · {row.priority}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
