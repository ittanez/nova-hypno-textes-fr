
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nova-blue-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Première colonne: A propos */}
          <div>
            <h3 className="font-serif text-xl mb-4">À propos de NovaHypnose</h3>
            <p className="text-sm text-gray-300 mb-4">
              Cabinet d'hypnothérapie à Paris spécialisé en hypnose ericksonienne. 
              Alain Zenatti vous accompagne pour retrouver confiance, équilibre et vitalité.
            </p>
            <div className="flex items-center mt-3">
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
          </div>
          
          {/* Deuxième colonne: Navigation rapide */}
          <div>
            <h3 className="font-serif text-xl mb-4">Navigation rapide</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors">À propos</a></li>
              <li><a href="#applications" className="text-gray-300 hover:text-white transition-colors">Applications</a></li>
              <li><a href="#self-hypnosis" className="text-gray-300 hover:text-white transition-colors">Auto-hypnose</a></li>
              <li><a href="#sessions" className="text-gray-300 hover:text-white transition-colors">Déroulement des séances</a></li>
              <li><a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Troisième colonne: Contact */}
          <div>
            <h3 className="font-serif text-xl mb-4">Contact</h3>
            <p className="text-sm mb-1">16 rue St Antoine, 75004 Paris</p>
            <p className="text-sm mb-1">Quartier le Marais - Bastille</p>
            <a href="tel:0649358089" className="text-sm text-gray-300 hover:text-white block mb-1">06 49 35 80 89</a>
            <a href="mailto:contact@novahypnose.fr" className="text-sm text-gray-300 hover:text-white">contact@novahypnose.fr</a>
            
            <div className="mt-4">
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
        
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">© {currentYear} NovaHypnose - Tous droits réservés</p>
          <p className="text-xs text-gray-300 mt-2 md:mt-0">
            <Link to="/mentions-legales" className="hover:underline">Mentions légales</Link>
            <span className="mx-2">|</span>
            <Link to="/blog" className="hover:underline">Blog</Link>
            <span className="mx-2">|</span>
            <a href="https://hypno-balade.novahypnose.fr" className="hover:underline" target="_blank" rel="noopener noreferrer">Hypno-Balade</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
