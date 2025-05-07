
import { useCallback, useEffect, useRef } from 'react';

/**
 * Custom hook to handle scroll animations
 * @returns Animation frame ID reference for cleanup
 */
export function useScrollAnimation() {
  // Optimisation avec useRef pour éviter les recréations inutiles de la fonction
  const animationFrameIdRef = useRef<number | null>(null);
  
  // Optimisation de l'effet d'animation au scroll avec useCallback et Intersection Observer
  const setupIntersectionObserver = useCallback(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Arrêter d'observer une fois que l'élément est visible
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 }
    );
    
    // Observer tous les éléments avec la classe animate-on-scroll
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
    
    return observer;
  }, []);
  
  // Effect optimisé pour l'animation au scroll
  useEffect(() => {
    // Utiliser Intersection Observer si disponible
    const observer = setupIntersectionObserver();
    
    // Fallback pour les navigateurs sans support d'Intersection Observer
    if (typeof window !== 'undefined' && !('IntersectionObserver' in window)) {
      const animateElements = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        elements.forEach((element) => {
          const elementPosition = element.getBoundingClientRect().top;
          if (elementPosition < windowHeight - 100) {
            element.classList.add('is-visible');
          }
        });
      };
      
      const handleScroll = () => {
        // Annule l'animation précédente si elle existe
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        
        // Planifie l'animation pour le prochain frame
        animationFrameIdRef.current = requestAnimationFrame(animateElements);
      };
      
      // Run once on load
      animateElements();
      
      // Utilisation de l'événement passive pour améliorer les performances
      if (typeof window !== 'undefined') {
        window.addEventListener('scroll', handleScroll, { passive: true });
      }
      
      // Clean up
      return () => {
        if (typeof window !== 'undefined') {
          window.removeEventListener('scroll', handleScroll);
        }
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
      };
    }
    
    // Nettoyer l'observer si utilisé
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [setupIntersectionObserver]);

  return animationFrameIdRef;
}
