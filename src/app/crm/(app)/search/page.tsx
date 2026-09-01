import { requireCrmUser } from "@/lib/crm/auth";
import Link from "next/link";
import { displayName } from "@/lib/crm/format";

export const metadata = { title: "Search" };

export default async function CrmSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { supabase } = await requireCrmUser();
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  if (!query) {
    return (
      <div>
        <h1 className="font-heading text-2xl text-navy">Search</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search contacts, companies, leads, opportunities, and audits.
        </p>
      </div>
    );
  }

  const [leads, companies, contacts, opportunities, audits] = await Promise.all([
    supabase
      .from("crm_leads")
      .select("id, first_name, last_name, company_name, email")
      .is("deleted_at", null)
      .or(
        `first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,company_name.ilike.%${query}%`
      )
      .limit(10),
    supabase
      .from("crm_companies")
      .select("id, name")
      .is("deleted_at", null)
      .ilike("name", `%${query}%`)
      .limit(10),
    supabase
      .from("crm_contacts")
      .select("id, first_name, last_name, email")
      .is("deleted_at", null)
      .or(
        `first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%`
      )
      .limit(10),
    supabase
      .from("crm_opportunities")
      .select("id, name")
      .is("deleted_at", null)
      .ilike("name", `%${query}%`)
      .limit(10),
    supabase
      .from("crm_audits")
      .select("id, company_name, contact_name")
      .is("deleted_at", null)
      .or(`company_name.ilike.%${query}%,contact_name.ilike.%${query}%`)
      .limit(10),
  ]);

  const groups = [
    {
      label: "Leads",
      items: (leads.data ?? []).map((row) => ({
        href: `/crm/leads/${row.id}`,
        title: displayName(row.first_name, row.last_name),
        subtitle: row.company_name || row.email,
      })),
    },
    {
      label: "Companies",
      items: (companies.data ?? []).map((row) => ({
        href: `/crm/companies`,
        title: row.name,
        subtitle: "Company",
      })),
    },
    {
      label: "Contacts",
      items: (contacts.data ?? []).map((row) => ({
        href: `/crm/contacts`,
        title: displayName(row.first_name, row.last_name),
        subtitle: row.email,
      })),
    },
    {
      label: "Opportunities",
      items: (opportunities.data ?? []).map((row) => ({
        href: `/crm/opportunities/${row.id}`,
        title: row.name,
        subtitle: "Opportunity",
      })),
    },
    {
      label: "Audits",
      items: (audits.data ?? []).map((row) => ({
        href: `/crm/audits/${row.id}`,
        title: row.company_name || "Audit",
        subtitle: row.contact_name,
      })),
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Search</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Results for “{query}”
        </p>
      </div>
      {groups.map((group) =>
        group.items.length === 0 ? null : (
          <section key={group.label} className="rounded-xl border border-border bg-white p-4">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {group.label}
            </h2>
            <ul className="mt-2 space-y-2">
              {group.items.map((item) => (
                <li key={item.href + item.title}>
                  <Link href={item.href} className="block hover:text-royal">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.subtitle}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )
      )}
    </div>
  );
}
