
import React from 'react';
import { Check } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">Tarifs des séances d'hypnothérapie</h2>
        
        <div className="max-w-3xl mx-auto">
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
                  <span><strong>À Domicile (Paris Centre) :</strong> 140 €</span>
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
        </div>

        <div className="max-w-3xl mx-auto mt-10">
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
