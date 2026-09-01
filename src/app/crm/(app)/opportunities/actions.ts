"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireCrmUser } from "@/lib/crm/auth";

export async function createOpportunity(formData: FormData) {
  const { supabase, profile } = await requireCrmUser([
    "super_admin",
    "admin",
    "sales",
  ]);

  const name = String(formData.get("name") ?? "").trim();
  const leadId = String(formData.get("leadId") ?? "").trim() || null;
  const value = Number(formData.get("estimatedValue") ?? 0);
  const probability = Number(formData.get("probability") ?? 20);

  if (!name) redirect("/crm/opportunities/new?error=missing");

  let companyId: string | null = null;
  let contactId: string | null = null;
  if (leadId) {
    const { data: lead } = await supabase
      .from("crm_leads")
      .select("company_id, contact_id")
      .eq("id", leadId)
      .maybeSingle();
    companyId = lead?.company_id ?? null;
    contactId = lead?.contact_id ?? null;
  }

  const { data: opportunity, error } = await supabase
    .from("crm_opportunities")
    .insert({
      name,
      lead_id: leadId,
      company_id: companyId,
      contact_id: contactId,
      owner_id: profile.id,
      estimated_value: Number.isFinite(value) ? value : 0,
      probability: Number.isFinite(probability) ? probability : 20,
      stage: "qualified",
      next_action: String(formData.get("nextAction") ?? "") || null,
    })
    .select("id")
    .single();

  if (error || !opportunity) {
    redirect("/crm/opportunities/new?error=save");
  }

  if (leadId) {
    await supabase
      .from("crm_leads")
      .update({ status: "converted", converted_at: new Date().toISOString() })
      .eq("id", leadId);
  }

  await supabase.from("crm_activities").insert({
    type: "system",
    subject: "Opportunity created",
    opportunity_id: opportunity.id,
    lead_id: leadId,
    owner_id: profile.id,
    status: "completed",
  });

  revalidatePath("/crm/opportunities");
  revalidatePath("/crm/pipeline");
  revalidatePath("/crm");
  redirect(`/crm/opportunities/${opportunity.id}`);
}
