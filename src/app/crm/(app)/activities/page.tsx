import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { formatDateTime } from "@/lib/crm/format";

export const metadata = { title: "Activities" };

export default async function ActivitiesPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_activities")
    .select("id, subject, type, occurred_at, status, lead_id")
    .order("occurred_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Activities</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Calls, notes, follow-ups, audits, and system events.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No activities yet"
          description="Activity history builds as leads move through the growth journey."
        />
      ) : (
        <ul className="space-y-2 rounded-xl border border-border bg-white p-4">
          {(data ?? []).map((item) => (
            <li key={item.id} className="border-b border-border/70 py-3 last:border-0">
              <p className="text-sm font-medium text-navy">{item.subject}</p>
              <p className="text-xs text-muted-foreground">
                {formatDateTime(item.occurred_at)} · {item.type} · {item.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
