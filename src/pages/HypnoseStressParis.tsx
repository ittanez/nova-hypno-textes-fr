import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import { stressFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnoseStressParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour le stress et l'anxiété à Paris",
    "description": "Séances d'hypnose ericksonienne pour traiter le stress, l'anxiété et le burn-out. Cabinet Paris 4ème Marais-Bastille. Résultats en 3 à 5 séances.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie anti-stress",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose stress et anxiété Paris", "item": "https://novahypnose.fr/hypnose-stress-anxiete-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose stress et anxiété Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous du stress et de l'anxiété par l'hypnose à Paris 4ème. Alain Zenatti, Maître Hypnologue. Résultats durables en 3 à 5 séances." />
        <meta name="keywords" content="hypnose stress paris, hypnose anxiété paris, hypnothérapeute stress paris, gestion stress hypnose, burn-out hypnose paris, anxiété hypnothérapie paris, stress travail hypnose" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-stress-anxiete-paris" />
        <meta property="og:title" content="Hypnose stress et anxiété Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous du stress et de l'anxiété grâce à l'hypnose ericksonienne à Paris. Résultats durables en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-stress-anxiete-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose stress et anxiété Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous du stress et de l'anxiété grâce à l'hypnose ericksonienne à Paris. Résultats durables en 3 à 5 séances." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-blue-600 mb-2">Hypnose et stress</span>
              <span className="block">Retrouvez la sérénité à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Le stress et l'anxiété vous empêchent de vivre pleinement ? L'hypnose ericksonienne est une méthode
              naturelle et efficace pour retrouver le calme intérieur. <strong>Résultats durables en 3 à 5 séances</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
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
              Le stress vous empêche de vivre ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous vous réveillez la nuit avec des pensées qui tournent en boucle. Au travail, la pression ne retombe jamais.
                Vous sentez une boule dans le ventre, des tensions dans les épaules, un souffle court. Vous avez essayé de
                &laquo;&nbsp;relativiser&nbsp;&raquo;, de &laquo;&nbsp;lâcher prise&nbsp;&raquo;, mais rien n'y fait.
              </p>
              <p>
                Le stress chronique n'est pas une fatalité. Ce n'est pas un trait de caractère. C'est un mécanisme
                que votre inconscient a mis en place — et que l'hypnose peut désactiver.
              </p>
              <p>
                <strong>Burn-out</strong>, anxiété généralisée, crises d'angoisse, stress au travail, charge mentale…
                Ces symptômes sont le signal que quelque chose doit changer. Et le changement peut être rapide.
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
              Comment l'hypnose agit sur le stress et l'anxiété
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne travaille directement avec votre inconscient — là où se trouvent les automatismes
                qui génèrent le stress. Contrairement aux approches qui agissent uniquement sur les symptômes,
                l'hypnose traite le mécanisme à sa source.
              </p>
              <p>
                En état d'hypnose, votre cerveau entre dans un mode de fonctionnement particulier qui permet de :
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "Reprogrammer les réactions automatiques de stress",
                "Relâcher les tensions accumulées dans le corps",
                "Retrouver un sommeil profond et réparateur",
                "Développer des ressources internes de calme",
                "Prendre du recul face aux situations anxiogènes",
                "Stopper le cercle vicieux des pensées négatives"
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
              Mon approche pour traiter le stress
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong>, installé à Paris 4ème
                dans le quartier Marais-Bastille. Depuis plusieurs années, j'accompagne des personnes comme vous
                qui souffrent de stress et d'anxiété.
              </p>
              <p>
                Ma méthode combine <strong>l'hypnose ericksonienne</strong> — une approche douce et respectueuse —
                avec des techniques de PNL et d'auto-hypnose que vous pourrez réutiliser seul(e) au quotidien.
                Chaque séance est personnalisée selon votre situation.
              </p>
              <p>
                Lors de la première séance, nous identifions ensemble les déclencheurs de votre stress et je vous
                guide dans un état de profonde relaxation. La plupart de mes patients ressentent un soulagement
                significatif dès cette première rencontre.
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
              Des résultats concrets en 3 à 5 séances
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-2">90%</div>
                <p className="text-gray-700">de mes patients constatent une amélioration dès la première séance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-2">3-5</div>
                <p className="text-gray-700">séances suffisent en moyenne pour un résultat durable</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-blue-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">
              L'hypnose n'est pas une baguette magique, mais c'est l'une des approches les plus efficaces
              et les plus rapides pour traiter le stress et l'anxiété. Vous méritez de retrouver la sérénité.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={stressFaqItems}
        title="Questions fréquentes sur l'hypnose et le stress"
        accentColor="text-blue-500"
        pageUrl="https://novahypnose.fr/hypnose-stress-anxiete-paris"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prenez rendez-vous dès aujourd'hui
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-blue-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-blue-100">
              <Link to="/hypnose-phobies-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et phobies <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-sommeil-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et sommeil <ArrowRight size={14} />
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

export default HypnoseStressParis;
