import Link from "next/link";
import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import { displayName, formatDate, scoreBand } from "@/lib/crm/format";
import {
  LEAD_STATUS_LABELS,
  type CrmLeadStatus,
} from "@/lib/crm/types";

export const metadata = { title: "Leads" };

export default async function CrmLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  const { supabase } = await requireCrmUser();
  const params = await searchParams;

  let query = supabase
    .from("crm_leads")
    .select(
      "id, first_name, last_name, email, phone, company_name, status, score, ecosystem_layer, next_follow_up_at, created_at, form_type"
    )
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  if (params.status) {
    query = query.eq("status", params.status);
  }
  if (params.q) {
    query = query.or(
      `first_name.ilike.%${params.q}%,last_name.ilike.%${params.q}%,email.ilike.%${params.q}%,company_name.ilike.%${params.q}%`
    );
  }

  const { data: leads } = await query;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl text-navy">Leads</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Website enquiries, audits, and sales-owned prospects.
          </p>
        </div>
        <Link
          href="/crm/leads/new"
          className="inline-flex h-10 items-center rounded-lg bg-royal px-4 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          Add lead
        </Link>
      </div>

      <form className="flex flex-wrap gap-2">
        <input
          name="q"
          defaultValue={params.q}
          placeholder="Search name, email, company"
          className="h-10 min-w-[220px] flex-1 rounded-lg border border-border bg-white px-3 text-sm outline-none ring-royal focus:ring-2"
        />
        <select
          name="status"
          defaultValue={params.status ?? ""}
          className="h-10 rounded-lg border border-border bg-white px-3 text-sm"
        >
          <option value="">All statuses</option>
          {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="h-10 rounded-lg border border-border bg-white px-4 text-sm font-medium hover:bg-surface"
        >
          Filter
        </button>
      </form>

      {(leads ?? []).length === 0 ? (
        <CrmEmptyState
          title="No leads yet"
          description="New website enquiries and Digital Growth Audit submissions will appear here."
          actionHref="/crm/leads/new"
          actionLabel="Add lead"
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Lead</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Source form</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                </tr>
              </thead>
              <tbody>
                {(leads ?? []).map((lead) => (
                  <tr
                    key={lead.id}
                    className="border-b border-border/70 last:border-0"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/crm/leads/${lead.id}`}
                        className="font-medium text-navy hover:text-royal"
                      >
                        {displayName(lead.first_name, lead.last_name)}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {lead.email}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {lead.company_name || "Not set"}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge tone="info">
                        {LEAD_STATUS_LABELS[lead.status as CrmLeadStatus]}
                      </StatusBadge>
                    </td>
                    <td className="px-4 py-3">
                      {lead.score}{" "}
                      <span className="text-xs text-muted-foreground">
                        {scoreBand(lead.score)}
                      </span>
                    </td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">
                      {lead.form_type || "manual"}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
