/**
 * HypnotherapyJourneySection Component
 * Infographie interactive : Attentes vs Réalité du parcours en hypnothérapie
 */

import React from 'react';
import TrendingUp from 'lucide-react/dist/esm/icons/trending-up';
import Target from 'lucide-react/dist/esm/icons/target';
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

          {/* Two columns: Expectation vs Reality */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* LEFT: What people expect */}
            <div className="bg-white rounded-2xl border-2 border-red-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="text-white" size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-red-600">
                  Ce que les gens attendent
                </h3>
              </div>

              {/* Straight line SVG */}
              <div className="relative bg-red-50 rounded-xl p-6">
                <svg viewBox="0 0 400 160" className="w-full h-auto" aria-label="Graphique montrant une ligne droite du problème à la solution">
                  {/* Grid lines */}
                  <line x1="50" y1="130" x2="350" y2="130" stroke="#fecaca" strokeWidth="1" />
                  <line x1="50" y1="90" x2="350" y2="90" stroke="#fecaca" strokeWidth="1" strokeDasharray="4" />
                  <line x1="50" y1="50" x2="350" y2="50" stroke="#fecaca" strokeWidth="1" strokeDasharray="4" />

                  {/* Straight line from problem to solved */}
                  <line x1="60" y1="120" x2="340" y2="30" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />

                  {/* Start dot */}
                  <circle cx="60" cy="120" r="6" fill="#ef4444" />
                  {/* End dot */}
                  <circle cx="340" cy="30" r="6" fill="#ef4444" />

                  {/* Labels */}
                  <text x="60" y="150" textAnchor="middle" className="text-xs" fill="#991b1b" fontWeight="600" fontSize="13">Problème</text>
                  <text x="340" y="22" textAnchor="middle" className="text-xs" fill="#991b1b" fontWeight="600" fontSize="13">Résolu !</text>

                  {/* Arrow */}
                  <polygon points="335,28 345,32 338,36" fill="#ef4444" />
                </svg>

                <p className="text-red-700 text-sm text-center mt-4 font-medium">
                  &laquo; Une seule séance et tout est réglé &raquo;
                </p>
              </div>
            </div>

            {/* RIGHT: Reality */}
            <div className="bg-white rounded-2xl border-2 border-emerald-100 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-emerald-600">
                  La réalité
                </h3>
              </div>

              {/* Wavy progressive line SVG */}
              <div className="relative bg-emerald-50 rounded-xl p-6">
                <svg viewBox="0 0 400 160" className="w-full h-auto" aria-label="Graphique montrant une progression avec des hauts et des bas mais une tendance positive">
                  {/* Grid lines */}
                  <line x1="50" y1="130" x2="350" y2="130" stroke="#a7f3d0" strokeWidth="1" />
                  <line x1="50" y1="90" x2="350" y2="90" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="4" />
                  <line x1="50" y1="50" x2="350" y2="50" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="4" />

                  {/* Wavy progressive path */}
                  <path
                    d="M 60 120 C 90 100, 100 70, 120 80 C 140 90, 150 110, 170 85 C 190 60, 200 50, 220 65 C 240 80, 250 70, 270 50 C 290 30, 310 40, 340 25"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Session markers */}
                  <circle cx="60" cy="120" r="5" fill="#059669" />
                  <circle cx="120" cy="80" r="4" fill="#059669" opacity="0.7" />
                  <circle cx="170" cy="85" r="4" fill="#059669" opacity="0.7" />
                  <circle cx="220" cy="65" r="4" fill="#059669" opacity="0.7" />
                  <circle cx="270" cy="50" r="4" fill="#059669" opacity="0.7" />
                  <circle cx="340" cy="25" r="6" fill="#059669" />

                  {/* Labels */}
                  <text x="60" y="150" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="11">Séance 1</text>
                  <text x="200" y="150" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="11">Séances 2-4</text>
                  <text x="340" y="150" textAnchor="middle" fill="#065f46" fontWeight="600" fontSize="11">Séances 3-8</text>

                  {/* Trend arrow at end */}
                  <polygon points="335,23 345,27 338,31" fill="#059669" />
                </svg>

                <p className="text-emerald-700 text-sm text-center mt-4 font-medium">
                  Un chemin progressif avec des hauts et des bas, mais une amélioration durable
                </p>
              </div>
            </div>
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
