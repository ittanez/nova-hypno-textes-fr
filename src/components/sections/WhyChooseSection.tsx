/**
 * WhyChooseSection Component
 * Section "Pourquoi choisir un hypnothérapeute à Paris qualifié"
 * Met en avant l'expertise, la localisation et l'approche personnalisée
 */

import React from 'react';
import Award from 'lucide-react/dist/esm/icons/award';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Heart from 'lucide-react/dist/esm/icons/heart';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Calendar from 'lucide-react/dist/esm/icons/calendar';

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
            Pourquoi choisir un hypnothérapeute à Paris qualifié ?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Trouver le meilleur hypnothérapeute à Paris est essentiel pour garantir un accompagnement sûr et efficace.
            Voici ce qui fait la différence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Award className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Expertise reconnue
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Maître Hypnologue certifié avec plus de 5 ans d'expérience.
              Formation continue pour garantir les meilleures pratiques.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Hypnose ericksonienne certifiée</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Auto-hypnose et accompagnement personnalisé</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Formation continue en hypnothérapie</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <MapPin className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Localisation idéale à Paris
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cabinet situé au cœur de Paris 4ème, quartier Marais-Bastille, facilement accessible en métro.
              Cadre chaleureux et confidentiel pour vos séances.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Métro Bastille (lignes 1, 5, 8)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Horaires flexibles (11h-20h)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Téléconsultations disponibles</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
            <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Approche personnalisée
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Chaque séance est adaptée à vos besoins spécifiques. Accompagnement bienveillant et sans jugement
              pour un travail en profondeur.
            </p>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Écoute attentive et empathique</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Techniques sur-mesure</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="text-blue-500 flex-shrink-0 mt-0.5" size={16} />
                <span>Résultats durables et mesurables</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-4">
            Note moyenne : 5/5 ⭐⭐⭐⭐⭐
          </h3>
          <p className="text-lg mb-6 text-white/90">
            Basé sur les avis vérifiés de patients accompagnés à Paris et en Île-de-France.
            Spécialiste reconnu pour le traitement du stress, de l'anxiété et des phobies.
          </p>
          <a
            href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all shadow-lg"
          >
            <Calendar size={24} />
            Prendre rendez-vous maintenant
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
