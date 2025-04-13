import Script from "next/script";
import React, { useEffect } from "react";

const GoogleScripts = () => {
  const isDev = process.env.NODE_ENV === "development";
  const gtagId = "G-JYS079JHCG";

  useEffect(() => {
    interface Consent {
      ad_storage?: string;
      analytics_storage?: string;
      functionality_storage?: string;
      security_storage?: string;
    }

    const updateConsent = (consent: Consent) => {
      if (window.gtag) {
        window.gtag("consent", "update", consent as Record<string, unknown>);
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
    <>
      {!isDev && (
        <>
          <Script
            async
            strategy="beforeInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
          />
          <Script id="gtag" strategy="beforeInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gtagId}', { anonymize_ip: true });

              // Default consent settings
              gtag("consent", "default", {
                ad_storage: "denied",
                analytics_storage: "denied",
                functionality_storage: "granted",
                security_storage: "granted",
              });
            `}
          </Script>
        </>
      )}
    </>
  );
};

export default GoogleScripts;
