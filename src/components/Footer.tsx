
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nova-blue-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <p className="font-serif text-xl">NovaHypnose</p>
            <p className="text-sm text-gray-300">Hypnothérapie avec Alain Zenatti</p>
            
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
          
          <div className="text-center mb-6 md:mb-0 md:text-left">
            <p className="text-sm mb-1">16 rue St Antoine, 75004 Paris</p>
            <a href="tel:0649358089" className="text-sm text-gray-300 hover:text-white block mb-1">06 49 35 80 89</a>
            <a href="mailto:contact@novahypnose.fr" className="text-sm text-gray-300 hover:text-white">contact@novahypnose.fr</a>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">© {currentYear} NovaHypnose - Tous droits réservés</p>
            <p className="text-xs text-gray-300 mt-1">
              <Link to="/mentions-legales" className="hover:underline">Mentions légales</Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
