
import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">Tarifs des séances d'hypnothérapie</h2>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-nova-neutral rounded-xl shadow-lg overflow-hidden">
            <div className="bg-nova-blue-dark p-6 text-center">
              <h3 className="text-2xl font-bold text-white">Séances Individuelles</h3>
              <p className="text-nova-blue-light opacity-90">Durée : 1h30 (première séance) / 1h (suivantes)</p>
            </div>
            
            <div className="p-8">
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>Cabinet (Paris Bastille) :</strong> 90 €</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>Téléconsultation :</strong> 90 €</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>À Domicile :</strong> 140 € (Paris, Arrondissements 1, 2, 3, 4, 9, 10, 11)</span>
                </li>
              </ul>
              
              <div className="mt-8 text-center">
                <a 
                  href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-nova-green text-white rounded-full hover:bg-nova-green-dark transition-colors"
                >
                  Réserver une séance
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-nova-neutral rounded-xl shadow-lg overflow-hidden border-2 border-nova-green">
            <div className="bg-nova-blue-dark p-6 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-nova-green text-white px-4 py-1 rounded-full text-sm font-semibold">
                RECOMMANDÉ
              </div>
              <h3 className="text-2xl font-bold text-white mt-2">Packs d'Hypnothérapie</h3>
              <p className="text-nova-blue-light opacity-90">Validité : 6 mois</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6 bg-nova-green bg-opacity-10 p-4 rounded-lg border-l-4 border-nova-green">
                <p className="font-semibold text-nova-blue-dark mb-2">Pack 3 séances - RECOMMANDÉ</p>
                <p className="text-sm text-gray-700 mb-2">
                  Idéal pour les problématiques les plus courantes :
                </p>
                <div className="text-sm text-gray-600">
                  • Phobies et blocages • Anxiété et stress • Confiance en soi
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-center bg-nova-green bg-opacity-5 p-3 rounded-lg">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>Pack 3 séances :</strong> 85 €/séance → 255 € le pack</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>Pack 5 séances :</strong> 80 €/séance → 400 € le pack</span>
                </li>
                <li className="flex items-center mt-6 bg-nova-blue bg-opacity-10 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-nova-blue-dark">Économisez jusqu'à 50 € avec les packs</p>
                    <p className="text-sm text-gray-600">Accompagnement structuré pour des résultats durables</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 text-center">
                <a 
                  href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-nova-green text-white rounded-full hover:bg-nova-green-dark transition-colors"
                >
                  Réserver un pack
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto mt-10">
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Avantages des packs</h3>
            <p className="text-gray-700 mb-4">
              <strong>Le Pack 3 séances est particulièrement recommandé</strong> pour les problématiques les plus courantes qui nécessitent un accompagnement structuré : <strong>phobies, anxiété et confiance en soi</strong>. Ces trois domaines montrent les taux de réussite les plus élevés avec un suivi de 3 séances, permettant un travail progressif et l'ancrage durable des changements.
            </p>
            <p className="text-gray-700 mb-4">
              Les packs offrent également un coût avantageux, un engagement à long terme et un plan de traitement structuré, créant les conditions optimales pour votre transformation.
            </p>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Modalités de Paiement</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Chèque, espèces, carte bancaire (cabinet)</li>
              <li>Carte bancaire (téléconsultations)</li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Remarques importantes</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Pas de consultations pour enfants et mineurs</li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Politique d'annulation</h3>
            <p className="text-gray-700">
              Annulation ou report ≥ 48 heures avant le rendez-vous (facturation quelle que soit la raison)
            </p>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto mt-12 bg-nova-blue-light bg-opacity-20 p-6 rounded-lg text-center">
          <p className="text-lg text-nova-blue-dark">
            Certaines mutuelles prennent en charge partiellement les séances d'hypnothérapie. N'hésitez pas à vous renseigner auprès de votre mutuelle directement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
