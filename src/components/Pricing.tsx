
import React from 'react';
import { MapPin, Video, Home } from 'lucide-react';

const Pricing = () => {
  const sessions = [
    {
      icon: MapPin,
      title: "Cabinet Paris Bastille",
      price: "90€",
      description: "Au cœur de Paris",
      features: ["1h30 (première séance)", "1h (séances suivantes)", "Métro Bastille"],
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Video,
      title: "Téléconsultation",
      price: "90€",
      description: "Depuis chez vous",
      features: ["1h30 (première séance)", "1h (séances suivantes)", "Connexion sécurisée"],
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    {
      icon: Home,
      title: "À Domicile",
      price: "140€",
      description: "Paris Centre",
      features: ["1h30 (première séance)", "1h (séances suivantes)", "Arrond. 1-4, 9-11"],
      gradient: "from-green-500 to-green-600",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      popular: true
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-nova-blue-dark mb-4">Tarifs des séances d'hypnothérapie</h2>
          <p className="text-xl text-gray-600">Choisissez la formule qui vous convient le mieux</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mb-16">
          {sessions.map((session, index) => {
            const Icon = session.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                  session.popular ? 'ring-2 ring-nova-green scale-105' : ''
                }`}
              >
                {session.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-nova-green text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                    ✨ NOUVEAU
                  </div>
                )}

                <div className={`bg-gradient-to-br ${session.gradient} p-6 rounded-t-2xl`}>
                  <div className={`${session.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className={session.iconColor} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">{session.title}</h3>
                  <p className="text-white/90 text-center text-sm">{session.description}</p>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-gray-900 mb-1">{session.price}</div>
                    <div className="text-sm text-gray-500">par séance</div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {session.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-600">
                        <div className="mt-1 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full text-center px-6 py-3 bg-gradient-to-r ${session.gradient} text-white rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg`}
                  >
                    Réserver
                  </a>
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
