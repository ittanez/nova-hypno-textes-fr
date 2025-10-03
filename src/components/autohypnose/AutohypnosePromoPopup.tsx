import React, { useState, useEffect } from 'react';
import { X, Gift, Sparkles } from 'lucide-react';

const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if popup was already shown
    const popupShown = localStorage.getItem('autohypnosePromoShown');
    if (popupShown) return;

    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
      // Mark as shown in localStorage
      localStorage.setItem('autohypnosePromoShown', 'true');
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleTestClick = () => {
    // Redirect to quiz page
    window.location.href = '/autohypnose/quiz';
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform transition-all duration-300 ${
          isAnimating ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-nova-blue to-nova-green rounded-full flex items-center justify-center mb-6">
            <Gift className="w-8 h-8 text-white" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🎁 Offre Spéciale !
          </h3>

          {/* Main text */}
          <div className="bg-gradient-to-r from-nova-blue-light to-blue-100 p-4 rounded-lg mb-6">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-nova-green mr-2" />
              <span className="text-lg font-semibold text-nova-blue-dark">50% de réduction</span>
              <Sparkles className="w-5 h-5 text-nova-green ml-2" />
            </div>
            <p className="text-nova-blue-dark font-medium">
              Obtenez votre code promo de 50% de réduction en complétant le test de sérénité
            </p>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6 leading-relaxed">
            Découvrez votre niveau de sérénité actuel et recevez instantanément un code promo
            pour accéder à la formation auto-hypnose à prix réduit.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleTestClick}
              className="flex-1 bg-gradient-to-r from-nova-blue to-nova-green text-white px-6 py-3 rounded-lg font-semibold hover:from-nova-blue-dark hover:to-nova-green-dark transition-all duration-200 transform hover:scale-105"
            >
              Faire le test
            </button>
            <button
              onClick={handleClose}
              className="flex-1 border-2 border-gray-300 text-gray-600 px-6 py-3 rounded-lg font-semibold hover:border-gray-400 hover:text-gray-700 transition-colors"
            >
              Plus tard
            </button>
          </div>

          {/* Small text */}
          <p className="text-xs text-gray-500 mt-4">
            ⏰ Offre limitée dans le temps
          </p>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;