import { trackAdsConversion } from '@/lib/googleAds';
import { trackCTAClick } from '@/lib/analytics';

/**
 * Hook pour ouvrir la fenêtre de réservation Resalib dans un popup
 *
 * La réservation elle-même se déroule sur resalib.fr, un domaine tiers que l'on
 * ne peut pas baliser. L'ouverture du popup est donc le dernier signal mesurable
 * côté site : c'est lui qui sert de conversion principale à Google Ads.
 */

export const useResalibPopup = () => {
  const openResalibPopup = (url: string = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr') => {
    trackAdsConversion('booking');
    trackCTAClick('resalib_booking', window.location.pathname);

    // Dimensions du popup
    const width = 900;
    const height = 800;

    // Centrer le popup sur l'écran
    // Utilise screenLeft/screenTop pour le positionnement cross-browser
    const screenLeft = window.screenLeft ?? window.screenX ?? 0;
    const screenTop = window.screenTop ?? window.screenY ?? 0;

    const left = screenLeft + (window.outerWidth - width) / 2;
    const top = screenTop + (window.outerHeight - height) / 2;

    // Paramètres du popup (permissive pour la compatibilité)
    const params = [
      'scrollbars=yes',
      'resizable=yes',
      'toolbar=no',
      'menubar=no',
      'location=yes',
      'status=yes',
      `width=${width}`,
      `height=${height}`,
      `left=${Math.max(0, left)}`,
      `top=${Math.max(0, top)}`
    ].join(',');

    // Ouvrir dans un popup
    const popup = window.open(url, 'resalib_booking', params);

    // Essayer de mettre le focus sur le popup s'il a pu être créé
    if (popup) {
      try {
        popup.focus();
      } catch {
        // Certains navigateurs peuvent bloquer le focus
      }
    }
  };

  return { openResalibPopup };
};
