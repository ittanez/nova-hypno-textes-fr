import React from 'react';
import { Helmet } from 'react-helmet';
import ContentLayout from '@/components/layout/ContentLayout';
import CommuteMap from '@/components/CommuteMap';
import { MapPin, Train, Car, Bike, Clock, CheckCircle, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ZoneIntervention = () => {
  const arrondissements = [
    {
      zone: "Paris Centre",
      arrondissements: "1er, 2ème, 3ème, 4ème",
      temps: "5-10 min",
      quartiers: "Marais, Bastille, Châtelet, Hôtel de Ville, République"
    },
    {
      zone: "Paris Est",
      arrondissements: "10ème, 11ème, 12ème",
      temps: "5-15 min",
      quartiers: "Oberkampf, Ménilmontant, Gare de Lyon, Nation, Bercy"
    },
    {
      zone: "Paris Nord",
      arrondissements: "18ème, 19ème, 20ème",
      temps: "15-25 min",
      quartiers: "Belleville, Buttes-Chaumont, Gambetta, Père Lachaise"
    },
    {
      zone: "Paris Sud",
      arrondissements: "5ème, 13ème, 14ème",
      temps: "15-25 min",
      quartiers: "Quartier Latin, Place d'Italie, Montparnasse, Gobelins"
    },
    {
      zone: "Paris Ouest",
      arrondissements: "7ème, 8ème, 15ème, 16ème, 17ème",
      temps: "20-30 min",
      quartiers: "Invalides, Champs-Élysées, Tour Eiffel, Trocadéro, Passy"
    },
    {
      zone: "Paris Sud-Ouest",
      arrondissements: "6ème, 9ème",
      temps: "15-20 min",
      quartiers: "Saint-Germain-des-Prés, Opéra, Pigalle, Montmartre"
    }
  ];

  const transports = [
    {
      icon: Train,
      type: "Métro",
      details: [
        "Station Bastille (Lignes 1, 5, 8) - 2 min à pied",
        "Station Saint-Paul (Ligne 1) - 5 min à pied",
        "Connexions directes : République, Châtelet, Gare de Lyon, Nation"
      ]
    },
    {
      icon: Train,
      type: "Bus",
      details: [
        "Arrêt Bastille : Lignes 20, 29, 65, 69, 76, 86, 87, 91, 96",
        "Arrêt Saint-Antoine : Lignes 67, 69, 76, 96",
        "Desserte fréquente toute la journée"
      ]
    },
    {
      icon: Car,
      type: "Voiture",
      details: [
        "Parking Bastille Saint-Antoine - 50 mètres (accès direct)",
        "Parking Baudoyer - 300 mètres",
        "Parking Saint-Paul - 400 mètres"
      ]
    },
    {
      icon: Bike,
      type: "Vélo / Vélib'",
      details: [
        "Station Place de la Bastille - 2 min",
        "Station Rue de Turenne - 3 min",
        "Arceaux vélos devant le cabinet"
      ]
    }
  ];

  const gares = [
    { nom: "Gare de Lyon", temps: "5 min", ligne: "Métro Ligne 1 direct" },
    { nom: "Gare du Nord", temps: "15 min", ligne: "Métro Ligne 5 direct" },
    { nom: "Gare de l'Est", temps: "15 min", ligne: "Métro Ligne 5 direct" },
    { nom: "Gare Montparnasse", temps: "20-25 min", ligne: "Métro Ligne 6 puis 1" },
    { nom: "Gare Saint-Lazare", temps: "20 min", ligne: "Métro Ligne 14 puis 1" }
  ];

  return (
    <ContentLayout>
      <Helmet>
        <title>Zone d'Intervention Paris - Cabinet Hypnothérapie Marais Bastille | NovaHypnose</title>
        <meta
          name="description"
          content="Cabinet d'hypnothérapie Paris 4ème facilement accessible depuis tous les arrondissements. Métro Bastille (lignes 1, 5, 8) à 2 min. Parkings à proximité. Consultez les temps de trajet depuis votre quartier."
        />
        <meta
          name="keywords"
          content="hypnothérapeute paris, cabinet hypnose bastille, hypnose marais, zone intervention paris, arrondissements paris, accès cabinet paris 4, hypnothérapie paris centre"
        />
        <link rel="canonical" href="https://novahypnose.fr/zone-intervention" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
              <MapPin className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                Cabinet Paris 4ème - Marais Bastille
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-purple-600 mb-2">Zone d'Intervention</span>
              <span className="block text-blue-600">Cabinet d'Hypnothérapie à Paris</span>
            </h1>

            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Mon cabinet d'hypnothérapie situé au <strong>16 rue Saint-Antoine, Paris 4ème</strong>,
              est facilement accessible depuis tous les arrondissements parisiens grâce à son emplacement
              stratégique à <strong>Bastille</strong> (métro lignes 1, 5, 8).
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                <Train className="h-5 w-5 text-blue-600" />
                <span className="text-gray-700 font-medium">Métro Bastille 2 min</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                <Car className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">Parkings à proximité</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-purple-600" />
                <span className="text-gray-700 font-medium">Accessible en 5-30 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    99% des séances se déroulent au cabinet
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Je privilégie les <strong>consultations en présentiel</strong> au cabinet de Paris 4ème
                    pour garantir la meilleure qualité d'accompagnement. L'environnement calme et dédié
                    du cabinet favorise votre immersion et l'efficacité des séances d'hypnose.
                  </p>
                  <p className="text-gray-600 text-sm mt-3">
                    <em>Quelques téléconsultations sont possibles dans des cas exceptionnels (mobilité réduite,
                    éloignement géographique important). Contactez-moi pour en discuter.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Arrondissements desservis */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Arrondissements Desservis depuis le Cabinet
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Grâce à la station Bastille (lignes 1, 5, 8), le cabinet est accessible rapidement
              depuis tous les arrondissements de Paris et la proche banlieue.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {arrondissements.map((zone, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">{zone.zone}</h3>
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-600">{zone.temps}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 font-medium mb-3">
                    Arrondissements : {zone.arrondissements}
                  </p>

                  <p className="text-sm text-gray-600">
                    <strong>Quartiers :</strong> {zone.quartiers}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-6">
                <strong>Vous habitez en proche banlieue ?</strong> Le cabinet est également facilement accessible
                depuis Vincennes, Montreuil, Saint-Mandé, Charenton, Ivry, Villejuif, et toutes les villes
                desservies par les lignes 1, 5 et 8.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Accès depuis les gares */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Accès depuis les Principales Gares Parisiennes
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Vous venez de province ou de banlieue ? Le cabinet est idéalement situé
              à proximité de toutes les gares parisiennes.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {gares.map((gare, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border-2 border-blue-100"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{gare.nom}</h3>
                    <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-600">{gare.temps}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Train className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-sm">{gare.ligne}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Transports en commun */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Comment Venir au Cabinet ?
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Toutes les options pour rejoindre facilement le cabinet d'hypnothérapie
              au 16 rue Saint-Antoine, Paris 4ème.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {transports.map((transport, index) => {
                const Icon = transport.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-blue-100 p-3 rounded-full">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{transport.type}</h3>
                    </div>

                    <ul className="space-y-2">
                      {transport.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Carte interactive */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
              Calculez Votre Temps de Trajet
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Utilisez la carte interactive ci-dessous pour calculer le temps de trajet
              depuis votre domicile ou lieu de travail jusqu'au cabinet.
            </p>

            <CommuteMap />
          </div>
        </div>
      </section>

      {/* Section Téléconsultations (secondaire) */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 md:p-10 border-2 border-gray-200">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Téléconsultations : Une Option Exceptionnelle
              </h2>

              <p className="text-gray-700 mb-4 leading-relaxed">
                Bien que <strong>99% des séances se déroulent au cabinet</strong>, je propose
                occasionnellement des téléconsultations dans des situations particulières :
              </p>

              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Mobilité réduite temporaire ou permanente</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Éloignement géographique important (hors Île-de-France)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">Suivi après plusieurs séances en cabinet</span>
                </li>
              </ul>

              <p className="text-gray-600 text-sm italic">
                Les téléconsultations nécessitent un environnement calme, une bonne connexion internet,
                et l'utilisation d'écouteurs. Contactez-moi pour évaluer si cette option est adaptée
                à votre situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Prêt à Commencer Votre Accompagnement en Hypnose ?
            </h2>
            <p className="text-xl mb-8 text-blue-50">
              Le cabinet de Paris 4ème vous accueille du lundi au vendredi de 11h à 20h.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.location.href = 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris'}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-6 text-lg rounded-lg shadow-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Prendre Rendez-vous
              </Button>

              <Button
                onClick={() => window.location.href = 'tel:+33649358089'}
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                06 49 35 80 89
              </Button>
            </div>

            <p className="mt-8 text-blue-100 text-sm">
              📍 16 rue Saint-Antoine, 75004 Paris | Métro Bastille (Lignes 1, 5, 8)
            </p>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};

export default ZoneIntervention;
