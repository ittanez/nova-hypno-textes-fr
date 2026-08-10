import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

/**
 * Le module lit import.meta.env au chargement : chaque test doit donc réimporter
 * le module après avoir posé les variables d'environnement voulues.
 */
const loadModule = async (env: Record<string, string | undefined> = {}) => {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    vi.stubEnv(key, value ?? '');
  }
  return import('@/lib/googleAds');
};

const setSearch = (search: string) => {
  window.history.replaceState({}, '', `/hypnose-stress-anxiete-paris${search}`);
};

const ADS_ENV = {
  VITE_GOOGLE_ADS_ID: 'AW-1234567890',
  VITE_GOOGLE_ADS_LABEL_BOOKING: 'bookingLabel',
  VITE_GOOGLE_ADS_LABEL_PHONE: 'phoneLabel',
  VITE_GOOGLE_ADS_LABEL_FORM: 'formLabel',
};

describe('googleAds', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    setSearch('');
    window.gtag = vi.fn();
    window.__nhLoadGtag = vi.fn();
    window.__nhGtagLoaded = false;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  describe('isPaidVisit', () => {
    it('détecte un gclid', async () => {
      setSearch('?gclid=abc123');
      const { isPaidVisit } = await loadModule();
      expect(isPaidVisit()).toBe(true);
    });

    it('détecte gbraid et wbraid (clics iOS sans gclid)', async () => {
      const { isPaidVisit } = await loadModule();

      setSearch('?gbraid=xyz');
      expect(isPaidVisit()).toBe(true);

      window.sessionStorage.clear();
      setSearch('?wbraid=xyz');
      expect(isPaidVisit()).toBe(true);
    });

    it('détecte le couple utm_source=google + utm_medium=cpc', async () => {
      setSearch('?utm_source=google&utm_medium=cpc&utm_campaign=stress-anxiete-paris');
      const { isPaidVisit } = await loadModule();
      expect(isPaidVisit()).toBe(true);
    });

    it('ignore le trafic organique', async () => {
      setSearch('?utm_source=google&utm_medium=organic');
      const { isPaidVisit } = await loadModule();
      expect(isPaidVisit()).toBe(false);
    });

    it('ignore une visite sans paramètre', async () => {
      const { isPaidVisit } = await loadModule();
      expect(isPaidVisit()).toBe(false);
    });

    it('reste vrai après une navigation SPA qui efface les paramètres', async () => {
      setSearch('?gclid=abc123');
      const { isPaidVisit } = await loadModule();
      expect(isPaidVisit()).toBe(true);

      setSearch(''); // navigation interne : le gclid a disparu de l'URL
      expect(isPaidVisit()).toBe(true);
    });
  });

  describe('trackAdsConversion', () => {
    it("n'envoie rien sans identifiant de compte", async () => {
      const { trackAdsConversion } = await loadModule({ VITE_GOOGLE_ADS_ID: undefined });
      trackAdsConversion('booking');
      expect(window.gtag).not.toHaveBeenCalled();
    });

    it("n'envoie rien si le libellé de l'action est absent", async () => {
      const { trackAdsConversion } = await loadModule({
        VITE_GOOGLE_ADS_ID: 'AW-1234567890',
        VITE_GOOGLE_ADS_LABEL_BOOKING: undefined,
      });
      trackAdsConversion('booking');
      expect(window.gtag).not.toHaveBeenCalled();
    });

    it('envoie la conversion de réservation avec sa valeur', async () => {
      const { trackAdsConversion } = await loadModule(ADS_ENV);
      trackAdsConversion('booking');

      expect(window.gtag).toHaveBeenCalledWith('event', 'conversion', {
        send_to: 'AW-1234567890/bookingLabel',
        value: 30,
        currency: 'EUR',
      });
    });

    it('distingue les actions téléphone et formulaire', async () => {
      const { trackAdsConversion } = await loadModule(ADS_ENV);

      trackAdsConversion('phone');
      expect(window.gtag).toHaveBeenLastCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ send_to: 'AW-1234567890/phoneLabel', value: 35 })
      );

      trackAdsConversion('form');
      expect(window.gtag).toHaveBeenLastCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ send_to: 'AW-1234567890/formLabel', value: 15 })
      );
    });
  });

  describe('initConversionTracking', () => {
    it('force le chargement de gtag pour une visite payante', async () => {
      setSearch('?gclid=abc123');
      const { initConversionTracking } = await loadModule(ADS_ENV);
      initConversionTracking();
      expect(window.__nhLoadGtag).toHaveBeenCalled();
    });

    it('laisse le chargement différé pour une visite organique', async () => {
      const { initConversionTracking } = await loadModule(ADS_ENV);
      initConversionTracking();
      expect(window.__nhLoadGtag).not.toHaveBeenCalled();
    });

    it("configure l'identifiant Google Ads", async () => {
      const { initConversionTracking } = await loadModule(ADS_ENV);
      initConversionTracking();
      expect(window.gtag).toHaveBeenCalledWith('config', 'AW-1234567890');
    });

    it("ne configure rien quand le suivi n'est pas paramétré", async () => {
      const { initConversionTracking } = await loadModule({ VITE_GOOGLE_ADS_ID: undefined });
      initConversionTracking();
      expect(window.gtag).not.toHaveBeenCalled();
    });

    it("n'agit qu'une seule fois", async () => {
      setSearch('?gclid=abc123');
      const { initConversionTracking } = await loadModule(ADS_ENV);
      initConversionTracking();
      initConversionTracking();
      expect(window.__nhLoadGtag).toHaveBeenCalledTimes(1);
    });

    it('convertit un clic sur un lien téléphonique', async () => {
      const { initConversionTracking } = await loadModule(ADS_ENV);
      initConversionTracking();

      const link = document.createElement('a');
      link.href = 'tel:+33649358089';
      link.addEventListener('click', (e) => e.preventDefault());
      const inner = document.createElement('span');
      link.appendChild(inner);
      document.body.appendChild(link);

      // Clic sur l'enfant : vérifie la remontée via closest().
      inner.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

      expect(window.gtag).toHaveBeenCalledWith(
        'event',
        'conversion',
        expect.objectContaining({ send_to: 'AW-1234567890/phoneLabel' })
      );

      document.body.removeChild(link);
    });

    it('ignore les clics sur les autres liens', async () => {
      const { initConversionTracking } = await loadModule(ADS_ENV);
      initConversionTracking();
      (window.gtag as ReturnType<typeof vi.fn>).mockClear();

      const link = document.createElement('a');
      link.href = 'https://novahypnose.fr/tarifs';
      link.addEventListener('click', (e) => e.preventDefault());
      document.body.appendChild(link);
      link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

      expect(window.gtag).not.toHaveBeenCalled();
      document.body.removeChild(link);
    });
  });
});
