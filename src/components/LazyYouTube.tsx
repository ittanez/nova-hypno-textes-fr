import React, { useState, useRef, useEffect } from 'react';
import Play from 'lucide-react/dist/esm/icons/play';
import { extractYouTubeId } from '@/lib/youtube';

interface LazyYouTubeProps {
  /** Identifiant YouTube, ou URL complète (watch?v=, youtu.be/, /embed/, /shorts/). */
  videoId: string;
  title: string;
  className?: string;
  /** Format du lecteur : vertical (Shorts, par défaut) ou horizontal 16:9. */
  aspect?: 'portrait' | 'landscape';
  /** Lance le lecteur immédiatement, sans vignette (ex. dans une modale ouverte par un clic). */
  autoStart?: boolean;
  /** Classes du cadre (défaut : coins arrondis, fond noir). Permet à une page de le styler. */
  frameClassName?: string;
  /** Appelé au moment où le lecteur est demandé (suivi analytics). */
  onPlay?: () => void;
}

// Vignette de remplacement neutre, affichée tant que la section n'est pas visible
const PLACEHOLDER =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTgwIiBoZWlnaHQ9IjMyNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';

const LazyYouTube: React.FC<LazyYouTubeProps> = ({ videoId, title, className = '', aspect = 'portrait', autoStart = false, frameClassName = 'rounded-lg bg-black', onPlay }) => {
  const id = extractYouTubeId(videoId);
  const [isLoaded, setIsLoaded] = useState(autoStart);
  const [isVisible, setIsVisible] = useState(false);
  // Étape de la vignette : avance quand une source échoue ou est grise (jamais en arrière, pas de boucle)
  const [thumbStep, setThumbStep] = useState(0);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Charger la vignette un peu avant qu'elle n'entre à l'écran : pas d'écran vide au défilement
      { threshold: 0.1, rootMargin: '200px 0px' }
    );

    if (thumbnailRef.current) {
      observer.observe(thumbnailRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // sddefault (640×480) d'abord : bon compromis poids / netteté (maxresdefault pèse 122 Ko de plus).
  // Si l'hôte img.youtube.com est bloqué, on tente i.ytimg.com ; sinon on affiche un cadre titré.
  const thumbnailSources = [
    `https://img.youtube.com/vi/${id}/sddefault.jpg`,
    `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  ];
  const thumbnailUrl = thumbnailSources[Math.min(thumbStep, thumbnailSources.length - 1)];
  const thumbFailed = thumbStep >= thumbnailSources.length;

  const nextThumbnail = () => setThumbStep((s) => (s < thumbnailSources.length ? s + 1 : s));

  // YouTube renvoie une image grise de 120 px de large quand la vignette demandée n'existe pas
  const handleThumbnailLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.naturalWidth <= 120) nextThumbnail();
  };

  const handleThumbnailError = () => nextThumbnail();

  const aspectClass = aspect === 'landscape' ? 'aspect-video' : 'aspect-[9/16]';

  return (
    <div ref={thumbnailRef} className={`relative ${className}`}>
      <div className={`relative w-full ${aspectClass} overflow-hidden ${frameClassName}`}>
        {!isLoaded ? (
          <button
            type="button"
            className="group absolute inset-0 w-full h-full cursor-pointer"
            onClick={() => {
              setIsLoaded(true);
              onPlay?.();
            }}
            aria-label={`Lire la vidéo : ${title}`}
          >
            <img
              src={isVisible ? thumbnailUrl : PLACEHOLDER}
              alt={title}
              className={`absolute inset-0 w-full h-full object-cover ${thumbFailed ? 'hidden' : ''}`}
              loading="lazy"
              onLoad={handleThumbnailLoad}
              onError={handleThumbnailError}
            />
            <span className="lazy-yt-overlay absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
              <span className="lazy-yt-play bg-red-600 rounded-full p-4 transform group-hover:scale-110 transition-transform">
                <Play className="text-white" size={32} fill="currentColor" aria-hidden="true" />
              </span>
            </span>
            {thumbFailed && (
              <span className="absolute inset-x-4 top-1/3 text-center text-white text-base font-medium">
                {title}
              </span>
            )}
            <span className="lazy-yt-hint absolute bottom-4 left-4 text-white text-sm bg-black/60 px-2 py-1 rounded">
              Cliquez pour charger la vidéo
            </span>
          </button>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
};

export default LazyYouTube;
