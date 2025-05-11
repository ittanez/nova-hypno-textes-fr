
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../ScrollToTop';

const BlogHypnoseLayout = () => {
  return (
    <>
      <Helmet>
        <title>BlogHypnose - NovaHypnose</title>
        <meta name="description" content="Blog spécialisé sur l'hypnose et le développement personnel - NovaHypnose" />
        {/* Durant la phase de développement, on cache le blog des moteurs de recherche */}
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* En-tête spécifique au blog */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-nova-blue mb-4 md:mb-0">
                <a href="/bloghypnose" className="hover:opacity-80 transition-opacity">
                  BlogHypnose
                </a>
              </h1>
              
              <nav className="w-full md:w-auto">
                <ul className="flex flex-wrap justify-center space-x-1 md:space-x-6">
                  <li>
                    <a 
                      href="/bloghypnose" 
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-nova-blue transition-colors"
                    >
                      Accueil
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/bloghypnose/categories" 
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-nova-blue transition-colors"
                    >
                      Catégories
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/bloghypnose/tags" 
                      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-nova-blue transition-colors"
                    >
                      Tags
                    </a>
                  </li>
                  <li>
                    <a 
                      href="/" 
                      className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-nova-blue transition-colors"
                    >
                      Retour au site
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      
        <main className="container mx-auto px-4 py-8 md:py-12">
          <Outlet />
        </main>
        
        {/* Pied de page spécifique au blog */}
        <footer className="bg-gray-50 border-t border-gray-200 py-6">
          <div className="container mx-auto px-4 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} BlogHypnose - NovaHypnose. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
      
      <ScrollToTop />
    </>
  );
};

export default BlogHypnoseLayout;
