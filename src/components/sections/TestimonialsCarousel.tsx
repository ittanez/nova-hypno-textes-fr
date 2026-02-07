/**
 * TestimonialsCarousel Component
 * Carousel de témoignages clients avec note 5/5
 * Grid en desktop, carousel en mobile avec navigation
 */

import React, { useState } from 'react';
import Star from 'lucide-react/dist/esm/icons/star';
import ChevronLeft from 'lucide-react/dist/esm/icons/chevron-left';
import ChevronRight from 'lucide-react/dist/esm/icons/chevron-right';

interface Testimonial {
  name: string;
  date: string;
  text: string;
}

// Témoignages recommandés : 2-3 maximum (source : "Design web pour hypnothérapeutes 2024-2025")
const testimonials: Testimonial[] = [
  {
    name: 'Edward',
    date: 'il y a 2 mois',
    text: '"Découvrir NovaHypnose est une expérience marquante. Alain propose de véritables parcours de transformation. J\'ai laissé derrière moi certaines croyances figées et ouvert un espace intérieur plus libre."'
  },
  {
    name: 'Marie',
    date: 'il y a 3 mois',
    text: '"J\'ai consulté pour un problème d\'anxiété. Dès la première séance je me suis sentie apaisée. Mon anxiété a totalement disparu en 3 séances. Je recommande vivement."'
  },
  {
    name: 'Philippe',
    date: 'il y a 3 mois',
    text: '"Un praticien calme et réfléchi. En quelques séances, j\'ai pu me libérer de certains blocages et entamer des changements pérennes. Merci pour cette évolution importante."'
  }
];

const TestimonialsCarousel: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState<number>(0);

  return (
    <section id="temoignages" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce que disent mes clients
          </h2>
          <div className="flex justify-center items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={32}
                className="text-yellow-400 fill-yellow-400 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <p className="text-xl text-gray-600">
            Note moyenne de 5/5 sur Google My Business & Resalib
          </p>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                {testimonial.text}
              </p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
              <p className="text-sm text-gray-500">{testimonial.date}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Carousel */}
        <div
          className="md:hidden relative max-w-lg mx-auto pb-12"
          role="region"
          aria-roledescription="carousel"
          aria-label="Témoignages clients"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1); }
          }}
        >
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="min-w-full px-2">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      {testimonial.text}
                    </p>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation en bas */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center gap-1">
            <button
              onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="bg-white/60 hover:bg-white/80 p-2.5 rounded-full shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="text-blue-500" size={18} />
            </button>

            <div className="flex gap-0">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label={`Témoignage ${index + 1}`}
                >
                  <span className={`block h-2 rounded-full transition-all ${
                    currentTestimonial === index ? 'w-5 bg-blue-500' : 'w-2 bg-gray-500'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentTestimonial(prev => prev === testimonials.length - 1 ? 0 : prev + 1)}
              className="bg-white/60 hover:bg-white/80 p-2.5 rounded-full shadow-sm min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="text-blue-500" size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
