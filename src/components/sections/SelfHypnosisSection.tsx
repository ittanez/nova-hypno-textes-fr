/**
 * SelfHypnosisSection Component
 * Teaser homepage vers la page dédiée /autohypnose (formation) : ne doit pas
 * dupliquer son balisage (H2/H3/H4, angles stress/sommeil/confiance) pour
 * éviter la cannibalisation SEO entre la homepage et la page de formation.
 */

import React from 'react';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';

const SelfHypnosisSection: React.FC = () => {
  return (
    <section id="self-hypnosis" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Envie d'aller plus loin ? Apprenez l'auto-hypnose
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <p className="text-gray-700 mb-4 leading-relaxed">
              L'auto-hypnose vous permet de prolonger et d'approfondir les bienfaits des séances
              en cabinet, en toute autonomie.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Je propose une formation dédiée à Paris pour apprendre des techniques simples
              et efficaces, adaptées à vos besoins.
            </p>

            <a
              href="https://novahypnose.fr/autohypnose"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <BookOpen size={24} />
              Découvrez la formation auto-hypnose à Paris
            </a>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/AUTOHYPNOSE_novahypnose.webp"
                alt="Formation auto-hypnose Paris - Apprendre l'auto-hypnose pour gérer le stress, l'anxiété et améliorer le sommeil"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-blue-500 p-6 rounded-full shadow-lg">
              <Sparkles className="text-white" size={32} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfHypnosisSection;
