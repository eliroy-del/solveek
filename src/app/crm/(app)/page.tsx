import Link from "next/link";
import { requireCrmUser } from "@/lib/crm/auth";
import { MetricCard } from "@/components/crm/shared/metric-card";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import { displayName, formatDateTime, formatGhs } from "@/lib/crm/format";
import {
  LEAD_STATUS_LABELS,
  OPEN_OPPORTUNITY_STAGES,
  type CrmLeadStatus,
} from "@/lib/crm/types";

export const metadata = { title: "Dashboard" };

export default async function CrmDashboardPage() {
  const { supabase } = await requireCrmUser();
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    newLeads,
    followUps,
    overdueActivities,
    newAudits,
    openOpps,
    pipelineRows,
    wonThisMonth,
    recentActivities,
    tasksDueToday,
  ] = await Promise.all([
    supabase
      .from("crm_leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new")
      .is("deleted_at", null),
    supabase
      .from("crm_leads")
      .select("id", { count: "exact", head: true })
      .lte("next_follow_up_at", tomorrow.toISOString())
      .gte("next_follow_up_at", today.toISOString())
      .is("deleted_at", null),
    supabase
      .from("crm_activities")
      .select("id", { count: "exact", head: true })
      .eq("status", "planned")
      .lt("due_at", today.toISOString()),
    supabase
      .from("crm_audits")
      .select("id", { count: "exact", head: true })
      .eq("status", "submitted")
      .is("deleted_at", null),
    supabase
      .from("crm_opportunities")
      .select("id", { count: "exact", head: true })
      .in("stage", OPEN_OPPORTUNITY_STAGES)
      .is("deleted_at", null),
    supabase
      .from("crm_opportunities")
      .select("estimated_value, weighted_value, stage")
      .in("stage", OPEN_OPPORTUNITY_STAGES)
      .is("deleted_at", null),
    supabase
      .from("crm_opportunities")
      .select("estimated_value")
      .eq("stage", "won")
      .gte("won_at", startOfMonth.toISOString())
      .is("deleted_at", null),
    supabase
      .from("crm_activities")
      .select("id, subject, type, occurred_at, lead_id")
      .order("occurred_at", { ascending: false })
      .limit(8),
    supabase
      .from("crm_tasks")
      .select("id", { count: "exact", head: true })
      .eq("due_date", today.toISOString().slice(0, 10))
      .neq("status", "completed")
      .is("deleted_at", null),
  ]);

  const pipelineValue = (pipelineRows.data ?? []).reduce(
    (sum, row) => sum + Number(row.estimated_value ?? 0),
    0
  );
  const weightedPipeline = (pipelineRows.data ?? []).reduce(
    (sum, row) => sum + Number(row.weighted_value ?? 0),
    0
  );
  const wonValue = (wonThisMonth.data ?? []).reduce(
    (sum, row) => sum + Number(row.estimated_value ?? 0),
    0
  );

  const { data: actionLeads } = await supabase
    .from("crm_leads")
    .select("id, first_name, last_name, company_name, status, next_follow_up_at, score")
    .is("deleted_at", null)
    .in("status", ["new", "contacted", "qualified", "nurture"])
    .order("created_at", { ascending: false })
    .limit(6);

  const attentionItems = [
    {
      label: `${newLeads.count ?? 0} new leads need attention`,
      href: "/crm/leads?status=new",
    },
    {
      label: `${followUps.count ?? 0} follow-ups due today`,
      href: "/crm/leads",
    },
    {
      label: `${newAudits.count ?? 0} audits awaiting review`,
      href: "/crm/audits?status=submitted",
    },
    {
      label: `${overdueActivities.count ?? 0} overdue activities`,
      href: "/crm/activities",
    },
  ].filter((item) => !item.label.startsWith("0 "));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl text-navy">Today</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          What needs attention across the Solveek growth journey.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="New leads" value={newLeads.count ?? 0} />
        <MetricCard label="Follow-ups due" value={followUps.count ?? 0} />
        <MetricCard label="Audit submissions" value={newAudits.count ?? 0} />
        <MetricCard label="Tasks due today" value={tasksDueToday.count ?? 0} />
      </div>

      <div>
        <h2 className="font-heading text-lg text-navy">Sales snapshot</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Open opportunities" value={openOpps.count ?? 0} />
          <MetricCard label="Pipeline value" value={formatGhs(pipelineValue)} />
          <MetricCard
            label="Weighted pipeline"
            value={formatGhs(weightedPipeline)}
            hint="Forecast estimate, not guaranteed revenue"
          />
          <MetricCard label="Won this month" value={formatGhs(wonValue)} />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy">Action required</h2>
            <Link href="/crm/leads" className="text-sm font-medium text-royal">
              View leads
            </Link>
          </div>
          {attentionItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Nothing urgent right now. Keep working the pipeline.
            </p>
          ) : (
            <ul className="space-y-2">
              {attentionItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="block rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:border-royal/40 hover:bg-surface"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-xl border border-border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg text-navy">Recent activity</h2>
            <Link
              href="/crm/activities"
              className="text-sm font-medium text-royal"
            >
              View all
            </Link>
          </div>
          {(recentActivities.data ?? []).length === 0 ? (
            <CrmEmptyState
              title="No activity yet"
              description="Website enquiries and Digital Growth Audit submissions will appear here."
            />
          ) : (
            <ul className="space-y-3">
              {(recentActivities.data ?? []).map((activity) => (
                <li key={activity.id} className="text-sm">
                  <p className="font-medium text-navy">{activity.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDateTime(activity.occurred_at)} · {activity.type}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section className="rounded-xl border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-heading text-lg text-navy">Latest leads</h2>
          <Link
            href="/crm/leads/new"
            className="text-sm font-medium text-royal"
          >
            Add lead
          </Link>
        </div>
        {(actionLeads ?? []).length === 0 ? (
          <CrmEmptyState
            title="No leads yet"
            description="New website enquiries and Digital Growth Audit submissions will appear here."
            actionHref="/crm/leads/new"
            actionLabel="Add lead"
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 font-medium">Lead</th>
                  <th className="px-2 py-2 font-medium">Company</th>
                  <th className="px-2 py-2 font-medium">Status</th>
                  <th className="px-2 py-2 font-medium">Score</th>
                  <th className="px-2 py-2 font-medium">Follow-up</th>
                </tr>
              </thead>
              <tbody>
                {(actionLeads ?? []).map((lead) => (
                  <tr key={lead.id} className="border-b border-border/70">
                    <td className="px-2 py-3">
                      <Link
                        href={`/crm/leads/${lead.id}`}
                        className="font-medium text-navy hover:text-royal"
                      >
                        {displayName(lead.first_name, lead.last_name)}
                      </Link>
                    </td>
                    <td className="px-2 py-3 text-muted-foreground">
                      {lead.company_name || "Not set"}
                    </td>
                    <td className="px-2 py-3">
                      <StatusBadge tone="info">
                        {LEAD_STATUS_LABELS[lead.status as CrmLeadStatus]}
                      </StatusBadge>
                    </td>
                    <td className="px-2 py-3">{lead.score}</td>
                    <td className="px-2 py-3 text-muted-foreground">
                      {formatDateTime(lead.next_follow_up_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
