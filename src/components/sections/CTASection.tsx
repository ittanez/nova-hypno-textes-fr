/**
 * CTA Section - Section d'appel à l'action finale
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité
 */

import React from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import { trackCTAClick } from '@/lib/analytics';

const CTASection: React.FC = () => {
  const { openResalibPopup } = useResalibPopup();

  const handleBookingClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackCTAClick('resalib_booking', 'cta_section');
    openResalibPopup();
  };

  const handlePhoneClick = () => {
    trackCTAClick('phone_call', 'cta_section');
  };

  return (
    <section id="cta" className="py-20 bg-nova-blue-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
          Êtes-vous prêt à reprendre le contrôle ?
        </h2>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Vous avez tout essayé. Rien ne marche vraiment. L'hypnose ericksonienne fonctionne différemment -
          <strong> elle travaille directement avec votre inconscient</strong> pour créer des changements profonds et durables.
        </p>
        <p className="text-base md:text-lg text-white/80 mb-10 max-w-2xl mx-auto">
          La première consultation est gratuite (15 minutes). Pas d'engagement. Juste une conversation pour voir si nous sommes faits pour travailler ensemble.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
            onClick={handleBookingClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-nova-blue-dark hover:bg-gray-100 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Calendar size={24} />
            Réserver ma consultation gratuite
          </a>
          <a
            href="tel:0649358089"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg text-lg font-semibold transition-all"
            onClick={handlePhoneClick}
          >
            <Phone size={24} />
            Appeler maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
