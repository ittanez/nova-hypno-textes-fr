import React from 'react';
import LazyYouTube from './LazyYouTube';
import { safeJSONStringify } from '@/lib/seo-utils';

interface SpecialtyShortProps {
  videoId: string;
  title: string;
  description: string;
  /** Durée ISO 8601, ex. "PT32S" */
  duration: string;
  uploadDate: string;
  pageUrl: string;
}

/** Courte vidéo (YouTube Shorts, 9:16) sur une page spécialité, chargée au clic. */
const SpecialtyShort: React.FC<SpecialtyShortProps> = ({ videoId, title, description, duration, uploadDate, pageUrl }) => (
  <section className="sp-section">
    <div className="container sp-narrow reveal">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px] items-center">
        <div>
          <div className="section-tag">En vidéo — 30 secondes</div>
          <h2 className="sp-h2">{title}</h2>
          <p>{description}</p>
        </div>
        <div className="w-full max-w-[280px] mx-auto rounded-xl overflow-hidden shadow-lg">
          <LazyYouTube videoId={videoId} title={title} className="w-full" />
        </div>
      </div>
      <script type="application/ld+json">
        {safeJSONStringify({
          "@context": "https://schema.org",
          "@type": "VideoObject",
          "name": title,
          "description": description,
          "thumbnailUrl": `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
          "uploadDate": uploadDate,
          "duration": duration,
          "embedUrl": `https://www.youtube.com/embed/${videoId}`,
          "contentUrl": `https://www.youtube.com/shorts/${videoId}`,
          "mainEntityOfPage": { "@type": "WebPage", "@id": pageUrl },
          "author": { "@type": "Person", "name": "Alain Zenatti" }
        })}
      </script>
    </div>
  </section>
);

export default SpecialtyShort;
