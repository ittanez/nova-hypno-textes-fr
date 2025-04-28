
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-nova-blue-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="font-serif text-xl">NovaHypnose</p>
            <p className="text-sm text-gray-300">Hypnothérapie avec Alain Zenatti</p>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm">© {currentYear} NovaHypnose - Tous droits réservés</p>
            <p className="text-xs text-gray-300 mt-1">
              <a href="#" className="hover:underline">Mentions légales</a> | 
              <a href="#" className="hover:underline ml-2">Politique de confidentialité</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
