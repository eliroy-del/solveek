"use client";

import { useReportWebVitals } from "next/web-vitals";
import { reportWebVitals } from "@/lib/analytics";
import { useConsent } from "@/components/analytics/consent-provider";

/**
 * Reports Core Web Vitals to GA4 after analytics consent is granted.
 */
export function WebVitals() {
  const { consent } = useConsent();

  useReportWebVitals((metric) => {
    if (consent !== "granted") return;
    reportWebVitals(metric);
  });

  return null;
}
