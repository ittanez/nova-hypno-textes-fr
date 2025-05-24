
import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (threshold: number = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Configuration adaptée mobile avec seuil plus bas
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: Math.max(0.05, threshold), // Seuil minimum de 5% pour mobile
        rootMargin: '20px 0px', // Marge plus large pour déclencher plus tôt
      }
    );

    observer.observe(element);

    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    const fallbackCheck = () => {
      if (!element) return;
      
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      if (rect.top <= windowHeight * 0.8) {
        setIsVisible(true);
      }
    };

    // Vérification immédiate au cas où l'élément serait déjà visible
    fallbackCheck();

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { ref, isVisible };
};
