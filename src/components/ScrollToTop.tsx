
import React, { useState, useEffect } from 'react';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Set up smooth scrolling to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 p-3 bg-nova-blue text-white rounded-full shadow-lg hover:bg-nova-blue-dark transition-colors z-40"
          aria-label="Retourner en haut de la page"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
