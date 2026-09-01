import {
  Activity,
  BarChart3,
  Briefcase,
  Building2,
  ClipboardCheck,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Target,
  Users,
  ContactRound,
  ListTodo,
  Layers,
  Kanban,
  FilePenLine,
} from "lucide-react";
import type { CrmRole } from "@/lib/crm/types";

export type CrmNavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles?: CrmRole[];
};

export type CrmNavGroup = {
  label: string;
  items: CrmNavItem[];
};

export const CRM_NAV: CrmNavGroup[] = [
  {
    label: "Overview",
    items: [{ label: "Dashboard", href: "/crm", icon: LayoutDashboard }],
  },
  {
    label: "Sales",
    items: [
      { label: "Leads", href: "/crm/leads", icon: Users },
      { label: "Opportunities", href: "/crm/opportunities", icon: Target },
      { label: "Pipeline", href: "/crm/pipeline", icon: Kanban },
      { label: "Activities", href: "/crm/activities", icon: Activity },
    ],
  },
  {
    label: "Customers",
    items: [
      { label: "Contacts", href: "/crm/contacts", icon: ContactRound },
      { label: "Companies", href: "/crm/companies", icon: Building2 },
      { label: "Clients", href: "/crm/clients", icon: Briefcase },
    ],
  },
  {
    label: "Growth",
    items: [{ label: "Audits", href: "/crm/audits", icon: ClipboardCheck }],
  },
  {
    label: "Website",
    items: [
      {
        label: "Content",
        href: "/crm/content",
        icon: FilePenLine,
        roles: ["super_admin", "admin", "marketing"],
      },
    ],
  },
  {
    label: "Delivery",
    items: [
      { label: "Projects", href: "/crm/projects", icon: FolderKanban },
      { label: "Tasks", href: "/crm/tasks", icon: ListTodo },
      { label: "Services", href: "/crm/services", icon: Layers },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Reports", href: "/crm/reports", icon: BarChart3 },
      {
        label: "Settings",
        href: "/crm/settings",
        icon: Settings,
        roles: ["super_admin", "admin"],
      },
    ],
  },
];

export function navForRole(role: CrmRole) {
  return CRM_NAV.map((group) => ({
    ...group,
    items: group.items.filter(
      (item) => !item.roles || item.roles.includes(role)
    ),
  })).filter((group) => group.items.length > 0);
}
