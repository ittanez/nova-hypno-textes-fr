
import React from 'react';
import { Phone, Mail, MapPin, Calendar } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-nova-neutral">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-12">Informations de contact</h2>
        
        <div className="max-w-4xl mx-auto mb-12">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <img 
              src="http://novahypnose.fr/wp-content/uploads/2023/12/lhypnotherapie-une-ecoute-attentive-et-bienveillante.webp"
              alt="Une séance d'hypnothérapie avec Alain Zenatti" 
              className="w-full h-auto"
              loading="lazy"
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
                    <p className="font-semibold text-gray-700">Réservation</p>
                    <p>Via la plateforme Resalib</p>
                    <a 
                      href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block mt-2 px-4 py-2 bg-nova-blue text-white rounded-md hover:bg-nova-blue-dark transition-colors"
                    >
                      Prendre rendez-vous
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="h-64 md:h-full rounded-lg overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.1895883840313!2d2.36441231564579!3d48.85335757928646!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e671fd10fa77a9%3A0x99b8ba789490de09!2s16%20Rue%20Saint-Antoine%2C%2075004%20Paris!5e0!3m2!1sfr!2sfr!4v1650969612695!5m2!1sfr!2sfr" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Cabinet d'Alain Zenatti"
                ></iframe>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="mb-4">Pour obtenir des informations ou poser des questions, je suis à votre disposition.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:0649358089" 
                  className="px-6 py-3 bg-nova-blue text-white rounded-md shadow hover:bg-nova-blue-dark transition-colors flex items-center justify-center"
                >
                  <Phone size={18} className="mr-2" />
                  Appeler
                </a>
                <a 
                  href="mailto:contact@novahypnose.fr" 
                  className="px-6 py-3 border-2 border-nova-blue text-nova-blue rounded-md hover:bg-nova-blue hover:text-white transition-colors flex items-center justify-center"
                >
                  <Mail size={18} className="mr-2" />
                  Envoyer un email
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
