/**
 * Google Analytics 4 utilities for Next.js
 * Uses @next/third-parties/google (sendGAEvent → dataLayer / gtag)
 */

import { sendGAEvent } from "@next/third-parties/google";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";

const PLACEHOLDER_ID = "G-XXXXXXXXXX";

export const isAnalyticsEnabled = (): boolean => {
  return (
    process.env.NODE_ENV !== "development" &&
    Boolean(GA_MEASUREMENT_ID) &&
    GA_MEASUREMENT_ID !== PLACEHOLDER_ID &&
    GA_MEASUREMENT_ID.startsWith("G-")
  );
};

export interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  rating?: "good" | "needs-improvement" | "poor";
  delta?: number;
  label?: string;
  navigationType?: string;
}

export interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, unknown>;
}

const CORE_WEB_VITALS = new Set([
  "CLS",
  "FCP",
  "FID",
  "INP",
  "LCP",
  "TTFB",
]);

export function reportWebVitals(metric: WebVitalsMetric): void {
  if (!isAnalyticsEnabled()) {
    if (process.env.NODE_ENV === "development") {
      console.info("Web Vitals (dev):", metric);
    }
    return;
  }

  if (metric.label && metric.label !== "web-vital") return;
  if (!CORE_WEB_VITALS.has(metric.name)) return;

  const value = Math.round(
    metric.name === "CLS" ? metric.value * 1000 : metric.value
  );

  sendGAEvent("event", "web_vitals", {
    event_category: "Web Vitals",
    event_label: metric.name,
    value,
    metric_id: metric.id,
    metric_rating: metric.rating,
    metric_delta: metric.delta,
    non_interaction: true,
  });
}

export function trackEvent(event: GAEvent): void {
  if (!isAnalyticsEnabled()) return;

  sendGAEvent("event", event.action, {
    event_category: event.category || "engagement",
    event_label: event.label,
    value: event.value,
    ...(event.custom_parameters ?? {}),
  });
}

export function trackPageView(url: string, title?: string): void {
  if (!isAnalyticsEnabled()) return;

  sendGAEvent("event", "page_view", {
    page_location: url,
    page_title: title || (typeof document !== "undefined" ? document.title : ""),
  });
}

export const analytics = {
  trackExternalLink: (url: string, text?: string) => {
    trackEvent({
      action: "click_external_link",
      category: "engagement",
      label: url,
      custom_parameters: { link_text: text, link_url: url },
    });
  },

  trackDownload: (filename: string, fileType?: string) => {
    trackEvent({
      action: "download",
      category: "engagement",
      label: filename,
      custom_parameters: { file_name: filename, file_type: fileType },
    });
  },

  trackFormSubmission: (formName: string, success = true) => {
    trackEvent({
      action: success ? "generate_lead" : "form_error",
      category: "engagement",
      label: formName,
      value: success ? 1 : 0,
      custom_parameters: {
        form_name: formName,
        submission_success: success,
      },
    });
  },

  trackSearch: (query: string, results?: number) => {
    trackEvent({
      action: "search",
      category: "engagement",
      label: query,
      value: results,
      custom_parameters: { search_term: query, search_results: results },
    });
  },

  trackSocialInteraction: (
    network: string,
    action: string,
    target?: string
  ) => {
    trackEvent({
      action: "social_interaction",
      category: "social",
      label: `${network}_${action}`,
      custom_parameters: {
        social_network: network,
        social_action: action,
        social_target: target,
      },
    });
  },

  trackAuditRequest: () => {
    trackEvent({
      action: "generate_lead",
      category: "audit_form",
      label: "digital_growth_audit",
      value: 1,
    });
  },
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
