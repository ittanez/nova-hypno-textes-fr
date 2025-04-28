
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  date: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    name: "Edward Achour",
    date: "Il y a 2 semaines",
    text: "Découvrir Nova Hypnose et le travail d'Alain Zenatti est une expérience marquante. Alain propose bien plus que des séances - de véritables parcours de transformation conçus pour libérer l'esprit, dépasser les freins invisibles et renouer avec une forme de clarté personnelle.",
    rating: 5
  },
  {
    name: "Marie Hernandez",
    date: "Il y a 8 semaines",
    text: "J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie apaisée et sereine. Alain est à l'écoute et mon anxiété a totalement disparue en 3 séances. Je recommande vivement.",
    rating: 5
  },
  {
    name: "Philippe Audoin",
    date: "Il y a 7 semaines",
    text: "Mr Zenatti est un praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail, les points d'amélioration, les émotions limitantes, ce qui m'encombrait dans ma progression. En quelques séances, avec son accompagnement, j'ai pu me libérer de certains blocages.",
    rating: 5
  },
  {
    name: "Isabelle Marechal",
    date: "Il y a 23 semaines",
    text: "Alain m'a aidée à retrouver un sommeil réparateur en 2 séances. Je vous le recommande.",
    rating: 5
  },
  {
    name: "Karine Bogda",
    date: "30 mars 2023",
    text: "Grâce à Alain j'ai pris le dessus sur ma phobie, je recommande à 100%. Dès le premier contact téléphonique il a su être à mon écoute, et toutes les séances ont été bienveillantes, mes bulles de bien-être.",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((current) => (current + 1) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  return (
    <section className="py-12 bg-nova-blue-light bg-opacity-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-nova-blue-dark mb-2">Témoignages clients</h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <p className="text-nova-blue mt-2 font-medium">Note Google 5/5</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white p-8 rounded-xl shadow-lg">
            <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
              <div className="mb-6">
                <p className="italic text-gray-700 text-lg mb-6">{testimonials[currentIndex].text}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-nova-blue">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-gray-500">{testimonials[currentIndex].date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="text-nova-blue" size={24} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="text-nova-blue" size={24} />
            </button>
          </div>
          
          <div className="flex justify-center mt-4 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-nova-blue' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
