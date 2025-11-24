/**
 * Hero Carousel Section - Section d'accueil avec carousel de vidéos
 * Extrait de src/pages/Index.tsx pour améliorer la maintenabilité et les performances
 */

import React, { useState, useEffect } from 'react';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';
import { getResponsiveSrcSet } from '@/lib/utils/imagekit';
import { getCarouselImageSrcSet } from '@/lib/utils/supabaseImageTransform';
import { carouselSlides, type CarouselSlide } from '@/data/carouselSlides';

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFirstVideoPoster, setShowFirstVideoPoster] = useState(true);

  // Afficher le poster de la première vidéo pendant 3 secondes, puis basculer sur la vidéo
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFirstVideoPoster(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  // Auto-scroll du carrousel toutes les 4,5 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };

  // Optimisation: N'afficher que 3 slides (précédent, actuel, suivant)
  const shouldRenderSlide = (index: number) => {
    const prev = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    const next = (currentSlide + 1) % carouselSlides.length;
    return index === currentSlide || index === prev || index === next;
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-nova-blue-dark via-nova-blue to-nova-green" style={{ minHeight: '600px', maxHeight: '100vh' }}>
      {/* Carrousel d'images/vidéos - visible immédiatement */}
      <div className="absolute inset-0">
        {carouselSlides.map((slide, index) => {
          // Lazy rendering: ne rendre que 3 slides
          if (!shouldRenderSlide(index)) return null;

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1800ms] ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {slide.type === 'video' && (index === 0 && showFirstVideoPoster) ? (
                // Pour la première vidéo, afficher d'abord le poster pendant 3 secondes
                (() => {
                  const { src, srcSet, sizes } = getCarouselImageSrcSet(slide.poster);
                  return (
                    <img
                      src={src}
                      srcSet={srcSet}
                      sizes={sizes}
                      alt={slide.alt || `${slide.title} - Hypnothérapie NovaHypnose Paris 4ème`}
                      className="w-full h-full object-cover object-center"
                      style={{ aspectRatio: '16/9' }}
                      width="320"
                      height="180"
                      loading="eager"
                      fetchPriority="high"
                      decoding="sync"
                    />
                  );
                })()
              ) : slide.type === 'video' ? (
                <video
                  ref={(el) => {
                    if (el && index === currentSlide) {
                      el.currentTime = 0;
                      el.play().catch(() => {});
                    }
                  }}
                  src={index === currentSlide ? slide.image : undefined}
                  poster={`${slide.poster}?width=320&quality=40`}
                  className="w-full h-full object-cover object-center"
                  style={{ aspectRatio: '16/9' }}
                  width="320"
                  height="180"
                  muted
                  playsInline
                  preload={index === 0 ? "metadata" : "none"}
                />
              ) : (
                (() => {
                  const { src, srcSet, sizes } = getCarouselImageSrcSet(slide.image);
                  return (
                    <img
                      src={src}
                      srcSet={srcSet}
                      sizes={sizes}
                      alt={slide.alt || `${slide.title} - Hypnothérapie NovaHypnose Paris 4ème`}
                      className="w-full h-full object-cover object-center"
                      style={{ aspectRatio: '16/9' }}
                      width="320"
                      height="180"
                      loading={index === 0 ? "eager" : "lazy"}
                      fetchPriority={index === 0 ? "high" : "low"}
                      decoding={index === 0 ? "sync" : "async"}
                    />
                  );
                })()
              )}
            </div>
          );
        })}
        {/* Gradient overlay constant - renforcé sur mobile pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent md:bg-gradient-to-r md:from-nova-blue-dark/40 md:via-nova-blue-dark/20 md:to-transparent pointer-events-none"></div>
      </div>

      {/* Conteneur de texte positionné en absolu pour éviter layout shift */}
      <div className="absolute bottom-20 md:bottom-24 left-0 right-0 z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl w-full">
            {/* H1 masqué pour le SEO uniquement */}
            <h1 className="sr-only">Hypnothérapeute à Paris - Hypnose ericksonienne - Alain Zenatti</h1>

            {/* Contenu visuel dynamique du carrousel - hauteur fixe pour stabilité */}
            <div className="relative h-[240px] sm:h-[220px] md:h-[280px] lg:h-[320px]">
              {carouselSlides.map((slide, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="text-2xl sm:text-3xl md:text-4xl lg:text-7xl font-bold text-white mb-2 md:mb-4 leading-tight drop-shadow-lg">
                    {slide.title}
                  </div>
                  <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-white/95 leading-relaxed drop-shadow-md">
                    {slide.description}
                  </p>
                </div>
              ))}
            </div>
            {/* CTA visibles sur mobile - CRITIQUE pour conversion */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-nova-green hover:bg-nova-green-dark text-white rounded-lg text-sm font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar size={18} />
                Prendre rendez-vous
              </a>
              <a
                href="#applications"
                className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20 rounded-lg text-sm font-semibold transition-all text-center"
              >
                Découvrir comment je peux vous aider
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Boutons de navigation du carrousel - très discrets */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full transition-all"
          aria-label="Slide précédent"
        >
          <ChevronLeft className="text-white" size={16} />
        </button>

        {/* Indicateurs de pagination */}
        <div className="flex gap-1.5">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-white w-4'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full transition-all"
          aria-label="Slide suivant"
        >
          <ChevronRight className="text-white" size={16} />
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
