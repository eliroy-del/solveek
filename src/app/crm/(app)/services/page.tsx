import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { formatGhs } from "@/lib/crm/format";

export const metadata = { title: "Services" };

export default async function ServicesPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_services")
    .select("id, name, ecosystem_layer, pricing_type, base_price, is_recurring, is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Services</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Solveek Growth Ecosystem catalogue used across opportunities and retainers.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No services configured"
          description="Seeded services should appear after the CRM migration."
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {(data ?? []).map((row) => (
            <article
              key={row.id}
              className="rounded-xl border border-border bg-white p-4"
            >
              <h2 className="font-heading text-lg text-navy">{row.name}</h2>
              <p className="mt-1 text-sm capitalize text-muted-foreground">
                {row.ecosystem_layer} · {row.pricing_type.replace("_", " ")}
                {row.is_recurring ? " · recurring" : ""}
              </p>
              {row.base_price != null ? (
                <p className="mt-2 text-sm font-medium">
                  From {formatGhs(row.base_price)}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
