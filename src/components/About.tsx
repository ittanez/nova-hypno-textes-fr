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
                src="/lovable-uploads/bfa09bf5-35ee-4e5b-9b32-5d1f42101734.png" 
                alt="Alain Zenatti, Hypnothérapeute à Paris spécialisé en hypnose ericksonienne" 
                className="w-full h-auto"
                loading="eager"
                width="600"
                height="800"
                fetchPriority="high"
                srcSet="/lovable-uploads/bfa09bf5-35ee-4e5b-9b32-5d1f42101734.png 600w"
                sizes="(max-width: 768px) 100vw, 600px"
                type="image/png"
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="prose prose-lg max-w-none">
              <p className="mb-6">
                Je suis Alain Zenatti, hypnothérapeute certifié à Paris, spécialisé en hypnose ericksonienne et en auto-hypnose.
                Formé aux approches intégratives et humanistes de l'hypnose, je suis profondément convaincu que chacun porte en lui les clés de sa propre évolution. J'ai choisi de proposer, un espace d'accompagnement où le respect, l'écoute et la personnalisation sont au cœur de chaque séance.
              </p>
              
              <p className="mb-6">
                Chaque personne que je reçois est accueillie dans sa singularité, sans jugement, avec attention. Qu'il s'agisse d'un stress persistant, d'un blocage émotionnel, d'un manque de confiance, ou simplement d'un besoin de réorientation intérieure, mon rôle n'est pas de vous diriger, mais de vous accompagner dans un dialogue respectueux avec votre inconscient.
              </p>
              
              <p className="mb-6">
                Je pratique l'hypnose ericksonienne, c'est-à-dire profondément adaptative, souple, respectueuse de votre rythme intérieur. Elle s'appuie sur une relation de confiance, sur des suggestions métaphoriques, des images symboliques, ou encore des protocoles personnalisés. Elle n'agit pas sur vous, mais avec vous.
              </p>
              
              <p className="mb-6">
                L'inconscient est à mes yeux un allié, pas un obstacle. Il contient bien plus que des blocages ou des résistances : il est une source précieuse de ressources, de sagesse et de mémoire vivante, souvent ignorée par la conscience rationnelle. L'auto-hypnose, que j'enseigne également, prolonge ce lien et vous rend autonome dans votre parcours de mieux-être.
              </p>
              
              <p className="mb-6">
                Chaque séance est construite avec soin, dans un cadre sécurisant, ajusté à votre vécu, vos capacités du moment, vos aspirations. Ce n'est jamais une méthode appliquée mécaniquement, mais une co-construction subtile, où le corps, les émotions, les images mentales et l'écoute profonde se rejoignent.
              </p>
              
              <p className="mb-6">
                Je vous accompagne dans ce mouvement intérieur — celui qui ne force rien, mais qui facilite l'émergence d'un mieux-être authentique, durable et aligné avec qui vous êtes.
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
              
              <div className="mt-8">
                <img 
                  src="/lovable-uploads/e1acda5a-fe4c-472d-8083-5c8baf982923.png" 
                  alt="Séance d'hypnothérapie avec Alain Zenatti à Paris - Cabinet d'hypnose ericksonienne" 
                  className="w-full h-auto rounded-lg shadow-md"
                  loading="lazy"
                  width="800"
                  height="533"
                  fetchPriority="low"
                  srcSet="/lovable-uploads/e1acda5a-fe4c-472d-8083-5c8baf982923.png 800w"
                  sizes="(max-width: 768px) 100vw, 800px"
                  type="image/png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
