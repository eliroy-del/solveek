"use client";

import Link from "next/link";
import { LogOut, Plus, Search } from "lucide-react";
import { createCrmBrowserClient } from "@/lib/supabase/crm-browser";
import { useRouter } from "next/navigation";

export function CrmTopbar({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const router = useRouter();

  async function signOut() {
    const supabase = createCrmBrowserClient();
    await supabase.auth.signOut();
    router.push("/crm/login");
    router.refresh();
  }

  return (
    <header className="flex h-14 items-center justify-between gap-4 border-b border-border bg-white px-4 md:px-6">
      <form action="/crm/search" className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          name="q"
          placeholder="Search Solveek CRM"
          className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none ring-royal focus:ring-2"
        />
      </form>

      <div className="flex items-center gap-2">
        <Link
          href="/crm/leads/new"
          className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-royal px-3 text-sm font-semibold text-white transition-colors hover:bg-navy"
        >
          <Plus className="size-4" />
          <span className="hidden sm:inline">Add lead</span>
        </Link>
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-navy">{fullName}</p>
          <p className="text-xs text-muted-foreground">{email}</p>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border text-navy transition-colors hover:bg-surface"
          aria-label="Sign out"
        >
          <LogOut className="size-4" />
        </button>
      </div>
    </header>
  );
}
