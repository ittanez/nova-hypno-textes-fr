/**
 * AuthorPage - Page profil Alain Zenatti
 * Améliore E-E-A-T et Author schema.org pour les articles
 */

import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContentLayout from '@/components/layout/ContentLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import LinkedInIcon from 'lucide-react/dist/esm/icons/linkedin';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Award from 'lucide-react/dist/esm/icons/award';

const AuthorPage: React.FC = () => {
  // Author schema.org pour E-E-A-T
  useEffect(() => {
    const authorSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://novahypnose.fr/alain-zenatti",
      "name": "Alain Zenatti",
      "jobTitle": "Maître Hypnologue certifié",
      "url": "https://novahypnose.fr/alain-zenatti",
      "image": "https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp",
      "description": "Maître Hypnologue certifié spécialisé en hypnose ericksonienne. Plus de 5 ans d'expérience. Cabinet à Paris 4ème (Marais-Bastille). Auteur de 100+ articles sur l'hypnothérapie, la gestion du stress et le développement personnel.",
      "sameAs": [
        "https://www.instagram.com/novahypnose/",
        "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
        "https://www.linkedin.com/in/alain-zenatti/"
      ],
      "worksFor": {
        "@type": "Organization",
        "@id": "https://novahypnose.fr",
        "name": "NovaHypnose"
      },
      "hasCredential": [
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Certification",
          "name": "Maître Hypnologue",
          "recognizedBy": { "@type": "Organization", "name": "École Psynapse" },
          "dateIssued": "2025-01-01"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Certification",
          "name": "Maître Praticien Hypnose Ericksonienne",
          "recognizedBy": { "@type": "Organization", "name": "École Psynapse" },
          "dateIssued": "2023-06-01"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Certification",
          "name": "Hypnose Ericksonienne",
          "recognizedBy": { "@type": "Organization", "name": "École Psynapse" },
          "dateIssued": "2021-01-01"
        },
        {
          "@type": "EducationalOccupationalCredential",
          "credentialCategory": "Certification",
          "name": "Hypnose Spirituelle",
          "recognizedBy": { "@type": "Organization", "name": "École Psynapse" },
          "dateIssued": "2023-01-01"
        }
      ],
      "knowsAbout": [
        "Hypnose ericksonienne",
        "Gestion du stress",
        "Gestion de l'anxiété",
        "Traitement des phobies",
        "Amélioration du sommeil",
        "Confiance en soi",
        "Auto-hypnose",
        "PNL",
        "Neurosciences et hypnose"
      ],
      "telephone": "+33649358089",
      "email": "contact@novahypnose.fr",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "16 rue Saint-Antoine",
        "addressLocality": "Paris",
        "addressRegion": "Île-de-France",
        "postalCode": "75004",
        "addressCountry": "FR"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = safeJSONStringify(authorSchema);
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Alain Zenatti - Maître Hypnologue à Paris | NovaHypnose</title>
        <meta
          name="description"
          content="Alain Zenatti, Maître Hypnologue certifié. Spécialiste en hypnose ericksonienne. 5+ ans d'expérience. Cabinet Paris 4ème. Auteur de 100+ articles sur l'hypnothérapie."
        />
        <meta name="keywords" content="Alain Zenatti, Maître Hypnologue, hypnothérapeute Paris, hypnose ericksonienne" />
        <link rel="canonical" href="https://novahypnose.fr/alain-zenatti" />
      </Helmet>

      <ContentLayout>
        <main className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <img
                src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp"
                alt="Alain Zenatti - Maître Hypnologue"
                className="w-32 h-32 rounded-full mx-auto mb-6 shadow-lg object-cover"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Alain Zenatti</h1>
              <p className="text-2xl text-blue-600 font-semibold mb-2">Maître Hypnologue certifié</p>
              <p className="text-gray-600 text-lg">Spécialiste en hypnose ericksonienne • Cabinet Paris 4ème</p>
            </div>

            {/* À propos */}
            <section className="mb-16 bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">À propos</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depuis plus de <strong>5 années d'expérience</strong>, j'accompagne des centaines de patients dans leur démarche de transformation personnelle. Ma spécialité : l'hypnose ericksonienne, une approche douce, non-directive et profondément respectueuse.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Formé à l'<strong>École Psynapse</strong> avec 9 certifications professionnelles, j'ai développé une approche unique alliant l'hypnose ericksonienne, la PNL et les neurosciences. Chaque accompagnement est entièrement personnalisé : vous êtes au cœur du processus.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Mon cabinet situé au cœur du <strong>Marais (Paris 4ème)</strong>, à deux minutes du métro Bastille, est un espace de confiance où la transformation commence.
              </p>
            </section>

            {/* Certifications */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Award className="text-blue-600" size={28} />
                Certifications & Formation
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Maître Hypnologue", school: "École Psynapse", year: "2025" },
                  { title: "Maître Praticien Hypnose Ericksonienne", school: "École Psynapse", year: "2023" },
                  { title: "Hypnose Ericksonienne", school: "École Psynapse", year: "2021" },
                  { title: "Hypnose Spirituelle", school: "École Psynapse", year: "2023" },
                  { title: "Hypnose Directive & Hyperemperia", school: "Formation Continue", year: "2025" },
                  { title: "Formation PNL & Neurosciences", school: "Instituts spécialisés", year: "2022-2024" }
                ].map((cert, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
                    <p className="font-semibold text-gray-900">{cert.title}</p>
                    <p className="text-sm text-gray-600">{cert.school} • {cert.year}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Spécialités */}
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Spécialités</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Gestion du stress et de l'anxiété",
                  "Troubles du sommeil",
                  "Confiance en soi & estime personnelle",
                  "Phobies et peurs irrationnelles",
                  "Gestion des émotions & deuil",
                  "Blocages créatifs & procrastination",
                  "Arrêt du tabac & addictions",
                  "Préparation mentale & performance"
                ].map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <span className="text-blue-600 font-bold mt-1">✓</span>
                    <span className="text-gray-700">{spec}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Contact & Réseaux */}
            <section className="bg-gray-50 p-8 rounded-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contacter Alain</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <a
                  href="tel:+33649358089"
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Téléphone</p>
                    <p className="text-sm text-gray-600">06 49 35 80 89</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@novahypnose.fr"
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">contact@novahypnose.fr</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/novahypnose/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-white rounded-lg hover:shadow-md transition"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Instagram size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Instagram</p>
                    <p className="text-sm text-gray-600">@novahypnose</p>
                  </div>
                </a>
              </div>
            </section>

            {/* Blog */}
            <section className="mt-16 pt-16 border-t">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Découvrir mes articles</h2>
              <p className="text-gray-700 mb-8">
                Je partage régulièrement des articles sur l'hypnose ericksonienne, la gestion du stress, le développement personnel et les neurosciences. Retrouvez près de 100 articles complets sur mon blog.
              </p>
              <a
                href="/blog"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
              >
                Lire les articles →
              </a>
            </section>
          </div>
        </main>
      </ContentLayout>
    </>
  );
};

export default AuthorPage;
