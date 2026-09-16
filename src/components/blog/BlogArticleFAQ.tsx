import React, { useState, useEffect } from 'react';
import ChevronDown from 'lucide-react/dist/esm/icons/chevron-down';
import ChevronUp from 'lucide-react/dist/esm/icons/chevron-up';
import type { ArticleFaqItem } from '@/lib/types/blog';
import { safeJSONStringify } from '@/lib/seo-utils';

interface BlogArticleFAQProps {
  items: ArticleFaqItem[];
  articleUrl: string;
}

const BlogArticleFAQ: React.FC<BlogArticleFAQProps> = ({ items, articleUrl }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Inject FAQPage JSON-LD structured data
  useEffect(() => {
    if (!items || items.length === 0) return;

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

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = safeJSONStringify(faqSchema);
    script.id = 'article-faq-structured-data';
    document.head.appendChild(script);

    return () => {
      const existing = document.getElementById('article-faq-structured-data');
      if (existing) {
        document.head.removeChild(existing);
      }
    };
  }, [items, articleUrl]);

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12 border-t pt-10" aria-labelledby="article-faq-heading">
      <h2
        id="article-faq-heading"
        className="text-2xl md:text-3xl font-serif font-medium text-gray-900 mb-8"
      >
        Questions frequentes
      </h2>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="flex justify-between items-center w-full p-5 text-left hover:bg-gray-100 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
              aria-controls={`blog-faq-answer-${index}`}
              id={`blog-faq-question-${index}`}
            >
              <span className="font-semibold text-gray-900 pr-4">{item.question}</span>
              {openIndex === index ? (
                <ChevronUp className="text-nova-600 flex-shrink-0" size={20} aria-hidden="true" />
              ) : (
                <ChevronDown className="text-nova-600 flex-shrink-0" size={20} aria-hidden="true" />
              )}
            </button>
            <div
              id={`blog-faq-answer-${index}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out-strong ${
                openIndex === index ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
              role="region"
              aria-labelledby={`blog-faq-question-${index}`}
              aria-hidden={openIndex !== index}
            >
              <div className="overflow-hidden min-h-0">
                <p className="px-5 pb-5 text-gray-600 leading-relaxed whitespace-pre-line">{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BlogArticleFAQ;
