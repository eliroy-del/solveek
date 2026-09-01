export type CrmRole =
  | "super_admin"
  | "admin"
  | "sales"
  | "project_manager"
  | "marketing"
  | "viewer";

export type CrmLeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "unqualified"
  | "nurture"
  | "converted"
  | "lost";

export type CrmOpportunityStage =
  | "new"
  | "contacted"
  | "qualified"
  | "discovery"
  | "audit"
  | "roadmap"
  | "proposal"
  | "negotiation"
  | "won"
  | "lost";

export type CrmAuditStatus =
  | "submitted"
  | "reviewing"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "roadmap_sent"
  | "converted"
  | "closed";

export type CrmEcosystemLayer =
  | "foundation"
  | "automation"
  | "visibility"
  | "unsure";

export type CrmProfile = {
  id: string;
  email: string;
  full_name: string;
  role: CrmRole;
  phone: string | null;
  avatar_url: string | null;
  timezone: string;
  is_active: boolean;
  last_login_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type CrmLead = {
  id: string;
  contact_id: string | null;
  company_id: string | null;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  website: string | null;
  location: string | null;
  industry: string | null;
  company_name: string | null;
  source_id: string | null;
  campaign: string | null;
  form_type: string | null;
  status: CrmLeadStatus;
  score: number;
  score_breakdown: Array<{ label: string; points: number }>;
  estimated_budget: string | null;
  timeline: string | null;
  primary_need: string | null;
  ecosystem_layer: CrmEcosystemLayer | null;
  owner_id: string | null;
  internal_notes: string;
  next_follow_up_at: string | null;
  last_activity_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ScoreFactor = {
  label: string;
  points: number;
};

export const LEAD_STATUS_LABELS: Record<CrmLeadStatus, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  unqualified: "Unqualified",
  nurture: "Nurture",
  converted: "Converted",
  lost: "Lost",
};

export const OPPORTUNITY_STAGE_LABELS: Record<CrmOpportunityStage, string> = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  discovery: "Discovery",
  audit: "Audit",
  roadmap: "Roadmap",
  proposal: "Proposal",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};

export const AUDIT_STATUS_LABELS: Record<CrmAuditStatus, string> = {
  submitted: "Submitted",
  reviewing: "Reviewing",
  scheduled: "Scheduled",
  in_progress: "In progress",
  completed: "Completed",
  roadmap_sent: "Roadmap sent",
  converted: "Converted",
  closed: "Closed",
};

export const OPEN_OPPORTUNITY_STAGES: CrmOpportunityStage[] = [
  "new",
  "contacted",
  "qualified",
  "discovery",
  "audit",
  "roadmap",
  "proposal",
  "negotiation",
];
