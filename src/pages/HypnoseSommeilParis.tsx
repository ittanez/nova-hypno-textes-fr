import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import { sommeilFaqItems } from '@/data/specialtyFaqData';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnoseSommeilParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les troubles du sommeil à Paris",
    "description": "Retrouvez un sommeil profond et réparateur grâce à l'hypnose ericksonienne. Insomnie, réveils nocturnes, endormissement difficile. Cabinet Paris 4ème.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie sommeil",
    "offers": {
      "@type": "Offer",
      "price": "90",
      "priceCurrency": "EUR"
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Hypnose sommeil Paris", "item": "https://novahypnose.fr/hypnose-sommeil-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose sommeil et insomnie Paris | Alain Zenatti</title>
        <meta name="description" content="Retrouvez un sommeil profond par l'hypnose à Paris 4ème. Insomnie, réveils nocturnes, endormissement difficile. Sans médicament. 3 à 5 séances." />
        <meta name="keywords" content="hypnose sommeil paris, hypnose insomnie paris, troubles sommeil hypnose, hypnothérapeute insomnie paris, retrouver sommeil hypnose, réveils nocturnes hypnose, endormissement hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-sommeil-paris" />
        <meta property="og:title" content="Hypnose sommeil et insomnie Paris | Alain Zenatti" />
        <meta property="og:description" content="Retrouvez un sommeil profond et réparateur grâce à l'hypnose ericksonienne à Paris. Sans médicament. Résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-sommeil-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-indigo-600 mb-2">Hypnose et sommeil</span>
              <span className="block">Retrouvez des nuits sereines à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Insomnie, réveils nocturnes, difficultés d'endormissement, sommeil non réparateur…
              L'hypnose est une alternative naturelle et efficace aux somnifères.
              <strong> Retrouvez le sommeil en 3 à 5 séances</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar size={20} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-semibold transition-all shadow-md border border-gray-200"
              >
                <Phone size={20} />
                06 49 35 80 89
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Le manque de sommeil détruit votre quotidien ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous vous couchez épuisé(e) mais votre cerveau ne s'arrête pas. Les pensées tournent en boucle.
                Vous regardez l'heure : 1h, 2h, 3h du matin… Quand le réveil sonne, vous êtes plus fatigué(e)
                qu'en vous couchant.
              </p>
              <p>
                Le manque de sommeil affecte tout : votre humeur, votre concentration, votre santé, vos relations.
                Les somnifères vous assomment sans vous offrir un vrai repos. Vous avez essayé les tisanes,
                la mélatonine, les applications de méditation — rien ne marche durablement.
              </p>
              <p>
                Le problème n'est pas dans votre corps. Il est dans votre <strong>inconscient</strong>, qui a
                &laquo;&nbsp;oublié&nbsp;&raquo; comment lâcher prise pour s'endormir. L'hypnose lui rappelle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment l'hypnose agit */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Comment l'hypnose restaure votre sommeil
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne travaille sur les causes profondes de vos troubles du sommeil, pas
                seulement sur les symptômes. En accédant à votre inconscient, elle permet de :
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "Calmer le mental hyperactif qui empêche l'endormissement",
                "Désactiver l'anxiété anticipatoire liée au coucher",
                "Restaurer le cycle naturel veille-sommeil",
                "Éliminer les réveils nocturnes et les ruminations",
                "Apprendre l'auto-hypnose pour vous endormir seul(e)",
                "Retrouver un sommeil profond et réparateur sans médicament"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Mon approche pour retrouver le sommeil
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème. Les troubles
                du sommeil sont l'un des motifs de consultation les plus fréquents dans mon cabinet.
              </p>
              <p>
                Mon approche est en trois temps : d'abord, identifier la cause de votre insomnie (stress,
                anxiété, traumatisme, habitudes). Ensuite, travailler en hypnose profonde pour reprogrammer
                vos mécanismes de sommeil. Enfin, vous transmettre des <strong>techniques d'auto-hypnose</strong> pour
                que vous puissiez vous endormir sereinement par vous-même.
              </p>
              <p>
                Beaucoup de mes patients dorment mieux dès la première séance. En 3 à 5 séances, le sommeil
                se stabilise durablement — sans aucune dépendance, sans médicament.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Résultats : un sommeil retrouvé
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-indigo-600 mb-2">3-5</div>
                <p className="text-gray-700">séances pour retrouver un sommeil stable et réparateur</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-indigo-600 mb-2">0</div>
                <p className="text-gray-700">médicament nécessaire — une solution 100% naturelle</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-indigo-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={sommeilFaqItems}
        title="Questions fréquentes sur l'hypnose et le sommeil"
        accentColor="text-indigo-500"
        pageUrl="https://novahypnose.fr/hypnose-sommeil-paris"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-indigo-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Retrouvez enfin le sommeil
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-indigo-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-indigo-100">
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-phobies-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et phobies <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-gestion-emotions-paris" className="hover:text-white underline flex items-center gap-1">
                Gestion des émotions <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};

export default HypnoseSommeilParis;
