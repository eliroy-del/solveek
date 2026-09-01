import { requireCrmUser } from "@/lib/crm/auth";
import { CrmEmptyState } from "@/components/crm/shared/empty-state";
import { displayName, formatDate } from "@/lib/crm/format";

export const metadata = { title: "Contacts" };

export default async function ContactsPage() {
  const { supabase } = await requireCrmUser();
  const { data } = await supabase
    .from("crm_contacts")
    .select("id, first_name, last_name, email, phone, created_at")
    .is("deleted_at", null)
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Contacts</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          People linked to companies, leads, and clients.
        </p>
      </div>
      {(data ?? []).length === 0 ? (
        <CrmEmptyState
          title="No contacts yet"
          description="Contacts are created from website forms and manual lead entry."
        />
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-border bg-surface/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row) => (
                <tr key={row.id} className="border-b border-border/70">
                  <td className="px-4 py-3 font-medium">
                    {displayName(row.first_name, row.last_name)}
                  </td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.phone || "Not set"}</td>
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
