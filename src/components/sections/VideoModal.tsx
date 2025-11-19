/**
 * Video Modal - Modal pour afficher une vidéo YouTube
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité
 */

import React from 'react';
import X from 'lucide-react/dist/esm/icons/x';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoId = '4VRNBAoAcAE'
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
          aria-label="Fermer la vidéo"
        >
          <X size={24} />
        </button>
        <div className="relative pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="Présentation d'Alain Zenatti - Maître Hypnologue Paris"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
