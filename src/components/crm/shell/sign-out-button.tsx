"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { createCrmBrowserClient } from "@/lib/supabase/crm-browser";

export function CrmSignOutButton() {
  const router = useRouter();

  async function signOut() {
    const supabase = createCrmBrowserClient();
    await supabase.auth.signOut();
    router.push("/crm/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={signOut}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-medium text-navy transition-colors hover:bg-surface"
    >
      <LogOut className="size-4" />
      Sign out
    </button>
  );
}
