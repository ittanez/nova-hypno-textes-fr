import React from 'react';
import { Helmet } from 'react-helmet';
import ContentLayout from '@/components/layout/ContentLayout';
import LazyCommuteMap from '@/components/LazyCommuteMap';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Train from 'lucide-react/dist/esm/icons/train';
import Car from 'lucide-react/dist/esm/icons/car';
import Bike from 'lucide-react/dist/esm/icons/bike';
import Clock from 'lucide-react/dist/esm/icons/clock';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

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
        "Arrêt Bastille : Lignes 29, 69, 76, 86, 91, 96",
        "Desserte fréquente toute la journée"
      ]
    },
    {
      icon: Car,
      type: "Voiture",
      details: [
        "Parking Baudoyer - 300 mètres",
        "Parking Saint-Paul - 400 mètres"
      ]
    },
    {
      icon: Bike,
      type: "Vélo / Vélib'",
      details: [
        "Plusieurs stations Vélib' à Bastille",
        "Station Place de la Bastille - 2 min",
        "Station Rue de Turenne - 3 min"
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
          content="Cabinet d'hypnothérapie Paris 4ème accessible depuis tous les arrondissements. Métro Bastille (lignes 1, 5, 8) à 2 min. Séances au cabinet, à domicile (140€) ou en visio (90€). Consultez les temps de trajet depuis votre quartier."
        />
        <meta
          name="keywords"
          content="hypnothérapeute paris, cabinet hypnose bastille, hypnose marais, zone intervention paris, arrondissements paris, accès cabinet paris 4, hypnothérapie paris centre"
        />
        <link rel="canonical" href="https://novahypnose.fr/zone-intervention" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24">
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
                <Train className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">Métro Bastille 2 min</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-lg shadow-sm">
                <Clock className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700 font-medium">Accessible en 5-30 min</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Séances à domicile et visio */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Séances à domicile */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-8 w-8 text-gray-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Séances à domicile
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Pour les personnes qui ne peuvent pas se déplacer au cabinet, je propose des
                      <strong> séances d'hypnose à domicile dans Paris centre</strong>.
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-3">
                      140 € la séance
                    </p>
                  </div>
                </div>
              </div>

              {/* Séances en visio */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-8 w-8 text-gray-700 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Séances en visioconférence
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      Vous habitez en dehors de Paris ou préférez consulter depuis chez vous ?
                      <strong> Les séances d'hypnose en visio</strong> sont tout aussi efficaces.
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-3">
                      90 € la séance
                    </p>
                  </div>
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
                    <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4 text-gray-700" />
                      <span className="text-sm font-semibold text-gray-700">{zone.temps}</span>
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
                  className="bg-white rounded-lg p-6 border-2 border-gray-200 shadow-sm"
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
                      <div className="bg-gray-100 p-3 rounded-full">
                        <Icon className="h-6 w-6 text-gray-700" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{transport.type}</h3>
                    </div>

                    <ul className="space-y-2">
                      {transport.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="h-5 w-5 text-gray-700 flex-shrink-0 mt-0.5" />
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

            <LazyCommuteMap />
          </div>
        </div>
      </section>

    </ContentLayout>
  );
};

export default ZoneIntervention;
