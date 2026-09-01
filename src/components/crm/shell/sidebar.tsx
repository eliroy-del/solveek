"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { navForRole } from "@/lib/crm/navigation";
import type { CrmRole } from "@/lib/crm/types";
import { createCrmBrowserClient } from "@/lib/supabase/crm-browser";

export function CrmSidebar({
  role,
  collapsed = false,
}: {
  role: CrmRole;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const groups = navForRole(role);

  async function signOut() {
    const supabase = createCrmBrowserClient();
    await supabase.auth.signOut();
    router.push("/crm/login");
    router.refresh();
  }

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-white/10 bg-navy text-white",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      <div className="flex h-14 shrink-0 items-center border-b border-white/10 px-4">
        <Link href="/crm" className="flex flex-col leading-tight">
          <span className="font-heading text-sm font-semibold tracking-wide">
            SOLVEEK
          </span>
          {!collapsed ? (
            <span className="text-[11px] text-white/55">CRM</span>
          ) : null}
        </Link>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.label}>
            {!collapsed ? (
              <p className="mb-1.5 px-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
                {group.label}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/crm"
                    ? pathname === "/crm"
                    : pathname === item.href ||
                      pathname.startsWith(`${item.href}/`);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-royal text-white"
                          : "text-white/70 hover:bg-white/10 hover:text-white"
                      )}
                      title={item.label}
                    >
                      <Icon className="size-4 shrink-0" />
                      {!collapsed ? <span>{item.label}</span> : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-white/10 p-3">
        <button
          type="button"
          onClick={signOut}
          className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          title="Sign out"
        >
          <LogOut className="size-4 shrink-0" />
          {!collapsed ? <span>Sign out</span> : null}
        </button>
      </div>
    </aside>
  );
}
