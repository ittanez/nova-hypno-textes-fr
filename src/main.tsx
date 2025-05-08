
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
    script.setAttribute('fetchpriority', 'low');
    
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
    link.setAttribute('fetchpriority', 'low');
    document.head.appendChild(link);
  };
  
  // Ici vous pourriez charger d'autres ressources non critiques
  // comme des analyses ou des ressources tierces supplémentaires
};

// Rendu de l'application avec priorité maximale
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Wrapped in an immediate function to avoid global scope pollution
(function() {
  if (typeof window === 'undefined') return;
  
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
  
  // Redirection HTTP vers HTTPS
  if (location.protocol === 'http:' && location.hostname !== 'localhost') {
    window.location.href = window.location.href.replace('http:', 'https:');
  }
})();
