
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/types/testimonial';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
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
  );
};

export default TestimonialCard;
