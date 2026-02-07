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
    <div
      className="md:hidden relative max-w-lg mx-auto pb-12 pt-4"
      role="region"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); onPrevious(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); onNext(); }
      }}
    >
      <div className="overflow-visible">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {children}
        </div>
      </div>

      {/* Navigation en bas */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
        <button
          onClick={onPrevious}
          className="bg-white/60 hover:bg-white/80 p-2.5 rounded-full shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Précédent"
        >
          <ChevronLeft className="text-blue-500" size={18} />
        </button>

        <div className="flex gap-0">
          {Array.from({ length: totalItems }).map((_, index) => (
            <button
              key={index}
              onClick={() => onGoToSlide(index)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label={`Aller au slide ${index + 1}`}
            >
              <span className={`block h-2 rounded-full transition-all ${
                currentIndex === index ? 'w-5 bg-blue-500' : 'w-2 bg-gray-500'
              }`} />
            </button>
          ))}
        </div>

        <button
          onClick={onNext}
          className="bg-white/60 hover:bg-white/80 p-2.5 rounded-full shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Suivant"
        >
          <ChevronRight className="text-blue-500" size={18} />
        </button>
      </div>
    </div>
  );
};
