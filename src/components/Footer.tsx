
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Instagram from 'lucide-react/dist/esm/icons/instagram';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === '/') {
      // On est déjà sur la page d'accueil, on scroll juste vers la section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On est sur une autre page, on navigue vers la page d'accueil
      navigate('/');
      // On attend que la navigation soit terminée avant de scroller
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  
  return (
    <footer className="bg-nova-blue-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Première colonne: A propos */}
          <div>
            <h3 className="font-serif text-xl mb-4">À propos de NovaHypnose</h3>
            <p className="text-sm text-gray-300 mb-4">
              Cabinet d'hypnothérapie à Paris spécialisé en hypnose ericksonienne. 
              Alain Zenatti vous accompagne pour retrouver confiance, équilibre et vitalité.
            </p>
            <div className="flex items-center mt-3 space-x-4">
              <a 
                href="https://www.instagram.com/novahypnose/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-nova-blue-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-white mb-2">Application mobile</h4>
              <p className="text-xs text-gray-300 mb-3">
                NovaRespire : votre application de techniques de respiration et relaxation pour gérer stress et anxiété au quotidien.
              </p>
              <a
                href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Télécharger NovaRespire sur Google Play"
              >
                <img
                  src="/google-play-badge-fr.png"
                  alt="Disponible sur Google Play"
                  className="h-12"
                  width={646}
                  height={250}
                />
              </a>
            </div>
          </div>
          
          {/* Deuxième colonne: Navigation rapide */}
          <div>
            <h3 className="font-serif text-xl mb-4">Navigation rapide</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleSectionClick('about')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  À propos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('applications')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('self-hypnosis')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Auto-hypnose
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('sessions')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Déroulement des séances
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('pricing')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Tarifs
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('faq')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-300 hover:text-white transition-colors block"
                >
                  Blog & Actualités
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleSectionClick('contact')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Troisième colonne: Ressources */}
          <div>
            <h3 className="font-serif text-xl mb-4">Ressources</h3>
            <ul className="space-y-2">
              <li><a href="https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">NovaRespire App - Techniques de respiration</a></li>
              <li><a href="https://peur-de-parler-en-public.novahypnose.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Peur de parler en public</a></li>
              <li><a href="https://hypnokick.novahypnose.fr" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Suis-je Hypnotisable ?</a></li>
              <li><a href="https://hypno-balade.novahypnose.fr/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">Hypno Balade</a></li>
            </ul>
          </div>
          
          {/* Quatrième colonne: Contact */}
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <p className="text-sm mb-1">16 rue St Antoine, 75004 Paris</p>
            <p className="text-sm mb-1">Quartier le Marais - Bastille</p>
            <a href="tel:0649358089" className="text-sm text-gray-300 hover:text-white block mb-1">06 49 35 80 89</a>
            <a href="mailto:contact@novahypnose.fr" className="text-sm text-gray-300 hover:text-white block mb-3">contact@novahypnose.fr</a>

            <Link to="/mentions-legales" className="text-sm text-gray-300 hover:text-white block mb-4">Mentions légales</Link>

            <div className="mt-2">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-nova-green text-white rounded-md hover:bg-nova-green-dark transition-colors text-sm inline-block"
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-6 text-center">
          <p className="text-sm">© {currentYear} NovaHypnose - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
