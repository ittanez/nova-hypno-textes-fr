/**
 * Video Modal - Modal pour afficher une vidéo YouTube
 * Supporte les vidéos standard (16:9) et les Shorts (9:16)
 */

import React from 'react';
import X from 'lucide-react/dist/esm/icons/x';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
  isShort?: boolean;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId = 'r8OUp2OJRp4',
  isShort = true
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`relative bg-black rounded-lg overflow-hidden ${
          isShort
            ? 'w-full max-w-[360px] h-[80vh] max-h-[640px]'
            : 'w-full max-w-4xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Fermer la vidéo"
        >
          <X size={24} />
        </button>

        {isShort ? (
          // YouTube Shorts - format vertical 9:16
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Présentation d'Alain Zenatti - Maître Hypnologue Paris"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          // Vidéo standard - format horizontal 16:9
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Présentation d'Alain Zenatti - Maître Hypnologue Paris"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoModal;
