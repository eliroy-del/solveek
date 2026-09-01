import Link from "next/link";
import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import { formatDate, formatGhs } from "@/lib/crm/format";
import {
  AUDIT_STATUS_LABELS,
  OPPORTUNITY_STAGE_LABELS,
  OPEN_OPPORTUNITY_STAGES,
  type CrmAuditStatus,
  type CrmOpportunityStage,
} from "@/lib/crm/types";

function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="font-heading text-2xl text-navy">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {action}
    </div>
  );
}

export async function AuditsPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_audits")
    .select(
      "id, company_name, contact_name, email, status, focus_area, budget, overall_score, created_at"
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Digital Growth Audits"
        description="Audit requests from the website and internal assessments."
      />
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No Digital Growth Audits yet"
          description="Audit submissions from the website will appear here."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Focus</th>
                <th className="px-4 py-3 font-medium">Score</th>
                <th className="px-4 py-3 font-medium">Submitted</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((audit) => (
                <tr key={audit.id} className="border-b border-border/70">
                  <td className="px-4 py-3">
                    <Link
                      href={`/crm/audits/${audit.id}`}
                      className="font-medium text-navy hover:text-royal"
                    >
                      {audit.company_name || "Untitled"}
                    </Link>
                  </td>
                  <td className="px-4 py-3">{audit.contact_name}</td>
                  <td className="px-4 py-3">
                    <StatusBadge tone="info">
                      {
                        AUDIT_STATUS_LABELS[
                          audit.status as CrmAuditStatus
                        ]
                      }
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3 capitalize">
                    {audit.focus_area || "Not set"}
                  </td>
                  <td className="px-4 py-3">
                    {audit.overall_score ?? "Pending"}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(audit.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export async function OpportunitiesPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_opportunities")
    .select(
      "id, name, stage, estimated_value, weighted_value, probability, expected_close_date, created_at"
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <PageHeader
        title="Opportunities"
        description="Commercial possibilities moving through the Solveek pipeline."
        action={
          <Link
            href="/crm/opportunities/new"
            className="inline-flex h-10 items-center rounded-lg bg-royal px-4 text-sm font-semibold text-white hover:bg-navy"
          >
            Add opportunity
          </Link>
        }
      />
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No active opportunities"
          description="Convert a qualified lead into an opportunity to start building your pipeline."
          actionHref="/crm/opportunities/new"
          actionLabel="Create opportunity"
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Opportunity</th>
                <th className="px-4 py-3 font-medium">Stage</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-4 py-3 font-medium">Weighted</th>
                <th className="px-4 py-3 font-medium">Close</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => (
                <tr key={row.id} className="border-b border-border/70">
                  <td className="px-4 py-3">
                    <Link
                      href={`/crm/opportunities/${row.id}`}
                      className="font-medium text-navy hover:text-royal"
                    >
                      {row.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge>
                      {
                        OPPORTUNITY_STAGE_LABELS[
                          row.stage as CrmOpportunityStage
                        ]
                      }
                    </StatusBadge>
                  </td>
                  <td className="px-4 py-3">
                    {formatGhs(row.estimated_value)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatGhs(row.weighted_value)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(row.expected_close_date)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export async function PipelinePage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_opportunities")
    .select("id, name, stage, estimated_value, probability, next_action")
    .in("stage", OPEN_OPPORTUNITY_STAGES)
    .is("deleted_at", null)
    .order("estimated_value", { ascending: false });

  return (
    <div className="space-y-5">
      <PageHeader
        title="Pipeline"
        description="Open opportunities by stage. Weighted values are forecast estimates."
      />
      <div className="flex gap-3 overflow-x-auto pb-2">
        {OPEN_OPPORTUNITY_STAGES.map((stage) => {
          const cards = (data ?? []).filter((row) => row.stage === stage);
          const total = cards.reduce(
            (sum, row) => sum + Number(row.estimated_value ?? 0),
            0
          );
          return (
            <section
              key={stage}
              className="w-72 shrink-0 rounded-xl border border-border bg-white"
            >
              <header className="border-b border-border px-3 py-3">
                <h2 className="text-sm font-semibold text-navy">
                  {OPPORTUNITY_STAGE_LABELS[stage]}
                </h2>
                <p className="text-xs text-muted-foreground">
                  {cards.length} · {formatGhs(total)}
                </p>
              </header>
              <ul className="space-y-2 p-3">
                {cards.length === 0 ? (
                  <li className="text-xs text-muted-foreground">No cards</li>
                ) : (
                  cards.map((card) => (
                    <li key={card.id}>
                      <Link
                        href={`/crm/opportunities/${card.id}`}
                        className="block rounded-lg border border-border p-3 hover:border-royal/40"
                      >
                        <p className="text-sm font-medium text-navy">
                          {card.name}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatGhs(card.estimated_value)} · {card.probability}%
                        </p>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
