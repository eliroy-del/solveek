import { redirect } from "next/navigation";
import { createCrmAuthClient } from "@/lib/supabase/crm-server";
import type { CrmProfile, CrmRole } from "@/lib/crm/types";

export async function getCrmSession() {
  const supabase = await createCrmAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { supabase, user: null, profile: null };

  const { data: profile } = await supabase
    .from("crm_profiles")
    .select("*")
    .eq("id", user.id)
    .is("deleted_at", null)
    .maybeSingle();

  return {
    supabase,
    user,
    profile: (profile as CrmProfile | null) ?? null,
  };
}

export async function requireCrmUser(allowedRoles?: CrmRole[]) {
  const session = await getCrmSession();

  if (!session.user || !session.profile || !session.profile.is_active) {
    redirect("/crm/login");
  }

  if (allowedRoles && !allowedRoles.includes(session.profile.role)) {
    redirect("/crm");
  }

  return {
    supabase: session.supabase,
    user: session.user,
    profile: session.profile,
  };
}
