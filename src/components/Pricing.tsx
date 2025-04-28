
import React from 'react';
import { CreditCard, Check, AlertCircle } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">Tarifs et conditions</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-nova-neutral p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Modalités de Paiement</h3>
              <div className="flex items-center mb-4">
                <CreditCard className="text-nova-blue mr-3" size={20} />
                <p>Chèques, espèces, carte bancaire (cabinet)</p>
              </div>
              <div className="flex items-center">
                <CreditCard className="text-nova-blue mr-3" size={20} />
                <p>Carte bancaire (téléconsultations)</p>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Remarques importantes</h3>
                <div className="flex items-start mb-4">
                  <AlertCircle className="text-nova-blue mt-1 mr-3 flex-shrink-0" size={20} />
                  <p>Pas de consultations pour enfants et mineurs.</p>
                </div>
                <div className="flex items-start">
                  <AlertCircle className="text-nova-blue mt-1 mr-3 flex-shrink-0" size={20} />
                  <p>Politique d'annulation : Annulation ou report ≥ 48 heures avant le rendez-vous (facturation quelle que soit la nature)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-nova-blue-light bg-opacity-20 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Mutuelles</h3>
              <p className="mb-4">
                En France, l'hypnothérapie est remboursée par certaines mutuelles. Les remboursements varient en fonction des mutuelles et des contrats souscrits.
              </p>
              <p className="mb-4">
                Pour savoir si votre mutuelle rembourse l'hypnothérapie, il est recommandé de contacter votre mutuelle directement.
              </p>
              <p className="font-semibold mb-2">Exemples de remboursements possibles :</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <Check className="text-nova-green mt-1 mr-2 flex-shrink-0" size={18} />
                  <p>Remboursement à 100% du tarif de base de l'hypnothérapie, dans la limite d'un certain nombre de séances par an.</p>
                </li>
                <li className="flex items-start">
                  <Check className="text-nova-green mt-1 mr-2 flex-shrink-0" size={18} />
                  <p>Remboursement à 25% du tarif de base de l'hypnothérapie, dans la limite d'un certain nombre de séances par an.</p>
                </li>
                <li className="flex items-start">
                  <Check className="text-nova-green mt-1 mr-2 flex-shrink-0" size={18} />
                  <p>Remboursement sous forme de forfait annuel, pour un certain nombre de séances.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
