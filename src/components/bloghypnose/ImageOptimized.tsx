
import React, { useState, useEffect, useRef } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

// Interface de props pour le composant ImageOptimized
interface ImageOptimizedProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

// Composant d'image optimisé avec lazy loading et gestion des erreurs
const ImageOptimized: React.FC<ImageOptimizedProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Utiliser un observateur d'intersection pour charger les images uniquement lorsqu'elles sont visibles
  useEffect(() => {
    // Si l'image est prioritaire, ne pas utiliser l'observateur
    if (priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Arrêter d'observer une fois que l'image est visible
          if (imgRef.current) {
            observer.unobserve(imgRef.current);
          }
        }
      },
      {
        rootMargin: '200px', // Précharger les images un peu avant qu'elles ne soient visibles
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  // Gestionnaire de chargement réussi
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Gestionnaire d'erreur
  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
    if (onError) onError();
  };

  // Image de remplacement en cas d'erreur
  const fallbackSrc = '/placeholder.svg';

  return (
    <div className="relative" style={{ width, height }}>
      {!isLoaded && (
        <Skeleton className={`absolute top-0 left-0 w-full h-full ${className}`} />
      )}
      <img
        ref={imgRef}
        src={hasError ? fallbackSrc : (isVisible ? src : '')}
        alt={alt}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        width={width}
        height={height}
      />
    </div>
  );
};

export default ImageOptimized;
