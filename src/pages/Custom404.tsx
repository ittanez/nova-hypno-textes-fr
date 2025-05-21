
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, Phone } from 'lucide-react';
import ContentLayout from '../components/layout/ContentLayout';
import { useSeoMetadata } from '../hooks/useSeoMetadata';

const Custom404 = () => {
  // SEO pour la page 404
  useSeoMetadata({
    title: 'Page non trouvée | NovaHypnose - Cabinet d'hypnothérapie Paris 4',
    description: 'Cette page est introuvable, mais notre cabinet d\'hypnothérapie à Paris 4 est bien actif. Retrouvez nos services d\'hypnose pour stress, sommeil, phobies.',
    canonicalUrl: 'https://novahypnose.fr/404'
  });

  return (
    <ContentLayout>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-3xl w-full text-center bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg">
          <h1 className="text-5xl text-nova-blue-dark mb-4 font-serif">404</h1>
          
          <h2 className="text-2xl font-serif text-nova-blue mb-6">
            Page introuvable
          </h2>
          
          <div className="mb-8 bg-accent/30 p-6 rounded-lg">
            <p className="text-lg mb-4">
              <span className="font-medium text-nova-blue-dark">Pas de stress, respirez profondément...</span> La page que vous recherchez n'est malheureusement pas disponible.
            </p>
            <p className="text-gray-700">
              Notre cabinet d'hypnothérapie à Paris 4 est bien actif, mais cette page spécifique est introuvable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl text-nova-blue-dark mb-3">Pages principales</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-nova-blue hover:underline flex items-center"><ArrowLeft className="w-4 h-4 mr-2" /> Accueil</Link></li>
                <li><Link to="/#applications" className="text-nova-blue hover:underline">Services d'hypnothérapie</Link></li>
                <li><Link to="/#pricing" className="text-nova-blue hover:underline">Nos tarifs</Link></li>
                <li><Link to="/#contact" className="text-nova-blue hover:underline">Nous contacter</Link></li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl text-nova-blue-dark mb-3">Problèmes traités</h3>
              <ul className="space-y-2">
                <li><Link to="/#applications" className="text-nova-blue hover:underline">Stress et anxiété</Link></li>
                <li><Link to="/#applications" className="text-nova-blue hover:underline">Troubles du sommeil</Link></li>
                <li><Link to="/#applications" className="text-nova-blue hover:underline">Phobies</Link></li>
                <li><Link to="/#applications" className="text-nova-blue hover:underline">Confiance en soi</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-center items-center gap-2">
              <div className="relative flex items-center max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Rechercher sur le site..." 
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-nova-blue"
                />
                <button className="bg-nova-blue hover:bg-nova-blue-dark text-white px-6 py-3 rounded-r-lg transition-colors">
                  Rechercher
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-lg mb-4">Besoin d'aide ou d'un rendez-vous ?</p>
            <a 
              href="tel:+33649358089" 
              className="inline-flex items-center bg-nova-green hover:bg-nova-green-dark text-white px-6 py-3 rounded-full transition-colors shadow-md font-medium text-lg"
            >
              <Phone className="mr-2" size={20} />
              06 49 35 80 89
            </a>
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-lg font-medium text-nova-blue-dark italic">
              "Laissez-vous guider vers une autre page, en toute sérénité..."
            </p>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default Custom404;
