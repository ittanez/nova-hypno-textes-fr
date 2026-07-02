
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@/styles/preview-charte.css'
import { logger } from '@/lib/logger';

// Point d'extension pour charger des ressources non critiques après le rendu
// initial (appelé via requestIdleCallback plus bas). Vide à ce jour.
const loadNonCriticalResources = () => {};

// Rendu de l'application avec priorité maximale
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for performance optimization (Phase 2)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        logger.debug('[SW] Service Worker registered successfully:', registration.scope);

        // Vérifier les mises à jour toutes les heures
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);
      })
      .catch((error) => {
        logger.debug('[SW] Service Worker registration failed:', error);
      });
  });
}

// Wrapped in an immediate function to avoid global scope pollution
(function() {
  if (typeof window === 'undefined') return;
  
  // Note: HTTP to HTTPS redirection is now handled in the App component only, not here
  
  // Utilisation de requestIdleCallback avec une stratégie de fallback optimisée
  if ('requestIdleCallback' in window) {
    // Utiliser requestIdleCallback avec un délai maximal pour garantir l'exécution
    window.requestIdleCallback(loadNonCriticalResources, { timeout: 5000 });
  } else {
    // Fallback qui attend que le contenu principal soit chargé
    // Type assertion to ensure TypeScript knows this is a Window object
    const win = window as Window;
    win.addEventListener('load', () => {
      setTimeout(loadNonCriticalResources, 2000);
    });
  }
})();
