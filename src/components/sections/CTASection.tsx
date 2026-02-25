/**
 * CTA Section - Section d'appel à l'action finale
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité
 */

import React from 'react';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import { trackCTAClick } from '@/lib/analytics';

const CTASection: React.FC = () => {
  return (
    <section id="cta" className="py-20 bg-nova-blue-dark">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
          Prêt à commencer votre transformation ?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Réservez votre première séance dès maintenant et découvrez comment l'hypnose peut vous aider
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 hover:bg-gray-100 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            onClick={() => trackCTAClick('resalib_booking', 'cta_section')}
          >
            <Calendar size={24} />
            Prendre rendez-vous
          </a>
          <a
            href="tel:0649358089"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 rounded-lg text-lg font-semibold transition-all"
            onClick={() => trackCTAClick('phone_call', 'cta_section')}
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
