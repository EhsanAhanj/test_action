"use client";

import React, { useEffect, useState } from "react";

type grantType = "granted" | "denied";
interface Consent {
  ad_storage: grantType;
  analytics_storage: grantType;
  functionality_storage: grantType;
  security_storage: grantType;
}
type ConsentType = keyof Consent;

const ConsentManager = () => {
  const [consent, setConsent] = useState<Consent>({
    ad_storage: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  const handleConsentChange = (updates: Partial<Consent>) => {
    const updatedConsent: Consent = { ...consent, ...updates };
    setConsent(updatedConsent);

    // Dispatch consent change event
    const event = new CustomEvent("consentChange", { detail: updatedConsent });
    window.dispatchEvent(event);
  };

  useEffect(() => {
    const updateConsent = (consent: Consent) => {
      if (window.gtag) {
        window.gtag("consent", "update", consent);
      }
    };

    // Example: Listen for consent changes from a CMP
    window.addEventListener("consentChange", (event) => {
      updateConsent((event as CustomEvent).detail);
    });

    return () => {
      window.removeEventListener("consentChange", (event) => {
        updateConsent((event as CustomEvent).detail);
      });
    };
  }, []);

  return (
    <div>
      <h3>Cookie Preferences</h3>
      <label>
        <input
          type="checkbox"
          checked={consent.ad_storage === "granted"}
          onChange={(e) =>
            handleConsentChange({
              ad_storage: e.target.checked ? "granted" : "denied",
            })
          }
        />
        Personalized Ads
      </label>
      <label>
        <input
          type="checkbox"
          checked={consent.analytics_storage === "granted"}
          onChange={(e) =>
            handleConsentChange({
              analytics_storage: e.target.checked ? "granted" : "denied",
            })
          }
        />
        Analytics
      </label>
      {/* Add more options as needed */}
      <button
        onClick={() =>
          handleConsentChange({
            ad_storage: "denied",
            analytics_storage: "denied",
          })
        }
      >
        Deny All
      </button>
      <button
        onClick={() =>
          handleConsentChange({
            ad_storage: "granted",
            analytics_storage: "granted",
          })
        }
      >
        Grant All
      </button>
    </div>
  );
};

export default ConsentManager;
