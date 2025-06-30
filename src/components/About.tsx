 import React from 'react';
import { Heart, Award } from 'lucide-react';
import LazyYouTube from './LazyYouTube';

const About = () => {
  const diplomasByLevel = {
    maitrises: [
      "Maître Hypnologue - École Psynapse (2025)",
      "Maître Praticien en Hypnose Ericksonienne - École Psynapse (2023)"
    ],
    specialisations: [
      "Hypnose Directive (Elmanienne) et Hyperemperia - École Psynapse (2025)",
      "Hypnologue - École Psynapse (2023)",
      "Hypnose spirituelle - École Psynapse (2023)",
      "Hypno-magnétisme - École Psynapse (2021)",
      "Speed Hypnose (2023)",
      "Hypnose Ericksonienne - École Psynapse (2021)",
      "Hypnose Ericksonienne - École MHD (2020)"
    ]
  };
  
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
                src="/zenatti.webp" 
                srcSet="/zenatti.webp 1x, /zenatti.webp 2x"
                sizes="(max-width: 768px) 100vw, 50vw"
                alt="Alain Zenatti, Hypnothérapeute Paris 4ème Marais spécialisé en hypnose ericksonienne et auto-hypnose" 
                className="w-full h-auto"
                loading="eager"
                fetchPriority="high"
                width="600"
                height="800"
              />
            </div>

            <div className="bg-nova-blue-light bg-opacity-10 p-6 rounded-xl">
              <h3 className="text-nova-blue-dark flex items-center text-xl font-semibold mb-4">
                <Award className="mr-2 text-nova-blue" size={24} />
                Diplômes et formations
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-nova-blue-dark mb-2 uppercase text-sm tracking-wide">
                    MAÎTRISES
                  </h4>
                  <ul className="space-y-1 ml-4">
                    {diplomasByLevel.maitrises.map((diploma, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-nova-green mr-2">•</span>
                        <span>{diploma}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-nova-blue-dark mb-2 uppercase text-sm tracking-wide">
                    SPÉCIALISATIONS
                  </h4>
                  <ul className="space-y-1 ml-4">
                    {diplomasByLevel.specialisations.map((diploma, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-nova-green mr-2">•</span>
                        <span>{diploma}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
          
          <div className="space-y-6">
            <div className="bg-nova-blue-light bg-opacity-5 p-4 rounded-lg border-l-4 border-nova-blue mb-6">
              <p className="font-semibold text-nova-blue-dark mb-2">Pourquoi choisir un Maître Hypnologue ?</p>
              <p>
                Je suis Alain Zenatti, <strong>Maître Hypnologue certifié</strong> à Paris, avec plus de 5 années d'expérience en hypnose ericksonienne et auto-hypnose.
                Vous profitez d'une formation approfondie (9 certifications) et d'une approche scientifiquement fondée qui vous garantissent un accompagnement professionnel de haut niveau.
              </p>
            </div>
            
            <p className="mb-6">
              Vous êtes accueilli dans votre singularité, sans jugement, avec attention. Qu'il s'agisse de votre stress persistant, de vos blocages émotionnels, de votre manque de confiance, ou simplement de votre besoin de réorientation intérieure, vous n'êtes pas dirigé, mais accompagné dans un dialogue respectueux avec votre inconscient.
            </p>

            <blockquote className="mt-6 text-center mb-6">
              <p className="text-lg italic text-gray-700 mb-2">
                "Un mouvement intérieur qui ne force rien, mais qui facilite l'émergence de votre mieux-être authentique, durable et aligné avec qui vous êtes."
              </p>
              <cite className="text-gray-600 text-sm">— Alain Zenatti, Maître Hypnologue</cite>
            </blockquote>
            
            <div className="bg-nova-green-light bg-opacity-5 p-4 rounded-lg mb-6">
              <p className="font-semibold text-nova-blue-dark mb-2">Ma méthode expliquée</p>
              <p>
                Vous bénéficiez de l'hypnose ericksonienne, une approche scientifiquement validée qui respecte votre rythme intérieur. 
                Contrairement aux idées reçues, vous restez conscient et en contrôle. Chaque étape vous est expliquée pour que vous compreniez 
                exactement comment vos ressources inconscientes sont mobilisées de manière collaborative.
              </p>
            </div>

            <blockquote className="my-8 pl-6 border-l-4 border-nova-green text-lg italic text-gray-700">
              "Vous n'êtes pas dirigé, mais accompagné dans un dialogue respectueux avec votre inconscient."
            </blockquote>

            <div className="rounded-xl overflow-hidden shadow-lg">
              <LazyYouTube 
                videoId="4VRNBAoAcAE"
                title="Alain Zenatti - Maître Hypnologue Paris 4ème - Présentation Cabinet NovaHypnose"
                className="w-full"
              />
              
              {/* Schema markup pour la vidéo */}
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "VideoObject",
                  "name": "Présentation d'Alain Zenatti - Maître Hypnologue Paris",
                  "description": "Découvrez l'approche d'Alain Zenatti, Maître Hypnologue certifié à Paris 4ème, spécialisé en hypnose ericksonienne et auto-hypnose.",
                  "thumbnailUrl": "https://img.youtube.com/vi/4VRNBAoAcAE/maxresdefault.jpg",
                  "uploadDate": "2025-06-29T10:00:00+02:00",
                  "duration": "PT1M14S",
                  "embedUrl": "https://www.youtube.com/embed/4VRNBAoAcAE",
                  "contentUrl": "https://www.youtube.com/watch?v=4VRNBAoAcAE",
                  "publisher": {
                    "@type": "Organization",
                    "name": "NovaHypnose",
                    "url": "https://novahypnose.fr"
                  },
                  "creator": {
                    "@type": "Person",
                    "name": "Alain Zenatti",
                    "jobTitle": "Maître Hypnologue",
                    "worksFor": {
                      "@type": "MedicalBusiness",
                      "name": "NovaHypnose"
                    }
                  }
                })}
              </script>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
