import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface LazyYouTubeProps {
  videoId: string;
  title: string;
  className?: string;
}

const LazyYouTube: React.FC<LazyYouTubeProps> = ({ videoId, title, className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (thumbnailRef.current) {
      observer.observe(thumbnailRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const loadVideo = () => {
    setIsLoaded(true);
  };

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div ref={thumbnailRef} className={`relative ${className}`}>
      {!isLoaded ? (
        <div 
          className="relative cursor-pointer group"
          onClick={loadVideo}
        >
          <img
            src={isVisible ? thumbnailUrl : 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTgwIiBoZWlnaHQ9IjMyNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+'}
            alt={title}
            className="w-full aspect-[9/16] object-cover rounded-lg"
            loading="lazy"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg group-hover:bg-opacity-60 transition-all">
            <div className="bg-red-600 rounded-full p-4 transform group-hover:scale-110 transition-transform">
              <Play className="text-white" size={32} fill="currentColor" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 text-white text-sm bg-black bg-opacity-60 px-2 py-1 rounded">
            Cliquez pour charger la vidéo
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          className="w-full aspect-[9/16] rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default LazyYouTube;