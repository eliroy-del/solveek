import { requireCrmUser } from "@/lib/crm/auth";
import { CrmSidebar } from "@/components/crm/shell/sidebar";
import { CrmTopbar } from "@/components/crm/shell/topbar";

export default async function CrmAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await requireCrmUser();

  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 hidden h-screen md:block">
        <CrmSidebar role={profile.role} />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <CrmTopbar fullName={profile.full_name} email={profile.email} />
        <main className="flex-1 px-4 py-5 md:px-6 md:py-6">{children}</main>
      </div>
    </div>
  );
}
