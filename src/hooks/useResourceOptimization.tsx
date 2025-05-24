
import { useEffect } from 'react';

interface ResourceOptimizationOptions {
  enableLazyLoading?: boolean;
  deferNonCriticalResources?: boolean;
  preloadCriticalResources?: boolean;
}

export const useResourceOptimization = (options: ResourceOptimizationOptions = {}) => {
  const {
    enableLazyLoading = true,
    deferNonCriticalResources = true,
    preloadCriticalResources = true,
  } = options;

  useEffect(() => {
    // Optimiser les images existantes avec lazy loading
    if (enableLazyLoading && 'IntersectionObserver' in window) {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      }, {
        rootMargin: '50px',
      });

      images.forEach((img) => imageObserver.observe(img));

      return () => imageObserver.disconnect();
    }
  }, [enableLazyLoading]);

  useEffect(() => {
    // Précharger les ressources critiques
    if (preloadCriticalResources) {
      const criticalResources = [
        '/lovable-uploads/bfa09bf5-35ee-4e5b-9b32-5d1f42101734.png',
        // Ajouter d'autres ressources critiques si nécessaire
      ];

      criticalResources.forEach((resource) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = resource;
        link.setAttribute('fetchpriority', 'high');
        document.head.appendChild(link);
      });
    }
  }, [preloadCriticalResources]);

  useEffect(() => {
    // Différer les ressources non critiques
    if (deferNonCriticalResources) {
      const deferredLoadTimeout = setTimeout(() => {
        // Charger les polices secondaires
        const secondaryFonts = document.createElement('link');
        secondaryFonts.rel = 'stylesheet';
        secondaryFonts.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Poppins:wght@300;500;700&display=swap';
        document.head.appendChild(secondaryFonts);

        // Autres ressources non critiques peuvent être ajoutées ici
      }, 1000);

      return () => clearTimeout(deferredLoadTimeout);
    }
  }, [deferNonCriticalResources]);

  // Fonction pour optimiser les performances de rendu
  const optimizeRendering = () => {
    // Utiliser requestIdleCallback pour les tâches non urgentes
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        // Optimisations supplémentaires peuvent être ajoutées ici
        console.log('Optimisations de rendu appliquées');
      });
    }
  };

  return { optimizeRendering };
};
