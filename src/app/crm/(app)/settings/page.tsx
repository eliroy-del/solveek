import { requireCrmUser } from "@/lib/crm/auth";
import { CrmSignOutButton } from "@/components/crm/shell/sign-out-button";

export const metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { supabase, profile } = await requireCrmUser([
    "super_admin",
    "admin",
  ]);

  const { data: settings } = await supabase
    .from("crm_organization_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  const { data: sources } = await supabase
    .from("crm_lead_sources")
    .select("name, slug, is_active")
    .order("sort_order");

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-2xl text-navy">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Organization defaults for Solveek CRM.
        </p>
      </div>

      <section className="rounded-xl border border-border bg-white p-4 text-sm">
        <h2 className="font-heading text-lg text-navy">Organization</h2>
        <dl className="mt-3 grid gap-2 sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">{settings?.name ?? "Solveek"}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Currency</dt>
            <dd className="font-medium">
              {settings?.currency_symbol ?? "GH₵"} ({settings?.currency ?? "GHS"})
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Timezone</dt>
            <dd className="font-medium">
              {settings?.timezone ?? "Africa/Accra"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Signed in as</dt>
            <dd className="font-medium">
              {profile.full_name} · {profile.role}
            </dd>
          </div>
        </dl>
        <div className="mt-4 border-t border-border pt-4">
          <CrmSignOutButton />
        </div>
      </section>

      <section className="rounded-xl border border-border bg-white p-4 text-sm">
        <h2 className="font-heading text-lg text-navy">Lead sources</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {(sources ?? []).map((source) => (
            <li
              key={source.slug}
              className="rounded-lg border border-border px-3 py-2"
            >
              {source.name}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
