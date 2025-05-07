
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fonction pour charger les ressources non critiques après le rendu initial
const loadNonCriticalResources = () => {
  // Chargement des ressources non essentielles avec priorité basse
  const loadNonCriticalScript = (src: string) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.fetchPriority = 'low';
    document.body.appendChild(script);
  };
  
  // Chargement des styles non critiques
  const loadNonCriticalStyles = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.fetchPriority = 'low';
    document.head.appendChild(link);
  };
  
  // Ici vous pourriez charger d'autres ressources non critiques
  // comme des analyses ou des ressources tierces supplémentaires
};

// Rendu de l'application avec priorité maximale
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Utilisation de requestIdleCallback avec une stratégie de fallback optimisée
if ('requestIdleCallback' in window) {
  // Utiliser requestIdleCallback avec un délai maximal pour garantir l'exécution
  window.requestIdleCallback(loadNonCriticalResources, { timeout: 5000 });
} else {
  // Fallback qui attend que le contenu principal soit chargé
  window.addEventListener('load', () => {
    setTimeout(loadNonCriticalResources, 2000);
  });
}
