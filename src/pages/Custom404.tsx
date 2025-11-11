
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left';
import Search from 'lucide-react/dist/esm/icons/search';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Home from 'lucide-react/dist/esm/icons/home';
import ContentLayout from '../components/layout/ContentLayout';
import { useSeoMetadata } from '../hooks/useSeoMetadata';

const Custom404 = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // SEO pour la page 404
  useSeoMetadata({
    title: "Page non trouvée | NovaHypnose - Cabinet d'hypnothérapie Paris 4",
    description: "Cette page est introuvable, mais notre cabinet d'hypnothérapie à Paris 4 est bien actif. Retrouvez nos services d'hypnose pour stress, sommeil, phobies.",
    canonicalUrl: 'https://novahypnose.fr/404'
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
                <li><Link to="/" className="text-nova-blue hover:underline flex items-center"><Home className="w-4 h-4 mr-2" /> Accueil</Link></li>
                <li><a href="/#about" className="text-nova-blue hover:underline">À propos</a></li>
                <li><a href="/#applications" className="text-nova-blue hover:underline">Services d'hypnothérapie</a></li>
                <li><a href="/#pricing" className="text-nova-blue hover:underline">Nos tarifs</a></li>
                <li><a href="/#contact" className="text-nova-blue hover:underline">Nous contacter</a></li>
                <li><Link to="/blog" className="text-nova-blue hover:underline">Blog</Link></li>
                <li><Link to="/autohypnose" className="text-nova-blue hover:underline">Auto-hypnose</Link></li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-serif text-xl text-nova-blue-dark mb-3">Problèmes traités</h3>
              <ul className="space-y-2">
                <li><a href="/#applications" className="text-nova-blue hover:underline">Stress et anxiété</a></li>
                <li><a href="/#applications" className="text-nova-blue hover:underline">Troubles du sommeil</a></li>
                <li><a href="/#applications" className="text-nova-blue hover:underline">Phobies</a></li>
                <li><a href="/peurdelavion.html" className="text-nova-blue hover:underline">Peur de l'avion</a></li>
                <li><a href="/#applications" className="text-nova-blue hover:underline">Confiance en soi</a></li>
                <li><a href="/#applications" className="text-nova-blue hover:underline">Gestion du poids</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mb-8">
            <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
              <div className="relative flex items-center max-w-md w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher sur le site..."
                  className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-nova-blue"
                />
                <button type="submit" className="bg-nova-blue hover:bg-nova-blue-dark text-white px-6 py-3 rounded-r-lg transition-colors">
                  Rechercher
                </button>
              </div>
            </form>
          </div>
          
          <div className="text-center bg-nova-blue text-white p-8 rounded-lg">
            <p className="text-xl mb-4 font-semibold">Besoin d'aide ou d'un rendez-vous ?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
              <a
                href="tel:0649358089"
                className="inline-flex items-center hover:text-gray-200 transition-colors text-lg"
              >
                <Phone className="mr-2" size={20} />
                06 49 35 80 89
              </a>
              <a
                href="mailto:contact@novahypnose.fr"
                className="inline-flex items-center hover:text-gray-200 transition-colors"
              >
                <Mail className="mr-2" size={18} />
                contact@novahypnose.fr
              </a>
            </div>
            <a
              href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white text-nova-blue px-6 py-3 rounded-full hover:bg-gray-100 transition-colors shadow-md font-semibold"
            >
              <Calendar className="mr-2" size={20} />
              Prendre rendez-vous
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
