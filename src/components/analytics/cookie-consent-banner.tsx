"use client";

import { useConsent } from "@/components/analytics/consent-provider";

export function CookieConsentBanner() {
  const { consent, ready, setConsent } = useConsent();

  if (!ready || consent !== "unknown") return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[70] p-4 md:p-6"
    >
      <div className="container-premium">
        <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-navy px-5 py-4 text-white shadow-lift md:flex-row md:items-center md:justify-between md:gap-8 md:px-6 md:py-5">
          <p className="max-w-2xl text-sm leading-relaxed text-white/80">
            We use analytics cookies to understand how Solveek is used. They
            stay off until you accept.{" "}
            <span className="text-white/55">
              Reject keeps analytics completely unloaded.
            </span>
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-semibold text-white/80 ring-1 ring-white/20 transition-ui hover:bg-white/5 hover:text-white"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-lg bg-royal px-4 text-sm font-semibold text-white transition-ui hover:bg-royal-deep"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
