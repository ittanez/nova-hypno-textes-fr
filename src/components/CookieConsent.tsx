import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Toujours activé
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Attendre 1 seconde avant d'afficher le banner
      setTimeout(() => setShowBanner(true), 1000);
    } else {
      // Charger les préférences sauvegardées
      try {
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
        applyPreferences(savedPrefs);
      } catch (e) {
        console.error('Erreur lors du chargement des préférences cookies:', e);
      }
    }
  }, []);

  const applyPreferences = (prefs: CookiePreferences) => {
    // Appliquer les préférences analytics
    if (prefs.analytics && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    } else if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    // Appliquer les préférences marketing
    if (prefs.marketing) {
      // Activer Lucky Orange si accepté
      // Le script est déjà chargé dans index.html
    } else {
      // Désactiver le tracking marketing
      if (window.gtag) {
        window.gtag('consent', 'update', {
          ad_storage: 'denied',
        });
      }
    }
  };

  const handleAcceptAll = () => {
    const newPrefs = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(newPrefs);
  };

  const handleAcceptNecessary = () => {
    const newPrefs = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    savePreferences(newPrefs);
  };

  const handleSavePreferences = () => {
    savePreferences(preferences);
  };

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));
    applyPreferences(prefs);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-nova-blue-dark">
              Gestion des cookies
            </h2>
            <button
              onClick={handleAcceptNecessary}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Fermer"
            >
              <X size={24} />
            </button>
          </div>

          <p className="text-gray-700 mb-4">
            Nous utilisons des cookies pour améliorer votre expérience sur notre site.
            Certains cookies sont essentiels au fonctionnement du site, tandis que d'autres
            nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
          </p>

          {showDetails ? (
            <div className="space-y-4 mb-6">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-nova-blue-dark">
                    Cookies nécessaires
                  </h3>
                  <input
                    type="checkbox"
                    checked={preferences.necessary}
                    disabled
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Ces cookies sont essentiels au fonctionnement du site et ne peuvent
                  pas être désactivés. Ils sont généralement définis en réponse à des
                  actions que vous effectuez (connexion, préférences de confidentialité).
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-nova-blue-dark">
                    Cookies analytiques
                  </h3>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Ces cookies nous permettent de mesurer l'audience du site (Google Analytics)
                  pour améliorer nos contenus et votre expérience de navigation.
                </p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-nova-blue-dark">
                    Cookies marketing
                  </h3>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) =>
                      setPreferences({ ...preferences, marketing: e.target.checked })
                    }
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-sm text-gray-600">
                  Ces cookies sont utilisés pour suivre les visiteurs sur les sites web
                  afin d'afficher des publicités pertinentes (Lucky Orange).
                </p>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDetails(true)}
              className="text-nova-blue hover:text-nova-blue-dark underline mb-6"
            >
              Personnaliser mes choix
            </button>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            {showDetails ? (
              <>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-nova-blue hover:bg-nova-blue-dark"
                >
                  Enregistrer mes préférences
                </Button>
                <Button
                  onClick={handleAcceptAll}
                  variant="outline"
                  className="flex-1"
                >
                  Tout accepter
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={handleAcceptAll}
                  className="flex-1 bg-nova-blue hover:bg-nova-blue-dark"
                >
                  Tout accepter
                </Button>
                <Button
                  onClick={handleAcceptNecessary}
                  variant="outline"
                  className="flex-1"
                >
                  Nécessaires uniquement
                </Button>
              </>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-4 text-center">
            En poursuivant votre navigation, vous acceptez l'utilisation de cookies.
            Pour en savoir plus, consultez notre{' '}
            <a href="/mentions-legales" className="text-nova-blue hover:underline">
              politique de confidentialité
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

// Déclaration TypeScript pour window.gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export default CookieConsent;
