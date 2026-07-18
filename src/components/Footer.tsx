
import React from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Link } from 'react-router-dom';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Linkedin from 'lucide-react/dist/esm/icons/linkedin';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

const Footer = () => {
  const { openResalibPopup } = useResalibPopup();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-nova-blue-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Première colonne: A propos */}
          <div>
            <h3 className="font-serif text-xl mb-4">À propos de NovaHypnose</h3>
            <p className="text-sm text-gray-300 mb-4">
              Cabinet d'hypnothérapie à Paris 4ème et consultations en visio partout en France,
              spécialisé en hypnose ericksonienne. Alain Zenatti vous accompagne pour retrouver
              confiance, équilibre et vitalité.
            </p>
            <div className="flex items-center mt-3 space-x-4">
              <a
                href="https://www.instagram.com/novahypnose/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-white hover:text-nova-blue-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/zenatti/"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-white hover:text-nova-blue-light transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://hypno-balade.novahypnose.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-nova-blue-light transition-colors flex items-center gap-1 text-sm"
                aria-label="Hypno Balade"
              >
                <MapPin size={18} />
                <span>Hypno Balade</span>
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
                rel="noopener noreferrer nofollow"
                className="inline-block hover:opacity-80 transition-opacity"
                aria-label="Télécharger NovaRespire sur Google Play"
              >
                <img
                  src="/google-play-badge-fr.png"
                  alt="Disponible sur Google Play"
                  className="h-12 w-auto"
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
                <Link to="/#about" className="text-gray-300 hover:text-white transition-colors block">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/#applications" className="text-gray-300 hover:text-white transition-colors block">
                  Applications
                </Link>
              </li>
              <li>
                <Link to="/#self-hypnosis" className="text-gray-300 hover:text-white transition-colors block">
                  Auto-hypnose
                </Link>
              </li>
              <li>
                <Link to="/#sessions" className="text-gray-300 hover:text-white transition-colors block">
                  Déroulement des séances
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-300 hover:text-white transition-colors block">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="text-gray-300 hover:text-white transition-colors block">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/#contact" className="text-gray-300 hover:text-white transition-colors block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Troisième colonne: Spécialités */}
          <div>
            <h3 className="font-serif text-xl mb-4">Spécialités</h3>
            <ul className="space-y-2">
              <li><Link to="/hypnose-stress-anxiete-paris" className="text-gray-300 hover:text-white transition-colors">Stress et anxiété</Link></li>
              <li><Link to="/hypnose-phobies-paris" className="text-gray-300 hover:text-white transition-colors">Phobies et peurs</Link></li>
              <li><Link to="/hypnose-sommeil-paris" className="text-gray-300 hover:text-white transition-colors">Troubles du sommeil</Link></li>
              <li><Link to="/hypnose-gestion-emotions-paris" className="text-gray-300 hover:text-white transition-colors">Gestion des émotions</Link></li>
              <li><Link to="/hypnose-deuil-paris" className="text-gray-300 hover:text-white transition-colors">Deuil et séparation</Link></li>
              <li><Link to="/hypnose-traumatismes-paris" className="text-gray-300 hover:text-white transition-colors">Traumatismes</Link></li>
              <li><Link to="/hypnose-blocages-paris" className="text-gray-300 hover:text-white transition-colors">Blocages et comportements</Link></li>
              <li><Link to="/hypnose-confiance-en-soi-paris" className="text-gray-300 hover:text-white transition-colors">Confiance en soi</Link></li>
              <li><Link to="/hypnose-en-ligne" className="text-gray-300 hover:text-white transition-colors">Hypnose en ligne (visio)</Link></li>
            </ul>
          </div>
          
          {/* Quatrième colonne: Contact */}
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <p className="text-sm mb-1">16 rue Saint-Antoine, 75004 Paris</p>
            <p className="text-sm mb-1">Quartier le Marais - Bastille</p>
            <a href="tel:0649358089" className="text-sm text-gray-300 hover:text-white block mb-1" aria-label="Appeler le 06 49 35 80 89">06 49 35 80 89</a>
            <a href="mailto:contact@novahypnose.fr" className="text-sm text-gray-300 hover:text-white block mb-3" aria-label="Envoyer un email à contact@novahypnose.fr">contact@novahypnose.fr</a>

            <Link to="/mentions-legales" className="text-sm text-gray-300 hover:text-white block mb-4">Mentions légales</Link>

            <div className="mt-2">
              <a
                href="https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
                onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
                aria-label="Prendre rendez-vous sur Resalib (nouvel onglet)"
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
