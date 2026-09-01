import { requireCrmUser } from "@/lib/crm/auth";
import { MetricCard } from "@/components/crm/shared/metric-card";
import { formatGhs } from "@/lib/crm/format";
import { OPEN_OPPORTUNITY_STAGES } from "@/lib/crm/types";

export const metadata = { title: "Reports" };

export default async function ReportsPage() {
  const { supabase } = await requireCrmUser();
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [leads, audits, openOpps, won] = await Promise.all([
    supabase
      .from("crm_leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString())
      .is("deleted_at", null),
    supabase
      .from("crm_audits")
      .select("id", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString())
      .is("deleted_at", null),
    supabase
      .from("crm_opportunities")
      .select("estimated_value, weighted_value")
      .in("stage", OPEN_OPPORTUNITY_STAGES)
      .is("deleted_at", null),
    supabase
      .from("crm_opportunities")
      .select("estimated_value")
      .eq("stage", "won")
      .gte("won_at", startOfMonth.toISOString())
      .is("deleted_at", null),
  ]);

  const pipeline = (openOpps.data ?? []).reduce(
    (sum, row) => sum + Number(row.estimated_value ?? 0),
    0
  );
  const weighted = (openOpps.data ?? []).reduce(
    (sum, row) => sum + Number(row.weighted_value ?? 0),
    0
  );
  const wonValue = (won.data ?? []).reduce(
    (sum, row) => sum + Number(row.estimated_value ?? 0),
    0
  );

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This month snapshot across leads, audits, and pipeline.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        <MetricCard label="Leads this month" value={leads.count ?? 0} />
        <MetricCard label="Audits this month" value={audits.count ?? 0} />
        <MetricCard label="Open pipeline" value={formatGhs(pipeline)} />
        <MetricCard
          label="Weighted pipeline"
          value={formatGhs(weighted)}
          hint="Forecast estimate"
        />
        <MetricCard label="Won this month" value={formatGhs(wonValue)} />
      </div>
    </div>
  );
}
