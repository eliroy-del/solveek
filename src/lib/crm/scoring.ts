import type { ScoreFactor } from "@/lib/crm/types";

type ScoreInput = {
  formType?: string | null;
  estimatedBudget?: string | null;
  website?: string | null;
  ecosystemLayer?: string | null;
  timeline?: string | null;
  industry?: string | null;
  primaryNeed?: string | null;
};

function parseBudgetHint(budget?: string | null): number | null {
  if (!budget) return null;
  const digits = budget.replace(/[^\d]/g, "");
  if (!digits) return null;
  return Number(digits);
}

export function scoreLead(input: ScoreInput): {
  score: number;
  breakdown: ScoreFactor[];
  band: "Low" | "Medium" | "High";
} {
  const breakdown: ScoreFactor[] = [];

  if (input.formType === "audit" || input.formType === "digital_growth_audit") {
    breakdown.push({ label: "Growth Audit requested", points: 20 });
  }

  const budget = parseBudgetHint(input.estimatedBudget);
  if (budget !== null) {
    if (budget >= 20000) {
      breakdown.push({ label: "Budget at or above GH₵20,000", points: 15 });
    } else if (budget >= 10000) {
      breakdown.push({ label: "Budget at or above GH₵10,000", points: 10 });
    } else if (budget > 0) {
      breakdown.push({ label: "Budget provided", points: 5 });
    }
  }

  if (input.website) {
    breakdown.push({ label: "Website present", points: 10 });
  }

  if (input.ecosystemLayer && input.ecosystemLayer !== "unsure") {
    breakdown.push({ label: "Clear ecosystem need", points: 10 });
  }

  if (input.timeline) {
    const t = input.timeline.toLowerCase();
    if (t.includes("asap") || t.includes("immediate") || t.includes("30")) {
      breakdown.push({ label: "Timeline under 30 days", points: 10 });
    } else if (t.includes("1") || t.includes("3")) {
      breakdown.push({ label: "Near-term timeline", points: 5 });
    }
  }

  if (input.industry) {
    breakdown.push({ label: "Industry identified", points: 5 });
  }

  const need = (input.primaryNeed ?? "").toLowerCase();
  if (
    input.ecosystemLayer === "automation" ||
    need.includes("custom") ||
    need.includes("application") ||
    need.includes("platform")
  ) {
    breakdown.push({ label: "High-value requirement signal", points: 15 });
  }

  const score = Math.min(
    100,
    breakdown.reduce((sum, item) => sum + item.points, 0)
  );

  const band = score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";

  return { score, breakdown, band };
}
