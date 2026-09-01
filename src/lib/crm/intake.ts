import { createServiceClient } from "@/lib/supabase/server";
import { scoreLead } from "@/lib/crm/scoring";
import type { CrmEcosystemLayer } from "@/lib/crm/types";

export type CrmIntakePayload = {
  formType: "audit" | "contact" | "quote";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  industry?: string;
  focusArea?: CrmEcosystemLayer | string;
  budget?: string;
  timeline?: string;
  context?: string;
  subject?: string;
  message?: string;
  service?: string;
  landingPage?: string;
  referrer?: string;
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  legacySubmissionId?: string;
};

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts[0] ?? "";
  const last_name = parts.slice(1).join(" ");
  return { first_name, last_name };
}

async function findSourceId(
  supabase: ReturnType<typeof createServiceClient>,
  slug: string
) {
  const { data } = await supabase
    .from("crm_lead_sources")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  return data?.id ?? null;
}

export async function ingestWebsiteLead(payload: CrmIntakePayload) {
  const supabase = createServiceClient();
  const email = payload.email.toLowerCase().trim();
  const phone = payload.phone?.trim() || null;
  const companyName = payload.company?.trim() || null;
  const { first_name, last_name } = splitName(payload.name);

  const sourceSlug =
    payload.formType === "audit"
      ? "digital-growth-audit"
      : payload.utm?.source
        ? payload.utm.source.toLowerCase()
        : "website";

  let sourceId = await findSourceId(supabase, sourceSlug);
  if (!sourceId) {
    sourceId = await findSourceId(supabase, "website");
  }

  // Company
  let companyId: string | null = null;
  if (companyName) {
    const { data: existingCompany } = await supabase
      .from("crm_companies")
      .select("id")
      .ilike("name", companyName)
      .is("deleted_at", null)
      .limit(1)
      .maybeSingle();

    if (existingCompany) {
      companyId = existingCompany.id;
    } else {
      const { data: createdCompany, error: companyError } = await supabase
        .from("crm_companies")
        .insert({
          name: companyName,
          website: payload.website || null,
          email,
          phone,
          industry: payload.industry || null,
          source_id: sourceId,
        })
        .select("id")
        .single();

      if (companyError) throw companyError;
      companyId = createdCompany.id;
    }
  }

  // Contact (match email, then phone)
  let contactId: string | null = null;
  const { data: byEmail } = await supabase
    .from("crm_contacts")
    .select("id, company_id")
    .ilike("email", email)
    .is("deleted_at", null)
    .limit(1)
    .maybeSingle();

  if (byEmail) {
    contactId = byEmail.id;
    if (!byEmail.company_id && companyId) {
      await supabase
        .from("crm_contacts")
        .update({ company_id: companyId })
        .eq("id", contactId);
    }
  } else if (phone) {
    const { data: byPhone } = await supabase
      .from("crm_contacts")
      .select("id")
      .eq("phone", phone)
      .is("deleted_at", null)
      .limit(1)
      .maybeSingle();
    if (byPhone) contactId = byPhone.id;
  }

  if (!contactId) {
    const { data: createdContact, error: contactError } = await supabase
      .from("crm_contacts")
      .insert({
        first_name,
        last_name,
        email,
        phone,
        whatsapp: phone,
        company_id: companyId,
        source_id: sourceId,
      })
      .select("id")
      .single();
    if (contactError) throw contactError;
    contactId = createdContact.id;
  }

  const ecosystem =
    (payload.focusArea as CrmEcosystemLayer | undefined) ?? null;
  const scoring = scoreLead({
    formType: payload.formType === "audit" ? "audit" : payload.formType,
    estimatedBudget: payload.budget,
    website: payload.website,
    ecosystemLayer: ecosystem,
    timeline: payload.timeline,
    industry: payload.industry,
    primaryNeed: payload.service || payload.context || payload.subject,
  });

  const leadPayload = {
    contact_id: contactId,
    company_id: companyId,
    first_name,
    last_name,
    email,
    phone,
    whatsapp: phone,
    website: payload.website || null,
    industry: payload.industry || null,
    company_name: companyName,
    source_id: sourceId,
    landing_page: payload.landingPage || null,
    utm_source: payload.utm?.source || null,
    utm_medium: payload.utm?.medium || null,
    utm_campaign: payload.utm?.campaign || null,
    utm_content: payload.utm?.content || null,
    utm_term: payload.utm?.term || null,
    form_type: payload.formType,
    status: "new" as const,
    score: scoring.score,
    score_breakdown: scoring.breakdown,
    estimated_budget: payload.budget || null,
    timeline: payload.timeline || null,
    primary_need:
      payload.service ||
      payload.subject ||
      (payload.formType === "audit" ? "Digital Growth Audit" : null),
    ecosystem_layer: ecosystem,
    internal_notes: [payload.context, payload.message]
      .filter(Boolean)
      .join("\n\n"),
    last_activity_at: new Date().toISOString(),
    interaction_count: 1,
    legacy_submission_id: payload.legacySubmissionId || null,
  };

  // Prefer updating an open lead for the same email
  const { data: existingLead } = await supabase
    .from("crm_leads")
    .select("id")
    .ilike("email", email)
    .is("deleted_at", null)
    .not("status", "in", '("converted","lost")')
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  let leadId: string;
  if (existingLead) {
    const { data: current } = await supabase
      .from("crm_leads")
      .select("interaction_count")
      .eq("id", existingLead.id)
      .single();

    const { interaction_count: _ignored, ...updatePayload } = leadPayload;
    const { data: updated, error } = await supabase
      .from("crm_leads")
      .update({
        ...updatePayload,
        interaction_count: (current?.interaction_count ?? 0) + 1,
      })
      .eq("id", existingLead.id)
      .select("id")
      .single();
    if (error) throw error;
    leadId = updated.id;
  } else {
    const { data: createdLead, error } = await supabase
      .from("crm_leads")
      .insert(leadPayload)
      .select("id")
      .single();
    if (error) throw error;
    leadId = createdLead.id;
  }

  let auditId: string | null = null;
  if (payload.formType === "audit") {
    const { data: audit, error: auditError } = await supabase
      .from("crm_audits")
      .insert({
        lead_id: leadId,
        contact_id: contactId,
        company_id: companyId,
        company_name: companyName ?? "",
        contact_name: payload.name,
        email,
        phone,
        website: payload.website || null,
        industry: payload.industry || null,
        focus_area: ecosystem,
        business_goals: payload.context || "",
        budget: payload.budget || null,
        timeline: payload.timeline || null,
        status: "submitted",
        legacy_submission_id: payload.legacySubmissionId || null,
      })
      .select("id")
      .single();
    if (auditError) throw auditError;
    auditId = audit.id;
  }

  await supabase.from("crm_activities").insert({
    type: payload.formType === "audit" ? "audit" : "system",
    subject:
      payload.formType === "audit"
        ? "Digital Growth Audit submitted"
        : payload.formType === "quote"
          ? "Quote request submitted"
          : "Website enquiry submitted",
    description:
      payload.context ||
      payload.message ||
      payload.subject ||
      "Submitted from the public website.",
    lead_id: leadId,
    contact_id: contactId,
    company_id: companyId,
    audit_id: auditId,
    status: "completed",
    metadata: {
      formType: payload.formType,
      referrer: payload.referrer || null,
      landingPage: payload.landingPage || null,
    },
  });

  // Notify all active admins / sales
  const { data: notifyUsers } = await supabase
    .from("crm_profiles")
    .select("id")
    .eq("is_active", true)
    .is("deleted_at", null)
    .in("role", ["super_admin", "admin", "sales"]);

  if (notifyUsers?.length) {
    await supabase.from("crm_notifications").insert(
      notifyUsers.map((u) => ({
        user_id: u.id,
        title:
          payload.formType === "audit"
            ? "New Digital Growth Audit"
            : "New website lead",
        body: `${payload.name}${companyName ? ` · ${companyName}` : ""}`,
        priority: "normal",
        entity_type: "lead",
        entity_id: leadId,
        href: `/crm/leads/${leadId}`,
      }))
    );
  }

  return { leadId, contactId, companyId, auditId, score: scoring };
}
