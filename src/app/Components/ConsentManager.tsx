"use client";

import React, { useState } from "react";

const ConsentManager = () => {
  const [consent, setConsent] = useState({
    ad_storage: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
  });

  interface Consent {
    ad_storage: string;
    analytics_storage: string;
    functionality_storage: string;
    security_storage: string;
  }

  type ConsentType = keyof Consent;

  const handleConsentChange = (type: ConsentType, value: string) => {
    const updatedConsent: Consent = { ...consent, [type]: value };
    setConsent(updatedConsent);

    // Dispatch consent change event
    const event = new CustomEvent("consentChange", { detail: updatedConsent });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <h3>Cookie Preferences</h3>
      <label>
        <input
          type="checkbox"
          checked={consent.ad_storage === "granted"}
          onChange={(e) =>
            handleConsentChange(
              "ad_storage",
              e.target.checked ? "granted" : "denied"
            )
          }
        />
        Personalized Ads
      </label>
      <label>
        <input
          type="checkbox"
          checked={consent.analytics_storage === "granted"}
          onChange={(e) =>
            handleConsentChange(
              "analytics_storage",
              e.target.checked ? "granted" : "denied"
            )
          }
        />
        Analytics
      </label>
      {/* Add more options as needed */}
    </div>
  );
};

export default ConsentManager;
