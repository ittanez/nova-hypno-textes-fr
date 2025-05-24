
import { useState } from 'react';
import { Star } from 'lucide-react';
import TestimonialCard from './TestimonialCard';
import TestimonialControls from './TestimonialControls';
import type { Testimonial } from '../../types/testimonial';

// Updated testimonials with initials instead of last names
const testimonials: Testimonial[] = [
  {
    name: "Claire M.",
    date: "15 janvier 2023",
    text: "Accompagnement vraiment exceptionnel d'Alain pour ma phobie des transports en commun. En seulement 3 séances, j'ai pu recommencer à prendre le métro sereinement. Maintenant c'est comme si cette phobie n'avait jamais existé !",
    rating: 5
  },
  {
    name: "Thomas B.",
    date: "3 mars 2023",
    text: "Excellent thérapeute. J'ai consulté pour des problèmes de sommeil qui me perturbaient depuis des années. La méthode d'Alain a été efficace rapidement. Je recommande vivement son approche bienveillante et professionnelle.",
    rating: 5
  },
  {
    name: "Sophie L.",
    date: "20 avril 2023",
    text: "Je souffrais d'anxiété sociale depuis l'adolescence. Grâce à l'hypnose pratiquée par Alain, j'ai pu me libérer de cette souffrance. Son approche est à la fois douce et efficace. Merci infiniment pour cette libération !",
    rating: 5
  },
  {
    name: "Marc D.",
    date: "8 juin 2023",
    text: "Après avoir essayé plusieurs approches pour arrêter de fumer sans succès, j'ai tenté l'hypnose avec Alain. Et ça a marché ! Six mois plus tard, je n'ai pas retouché à une cigarette. Une transformation incroyable dans ma vie.",
    rating: 5
  },
  {
    name: "Julie P.",
    date: "17 septembre 2023",
    text: "Alain est un hypnothérapeute attentif et bienveillant. J'ai suivi un accompagnement pour gérer mon stress au travail et les résultats ont dépassé mes attentes. Je gère désormais beaucoup mieux la pression et me sens plus épanouie.",
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
