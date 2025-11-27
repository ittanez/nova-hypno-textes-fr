/**
 * AboutSection Component
 * Section À propos d'Alain Zenatti avec photo, vidéo et informations
 * Inclut une modale vidéo pour la présentation
 */

import React from 'react';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Lightbulb from 'lucide-react/dist/esm/icons/lightbulb';

interface AboutSectionProps {
  onOpenVideoModal: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenVideoModal }) => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 order-2 md:order-1">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/alain-nov2025.webp?width=250&quality=75"
                srcSet="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/alain-nov2025.webp?width=200&quality=75 200w,
                        https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/alain-nov2025.webp?width=250&quality=75 250w,
                        https://akrlyzmfszumibwgocae.supabase.co/storage/v1/render/image/public/images/alain-nov2025.webp?width=300&quality=75 300w"
                sizes="(max-width: 768px) 40vw, 250px"
                alt="Alain Zenatti - Maître Hypnologue certifié, spécialiste en hypnose ericksonienne à Paris 4ème Marais-Bastille"
                width="800"
                height="1062"
                className="rounded-2xl shadow-2xl w-full max-w-[200px] md:max-w-[250px] h-auto mx-auto md:mx-0"
                loading="lazy"
              />

              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <button
                  onClick={onOpenVideoModal}
                  className="block relative group w-full text-left"
                >
                  <img
                    src="https://img.youtube.com/vi/4VRNBAoAcAE/sddefault.jpg"
                    alt="Vidéo de présentation d'Alain Zenatti - Maître Hypnologue Paris - Cabinet d'hypnothérapie NovaHypnose"
                    width="640"
                    height="480"
                    className="w-full h-auto object-cover rounded-xl"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="text-blue-600" size={24} />
                  L'hypnose ericksonienne : une approche respectueuse
                </h3>
                <p className="text-gray-700 mb-3 leading-relaxed">
                  L'hypnose que je pratique est issue de l'approche ericksonienne, du nom de Milton H. Erickson, psychiatre et hypnothérapeute reconnu pour avoir révolutionné l'utilisation de l'hypnose thérapeutique.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Contrairement aux approches directives classiques, l'hypnose ericksonienne repose sur l'idée que l'inconscient de chaque personne est une source immense de solutions et de ressources. Cette approche est douce, personnalisée, et respecte pleinement votre rythme et vos choix inconscients.
                </p>
              </div>
            </div>

            <div className="space-y-6 order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900">
                Alain Zenatti, Hypnothérapeute à Paris
              </h2>
              <p className="text-xl text-blue-600 font-semibold">
                Maître Hypnologue certifié • Cabinet Paris 4ème Marais-Bastille
              </p>

              <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500">
                <p className="font-semibold text-gray-900 mb-2">Votre hypnothérapeute à Paris : expertise et bienveillance</p>
                <p className="text-gray-700 leading-relaxed">
                  En tant que <strong>Maître Hypnologue certifié</strong>, je vous accompagne au cœur de Paris avec plus de 5 années d'expérience en hypnose ericksonienne et auto-hypnose.
                  Mon cabinet situé dans le Marais (Paris 4ème) vous offre un accompagnement professionnel de haut niveau, alliant formation approfondie et approche personnalisée.
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed mb-4">
                Vous êtes accueilli dans votre singularité, sans jugement, avec attention. Qu'il s'agisse de votre stress persistant, de vos blocages émotionnels, de votre manque de confiance, ou simplement de votre besoin de réorientation intérieure, vous n'êtes pas dirigé, mais accompagné dans un dialogue respectueux avec votre inconscient.
              </p>

              <div className="bg-nova-green-light bg-opacity-10 p-6 rounded-xl">
                <h4 className="font-semibold text-nova-blue-dark text-lg mb-3 text-center">
                  Des résultats concrets, mesurables et durables
                </h4>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start">
                    <span className="text-nova-green mr-2 font-bold">✓</span>
                    <span><strong>Stress et anxiété réduits</strong> de manière durable après quelques séances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-nova-green mr-2 font-bold">✓</span>
                    <span><strong>Sommeil retrouvé</strong> en 3 séances en moyenne</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-nova-green mr-2 font-bold">✓</span>
                    <span><strong>Confiance renforcée</strong> pour affronter les défis du quotidien</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-nova-green mr-2 font-bold">✓</span>
                    <span><strong>95% des clients</strong> constatent une amélioration significative dès les 3 premières séances</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Formation approfondie et continue</p>
                    <p className="text-gray-600">Maître Hypnologue certifié, formation continue en hypnose ericksonienne</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Approche personnalisée et collaborative</p>
                    <p className="text-gray-600">Chaque séance adaptée à vos besoins spécifiques et votre rythme</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Transparence totale</p>
                    <p className="text-gray-600">Chaque étape expliquée pour comprendre le processus</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-gray-900">Techniques validées scientifiquement</p>
                    <p className="text-gray-600">Hypnose ericksonienne, PNL, hypnose directive et spirituelle</p>
                  </div>
                </div>
              </div>

              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-nova-green hover:bg-nova-green-dark text-white rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Calendar size={24} />
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
