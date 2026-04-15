/**
 * TherapyComparisonSection Component
 * Comparaison entre l'hypnose ericksonienne et autres approches thérapeutiques
 * Contenu SEO/GEO pour les requêtes comparatives
 */

import React from 'react';
import { Check, X } from 'lucide-react';

const TherapyComparisonSection: React.FC = () => {
  const therapies = [
    {
      name: 'Hypnose Ericksonienne',
      description: 'Approche brève basée sur l\'inconscient',
      features: [
        { label: 'Durée moyenne', value: '3-5 séances', highlight: true },
        { label: 'Accès inconscient', value: 'Oui', highlight: true },
        { label: 'Non-directive', value: 'Oui', highlight: true },
        { label: 'Coût moyen', value: '90€/séance', highlight: true },
        { label: 'Durée séance', value: '1h-1h30' },
        { label: 'Résultats rapides', value: 'Oui' },
      ]
    },
    {
      name: 'TCC (Thérapie Cognitive)',
      description: 'Travail sur les pensées et comportements',
      features: [
        { label: 'Durée moyenne', value: '15-20 séances' },
        { label: 'Accès inconscient', value: 'Limité' },
        { label: 'Non-directive', value: 'Non' },
        { label: 'Coût moyen', value: '80€-120€/séance' },
        { label: 'Durée séance', value: '1h' },
        { label: 'Résultats rapides', value: 'Modérés' },
      ]
    },
    {
      name: 'Psychothérapie Classique',
      description: 'Exploration en profondeur du psyché',
      features: [
        { label: 'Durée moyenne', value: '1-3 ans', warning: true },
        { label: 'Accès inconscient', value: 'Oui' },
        { label: 'Non-directive', value: 'Oui' },
        { label: 'Coût moyen', value: '80€-150€/séance' },
        { label: 'Durée séance', value: '45min-1h' },
        { label: 'Résultats rapides', value: 'Non' },
      ]
    },
    {
      name: 'Médication (Anxiolytiques)',
      description: 'Traitement pharmacologique du stress',
      features: [
        { label: 'Durée moyenne', value: 'Variable' },
        { label: 'Accès inconscient', value: 'Non' },
        { label: 'Non-directive', value: 'N/A' },
        { label: 'Coût moyen', value: '20€-50€/mois' },
        { label: 'Durée effet', value: 'Immédiat' },
        { label: 'Résultats rapides', value: 'Oui (symptômes)' },
      ]
    },
  ];

  return (
    <section id="comparison" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Hypnose vs autres thérapies — Quel choix pour vous ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comparaison objective des principales approches thérapeutiques pour l'anxiété, le stress et les phobies. Chaque méthode a ses forces — découvrez celle qui vous convient.
            </p>
          </div>

          {/* Tableau comparatif responsive */}
          <div className="overflow-x-auto mb-12">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="px-4 py-4 text-left font-bold text-gray-900 bg-gray-50">Critère</th>
                  {therapies.map((therapy, idx) => (
                    <th
                      key={idx}
                      className={`px-4 py-4 text-center font-bold text-sm md:text-base ${
                        idx === 0 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                      }`}
                    >
                      {therapy.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-semibold text-gray-900 bg-gray-50">Description</td>
                  {therapies.map((therapy, idx) => (
                    <td key={idx} className={`px-4 py-4 text-sm text-gray-700 ${idx === 0 ? 'bg-blue-50' : ''}`}>
                      {therapy.description}
                    </td>
                  ))}
                </tr>

                {/* Durée moyenne */}
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-semibold text-gray-900 bg-gray-50">Durée du traitement</td>
                  {therapies.map((therapy, idx) => {
                    const feature = therapy.features[0];
                    return (
                      <td
                        key={idx}
                        className={`px-4 py-4 text-sm text-center font-medium ${
                          feature.highlight
                            ? 'text-green-700 font-bold'
                            : feature.warning
                              ? 'text-orange-700'
                              : 'text-gray-700'
                        } ${idx === 0 ? 'bg-blue-50' : ''}`}
                      >
                        {feature.value}
                      </td>
                    );
                  })}
                </tr>

                {/* Accès inconscient */}
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-semibold text-gray-900 bg-gray-50">Travail sur l'inconscient</td>
                  {therapies.map((therapy, idx) => {
                    const feature = therapy.features[1];
                    return (
                      <td key={idx} className={`px-4 py-4 text-center ${idx === 0 ? 'bg-blue-50' : ''}`}>
                        {feature.value === 'Oui' ? (
                          <Check className="inline text-green-600" size={24} />
                        ) : feature.value === 'Limité' ? (
                          <span className="text-gray-600 font-medium text-sm">Limité</span>
                        ) : (
                          <X className="inline text-red-500" size={24} />
                        )}
                      </td>
                    );
                  })}
                </tr>

                {/* Coût */}
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-semibold text-gray-900 bg-gray-50">Coût moyen</td>
                  {therapies.map((therapy, idx) => {
                    const feature = therapy.features[3];
                    return (
                      <td
                        key={idx}
                        className={`px-4 py-4 text-sm text-center text-gray-700 ${
                          feature.highlight ? 'font-bold text-green-700' : ''
                        } ${idx === 0 ? 'bg-blue-50' : ''}`}
                      >
                        {feature.value}
                      </td>
                    );
                  })}
                </tr>

                {/* Résultats rapides */}
                <tr className="border-b border-gray-200 hover:bg-gray-50 transition">
                  <td className="px-4 py-4 font-semibold text-gray-900 bg-gray-50">Résultats rapides</td>
                  {therapies.map((therapy, idx) => {
                    const feature = therapy.features[5];
                    return (
                      <td
                        key={idx}
                        className={`px-4 py-4 text-center text-sm ${idx === 0 ? 'bg-blue-50' : ''}`}
                      >
                        {feature.value === 'Oui' ? (
                          <Check className="inline text-green-600 font-bold" size={24} />
                        ) : feature.value === 'Modérés' ? (
                          <span className="text-orange-600 font-medium">Modérés</span>
                        ) : (
                          <X className="inline text-red-500" size={24} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Analyse détaillée */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Choisir l'hypnose ericksonienne si :</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous cherchez des résultats <strong>rapides</strong> (3-5 séances)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous avez un budget <strong>limité</strong> (90€/séance)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous préférez <strong>éviter les médicaments</strong></span>
                </li>
                <li className="flex items-start">
                  <Check className="text-green-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Votre problème est <strong>bien identifié</strong> (phobie, stress, sommeil)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border-l-4 border-gray-400">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Autres approches peuvent être mieux si :</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start">
                  <Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous avez besoin d'une <strong>thérapie longue</strong> et approfondie</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous avez des <strong>problèmes psychologiques complexes</strong></span>
                </li>
                <li className="flex items-start">
                  <Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous êtes en <strong>crise aiguë</strong> (médication urgente)</span>
                </li>
                <li className="flex items-start">
                  <Check className="text-blue-600 mr-3 mt-0.5 flex-shrink-0" size={18} />
                  <span>Vous voulez <strong>combiner plusieurs approches</strong> (intégration)</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Conseil final */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Le meilleur choix : souvent une combinaison</h3>
            <p className="text-lg mb-6 leading-relaxed">
              L'hypnose ericksonienne fonctionne <strong>particulièrement bien en complément</strong> d'une thérapie cognitivo-comportementale ou d'une psychothérapie. Elle accélère les résultats en travaillant directement sur l'inconscient, tandis que la thérapie verbale consolide les apprentissages. Si vous prenez des anxiolytiques, l'hypnose peut permettre une réduction progressive.
            </p>
            <p className="text-base opacity-95">
              Besoin de conseils personnalisés ? Contactez Alain Zenatti pour une consultation gratuite de 15 minutes par téléphone.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TherapyComparisonSection;
