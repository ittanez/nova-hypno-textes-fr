/**
 * CredibilityBadgesSection Component
 * Section badges visuels de crédibilité : certifications, associations, accréditations
 *
 * Basé sur : "Design web pour hypnothérapeutes 2024-2025"
 * - "Badges de crédibilité (certifications, associations)"
 */

import React from 'react';
import Award from 'lucide-react/dist/esm/icons/award';
import GraduationCap from 'lucide-react/dist/esm/icons/graduation-cap';
import Star from 'lucide-react/dist/esm/icons/star';
import Shield from 'lucide-react/dist/esm/icons/shield';

const CredibilityBadgesSection: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-8">
            Certifications et accréditations professionnelles
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {/* Badge 1 : Maître Hypnologue */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 flex flex-col items-center text-center hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                <Award className="text-white" size={32} />
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base">
                Maître Hypnologue
              </p>
              <p className="text-xs text-gray-600 mt-1">
                École Psynapse 2025
              </p>
            </div>

            {/* Badge 2 : +5 ans d'expérience */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 flex flex-col items-center text-center hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                <Star className="text-white" size={32} />
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base">
                +5 ans
              </p>
              <p className="text-xs text-gray-600 mt-1">
                d'expérience clinique
              </p>
            </div>

            {/* Badge 3 : 9 certifications */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 flex flex-col items-center text-center hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-3">
                <GraduationCap className="text-white" size={32} />
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base">
                9 certifications
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Formation continue
              </p>
            </div>

            {/* Badge 4 : Note 5/5 */}
            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 flex flex-col items-center text-center hover:border-blue-300 transition-colors">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mb-3">
                <Shield className="text-white" size={32} />
              </div>
              <p className="font-bold text-gray-900 text-sm md:text-base">
                Note 5/5
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Avis vérifiés clients
              </p>
            </div>
          </div>

          {/* Liste des certifications détaillées */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-semibold text-gray-900 mb-4 text-center text-sm md:text-base">
              Certifications professionnelles validées
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span className="text-gray-700">Maître Hypnologue - École Psynapse (2025)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span className="text-gray-700">Maître Praticien Hypnose Ericksonienne (2023)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span className="text-gray-700">Hypnose Directive et Hyperemperia (2025)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span className="text-gray-700">Hypnose Ericksonienne - École Psynapse (2021)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span className="text-gray-700">Hypnose spirituelle - École Psynapse (2023)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-500 mt-1">✓</span>
                <span className="text-gray-700">Cabinet Paris 4ème - Marais Bastille</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CredibilityBadgesSection;
