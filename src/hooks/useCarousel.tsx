import { useState, useCallback } from 'react';

interface UseCarouselReturn {
  currentIndex: number;
  goToNext: () => void;
  goToPrevious: () => void;
  goToSlide: (index: number) => void;
}

export const useCarousel = (totalSlides: number): UseCarouselReturn => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    currentIndex,
    goToNext,
    goToPrevious,
    goToSlide,
  };
};
