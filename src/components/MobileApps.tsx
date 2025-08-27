import React from 'react';
import { Smartphone, Heart, Waves, Brain } from 'lucide-react';

const MobileApps = () => {
  return (
    <section id="mobile-apps" className="section-padding bg-gradient-to-b from-nova-neutral to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-nova-blue-dark mb-4">Application Mobile</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Prolongez les bienfaits de vos séances d'hypnothérapie avec notre application mobile gratuite dédiée aux techniques de respiration.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Description de l'application */}
              <div>
                <div className="flex items-center mb-4">
                  <Smartphone className="text-nova-blue mr-3" size={32} />
                  <h3 className="text-2xl font-bold text-nova-blue-dark">NovaRespire</h3>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Créée par <strong>Alain Zenatti</strong>, NovaRespire est votre compagnon quotidien <strong>gratuit</strong> pour la gestion du stress et de l'anxiété. 
                  Cette application vous propose une collection d'exercices de respiration guidés basés sur l'hypnothérapie.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <Waves className="text-nova-blue mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Techniques de respiration</h4>
                      <p className="text-sm text-gray-600">Exercices guidés pour retrouver le calme instantanément</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Brain className="text-nova-blue mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Respiration guidée</h4>
                      <p className="text-sm text-gray-600">Techniques variées adaptées à vos besoins du moment</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Heart className="text-nova-blue mt-1 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-800">Bien-être quotidien</h4>
                      <p className="text-sm text-gray-600">Outils pratiques pour gérer stress et anxiété au quotidien</p>
                    </div>
                  </div>
                </div>

                <a 
                  href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block hover:opacity-90 transition-opacity"
                  aria-label="Télécharger NovaRespire sur Google Play"
                >
                  <img 
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
                    alt="Disponible sur Google Play"
                    className="h-16"
                  />
                </a>
              </div>

              {/* Capture d'écran de l'app */}
              <div className="text-center">
                <div className="max-w-sm mx-auto">
                  <img 
                    src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/Screenshot_20250809_102147.png"
                    alt="Interface de l'application NovaRespire - Techniques de respiration"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            * Application <strong>gratuite</strong> disponible sur Android. Version iOS en développement.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MobileApps;