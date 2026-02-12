/**
 * HypnotherapyJourneySection Component
 * Infographie : Attentes vs Réalité du parcours en hypnothérapie
 */

import React from 'react';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';

const HypnotherapyJourneySection: React.FC = () => {
  return (
    <section id="parcours" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
            Le Parcours en Hypnothérapie
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Alain Zenatti &mdash; NovaHypnose Paris
          </p>

          {/* Image infographie originale */}
          <div className="mb-12 flex justify-center">
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/hypnotherapie_realite.webp"
              alt="Infographie Le Parcours en Hypnothérapie : attentes (ligne droite) vs réalité (progression avec hauts et bas) - NovaHypnose Paris"
              className="max-w-2xl w-full h-auto rounded-2xl shadow-lg"
              loading="lazy"
              width={600}
              height={338}
            />
          </div>

          {/* Key takeaways */}
          <div className="bg-white rounded-2xl border-2 border-blue-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Lightbulb className="text-white" size={24} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                Ce qu'il faut retenir
              </h3>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nova-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">Le changement est progressif.</span> Chaque séance renforce la précédente et approfondit le travail thérapeutique.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nova-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">Les fluctuations sont normales.</span> Il peut y avoir des moments de doute, c'est un signe que le travail opère en profondeur.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-nova-blue rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  <span className="font-semibold text-gray-900">3 à 5 séances suffisent</span> dans la majorité des cas pour obtenir des résultats durables et significatifs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HypnotherapyJourneySection;
