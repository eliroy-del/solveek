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
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <CrmTopbar fullName={profile.full_name} email={profile.email} />
        <main className="flex-1 px-4 pb-8 pt-6 md:px-6 md:pt-8">{children}</main>
      </div>
    </div>
  );
}
