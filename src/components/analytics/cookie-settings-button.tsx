"use client";

import { useConsent } from "@/components/analytics/consent-provider";

export function CookieSettingsButton({
  className,
}: {
  className?: string;
}) {
  const { resetConsent } = useConsent();

  return (
    <button
      type="button"
      onClick={resetConsent}
      className={
        className ??
        "cursor-pointer text-left text-xs text-white/50 transition-ui hover:text-white/80"
      }
    >
      Cookie settings
    </button>
  );
}
