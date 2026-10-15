/**
 * AuthorPage - Page profil Alain Zenatti
 * Améliore E-E-A-T et Author schema.org pour les articles
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import ContentLayout from '@/components/layout/ContentLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import { personSchema } from '@/data/schemaOrg';
import { formationCycles } from '@/data/formations';
import Instagram from 'lucide-react/dist/esm/icons/instagram';
import Mail from 'lucide-react/dist/esm/icons/mail';
import Award from 'lucide-react/dist/esm/icons/award';

const AuthorPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Alain Zenatti - Maître Hypnologue à Paris | NovaHypnose</title>
        <meta
          name="description"
          content="Alain Zenatti, Maître Hypnologue certifié. Hypnose ericksonienne, 6 ans d'expérience, cabinet Paris 4ème. Auteur de 100+ articles sur l'hypnothérapie."
        />
        <meta name="keywords" content="Alain Zenatti, Maître Hypnologue, hypnothérapeute Paris, hypnose ericksonienne" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/alain-zenatti" />
        <meta property="og:title" content="Alain Zenatti - Maître Hypnologue à Paris | NovaHypnose" />
        <meta property="og:description" content="Alain Zenatti, Maître Hypnologue certifié. Hypnose ericksonienne, 6 ans d'expérience, cabinet Paris 4ème. Auteur de 100+ articles sur l'hypnothérapie." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/alain-zenatti" />
        <meta property="og:image" content="https://novahypnose.fr/images/og-alain-zenatti.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Alain Zenatti - Maître Hypnologue à Paris | NovaHypnose" />
        <meta name="twitter:description" content="Alain Zenatti, Maître Hypnologue certifié. Hypnose ericksonienne, 6 ans d'expérience, cabinet Paris 4ème. Auteur de 100+ articles sur l'hypnothérapie." />
        <meta name="twitter:image" content="https://novahypnose.fr/images/og-alain-zenatti.jpg" />
        <script type="application/ld+json">{safeJSONStringify(personSchema)}</script>
      </Helmet>

      <ContentLayout>
        <main className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <img
                src="/images/alain-zenatti-portrait.webp"
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
                Depuis <strong>6 ans</strong>, j'accompagne des centaines de clients dans leur démarche de transformation personnelle. Ma spécialité : l'hypnose ericksonienne, une approche douce, non-directive et profondément respectueuse.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Formé à l'hypnose ericksonienne dès <strong>fin 2020</strong> (MHD Formation), j'ai suivi ensuite le cursus complet de l'<strong>École Psynapse</strong> jusqu'au titre de <strong>Maître Hypnologue</strong> : 9 certificats de formation et plus de 50 jours de formation en présentiel. L'hypnose ericksonienne reste le socle de ma pratique ; j'y ajoute, quand la situation s'y prête, des techniques plus directes (hypnose directe de Dave Elman, inductions rapides, transe profonde).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ma formation en <strong>psychopathologie clinique</strong> me permet de reconnaître ce qui relève d'un médecin ou d'un psychiatre. L'hypnose est un accompagnement complémentaire : elle ne remplace pas un suivi médical, et j'oriente vers un professionnel de santé quand c'est nécessaire.
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
              <div className="space-y-8">
                {formationCycles.map((cycle) => (
                  <div key={cycle.name}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{cycle.name}</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {cycle.formations.map((f) => (
                        <div key={f.title} className="bg-white p-5 rounded-lg border-l-4 border-blue-500">
                          <p className="font-semibold text-gray-900">{f.title}</p>
                          <p className="text-sm text-gray-600">
                            <a href={f.schoolUrl} target="_blank" rel="noopener noreferrer" className="underline">{f.school}</a>
                            {' '}• {f.year}{f.days ? ` • ${f.days} jours` : ''}
                          </p>
                          {f.description && <p className="text-sm text-gray-700 mt-2">{f.description}</p>}
                        </div>
                      ))}
                    </div>
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
                  "Comportements répétitifs & habitudes",
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
