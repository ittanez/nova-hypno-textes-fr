/**
 * Analytics — Tracking de conversion via Google Analytics 4 (gtag)
 * GA4 ID: G-5W9ZQEJKLF (chargé dans index.html avec délai de 8s)
 *
 * Usage : importer et appeler les fonctions depuis les composants.
 * Si gtag n'est pas encore chargé (délai 8s), les événements sont silencieusement ignorés.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Envoie un événement GA4 si gtag est disponible */
const sendEvent = (eventName: string, params: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

/**
 * Track un clic sur un CTA (réservation, téléphone, email, etc.)
 * @param cta - Identifiant du CTA (ex: "resalib_booking", "phone_call")
 * @param location - Emplacement sur la page (ex: "hero", "pricing", "cta_section", "floating_button")
 */
export const trackCTAClick = (cta: string, location: string) => {
  sendEvent('cta_click', {
    event_category: 'conversion',
    event_label: cta,
    cta_location: location,
  });
};

/**
 * Track une conversion finale (réservation confirmée, formulaire soumis, etc.)
 * @param data - Données additionnelles (type, valeur, etc.)
 */
export const trackConversion = (data?: unknown) => {
  sendEvent('generate_lead', {
    event_category: 'conversion',
    ...(data && typeof data === 'object' ? data : {}),
  });
};

/**
 * Track une interaction avec un formulaire (focus, soumission, etc.)
 * @param field - Nom du champ ou formulaire
 * @param action - Type d'interaction ("focus", "submit", "error")
 * @param data - Données additionnelles
 */
export const trackFormInteraction = (field: string, action?: string, data?: unknown) => {
  sendEvent('form_interaction', {
    event_category: 'engagement',
    form_field: field,
    form_action: action || 'interact',
    ...(data && typeof data === 'object' ? data : {}),
  });
};

/**
 * Track une étape du quiz (réceptivité, auto-hypnose, etc.)
 * @param step - Identifiant de l'étape
 * @param data - Données de l'étape
 */
export const trackQuizStep = (step: string, data?: unknown) => {
  sendEvent('quiz_step', {
    event_category: 'engagement',
    quiz_step: step,
    ...(data && typeof data === 'object' ? data : {}),
  });
};
