import Link from "next/link";
import { notFound } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";
import { StatusBadge } from "@/components/crm/shared/status-badge";
import { formatDateTime } from "@/lib/crm/format";
import {
  AUDIT_STATUS_LABELS,
  type CrmAuditStatus,
} from "@/lib/crm/types";

export const metadata = { title: "Audit" };

export default async function AuditDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireCrmUser();

  const { data: audit } = await supabase
    .from("crm_audits")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .maybeSingle();

  if (!audit) notFound();

  const { data: assessments } = await supabase
    .from("crm_audit_assessments")
    .select("*")
    .eq("audit_id", id)
    .order("sort_order");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Digital Growth Audit
          </p>
          <h1 className="font-heading text-2xl text-navy">
            {audit.company_name || "Untitled company"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {audit.contact_name} · {formatDateTime(audit.created_at)}
          </p>
        </div>
        <StatusBadge tone="info">
          {AUDIT_STATUS_LABELS[audit.status as CrmAuditStatus]}
        </StatusBadge>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <section className="space-y-4 lg:col-span-2">
          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">Request details</h2>
            <dl className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium">{audit.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{audit.phone || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Website</dt>
                <dd className="font-medium">{audit.website || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Industry</dt>
                <dd className="font-medium">{audit.industry || "Not set"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Focus area</dt>
                <dd className="font-medium capitalize">
                  {audit.focus_area || "Not set"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Budget</dt>
                <dd className="font-medium">{audit.budget || "Not set"}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">Business goals</dt>
                <dd className="mt-1 whitespace-pre-wrap font-medium">
                  {audit.business_goals || "Not provided"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-white p-4">
            <h2 className="font-heading text-lg text-navy">
              Solveek Digital Growth Assessment
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Internal assessment scores. Not an industry-standard metric.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              {[
                ["Foundation", audit.foundation_score],
                ["Visibility", audit.visibility_score],
                ["Automation", audit.automation_score],
                ["Overall", audit.overall_score],
              ].map(([label, score]) => (
                <div
                  key={String(label)}
                  className="rounded-lg border border-border px-3 py-3"
                >
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-1 font-heading text-xl text-navy">
                    {score ?? "Pending"}
                  </p>
                </div>
              ))}
            </div>
            {(assessments ?? []).length > 0 ? (
              <ul className="mt-4 space-y-3 text-sm">
                {(assessments ?? []).map((item) => (
                  <li
                    key={item.id}
                    className="rounded-lg border border-border p-3"
                  >
                    <p className="font-medium">
                      {item.category} · {item.subcategory}
                    </p>
                    <p className="mt-1 text-muted-foreground">{item.finding}</p>
                    <p className="mt-1 text-royal">{item.recommendation}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-muted-foreground">
                Assessment findings will appear here once the audit is underway.
              </p>
            )}
          </div>
        </section>

        <aside className="space-y-4">
          {audit.lead_id ? (
            <Link
              href={`/crm/leads/${audit.lead_id}`}
              className="block rounded-xl border border-border bg-white p-4 text-sm font-medium text-royal hover:border-royal/40"
            >
              View linked lead
            </Link>
          ) : null}
          <div className="rounded-xl border border-border bg-white p-4 text-sm">
            <h2 className="font-heading text-lg text-navy">Next steps</h2>
            <ol className="mt-3 list-decimal space-y-1 pl-4 text-muted-foreground">
              <li>Review the request</li>
              <li>Schedule discovery</li>
              <li>Complete assessment scores</li>
              <li>Create roadmap and opportunity</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
