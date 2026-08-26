"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type Consent = "granted" | "denied" | "unknown";

const STORAGE_KEY = "solveek-analytics-consent";

type ConsentContextValue = {
  consent: Consent;
  ready: boolean;
  setConsent: (value: Consent) => void;
  resetConsent: () => void;
};

const ConsentContext = createContext<ConsentContextValue>({
  consent: "unknown",
  ready: false,
  setConsent: () => {},
  resetConsent: () => {},
});

export function useConsent() {
  return useContext(ConsentContext);
}

function pushConsentUpdate(value: Consent) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("consent", "update", {
    analytics_storage: value === "granted" ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsentState] = useState<Consent>("unknown");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "granted" || saved === "denied") {
      setConsentState(saved);
      pushConsentUpdate(saved);
    }
    setReady(true);
  }, []);

  const setConsent = useCallback((value: Consent) => {
    if (value === "unknown") {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, value);
    }
    setConsentState(value);
    pushConsentUpdate(value);
  }, []);

  const resetConsent = useCallback(() => {
    window.localStorage.removeItem(STORAGE_KEY);
    setConsentState("unknown");
    pushConsentUpdate("denied");
  }, []);

  return (
    <ConsentContext.Provider
      value={{ consent, ready, setConsent, resetConsent }}
    >
      {children}
    </ConsentContext.Provider>
  );
}
