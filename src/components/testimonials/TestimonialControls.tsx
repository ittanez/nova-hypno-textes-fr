
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialControlsProps {
  activeIndex: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

const TestimonialControls = ({
  activeIndex,
  totalSlides,
  onPrevious,
  onNext,
  onDotClick,
}: TestimonialControlsProps) => {
  return (
    <>
      <div className="flex justify-center mt-8 gap-3">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeIndex 
                ? 'bg-[#2C5680] w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            onClick={() => onDotClick(index)}
            aria-label={`Aller au témoignage ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="md:hidden mt-6 flex justify-center gap-4">
        <button 
          onClick={onPrevious}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Témoignage précédent"
        >
          <ChevronLeft className="text-[#2C5680]" size={24} />
        </button>
        
        <button 
          onClick={onNext}
          className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          aria-label="Témoignage suivant"
        >
          <ChevronRight className="text-[#2C5680]" size={24} />
        </button>
      </div>
    </>
  );
};

export default TestimonialControls;
