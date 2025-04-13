"use client";

import Script from "next/script";

const GoogleScripts = () => {
  const isDev = process.env.NODE_ENV === "development";
  const gtagId = "G-JYS079JHCG";

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
