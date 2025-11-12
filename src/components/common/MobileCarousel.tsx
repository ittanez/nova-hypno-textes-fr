import React from 'react';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

interface MobileCarouselProps {
  currentIndex: number;
  totalItems: number;
  onNext: () => void;
  onPrevious: () => void;
  onGoToSlide: (index: number) => void;
  children: React.ReactNode;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  currentIndex,
  totalItems,
  onNext,
  onPrevious,
  onGoToSlide,
  children,
}) => {
  return (
    <div className="md:hidden relative max-w-lg mx-auto pb-12 pt-4">
      <div className="overflow-visible">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children}
        </div>
      </div>

      {/* Navigation en bas */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
        <button
          onClick={onPrevious}
          className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
          aria-label="Précédent"
        >
          <ChevronLeft className="text-blue-500" size={14} />
        </button>

        <div className="flex gap-1.5">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                currentIndex === index ? 'w-4 bg-blue-500' : 'w-1.5 bg-gray-300'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          className="bg-white/60 hover:bg-white/80 p-1.5 rounded-full shadow-sm"
          aria-label="Suivant"
        >
          <ChevronRight className="text-blue-500" size={14} />
        </button>
      </div>
    </div>
  );
};
