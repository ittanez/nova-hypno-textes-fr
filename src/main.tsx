
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Fonction pour charger les ressources non critiques après le rendu initial
const loadNonCriticalResources = () => {
  // Ici vous pouvez charger des scripts analytiques ou autres ressources non essentielles
  // Par exemple, vous pourriez charger des polices supplémentaires, des icônes, etc.
};

// Rendu de l'application
const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Utilisation de requestIdleCallback (ou setTimeout comme fallback) pour charger les ressources non critiques
// quand le navigateur est inactif
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(loadNonCriticalResources);
} else {
  setTimeout(loadNonCriticalResources, 2000);
}
