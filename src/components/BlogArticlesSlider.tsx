 import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import Clock from 'lucide-react/dist/esm/icons/clock';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import { logger } from '@/lib/logger';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  image_url?: string;
  slug: string;
  published_at?: string;
  created_at: string;
  categories?: string[];
  read_time?: number;
}

const BlogArticlesSlider: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Configuration Supabase via variables d'environnement
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const AUTOPLAY_DELAY = 5000;

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        logger.debug('Recuperation automatique des articles...');
        
        // ✅ Appel direct à Supabase depuis novahypnose.fr
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/articles?published=eq.true&order=published_at.desc,created_at.desc&limit=6`,
          {
            headers: {
              'apikey': SUPABASE_ANON_KEY,
              'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        logger.debug('Articles recuperes automatiquement:', data.length);
        
        // ✅ Transformer les données pour le slider
        const transformedArticles = data.map((article: BlogArticle) => ({
          id: article.id,
          title: article.title,
          excerpt: article.excerpt,
          image_url: article.image_url,
          slug: article.slug,
          published_at: article.published_at || article.created_at,
          created_at: article.created_at,
          categories: article.categories,
          read_time: article.read_time
        }));
        
        setArticles(transformedArticles);
        logger.debug('Articles transformes:', transformedArticles.length);
        
      } catch (err) {
        logger.error('Erreur recuperation automatique:', err);
        setError('Impossible de charger les articles du blog');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestArticles();
  }, []);

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying || articles.length <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= articles.length - 1 ? 0 : prevIndex + 1
      );
    }, AUTOPLAY_DELAY);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, articles.length]);

  // Navigation functions...
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    const newIndex = currentIndex <= 0 ? articles.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex >= articles.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isAutoPlaying && articles.length > 1) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= articles.length - 1 ? 0 : prevIndex + 1
        );
      }, AUTOPLAY_DELAY);
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Émergences – Hypnose Paris : explorez, transformez-vous
            </h2>
            <div className="animate-pulse">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/2">
                    <div className="h-64 bg-gray-200 rounded-xl"></div>
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || articles.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Émergences – Hypnose Paris : explorez, transformez-vous
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              {error || 'Aucun article disponible pour le moment'}
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Visiter le blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête SEO optimisée */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Émergences – Hypnose Paris : explorez, transformez-vous
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez Émergences, le blog d'hypnose thérapeutique à Paris : articles sur les peurs, la transformation intérieure, l'inconscient et le mieux-être.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative max-w-6xl mx-auto"
          role="region"
          aria-roledescription="carousel"
          aria-label="Articles du blog"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); goToPrevious(); }
            if (e.key === 'ArrowRight') { e.preventDefault(); goToNext(); }
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={sliderRef}
        >
          {/* Article principal */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/2 flex items-center">
                {currentArticle.image_url ? (
                  <img
                    src={currentArticle.image_url}
                    alt={`Article hypnothérapie - ${currentArticle.title}`}
                    className="w-full h-64 lg:h-96 object-cover rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none"
                    width="600"
                    height="400"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center rounded-l-2xl lg:rounded-l-2xl lg:rounded-r-none">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">NovaHypnose</h3>
                      <p className="text-purple-100">Blog Émergences</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                {/* Métadonnées */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <time>{formatDate(currentArticle.published_at || currentArticle.created_at)}</time>
                  </div>
                  {currentArticle.read_time && (
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{currentArticle.read_time} min de lecture</span>
                    </div>
                  )}
                  {currentArticle.categories?.[0] && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">
                      {currentArticle.categories[0]}
                    </span>
                  )}
                </div>

                {/* Titre */}
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight" itemProp="headline">
                  {currentArticle.title}
                </h3>

                {/* Extrait */}
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {currentArticle.excerpt || 'Découvrez cet article sur l\'hypnothérapie et le bien-être...'}
                </p>

                {/* CTA */}
                <Link
                  to={`/blog/article/${currentArticle.slug}`}
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium w-fit group"
                >
                  Lire l'article
                </Link>
              </div>
            </div>
          </div>

          {/* Contrôles de navigation */}
          {articles.length > 1 && (
            <>
              {/* Boutons précédent/suivant */}
              <button
                onClick={goToPrevious}
                className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-2.5 sm:p-3 rounded-full shadow-lg border-2 border-gray-300 transition-all duration-300 hover:scale-105 z-30 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Article précédent"
              >
                <ChevronLeft size={18} className="sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-gray-700 p-2.5 sm:p-3 rounded-full shadow-lg border-2 border-gray-300 transition-all duration-300 hover:scale-105 z-30 min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Article suivant"
              >
                <ChevronRight size={18} className="sm:w-6 sm:h-6" />
              </button>

              {/* Indicateurs */}
              <div className="flex justify-center gap-0 mt-6">
                {articles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label={`Aller à l'article ${index + 1}`}
                  >
                    <span className={`block w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'bg-purple-600 scale-125'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }`} />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA vers le blog */}
        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium"
          >
            Voir tous les articles du blog
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogArticlesSlider;
