import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Clock, Calendar } from 'lucide-react';

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

  // Configuration
  const BLOG_URL = 'https://emergence-blog-scribe.lovable.app';
const API_URL = `https://emergences.novahypnose.fr/api/latest-articles.json`;
  const AUTOPLAY_DELAY = 5000; // 5 secondes

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des articles');
        }

        const data = await response.json();
        
        if (data.success && data.data?.articles) {
          setArticles(data.data.articles);
        } else {
          throw new Error(data.error || 'Aucun article trouvé');
        }
      } catch (err) {
        setError('Impossible de charger les articles du blog');
        console.error('Erreur articles blog:', err);
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

  // Navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000); // Reprendre auto-play après 10s
  };

  const goToPrevious = () => {
    const newIndex = currentIndex <= 0 ? articles.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex >= articles.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  // Formatage date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  // Pause auto-play au survol
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
              Derniers articles du blog
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
            Derniers articles du blog
          </h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <p className="text-gray-600 mb-6">
              {error || 'Aucun article disponible pour le moment'}
            </p>
            <a 
              href={BLOG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Visiter le blog
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>
    );
  }

  const currentArticle = articles[currentIndex];

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Derniers articles du blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos dernières réflexions sur l'hypnothérapie, la transformation intérieure et le bien-être
          </p>
        </div>

        {/* Slider */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          ref={sliderRef}
        >
          {/* Article principal */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="lg:w-1/2">
                {currentArticle.image_url ? (
                  <img 
                    src={currentArticle.image_url} 
                    alt={currentArticle.title}
                    className="w-full h-64 lg:h-96 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 lg:h-96 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
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
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                  {currentArticle.title}
                </h3>

                {/* Extrait */}
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {currentArticle.excerpt || 'Découvrez cet article sur l\'hypnothérapie et le bien-être...'}
                </p>

                {/* CTA */}
                <a 
                  href={`${BLOG_URL}/article/${currentArticle.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 font-medium w-fit group"
                >
                  Lire l'article
                  <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>

          {/* Contrôles de navigation */}
          {articles.length > 1 && (
            <>
              {/* Boutons précédent/suivant */}
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Article précédent"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
                aria-label="Article suivant"
              >
                <ChevronRight size={24} />
              </button>

              {/* Indicateurs */}
              <div className="flex justify-center gap-2 mt-6">
                {articles.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-purple-600 scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Aller à l'article ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* CTA vers le blog */}
        <div className="text-center mt-12">
          <a 
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg hover:bg-purple-600 hover:text-white transition-all duration-300 font-medium"
          >
            Voir tous les articles du blog
            <ExternalLink size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlogArticlesSlider;
