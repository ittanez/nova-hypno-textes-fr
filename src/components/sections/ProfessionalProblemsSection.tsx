/**
 * ProfessionalProblemsSection Component
 * Section dédiée aux problématiques des professionnels stressés
 * Positionné après Hero pour adresser directement les douleurs du visiteur
 *
 * Basé sur : "Design web pour hypnothérapeutes 2024-2025"
 * - "Pour les professionnels stressés, le messaging doit adresser :
 *    l'incapacité à déconnecter, la pression de performance constante,
 *    le syndrome de l'imposteur, et l'épuisement malgré la réussite"
 */

import React from 'react';
import BrainCircuit from 'lucide-react/dist/esm/icons/brain-circuit';
import Zap from 'lucide-react/dist/esm/icons/zap';
import Clock from 'lucide-react/dist/esm/icons/clock';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';

const ProfessionalProblemsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Vous êtes en permanence sous pression ?
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Vous n'êtes pas seul. De nombreux professionnels vivent ces mêmes défis au quotidien.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {/* Carte 1 : Incapacité à déconnecter */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BrainCircuit className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Impossible de déconnecter ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Vos pensées tournent en boucle, même en dehors du travail. Le soir, le week-end,
                  vous restez mentalement connecté à vos dossiers et responsabilités.
                </p>
              </div>
            </div>
          </div>

          {/* Carte 2 : Pression de performance */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Performance constante au prix de votre énergie ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Vous devez être performant en permanence. La moindre baisse de régime vous angoisse.
                  Vous sacrifiez votre sommeil, vos loisirs, votre santé.
                </p>
              </div>
            </div>
          </div>

          {/* Carte 3 : Syndrome de l'imposteur */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Succès extérieur, doutes intérieurs ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Malgré vos réussites objectives, vous doutez constamment de vos compétences.
                  Vous craignez d'être "démasqué", de ne pas être à la hauteur.
                </p>
              </div>
            </div>
          </div>

          {/* Carte 4 : Épuisement */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-600">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  Épuisement malgré la réussite apparente ?
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Vous réussissez professionnellement, mais à quel prix ? Vous vous sentez vidé,
                  irritable, en perte de sens. Le burn-out n'est plus si loin.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action avec messaging orienté résultats */}
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-700 p-8 md:p-10 rounded-2xl text-white text-center shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Retrouvez votre énergie et votre focus
          </h3>
          <p className="text-lg md:text-xl mb-6 text-white/95 leading-relaxed">
            L'hypnose ericksonienne vous aide à <strong>sortir de ce cercle vicieux</strong> en quelques séances.
            Sans médicaments, sans thérapie interminable. Juste des résultats concrets et durables.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Premier échange gratuit (15 min)
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-lg text-lg font-semibold hover:bg-white/10 transition-all"
            >
              Découvrir la méthode
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalProblemsSection;
