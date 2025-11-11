
import React from 'react';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Users from 'lucide-react/dist/esm/icons/users';
import Euro from 'lucide-react/dist/esm/icons/euro';

const HypnoWalks = () => {
  return (
    <section id="walks" className="section-padding relative">
      <div className="absolute inset-0 bg-[url('https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images//balade.webp')] bg-cover bg-center opacity-15" 
           role="img" 
           aria-label="Fond de la forêt de Senonches pour hypno-balades"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-nova-green-dark mb-6">Hypno-Balades dans le Perche</h2>
          <h3 className="text-center text-nova-blue mb-12">Une expérience de relaxation profonde en pleine nature</h3>
          
          <div className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl mb-12">
            <p className="mb-6">
              Vivez une relaxation profonde en pleine nature. Participez à l'hypno-balade dans la magnifique forêt domaniale de Senonches pour une expérience unique de détente et de ressourcement. Ces promenades sont animées par Alain Zenatti, hypnothérapeute certifié possédant de nombreuses années d'expérience.
            </p>
            
            <h4 className="text-nova-blue-dark text-xl font-semibold mb-4">Le concept des hypno-balades</h4>
            <p className="mb-6">
              Les hypno-balades combinent les bienfaits de la marche et le pouvoir de l'hypnose. C'est une excellente façon de se détendre tout en explorant la beauté de la nature.
            </p>
            <p className="mb-6">
              Pendant la promenade, Alain vous guidera à travers des exercices hypnotiques pour vous aider à vous recentrer plus profondément à vous-même.
            </p>
            
            <h4 className="text-nova-blue-dark text-xl font-semibold mb-4">La magnifique forêt de Senonches</h4>
            <p className="mb-6">
              La forêt de Senonches est un espace naturel paisible situé au cœur du Perche. Avec sa faune diversifiée, c'est l'endroit idéal pour se ressourcer et lâcher prise.
            </p>
            
            <h4 className="text-nova-blue-dark text-xl font-semibold mb-4">Des promenades personnalisées</h4>
            <p>Je propose :</p>
            <ul className="list-disc ml-6 mb-6">
              <li>Des marches hypnotiques en groupe</li>
              <li>Des promenades individualisées adaptées à vos besoins</li>
              <li>La durée est d'1h30 à 2h</li>
            </ul>
          </div>
          
          <div className="bg-nova-green bg-opacity-10 p-8 rounded-xl shadow-lg">
            <h4 className="text-nova-green-dark text-xl font-semibold mb-6 text-center">Informations pratiques</h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Calendar className="text-nova-green mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Dates</p>
                  <p>Publiées sur le site web</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Clock className="text-nova-green mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Horaires</p>
                  <p>10h00 - 12h00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-nova-green mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Lieu</p>
                  <p>Forêt domaniale de Senonches<br/>(point de rendez-vous communiqué sur inscription)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Euro className="text-nova-green mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Tarif</p>
                  <ul>
                    <li>En groupe : 25€ par personne</li>
                    <li>En solo : 75€</li>
                    <li>En couple : 120€</li>
                    <li>Groupes sur devis</li>
                  </ul>
                </div>
              </div>
              
              <div className="md:col-span-2 mt-4 flex items-start">
                <Users className="text-nova-green mt-1 mr-3 flex-shrink-0" size={20} />
                <div>
                  <p className="font-semibold">Inscription</p>
                  <p>Par email à contact@novahypnose.fr ou par téléphone au 06 49 35 80 89</p>
                  <p className="font-semibold mt-2">Nombre de places limité à 7 personnes par groupe</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <a 
                href="#contact" 
                className="inline-block px-8 py-3 bg-nova-green text-white rounded-full shadow-md hover:bg-nova-green-dark transition-colors"
              >
                Réserver une hypno-balade
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HypnoWalks;
