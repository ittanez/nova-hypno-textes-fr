/**
 * SelfHypnosisSection Component
 * Section dédiée à l'auto-hypnose avec lien vers formation Harmonia
 * Présente les bénéfices de l'auto-hypnose pour le stress, sommeil et confiance
 */

import React from 'react';
import BookOpen from 'lucide-react/dist/esm/icons/book-open';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';

const SelfHypnosisSection: React.FC = () => {
  return (
    <section id="self-hypnosis" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          L'auto-hypnose : devenez votre propre thérapeute
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-16">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Pourquoi apprendre l'auto-hypnose ?
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              L'auto-hypnose est une compétence précieuse qui vous permettra de prolonger et d'approfondir
              les bienfaits des séances avec votre hypnothérapeute.
            </p>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Une fois maîtrisée, cette technique devient un outil puissant pour gérer votre stress,
              améliorer votre sommeil, renforcer votre confiance et cultiver un état de bien-être au quotidien.
            </p>
            <p className="text-gray-700 mb-8 leading-relaxed">
              Je vous propose d'apprendre des techniques simples et efficaces, adaptées à vos besoins spécifiques,
              que vous pourrez pratiquer en toute autonomie.
            </p>

            <a
              href="https://novahypnose.fr/autohypnose"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
            >
              <BookOpen size={24} />
              Découvrez la formation Harmonia : réduire le stress avec l'auto-hypnose
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

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Auto-hypnose pour le stress
            </h4>
            <p className="text-gray-600">
              Apprenez à entrer rapidement dans un état de calme profond,
              même au milieu des situations les plus stressantes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Auto-hypnose pour le sommeil
            </h4>
            <p className="text-gray-600">
              Découvrez des techniques puissantes pour améliorer la qualité de votre sommeil
              et installer un rituel apaisant avant de vous coucher.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h4 className="text-xl font-semibold text-gray-900 mb-3">
              Auto-hypnose pour la confiance
            </h4>
            <p className="text-gray-600">
              Renforcez votre estime personnelle grâce à des exercices d'ancrage
              et de visualisation positive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelfHypnosisSection;
