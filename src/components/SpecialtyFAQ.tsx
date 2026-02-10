import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import type { SpecialtyFaqItem } from '@/data/specialtyFaqData';

interface SpecialtyFAQProps {
  items: SpecialtyFaqItem[];
  title: string;
  accentColor?: string;
  pageUrl: string;
}

const SpecialtyFAQ: React.FC<SpecialtyFAQProps> = ({
  items,
  title,
  accentColor = 'text-blue-500',
  pageUrl,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="py-16 md:py-20 bg-gray-50" aria-labelledby="specialty-faq-heading">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2
              id="specialty-faq-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center"
            >
              {title}
            </h2>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    className="flex justify-between items-center w-full p-5 md:p-6 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    aria-expanded={openIndex === index}
                    aria-controls={`specialty-faq-answer-${index}`}
                    id={`specialty-faq-question-${index}`}
                  >
                    <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
                    {openIndex === index ? (
                      <ChevronUp className={`${accentColor} flex-shrink-0`} size={22} aria-hidden="true" />
                    ) : (
                      <ChevronDown className={`${accentColor} flex-shrink-0`} size={22} aria-hidden="true" />
                    )}
                  </button>
                  <div
                    id={`specialty-faq-answer-${index}`}
                    className={`px-5 md:px-6 overflow-hidden transition-all duration-300 ${
                      openIndex === index ? 'max-h-[500px] pb-5 md:pb-6' : 'max-h-0'
                    }`}
                    role="region"
                    aria-labelledby={`specialty-faq-question-${index}`}
                  >
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialtyFAQ;
