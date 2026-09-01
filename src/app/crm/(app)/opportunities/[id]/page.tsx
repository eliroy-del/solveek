import { notFound } from "next/navigation";
import Link from "next/link";
import { requireCrmUser } from "@/lib/crm/auth";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import { formatDate, formatGhs } from "@/lib/crm/format";
import {
  OPPORTUNITY_STAGE_LABELS,
  type CrmOpportunityStage,
} from "@/lib/crm/types";

export const metadata = { title: "Opportunity" };

export default async function OpportunityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireCrmUser();
  const { data: opportunity } = await supabase
    .from("crm_opportunities")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (!opportunity) notFound();

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Opportunity
          </p>
          <h1 className="font-heading text-2xl text-navy">{opportunity.name}</h1>
        </div>
        <StatusBadge tone="info">
          {
            OPPORTUNITY_STAGE_LABELS[
              opportunity.stage as CrmOpportunityStage
            ]
          }
        </StatusBadge>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground">Estimated value</p>
          <p className="mt-1 font-heading text-2xl">
            {formatGhs(opportunity.estimated_value)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground">Weighted (forecast)</p>
          <p className="mt-1 font-heading text-2xl">
            {formatGhs(opportunity.weighted_value)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-white p-4">
          <p className="text-xs text-muted-foreground">Expected close</p>
          <p className="mt-1 font-heading text-2xl">
            {formatDate(opportunity.expected_close_date)}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-white p-4 text-sm">
        <p>
          <span className="text-muted-foreground">Probability:</span>{" "}
          {opportunity.probability}%
        </p>
        <p className="mt-2">
          <span className="text-muted-foreground">Next action:</span>{" "}
          {opportunity.next_action || "Not set"}
        </p>
        {opportunity.lead_id ? (
          <p className="mt-3">
            <Link
              href={`/crm/leads/${opportunity.lead_id}`}
              className="font-medium text-royal"
            >
              View source lead
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}
