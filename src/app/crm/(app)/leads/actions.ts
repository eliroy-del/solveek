"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";
import type { CrmLeadStatus } from "@/lib/crm/types";
import { scoreLead } from "@/lib/crm/scoring";

export async function updateLeadStatus(formData: FormData) {
  const { supabase, profile } = await requireCrmUser();
  const leadId = String(formData.get("leadId") ?? "");
  const status = String(formData.get("status") ?? "") as CrmLeadStatus;

  if (!leadId || !status) return;

  await supabase
    .from("crm_leads")
    .update({ status })
    .eq("id", leadId)
    .is("deleted_at", null);

  await supabase.from("crm_activities").insert({
    type: "note",
    subject: `Lead status changed to ${status}`,
    lead_id: leadId,
    owner_id: profile.id,
    status: "completed",
  });

  await supabase.from("crm_audit_logs").insert({
    user_id: profile.id,
    action: "lead.status_updated",
    entity_type: "lead",
    entity_id: leadId,
    metadata: { status },
  });

  revalidatePath(`/crm/leads/${leadId}`);
  revalidatePath("/crm/leads");
  revalidatePath("/crm");
}

export async function createLead(formData: FormData) {
  const { supabase, profile } = await requireCrmUser([
    "super_admin",
    "admin",
    "sales",
    "marketing",
  ]);

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const companyName = String(formData.get("companyName") ?? "").trim();
  const primaryNeed = String(formData.get("primaryNeed") ?? "").trim();

  if (!firstName || !email) {
    redirect("/crm/leads/new?error=missing");
  }

  const scoring = scoreLead({
    formType: "manual",
    estimatedBudget: String(formData.get("budget") ?? ""),
    website: String(formData.get("website") ?? ""),
    industry: String(formData.get("industry") ?? ""),
    primaryNeed,
  });

  const { data: lead, error } = await supabase
    .from("crm_leads")
    .insert({
      first_name: firstName,
      last_name: lastName,
      email,
      phone: phone || null,
      company_name: companyName || null,
      website: String(formData.get("website") ?? "") || null,
      industry: String(formData.get("industry") ?? "") || null,
      estimated_budget: String(formData.get("budget") ?? "") || null,
      primary_need: primaryNeed || null,
      form_type: "manual",
      status: "new",
      score: scoring.score,
      score_breakdown: scoring.breakdown,
      owner_id: profile.id,
      last_activity_at: new Date().toISOString(),
      interaction_count: 1,
    })
    .select("id")
    .single();

  if (error || !lead) {
    redirect("/crm/leads/new?error=save");
  }

  await supabase.from("crm_activities").insert({
    type: "system",
    subject: "Lead created manually",
    lead_id: lead.id,
    owner_id: profile.id,
    status: "completed",
  });

  revalidatePath("/crm/leads");
  revalidatePath("/crm");
  redirect(`/crm/leads/${lead.id}`);
}
