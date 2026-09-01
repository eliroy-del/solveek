import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import {
  displayName,
  formatDateTime,
  scoreBand,
} from "@/lib/crm/format";
import {
  LEAD_STATUS_LABELS,
  type CrmLeadStatus,
} from "@/lib/crm/types";
import { updateLeadStatus } from "@/app/crm/(app)/leads/actions";

export const metadata = { title: "Lead" };

export default async function CrmLeadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireCrmUser();

  const { data: lead } = await supabase
    .from("crm_leads")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (!lead) notFound();

  const [{ data: activities }, { data: audits }] = await Promise.all([
    supabase
      .from("crm_activities")
      .select("*")
      .eq("lead_id", id)
      .order("occurred_at", { ascending: false })
      .limit(30),
    supabase
      .from("crm_audits")
      .select("id, status, overall_score, created_at, focus_area")
      .eq("lead_id", id)
      .is("deleted_at", null)
      .order("created_at", { ascending: false }),
  ]);

  const breakdown = Array.isArray(lead.score_breakdown)
    ? (lead.score_breakdown as Array<{ label: string; points: number }>)
    : [];

  const phone = lead.whatsapp || lead.phone;
  const waHref = phone
    ? `https://wa.me/${phone.replace(/\D/g, "")}`
    : null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Lead
          </p>
          <h1 className="font-heading text-2xl text-navy">
            {displayName(lead.first_name, lead.last_name)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {lead.company_name || "No company"} ·{" "}
            {LEAD_STATUS_LABELS[lead.status as CrmLeadStatus]}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {lead.email ? (
            <a
              href={`mailto:${lead.email}`}
              className="inline-flex h-10 items-center rounded-lg border border-border bg-white px-3 text-sm font-medium hover:bg-surface"
            >
              Email
            </a>
          ) : null}
          {waHref ? (
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-lg border border-border bg-white px-3 text-sm font-medium hover:bg-surface"
            >
              WhatsApp
            </a>
          ) : null}
          <Link
            href={`/crm/opportunities/new?leadId=${lead.id}`}
            className="inline-flex h-10 items-center rounded-lg bg-royal px-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
          >
            Create opportunity
          </Link>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">Overview</h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium">{lead.email || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{lead.phone || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Website</dt>
                <dd className="font-medium">{lead.website || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Industry</dt>
                <dd className="font-medium">{lead.industry || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Budget</dt>
                <dd className="font-medium">
                  {lead.estimated_budget || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Ecosystem layer</dt>
                <dd className="font-medium capitalize">
                  {lead.ecosystem_layer || "Not set"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Primary need</dt>
                <dd className="font-medium">
                  {lead.primary_need || "Not set"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">Timeline</h2>
            {(activities ?? []).length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                No activities recorded yet.
              </p>
            ) : (
              <ol className="mt-3 space-y-3">
                {(activities ?? []).map((activity) => (
                  <li
                    key={activity.id}
                    className="border-l-2 border-royal/30 pl-3 text-sm"
                  >
                    <p className="font-medium text-navy">{activity.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(activity.occurred_at)} · {activity.type}
                    </p>
                    {activity.description ? (
                      <p className="mt-1 text-muted-foreground">
                        {activity.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">Lead score</h2>
            <p className="mt-2 font-heading text-3xl text-navy">
              {lead.score}{" "}
              <span className="text-base text-muted-foreground">
                {scoreBand(lead.score)}
              </span>
            </p>
            <ul className="mt-3 space-y-1.5 text-sm">
              {breakdown.length === 0 ? (
                <li className="text-muted-foreground">No score factors yet.</li>
              ) : (
                breakdown.map((item) => (
                  <li key={item.label} className="flex justify-between gap-3">
                    <span>{item.label}</span>
                    <span className="font-medium text-royal">
                      +{item.points}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">Status</h2>
            <form action={updateLeadStatus} className="mt-3 space-y-3">
              <input type="hidden" name="leadId" value={lead.id} />
              <select
                name="status"
                defaultValue={lead.status}
                className="h-10 w-full rounded-lg border border-border px-3 text-sm"
              >
                {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-lg bg-navy text-sm font-semibold text-white transition-colors hover:bg-royal"
              >
                Update status
              </button>
            </form>
            <div className="mt-3">
              <StatusBadge tone="info">
                {LEAD_STATUS_LABELS[lead.status as CrmLeadStatus]}
              </StatusBadge>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">Audits</h2>
            {(audits ?? []).length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No Digital Growth Audits linked.
              </p>
            ) : (
              <ul className="mt-2 space-y-2 text-sm">
                {(audits ?? []).map((audit) => (
                  <li key={audit.id}>
                    <Link
                      href={`/crm/audits/${audit.id}`}
                      className="font-medium text-royal hover:underline"
                    >
                      Audit · {audit.status}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {formatDateTime(audit.created_at)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
