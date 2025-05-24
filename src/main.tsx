
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fonction pour charger les ressources non critiques de manière optimisée
const loadNonCriticalResources = () => {
  // Performance optimizations avec priorité basse et cache amélioré
  const loadOptimizedScript = (src: string, options: { defer?: boolean; async?: boolean } = {}) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = options.defer ?? true;
    script.async = options.async ?? true;
    script.setAttribute('fetchPriority', 'low');
    
    // Gestion d'erreur pour les scripts externes
    script.onerror = () => {
      console.warn(`Failed to load script: ${src}`);
    };
    
    document.body.appendChild(script);
  };
  
  // Préconnexion optimisée aux domaines tiers
  const addOptimizedPreconnect = (url: string) => {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  };
  
  // Ajouter les préconnexions avec vérification de doublons
  addOptimizedPreconnect('https://cdn.gpteng.co');
  addOptimizedPreconnect('https://tools.luckyorange.com');
  addOptimizedPreconnect('https://fonts.gstatic.com');
  
  // Service Worker pour la mise en cache (si supporté)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .catch(() => {
        // Service worker non disponible, continuer sans
      });
  }
};

// Rendu de l'application avec priorité maximale et optimisations
const root = createRoot(document.getElementById("root")!);

// Activer le mode concurrent de React pour de meilleures performances
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Fonction d'optimisation encapsulée pour éviter la pollution du scope global
(function initPerformanceOptimizations() {
  if (typeof window === 'undefined') return;
  
  // Optimisation du chargement différé avec stratégies multiples
  const scheduleNonCriticalLoading = () => {
    // Priorité 1: requestIdleCallback (navigateurs modernes)
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(loadNonCriticalResources, { 
        timeout: 3000 // Assurer l'exécution même si le navigateur est occupé
      });
    } 
    // Priorité 2: setTimeout après DOMContentLoaded (fallback)
    else {
      const loadHandler = () => {
        setTimeout(loadNonCriticalResources, 1500);
      };
      
      // Vérifier si le document est déjà chargé
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHandler, { once: true });
      } else {
        loadHandler();
      }
    }
  };

  // Optimisations spécifiques aux Core Web Vitals
  const optimizeWebVitals = () => {
    // Éviter les Layout Shifts
    const images = document.querySelectorAll('img:not([width]):not([height])');
    images.forEach((img) => {
      if (img instanceof HTMLImageElement && !img.width && !img.height) {
        // Ajouter des dimensions par défaut pour éviter le CLS
        img.style.aspectRatio = '16/9';
      }
    });

    // Optimiser les animations
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  };

  // Initialiser toutes les optimisations
  scheduleNonCriticalLoading();
  optimizeWebVitals();
})();
