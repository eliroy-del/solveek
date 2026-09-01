import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { formatDate } from "@/lib/crm/format";

export const metadata = { title: "Companies" };

export default async function CompaniesPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_companies")
    .select("id, name, industry, website, city, created_at")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Companies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Organizations connected to leads, audits, and clients.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No companies yet"
          description="Companies are created when leads and audits include a business name."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Industry</th>
                <th className="px-4 py-3 font-medium">Website</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => (
                <tr key={row.id} className="border-b border-border/70">
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3">{row.industry || "Not set"}</td>
                  <td className="px-4 py-3">{row.website || "Not set"}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {formatDate(row.created_at)}
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
