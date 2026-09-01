import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";

export const metadata = { title: "Clients" };

export default async function ClientsPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_clients")
    .select("id, status, total_value, health_label, converted_at, company:crm_companies(name)")
    .is("deleted_at", null)
    .order("converted_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Clients</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Won accounts and ongoing growth relationships.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No clients yet"
          description="Mark an opportunity as Won to convert it into a client record."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white p-4 text-sm">
          <ul className="space-y-2">
            {(data ?? []).map((row) => {
              const company = Array.isArray(row.company)
                ? row.company[0]
                : row.company;
              return (
                <li key={row.id} className="flex justify-between border-b border-border/70 py-2">
                  <span className="font-medium">
                    {(company as { name?: string } | null)?.name ?? "Client"}
                  </span>
                  <span className="text-muted-foreground capitalize">
                    {row.status} · {row.health_label}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
