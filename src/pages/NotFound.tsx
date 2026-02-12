import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Search from 'lucide-react/dist/esm/icons/search';
import Home from 'lucide-react/dist/esm/icons/home';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Mail from 'lucide-react/dist/esm/icons/mail';

const NotFound = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Page non trouvée | NovaHypnose - Cabinet d'hypnothérapie Paris 4</title>
        <meta name="description" content="Cette page est introuvable, mais mon cabinet d'hypnothérapie à Paris 4 est bien actif. Retrouvez mes services d'hypnose pour stress, sommeil, phobies." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow bg-gradient-to-br from-blue-50 to-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* 404 Number */}
              <div className="mb-8">
                <h1 className="text-9xl font-bold text-blue-600/20">404</h1>
              </div>

              {/* Main Message */}
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Page introuvable
              </h2>

            <p className="text-xl text-gray-600 mb-4">
              Pas de stress, respirez profondément... La page que vous recherchez n'est malheureusement pas disponible.
            </p>

            <p className="text-lg text-gray-600 mb-12">
              Mon cabinet d'hypnothérapie à Paris 4 est bien actif, mais cette page spécifique est introuvable.
            </p>

            {/* Search Box */}
            <div className="mb-12">
              <form onSubmit={handleSearch} className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Rechercher sur le site..."
                    className="w-full px-6 py-4 rounded-full border-2 border-blue-200 focus:border-blue-500 focus:outline-none text-lg pr-14"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-colors"
                    aria-label="Rechercher"
                  >
                    <Search size={20} />
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Links Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Pages principales */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Pages principales</h3>
                <ul className="space-y-3 text-left">
                  <li>
                    <Link to="/" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
                      <Home size={18} />
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <a href="/#about" className="text-blue-600 hover:text-blue-700">
                      À propos
                    </a>
                  </li>
                  <li>
                    <a href="/#applications" className="text-blue-600 hover:text-blue-700">
                      Services d'hypnothérapie
                    </a>
                  </li>
                  <li>
                    <a href="/#tarifs" className="text-blue-600 hover:text-blue-700">
                      Nos tarifs
                    </a>
                  </li>
                  <li>
                    <a href="/#contact" className="text-blue-600 hover:text-blue-700">
                      Nous contacter
                    </a>
                  </li>
                  <li>
                    <Link to="/blog" className="text-blue-600 hover:text-blue-700">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link to="/autohypnose" className="text-blue-600 hover:text-blue-700">
                      Auto-hypnose
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Problèmes traités */}
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Problèmes traités</h3>
                <ul className="space-y-3 text-left">
                  <li>
                    <a href="/#applications" className="text-blue-600 hover:text-blue-700">
                      Stress et anxiété
                    </a>
                  </li>
                  <li>
                    <a href="/#applications" className="text-blue-600 hover:text-blue-700">
                      Troubles du sommeil
                    </a>
                  </li>
                  <li>
                    <a href="/#applications" className="text-blue-600 hover:text-blue-700">
                      Phobies
                    </a>
                  </li>
                  <li>
                    <a href="/peurdelavion.html" className="text-blue-600 hover:text-blue-700">
                      Peur de l'avion
                    </a>
                  </li>
                  <li>
                    <a href="/#applications" className="text-blue-600 hover:text-blue-700">
                      Confiance en soi
                    </a>
                  </li>
                  <li>
                    <a href="/#applications" className="text-blue-600 hover:text-blue-700">
                      Gestion du poids
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Besoin d'aide ou d'un rendez-vous ?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <a
                  href="tel:0649358089"
                  className="flex items-center gap-2 text-xl font-semibold hover:text-blue-200 transition-colors"
                >
                  <Phone size={24} />
                  06 49 35 80 89
                </a>
                <a
                  href="mailto:contact@novahypnose.fr"
                  className="flex items-center gap-2 hover:text-blue-200 transition-colors"
                >
                  <Mail size={20} />
                  contact@novahypnose.fr
                </a>
              </div>
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
              >
                <Calendar size={20} />
                Prendre rendez-vous
              </a>
            </div>

            {/* Quote */}
            <div className="mt-12">
              <p className="text-lg italic text-gray-600">
                "Laissez-vous guider vers une autre page, en toute sérénité..."
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
    </>
  );
};

export default NotFound;
