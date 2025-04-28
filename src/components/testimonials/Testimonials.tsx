
import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials } from '@/data/testimonials';
import TestimonialCard from './TestimonialCard';
import TestimonialControls from './TestimonialControls';

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

  const handlePrevious = () => {
    setActiveIndex((current) => 
      (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setActiveIndex((current) => 
      (current + 1) % testimonials.length
    );
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
                  <TestimonialCard testimonial={testimonial} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-white border-none shadow-md hover:bg-gray-50" />
              <CarouselNext className="-right-12 bg-white border-none shadow-md hover:bg-gray-50" />
            </div>
          </Carousel>
          
          <TestimonialControls
            activeIndex={activeIndex}
            totalSlides={testimonials.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onDotClick={setActiveIndex}
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
