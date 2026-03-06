import { useState, useEffect } from "react";

const CONSENT_KEY = "analytics_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no choice has been made yet
    if (localStorage.getItem(CONSENT_KEY) === null) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
    // Load analytics scripts immediately after consent
    loadAnalytics();
  }

  function decline() {
    localStorage.setItem(CONSENT_KEY, "false");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-700 flex-1">
          Ce site utilise des cookies d'analyse (Google Analytics, Lucky Orange) pour
          ameliorer votre experience. Vos donnees ne sont jamais partagees avec des tiers.{" "}
          <a href="/mentions-legales" className="underline text-nova-blue">
            En savoir plus
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Refuser
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-sm bg-nova-blue text-white rounded-md hover:bg-nova-blue/90 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
}

function loadAnalytics() {
  // Google Analytics
  const s = document.createElement("script");
  s.src = "https://www.googletagmanager.com/gtag/js?id=G-5W9ZQEJKLF";
  s.async = true;
  document.head.appendChild(s);
  s.onload = function () {
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      (window.dataLayer as unknown[]).push(args);
    }
    gtag("js", new Date());
    gtag("config", "G-5W9ZQEJKLF");
  };

  // Lucky Orange
  const lo = document.createElement("script");
  lo.src = "https://tools.luckyorange.com/core/lo.js?site-id=856f311d";
  document.head.appendChild(lo);
}

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}
