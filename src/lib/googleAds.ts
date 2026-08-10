/**
 * Google Ads — suivi des conversions
 *
 * Contexte : gtag.js est chargé avec 8 secondes de retard (index.html) pour
 * préserver les Core Web Vitals. C'est acceptable pour le trafic organique, mais
 * pas pour le trafic payant : un visiteur venu d'une annonce qui clique sur
 * « Prendre rendez-vous » au bout de 5 secondes ne serait jamais compté, et
 * l'optimisation des enchères deviendrait impossible.
 *
 * Ce module :
 *  1. détecte le trafic Google Ads (gclid / gbraid / wbraid / utm) et le mémorise
 *     pour toute la session — les paramètres d'URL disparaissent dès la première
 *     navigation SPA ;
 *  2. force le chargement immédiat de gtag.js pour ces visiteurs uniquement ;
 *  3. envoie les conversions (prise de RDV, appel, formulaire).
 *
 * Le module reste inerte tant que VITE_GOOGLE_ADS_ID n'est pas défini : aucune
 * conversion n'est envoyée et aucun script supplémentaire n'est chargé.
 *
 * Les identifiants se relèvent dans Google Ads : Outils > Mesure > Conversions.
 * Chaque action de conversion expose un identifiant de compte (AW-XXXXXXXXXX) et
 * un libellé, à reporter dans les variables d'environnement ci-dessous.
 */

import { logger } from '@/lib/logger';

declare global {
  interface Window {
    /** Charge gtag.js et configure GA4. Idempotent. Défini dans index.html. */
    __nhLoadGtag?: () => void;
    __nhGtagLoaded?: boolean;
  }
}

const ADS_ID = import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined;

/** Libellés des actions de conversion, relevés dans l'interface Google Ads. */
const CONVERSION_LABELS: Record<ConversionKind, string | undefined> = {
  booking: import.meta.env.VITE_GOOGLE_ADS_LABEL_BOOKING as string | undefined,
  phone: import.meta.env.VITE_GOOGLE_ADS_LABEL_PHONE as string | undefined,
  form: import.meta.env.VITE_GOOGLE_ADS_LABEL_FORM as string | undefined,
};

/**
 * Valeurs estimées, en euros : 90 € (prix d'une séance) pondérés par le taux de
 * transformation observé entre le clic et la séance réellement honorée.
 * À réviser après trois mois de données réelles (voir README §5.3).
 */
const CONVERSION_VALUES: Record<ConversionKind, number> = {
  booking: 30,
  phone: 35,
  form: 15,
};

export type ConversionKind = 'booking' | 'phone' | 'form';

const PAID_VISIT_KEY = 'nh_paid_visit';

/** Paramètres d'URL qui identifient un clic payant Google. */
const CLICK_ID_PARAMS = ['gclid', 'gbraid', 'wbraid'] as const;

let initialized = false;

/**
 * Vrai si la visite en cours provient d'une annonce Google Ads.
 *
 * Le clic payant n'est identifiable que sur la première page ; le résultat est
 * donc mémorisé en sessionStorage pour rester valable après les navigations SPA.
 */
export const isPaidVisit = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    if (window.sessionStorage.getItem(PAID_VISIT_KEY) === '1') return true;
  } catch {
    // sessionStorage indisponible (navigation privée, cookies bloqués) :
    // on retombe sur la seule lecture de l'URL.
  }

  const params = new URLSearchParams(window.location.search);
  const hasClickId = CLICK_ID_PARAMS.some((p) => Boolean(params.get(p)));
  const hasPaidUtm =
    params.get('utm_source') === 'google' && params.get('utm_medium') === 'cpc';

  if (!hasClickId && !hasPaidUtm) return false;

  try {
    window.sessionStorage.setItem(PAID_VISIT_KEY, '1');
  } catch {
    // Sans persistance, la détection recommencera à chaque page. Sans gravité.
  }

  return true;
};

/** Envoie un événement gtag ; la file dataLayer absorbe les appels anticipés. */
const sendGtag = (...args: unknown[]) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

/**
 * Envoie une conversion à Google Ads.
 *
 * Sans identifiant de compte ou sans libellé configuré, l'appel ne fait rien :
 * le suivi GA4 (voir analytics.ts) reste la seule mesure.
 */
export const trackAdsConversion = (kind: ConversionKind) => {
  if (!ADS_ID) return;

  const label = CONVERSION_LABELS[kind];
  if (!label) {
    logger.debug(`[googleAds] libellé de conversion manquant pour « ${kind} »`);
    return;
  }

  sendGtag('event', 'conversion', {
    send_to: `${ADS_ID}/${label}`,
    value: CONVERSION_VALUES[kind],
    currency: 'EUR',
  });
};

/**
 * Enregistre les clics sur les liens téléphoniques du site.
 *
 * Une écoute déléguée sur le document évite de modifier les dizaines de pages
 * qui exposent un lien `tel:`. La capture est utilisée pour que l'événement
 * parte même si un gestionnaire en aval appelle stopPropagation().
 */
const trackPhoneClicks = () => {
  document.addEventListener(
    'click',
    (event) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;
      if (!target.closest('a[href^="tel:"]')) return;

      trackAdsConversion('phone');
      sendGtag('event', 'cta_click', {
        event_category: 'conversion',
        event_label: 'phone_call',
        cta_location: window.location.pathname,
      });
    },
    { capture: true }
  );
};

/**
 * Initialise le suivi. À appeler une seule fois au démarrage de l'application.
 */
export const initConversionTracking = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;

  // Le trafic payant ne peut pas attendre 8 secondes : on charge gtag.js tout
  // de suite. Le trafic organique conserve le chargement différé.
  if (isPaidVisit()) {
    window.__nhLoadGtag?.();
    logger.debug('[googleAds] visite payante détectée, gtag chargé immédiatement');
  }

  // La configuration est mise en file dans dataLayer si gtag.js n'est pas
  // encore chargé, et rejouée à son chargement.
  if (ADS_ID) {
    sendGtag('config', ADS_ID);
  }

  trackPhoneClicks();
};
