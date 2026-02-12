 import React from 'react';
import Heart from 'lucide-react/dist/esm/icons/heart';
import Award from 'lucide-react/dist/esm/icons/award';
import LazyYouTube from './LazyYouTube';
import { getImageKitUrl } from '@/lib/utils/imagekit';

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

  // Image zenatti optimisée avec ImageKit
  const zenattiBaseUrl = 'https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp';
  const zenattiSrcSet = [
    `${getImageKitUrl(zenattiBaseUrl, { width: 285, quality: 80, format: 'auto' })} 285w`,
    `${getImageKitUrl(zenattiBaseUrl, { width: 400, quality: 80, format: 'auto' })} 400w`,
    `${getImageKitUrl(zenattiBaseUrl, { width: 600, quality: 80, format: 'auto' })} 600w`
  ].join(', ');
  
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-nova-blue-dark mb-3 speakable" data-speakable="true">
            À propos d'Alain Zenatti
          </h2>
          <p className="text-xl text-nova-blue font-semibold">
            Maître Hypnologue • Hypnose Ericksonienne
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Plus de 5 ans d'expérience • Cabinet Paris 4ème
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={getImageKitUrl(zenattiBaseUrl, { width: 400, quality: 80, format: 'auto' })}
                srcSet={zenattiSrcSet}
                sizes="(max-width: 768px) 100vw, 400px"
                alt="Alain Zenatti, Hypnothérapeute Paris 4ème Marais spécialisé en hypnose ericksonienne et auto-hypnose"
                className="w-full h-auto"
                loading="lazy"
                width="400"
                height="533"
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

            <div className="bg-nova-neutral p-8 rounded-xl shadow-lg space-y-6">
              <div>
                <h3 className="text-nova-blue mb-2 flex items-center text-xl font-semibold">
                  <Heart className="mr-2 text-nova-green" size={24} />
                  L'hypnose ericksonienne
                </h3>
                <p className="text-gray-600 italic mb-4">
                  Une approche respectueuse et créative
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-nova-blue-dark mb-3">
                  Une révolution thérapeutique
                </h4>
                <p className="mb-3 leading-relaxed">
                  L'hypnose que je pratique est issue de l'approche ericksonienne, du nom de Milton H. Erickson.
                </p>
                <p className="mb-3 leading-relaxed">
                  Ce psychiatre et hypnothérapeute a révolutionné l'utilisation de l'hypnose thérapeutique.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-nova-blue-dark mb-3">
                  Votre inconscient, source de solutions
                </h4>
                <p className="mb-3 leading-relaxed">
                  Contrairement aux approches directives classiques, l'hypnose ericksonienne repose sur une conviction :
                </p>
                <p className="mb-3 leading-relaxed">
                  L'inconscient de chaque personne est une source immense de solutions et de ressources.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-nova-blue-dark mb-3">
                  Une méthode douce et personnalisée
                </h4>
                <p className="mb-3 leading-relaxed">
                  Cette approche respecte pleinement votre rythme et vos choix inconscients.
                </p>
                <p className="mb-3 leading-relaxed">
                  Il ne s'agit jamais d'imposer un changement, mais d'éveiller ce qui est déjà en vous, prêt à émerger.
                </p>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="https://hypnokick.novahypnose.fr"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="px-8 py-4 bg-nova-blue text-white rounded-lg shadow-lg hover:bg-nova-blue-dark transition-colors text-center"
                >
                  Suis-je hypnotisable ?
                </a>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-nova-blue-light bg-opacity-5 p-6 rounded-lg border-l-4 border-nova-blue mb-6 space-y-3">
              <h3 className="font-semibold text-nova-blue-dark text-xl mb-3">
                Pourquoi choisir un Maître Hypnologue ?
              </h3>
              <p className="leading-relaxed">
                Je suis Alain Zenatti, <strong>Maître Hypnologue certifié</strong> à Paris.
              </p>
              <p className="leading-relaxed">
                Plus de 5 années d'expérience en hypnose ericksonienne et auto-hypnose.
              </p>
              <p className="leading-relaxed">
                Vous profitez d'une formation approfondie (9 certifications) et d'une approche scientifiquement fondée.
              </p>
              <p className="leading-relaxed">
                Un accompagnement professionnel de haut niveau garanti.
              </p>
            </div>

            <div className="mb-6 space-y-4">
              <h3 className="font-semibold text-nova-blue-dark text-xl">
                Un accueil sans jugement
              </h3>
              <p className="leading-relaxed">
                Vous êtes accueilli dans votre singularité, sans jugement, avec attention.
              </p>
              <p className="leading-relaxed mb-3">
                Quels que soient vos défis :
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start">
                  <span className="text-nova-green mr-2">•</span>
                  <span>Stress persistant ou anxiété envahissante</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nova-green mr-2">•</span>
                  <span>Blocages émotionnels qui vous freinent</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nova-green mr-2">•</span>
                  <span>Manque de confiance ou doutes récurrents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nova-green mr-2">•</span>
                  <span>Besoin de réorientation intérieure</span>
                </li>
              </ul>
              <p className="leading-relaxed mt-4">
                Vous n'êtes pas dirigé, mais accompagné dans un dialogue respectueux avec votre inconscient.
              </p>
            </div>

            <div className="mt-6 bg-nova-green-light bg-opacity-10 p-6 rounded-xl mb-6">
              <h3 className="font-semibold text-nova-blue-dark text-lg mb-3 text-center">
                Résultats concrets et mesurables
              </h3>
              <ul className="space-y-2 text-base">
                <li className="flex items-start">
                  <span className="text-nova-green mr-2 font-bold">✓</span>
                  <span><strong>95% des clients</strong> constatent une amélioration significative dès les 3 premières séances</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nova-green mr-2 font-bold">✓</span>
                  <span><strong>Stress et anxiété réduits</strong> de manière durable</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nova-green mr-2 font-bold">✓</span>
                  <span><strong>Sommeil retrouvé</strong> en 3 séances en moyenne</span>
                </li>
                <li className="flex items-start">
                  <span className="text-nova-green mr-2 font-bold">✓</span>
                  <span><strong>Phobies surmontées</strong> avec un accompagnement progressif et bienveillant</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-nova-green-light bg-opacity-5 p-6 rounded-lg mb-6 space-y-3">
              <h3 className="font-semibold text-nova-blue-dark text-xl mb-3">
                Ma méthode expliquée
              </h3>
              <p className="leading-relaxed">
                Vous bénéficiez de l'hypnose ericksonienne, une approche scientifiquement validée.
              </p>
              <p className="leading-relaxed">
                Elle respecte votre rythme intérieur.
              </p>
              <p className="leading-relaxed">
                Contrairement aux idées reçues, vous restez conscient et en contrôle.
              </p>
              <p className="leading-relaxed">
                Chaque étape vous est expliquée pour que vous compreniez exactement comment vos ressources inconscientes sont mobilisées de manière collaborative.
              </p>
            </div>

            <div className="text-center my-8">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block px-8 py-4 bg-nova-blue text-white rounded-lg shadow-lg hover:bg-nova-blue-dark transition-colors text-lg font-medium"
              >
                Discuter de mon besoin avec Alain
              </a>
              <p className="text-sm text-gray-600 mt-3">
                Premier échange gratuit de 15 min par téléphone
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
                  "thumbnailUrl": "https://img.youtube.com/vi/4VRNBAoAcAE/sddefault.jpg",
                  "uploadDate": "2025-06-29T10:00:00+02:00",
                  "duration": "PT1M14S",
                  "embedUrl": "https://www.youtube.com/embed/4VRNBAoAcAE",
                  "contentUrl": "https://www.youtube.com/watch?v=4VRNBAoAcAE",
                  "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "https://novahypnose.fr/#about"
                  },
                  "inLanguage": "fr-FR",
                  "potentialAction": {
                    "@type": "WatchAction",
                    "target": "https://www.youtube.com/watch?v=4VRNBAoAcAE"
                  },
                  "keywords": ["hypnose", "hypnothérapie", "Paris", "Alain Zenatti", "maître hypnologue"],
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
