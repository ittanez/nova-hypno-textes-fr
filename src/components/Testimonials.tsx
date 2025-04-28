
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Testimonial {
  name: string;
  date: string;
  text: string;
  rating: number;
  image?: string;
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
    name: "Regis Gonzalez",
    date: "Il y a 23 semaines",
    text: "Première séance d'hypnose de ma vie qui a permis de solutionner un problème que j'avais depuis de nombreuses années. Un grand merci et bravo.",
    rating: 5
  },
  {
    name: "Karine Bogda",
    date: "30 mars 2023",
    text: "Grâce à Alain j'ai pris le dessus sur ma phobie, je recommande à 100%. Dès le premier contact téléphonique il a su être à mon écoute, et toutes les séances ont été bienveillantes, mes bulles de bien-être.",
    rating: 5
  },
  {
    name: "Arthur Perez",
    date: "17 août 2022",
    text: "Phobique de l'avion, monsieur Zenatti a su m'aider avant un voyage important. Merci encore pour ce que vous avez fait !",
    rating: 5
  },
  {
    name: "Anne Lhande",
    date: "5 juillet 2022",
    text: "Je recommande Alain Zenatti chaleureusement. Tout d'abord pour sa grande qualité d'écoute et sa justesse d'analyse. De plus pour son expertise et ses conseils concernant les problèmes relationnels, parfois toxiques. Arrivée avec un plexus solaire totalement noué et douloureux, Alain a réussi via ses techniques d'hypnose à adoucir ma douleur et à la transformer.",
    rating: 5
  },
  {
    name: "Safia Amor",
    date: "Il y a 27 semaines",
    text: "J'ai apprécié la patience, la douceur, l'écoute et le professionnalisme d'Alain Zenatti. Il m'a aidée au-delà de mes espérances alors que j'étais sceptique vis-à-vis de l'hypnose. Grâce à lui, j'ai repris confiance en moi, me sentant mieux dans ma vie.",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const startAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    startAutoplay();
  };

  return (
    <section id="temoignages" className="py-16 md:py-24 bg-gradient-to-b from-white to-nova-blue-light/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-[#2C5680] mb-4">
            Témoignages qui parlent du cœur
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="text-[#E6B54A] fill-[#E6B54A]" size={28} />
            ))}
          </div>
          <p className="text-[#34495E] text-lg font-medium">Note Google 5/5</p>
        </div>
        
        <div className="max-w-4xl mx-auto" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Carousel className="w-full">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 relative">
                    <Quote className="absolute text-[#E6B54A]/20 top-6 left-6" size={48} />
                    
                    <div className="relative">
                      <p className="italic text-gray-700 text-lg mb-8 relative z-10">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                          <p className="font-semibold text-[#2C5680]">{testimonial.name}</p>
                          <p className="text-sm text-gray-500">{testimonial.date}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="text-[#E6B54A] fill-[#E6B54A]" size={16} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-white border-none shadow-md hover:bg-gray-50" />
              <CarouselNext className="-right-12 bg-white border-none shadow-md hover:bg-gray-50" />
            </div>
          </Carousel>
          
          <div className="flex justify-center mt-8 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-[#2C5680] w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Aller au témoignage ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="md:hidden mt-6 flex justify-center gap-4">
            <button 
              onClick={() => setActiveIndex((current) => 
                (current - 1 + testimonials.length) % testimonials.length
              )}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft className="text-[#2C5680]" size={24} />
            </button>
            
            <button 
              onClick={() => setActiveIndex((current) => 
                (current + 1) % testimonials.length
              )}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
              aria-label="Témoignage suivant"
            >
              <ChevronRight className="text-[#2C5680]" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
