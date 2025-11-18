
import React from 'react';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Video from 'lucide-react/dist/esm/icons/video';
import Home from 'lucide-react/dist/esm/icons/home';
import Check from 'lucide-react/dist/esm/icons/check';

const Pricing = () => {
  const sessions = [
    {
      icon: MapPin,
      title: "Cabinet Paris Bastille",
      price: "90€",
      description: "Au cœur de Paris",
      features: ["1h30 (première séance)", "1h (séances suivantes)", "Métro Bastille, St Paul, Sully-Morland"]
    },
    {
      icon: Video,
      title: "Téléconsultation",
      price: "90€",
      description: "Depuis chez vous",
      features: ["1h30 (première séance)", "1h (séances suivantes)", "Connexion sécurisée"]
    },
    {
      icon: Home,
      title: "À Domicile",
      price: "140€",
      description: "Paris Centre",
      features: ["1h30 (première séance)", "1h (séances suivantes)", "Arrond. 1-4, 9-11"],
      popular: true
    }
  ];

  return (
    <section id="tarifs" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-nova-blue-dark mb-4">Tarifs des séances d'hypnothérapie</h2>
          <p className="text-lg text-gray-600">Choisissez la formule qui vous convient le mieux</p>
        </div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mb-12">
          {sessions.map((session, index) => {
            const Icon = session.icon;
            return (
              <div
                key={index}
                className={`bg-white border-2 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                  session.popular ? 'border-nova-blue' : 'border-gray-200'
                }`}
              >
                {session.popular && (
                  <div className="inline-block bg-nova-blue text-white px-3 py-1 rounded text-xs font-semibold mb-4">
                    NOUVEAU
                  </div>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-nova-blue-light rounded-lg flex items-center justify-center">
                    <Icon className="text-nova-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                    <p className="text-sm text-gray-500">{session.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-3xl font-bold text-nova-blue-dark">{session.price}</div>
                  <div className="text-sm text-gray-500">par séance</div>
                </div>

                <ul className="space-y-2 mb-6">
                  {session.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600 text-sm">
                      <Check className="text-nova-blue flex-shrink-0 mt-0.5" size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-2">
                  <a
                    href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-6 py-2.5 bg-nova-blue text-white rounded-lg font-medium hover:bg-nova-blue-dark transition-colors"
                  >
                    Choisir cette formule
                  </a>
                  {session.popular && (
                    <p className="text-xs text-center text-gray-500">
                      Réservation en ligne sécurisée • Confirmation immédiate
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-3xl mx-auto mt-16 space-y-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Modalités de Paiement</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Chèque, espèces, carte bancaire (cabinet)</li>
              <li>Carte bancaire (téléconsultations)</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Remarques importantes</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Pas de consultations pour enfants et mineurs</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-md">
            <h3 className="text-xl font-semibold text-nova-blue-dark mb-4">Politique d'annulation</h3>
            <p className="text-gray-700">
              Annulation ou report ≥ 48 heures avant le rendez-vous (facturation quelle que soit la raison)
            </p>
          </div>

          <div className="bg-gradient-to-r from-nova-blue-light to-blue-50 p-8 rounded-xl text-center shadow-md">
            <p className="text-lg text-nova-blue-dark">
              Certaines mutuelles prennent en charge partiellement les séances d'hypnothérapie. N'hésitez pas à vous renseigner auprès de votre mutuelle directement.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
