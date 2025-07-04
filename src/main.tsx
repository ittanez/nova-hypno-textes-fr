
import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fonction pour charger les ressources non critiques après le rendu initial
const loadNonCriticalResources = () => {
  // Chargement des ressources non essentielles avec priorité basse
  const loadNonCriticalScript = (src: string, cacheTime: number = 604800) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('fetchPriority', 'low');
    
    // Ajout des en-têtes de cache pour les ressources statiques
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'script';
    
    document.body.appendChild(script);
  };
  
  // Chargement des styles non critiques
  const loadNonCriticalStyles = (href: string, cacheTime: number = 604800) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('fetchPriority', 'low');
    document.head.appendChild(link);
  };
  
  // Préconnexion aux domaines tiers
  const addPreconnect = (url: string) => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = url;
    document.head.appendChild(link);
  };
  
  // Ajouter les préconnexions
  addPreconnect('https://cdn.gpteng.co');
  addPreconnect('https://tools.luckyorange.com');
  
  // Chargement d'autres ressources non critiques
};

// Rendu de l'application avec priorité maximale
const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Unregister any existing service workers to prevent errors
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
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
