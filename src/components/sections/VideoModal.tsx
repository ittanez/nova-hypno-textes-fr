/**
 * Video Modal - Modal pour afficher une vidéo YouTube
 * Supporte les vidéos standard (16:9) et les Shorts (9:16)
 */

import React from 'react';
import X from 'lucide-react/dist/esm/icons/x';
import LazyYouTube from '@/components/LazyYouTube';

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

        {/* Lecteur partagé : Shorts (9:16) ou vidéo standard (16:9), lancé à l'ouverture de la modale */}
        <LazyYouTube
          videoId={videoId}
          title="Présentation d'Alain Zenatti - Hypnothérapeute Paris"
          aspect={isShort ? 'portrait' : 'landscape'}
          autoStart
          className={isShort ? 'w-full h-full' : 'w-full'}
        />
      </div>
    </div>
  );
};

export default VideoModal;
