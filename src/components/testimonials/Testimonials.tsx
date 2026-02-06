
import React, { useState } from 'react';
import Star from 'lucide-react/dist/esm/icons/star';
import TestimonialCard from './TestimonialCard';
import TestimonialControls from './TestimonialControls';
import type { Testimonial } from '../../types/testimonial';

// Vrais témoignages clients Google My Business
const testimonials: Testimonial[] = [
  {
    name: "Edward",
    date: "il y a 2 mois",
    text: "Découvrir NovaHypnose et le travail d'Alain Zenatti hypno thérapeute, est une expérience marquante. Alain propose bien plus que des séances, de véritables parcours de transformation conçus pour libérer l'esprit, dépasser les freins invisibles, apaiser les tensions intérieures et renouer avec une forme de clarté personnelle. À travers ses packs de plusieurs séances, j'ai entamé un chemin riche en prises de conscience. J'ai laissé derrière moi certaines croyances figées, des idées préconçues qui conditionnaient mes pensées, et j'ai ouvert un espace intérieur plus souple, plus libre. Me voilà en adéquation avec mon présent et les envies que je croyais inaccessibles.",
    rating: 5
  },
  {
    name: "Marie HERNANDEZ",
    date: "il y a 3 mois",
    text: "J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie apaisée et sereine. Alain est à l'écoute et mon anxiété a totalement disparu en 3 séances. Je recommande vivement",
    rating: 5
  },
  {
    name: "Philippe Audoin",
    date: "il y a 3 mois",
    text: "Mr Zenatti est un praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail, les points d'amélioration, les émotions limitantes, ce qui \"m'encombrait\" dans ma progression. En quelques séances, avec son accompagnement, ses techniques d'hypnose et sa connaissance de la PNL, j'ai pu me libérer de certains blocages et entamer des changements pérennes. Cela m'a fait beaucoup de bien et je le remercie pour cette évolution importante pour moi.",
    rating: 5
  },
  {
    name: "Jaouad Mehdid",
    date: "il y a 3 mois",
    text: "Excellente séance avec Alain qui sait comprendre nos besoins puis faire en sorte que l'on atteigne nos objectifs.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section id="testimonials" className="section-padding bg-nova-blue bg-opacity-5">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-nova-blue-dark mb-4">Témoignages de clients</h2>
        <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
          Voici quelques retours de personnes que j'ai eu le plaisir d'accompagner dans leur démarche de transformation. 
          <br/>
          <span className="text-sm">Plus de témoignages disponibles sur Google My Business et Resalib</span>
        </p>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          <TestimonialControls 
            activeIndex={activeIndex}
            totalSlides={testimonials.length}
            onPrevious={handlePrevious} 
            onNext={handleNext}
            onDotClick={handleDotClick}
          />
        </div>
        
        <div className="mt-16 text-center">
          <div className="inline-flex items-center bg-white px-8 py-4 rounded-lg shadow-md">
            <div className="flex space-x-1 mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-medium">Note moyenne de 5/5 sur Google My Business & la plateforme Resalib</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
