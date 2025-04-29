
import React from 'react';
import { Heart, Award } from 'lucide-react';

const About = () => {
  const diplomas = [
    "Maître Hypnologue - École Psynapse (2025)",
    "Praticien en Hypnose Directive (Elmanienne) et Hyperemperia - École Psynapse (2025)",
    "Hypnologue - École Psynapse (2023)",
    "Maître Praticien en Hypnose Ericksonienne - École Psynapse (2023)",
    "Praticien en Hypnose spirituelle - École Psynapse (2023)",
    "Speed Hypnose (2023)",
    "Praticien en hypno-magnétisme - École Psynapse (2021)",
    "Praticien en Hypnose Ericksonienne - École Psynapse (2021)",
    "Praticien en Hypnose Ericksonienne - École MHD (2020)"
  ];
  
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">
          À propos d'Alain Zenatti, Maître Hypnologue et Maître en Hypnose Ericksonienne
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="http://novahypnose.fr/wp-content/uploads/2023/12/alain-zenatti-lexperience-dun-hypnotherapeute-parisien.webp" 
                alt="Alain Zenatti, Hypnothérapeute Paris" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="http://novahypnose.fr/wp-content/uploads/2023/12/lhypnotherapie-une-ecoute-attentive-et-bienveillante.webp"
                alt="Une séance d'hypnothérapie avec Alain Zenatti" 
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Formé aux approches d'hypnose ericksonienne et d'auto-hypnose, je suis profondément convaincu que chacun porte en lui les clés de sa transformation.
              </p>
              
              <p className="mb-6">
                À travers NovaHypnose, mon souhait est d'offrir un accompagnement respectueux, humain et individualisé. Chaque personne qui franchit la porte de mon cabinet est accueillie sans jugement, dans un espace de parole et d'exploration intérieure sécurisé.
              </p>
              
              <p className="mb-6">
                Mon approche repose sur l'idée que l'hypnose n'est pas une magie extérieure, mais un éveil intérieur : une manière douce et profonde de dialoguer avec l'inconscient pour activer vos ressources naturelles, apaiser vos émotions et favoriser vos élans de vie.
              </p>
              
              <p className="mb-6">
                Que votre objectif soit de mieux gérer votre stress, d'améliorer votre sommeil, de renforcer votre confiance ou de traverser une période de changement, je vous propose un accompagnement sur mesure, dans le respect de votre rythme et de votre unicité.
              </p>
            </div>
            
            <div className="bg-nova-blue-light bg-opacity-10 p-6 rounded-xl">
              <h3 className="text-nova-blue-dark flex items-center text-xl font-semibold mb-4">
                <Award className="mr-2 text-nova-blue" size={24} />
                Diplômes et formations
              </h3>
              <ul className="space-y-2">
                {diplomas.map((diploma, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-nova-green mr-2">•</span>
                    <span>{diploma}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-nova-neutral p-8 rounded-xl shadow-lg">
              <h3 className="text-nova-blue mb-4 flex items-center text-xl font-semibold">
                <Heart className="mr-2 text-nova-green" size={24} />
                L'hypnose ericksonienne : une approche respectueuse et créative
              </h3>
              
              <p className="mb-4">
                L'hypnose que je pratique est issue de l'approche ericksonienne, du nom de Milton H. Erickson, psychiatre et hypnothérapeute reconnu pour avoir révolutionné l'utilisation de l'hypnose thérapeutique.
              </p>
              
              <p className="mb-4">
                Contrairement aux approches directives classiques, l'hypnose ericksonienne repose sur l'idée que l'inconscient de chaque personne est une source immense de solutions et de ressources.
              </p>
              
              <p className="mb-4">
                Cette approche est douce, personnalisée, et respecte pleinement votre rythme et vos choix inconscients. Il ne s'agit jamais d'imposer un changement, mais d'éveiller ce qui est déjà en vous, prêt à émerger.
              </p>
              
              <div className="mt-6 flex justify-center">
                <a 
                  href="https://hypnokick.novahypnose.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-nova-blue text-white rounded-lg shadow-lg hover:bg-nova-blue-dark transition-colors text-center"
                >
                  Suis-je hypnotisable ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
