/**
 * ContactSection Component
 * Section de contact avec informations de contact et carte interactive
 * Inclut également la promotion de l'application mobile NovaRespire
 */

import React from 'react';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Clock from 'lucide-react/dist/esm/icons/clock';
import CommuteMap from '@/components/CommuteMap';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6">
                Contactez-moi
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Vous avez des questions ? N'hésitez pas à me contacter.
                Je suis là pour vous accompagner dans votre démarche.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Téléphone</p>
                    <a href="tel:0649358089" className="text-blue-600 hover:underline text-lg">
                      06 49 35 80 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Email</p>
                    <a href="mailto:contact@novahypnose.fr" className="text-blue-600 hover:underline text-lg">
                      contact@novahypnose.fr
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Adresse</p>
                    <p className="text-gray-600 text-lg">
                      16 rue St Antoine<br />
                      75004 Paris (Marais - Bastille)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-blue-500" size={24} />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Horaires</p>
                    <p className="text-gray-600 text-lg">
                      Lun - Ven : 11h - 20h<br />
                      Sur rendez-vous uniquement
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <CommuteMap />
            </div>
          </div>

          {/* Application mobile NovaRespire */}
          <div className="mt-16 border-t border-gray-200 pt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Application mobile NovaRespire</h3>
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto leading-relaxed">
              Complétez vos séances avec NovaRespire, l'application mobile qui vous propose des techniques de respiration et exercices de relaxation pour gérer le stress et l'anxiété au quotidien. Créée par Alain Zenatti, elle vous accompagne où que vous soyez.
            </p>
            <div className="text-center">
              <a
                href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Télécharger NovaRespire sur Google Play"
              >
                <img
                  src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
                  alt="Disponible sur Google Play"
                  className="h-16 mx-auto w-auto object-contain"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
