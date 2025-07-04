
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
              
              <div className="mt-8 text-center space-y-3">
                <a 
                  href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 bg-nova-green text-white rounded-full hover:bg-nova-green-dark transition-colors"
                >
                  Réserver une séance
                </a>
                <div className="text-xs text-gray-500">
                  💳 Paiement en ligne ou au cabinet
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-nova-neutral rounded-xl shadow-lg overflow-hidden border-2 border-nova-blue">
            <div className="bg-nova-blue-dark p-6 text-center relative">
              <div className="absolute top-2 right-4 bg-nova-blue text-white px-3 py-1 rounded-full text-xs font-semibold">
                RECOMMANDÉ
              </div>
              <h3 className="text-2xl font-bold text-white mt-6">Packs d'Hypnothérapie</h3>
              <p className="text-nova-blue-light opacity-90">Validité : 6 mois</p>
            </div>
            
            <div className="p-8">
              <div className="mb-6 bg-nova-blue bg-opacity-10 p-4 rounded-lg border-l-4 border-nova-blue">
                <p className="font-semibold text-nova-blue-dark mb-2">Pack 3 séances - RECOMMANDÉ</p>
                <p className="text-sm text-gray-700 mb-2">
                  Idéal pour les problématiques les plus courantes :
                </p>
                <div className="text-sm text-gray-600">
                  • Phobies et blocages • Anxiété et stress • Confiance en soi
                </div>
              </div>
              
              <ul className="space-y-4">
                <li className="flex items-center bg-nova-blue bg-opacity-5 p-3 rounded-lg">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>Pack 3 séances :</strong> 85 €/séance → 255 € le pack</span>
                </li>
                <li className="flex items-center">
                  <Check className="text-nova-green mr-2 flex-shrink-0" size={20} />
                  <span><strong>Pack 5 séances :</strong> 80 €/séance → 400 € le pack</span>
                </li>
                <li className="flex items-center mt-6 bg-nova-blue bg-opacity-10 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-nova-blue-dark">Accompagnement structuré pour des résultats durables</p>
                    <p className="text-sm text-gray-600">Suivi personnalisé et tarif préférentiel</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 text-center space-y-3">
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a 
                    href="https://buy.stripe.com/aFacN4bfL1nZ6Za3PO4ko07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-nova-blue text-white rounded-full hover:bg-nova-blue-dark transition-colors font-semibold"
                  >
                    Réserver Pack 3 Séances
                  </a>
                  <a 
                    href="https://buy.stripe.com/14A14mdnT7Mn1EQ1HG4ko08"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-nova-blue-dark text-white rounded-full hover:bg-nova-blue transition-colors font-semibold"
                  >
                    Réserver Pack 5 Séances
                  </a>
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 inline-block">
                    <span className="text-green-700 font-semibold">💳 Paiement en 3 fois possible</span>
                    <div className="text-xs text-green-600">Sans frais avec votre carte bancaire avec Klarna</div>
                  </div>
                  <div>
                    ou <a href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" target="_blank" rel="noopener noreferrer" className="text-nova-blue underline">réserver via Resalib</a>
                  </div>
                </div>
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
