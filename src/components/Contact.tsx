
import React from 'react';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import LazyCommuteMap from './LazyCommuteMap';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-nova-neutral">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">Informations de contact</h2>
        
        <div className="max-w-lg mx-auto mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="/cabinet.webp"
              srcSet="/cabinet.webp 1x, /cabinet.webp 2x"
              sizes="(max-width: 768px) 100vw, 512px"
              alt="Consultation hypnothérapie Paris 4ème - Accueil bienveillant cabinet hypnose Marais Bastille" 
              className="w-full h-auto"
              loading="lazy"
              width="512"
              height="384"
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-nova-blue-dark mb-6 text-center">Alain Zenatti Hypnothérapeute Paris</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="text-nova-blue mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-700">Téléphone</p>
                    <a href="tel:0649358089" className="text-nova-blue hover:underline">06 49 35 80 89</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-nova-blue mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-700">Email</p>
                    <a href="mailto:contact@novahypnose.fr" className="text-nova-blue hover:underline">contact@novahypnose.fr</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="text-nova-blue mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-700">Adresse</p>
                    <p>Quartier le Marais - Bastille</p>
                    <p>16 rue St Antoine, 75004 Paris</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Calendar className="text-nova-blue mt-1 mr-4 flex-shrink-0" size={24} />
                  <div>
                    <p className="font-semibold text-gray-700">Réservation en ligne</p>
                    <p className="mb-2">Plateforme sécurisée Resalib</p>
                    <a
                      href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                      className="inline-block px-4 py-2 bg-nova-blue text-white rounded-md hover:bg-nova-blue-dark transition-colors"
                    >
                      Réserver ma séance en ligne
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                      Confirmation immédiate • Créneaux disponibles en ligne
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="md:h-full">
                <LazyCommuteMap />
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="mb-4">Pour obtenir des informations ou poser des questions, je suis à votre disposition.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <a 
                  href="tel:0649358089" 
                  className="px-6 py-3 bg-nova-blue text-white rounded-md shadow hover:bg-nova-blue-dark transition-colors flex items-center justify-center"
                  aria-label="Appeler Alain Zenatti, hypnothérapeute à Paris"
                >
                  <Phone size={18} className="mr-2" />
                  Appeler
                </a>
                <a 
                  href="mailto:contact@novahypnose.fr" 
                  className="px-6 py-3 border-2 border-nova-blue text-nova-blue rounded-md hover:bg-nova-blue hover:text-white transition-colors flex items-center justify-center"
                  aria-label="Envoyer un email à Alain Zenatti, hypnothérapeute à Paris"
                >
                  <Mail size={18} className="mr-2" />
                  Envoyer un email
                </a>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-lg font-semibold text-nova-blue-dark mb-2">Application mobile NovaRespire</h4>
                <p className="mb-4 text-sm text-gray-600">
                  Complétez vos séances avec NovaRespire, l'application mobile qui vous propose des techniques de respiration et exercices de relaxation pour gérer le stress et l'anxiété au quotidien. Créée par Alain Zenatti, elle vous accompagne où que vous soyez.
                </p>
                <a 
                  href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block hover:opacity-80 transition-opacity"
                  aria-label="Télécharger NovaRespire sur Google Play"
                >
                  <img
                    src="https://play.google.com/intl/en_us/badges/static/images/badges/fr_badge_web_generic.png"
                    alt="Disponible sur Google Play"
                    className="h-14 mx-auto"
                    loading="lazy"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
