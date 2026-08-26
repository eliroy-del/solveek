"use client";

import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID, isAnalyticsEnabled } from "@/lib/analytics";
import { useConsent } from "@/components/analytics/consent-provider";

/**
 * Loads GA4 only in production and only after explicit analytics consent.
 */
export function GoogleAnalytics() {
  const { consent, ready } = useConsent();

  if (!ready || !isAnalyticsEnabled() || consent !== "granted") {
    return null;
  }

  return <NextGoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
