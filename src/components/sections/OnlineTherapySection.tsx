/**
 * OnlineTherapySection - Bandeau + section "Consultations en visio, partout en France"
 * Met en avant la pratique nationale en visioconférence en complément du cabinet Paris 4ème.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import Video from 'lucide-react/dist/esm/icons/video';
import Globe from 'lucide-react/dist/esm/icons/globe';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Users from 'lucide-react/dist/esm/icons/users';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const OnlineTherapySection: React.FC = () => {
  const { openResalibPopup } = useResalibPopup();

  return (
    <section
      id="hypnose-en-ligne"
      className="py-16 bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-green text-white"
      aria-labelledby="online-therapy-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 bg-white/15 rounded-full text-sm font-semibold backdrop-blur-sm">
              <Video size={16} /> Consultations en visio — partout en France
            </div>
            <h2 id="online-therapy-heading" className="text-2xl md:text-4xl font-bold mb-4">
              Pas à Paris ? Consultez en visioconférence, où que vous soyez
            </h2>
            <p className="text-lg text-white/90 leading-relaxed max-w-3xl mx-auto">
              L'hypnose en ligne est <strong>aussi efficace qu'au cabinet</strong> : la séance passe
              par la voix et la relation, qui se transmettent parfaitement en visio. Que vous soyez à
              Lyon, Marseille, Bordeaux, en zone rurale ou à l'étranger, profitez du même
              accompagnement, sans aucun déplacement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15">
              <Globe className="mb-3" size={28} />
              <h3 className="text-lg font-bold mb-2">Partout en France</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Métropole, DOM-TOM et Français de l'étranger : un simple lien Google Meet suffit.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15">
              <Users className="mb-3" size={28} />
              <h3 className="text-lg font-bold mb-2">Pour qui ?</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Éloigné de Paris, emploi du temps chargé, mobilité réduite ou préférence pour le
                confort de chez soi.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/15">
              <Sparkles className="mb-3" size={28} />
              <h3 className="text-lg font-bold mb-2">Mêmes résultats</h3>
              <p className="text-white/85 text-sm leading-relaxed">
                Stress, sommeil, confiance, phobies, émotions… des résultats concrets en 3 à 5
                séances, comme en présentiel.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
              onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
              aria-label="Réserver une séance d'hypnose en visio sur Resalib (nouvel onglet)"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-nova-orange hover:bg-nova-orange-dark text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              <Calendar size={22} />
              Réserver ma séance en visio
            </a>
            <Link
              to="/hypnose-en-ligne"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 rounded-lg font-semibold transition-all"
            >
              En savoir plus sur la visio <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OnlineTherapySection;
