
import React from 'react';
import { Heart } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-nova-blue-dark mb-12">
            À propos d'Alain Zenatti, votre hypnothérapeute
          </h2>
          
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
            
            <p className="mb-12">
              Que votre objectif soit de mieux gérer votre stress, d'améliorer votre sommeil, de renforcer votre confiance ou de traverser une période de changement, je vous propose un accompagnement sur mesure, dans le respect de votre rythme et de votre unicité.
            </p>
            
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
              
              <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                <a 
                  href="https://hypno-balade.novahypnose.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-nova-green text-white rounded-lg hover:bg-nova-green-dark transition-colors text-center"
                >
                  Découvrir les Hypno-balades
                </a>
                <a 
                  href="https://harmonia.novahypnose.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 border-2 border-nova-blue text-nova-blue rounded-lg hover:bg-nova-blue hover:text-white transition-colors text-center"
                >
                  Explorer l'auto-hypnose
                </a>
                <a 
                  href="https://hypnokick.novahypnose.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-white border-2 border-nova-neutral-dark text-nova-neutral-dark rounded-lg hover:bg-nova-neutral-dark hover:text-white transition-colors text-center"
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
