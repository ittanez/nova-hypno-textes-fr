import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnosePoidsParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour la perte de poids à Paris",
    "description": "Perdez du poids durablement grâce à l'hypnose ericksonienne à Paris. Reprogrammez votre relation à la nourriture. Cabinet Paris 4ème Marais-Bastille.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie perte de poids",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose perte de poids Paris", "item": "https://novahypnose.fr/hypnose-perte-de-poids-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose perte de poids Paris | Alain Zenatti - Hypnothérapeute</title>
        <meta name="description" content="Perdez du poids durablement grâce à l'hypnose à Paris 4ème. Fini les régimes yo-yo. Reprogrammez votre relation à la nourriture. Alain Zenatti, Maître Hypnologue certifié. Cabinet Marais-Bastille." />
        <meta name="keywords" content="hypnose perte de poids paris, maigrir hypnose paris, hypnose minceur paris, grignotage hypnose paris, compulsions alimentaires hypnose, hypnothérapeute poids paris, anneau gastrique virtuel paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-perte-de-poids-paris" />
        <meta property="og:title" content="Hypnose perte de poids Paris | Alain Zenatti" />
        <meta property="og:description" content="Perdez du poids durablement grâce à l'hypnose ericksonienne à Paris. Fini les régimes, reprogrammez votre relation à la nourriture." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-perte-de-poids-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-orange-600 mb-2">Hypnose et perte de poids</span>
              <span className="block">Mincir durablement à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Les régimes ne marchent pas sur le long terme — vous le savez. L'hypnose agit sur la cause
              profonde de vos kilos en trop : votre <strong>relation inconsciente à la nourriture</strong>.
              Fini les frustrations, fini l'effet yo-yo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
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
              Pourquoi les régimes ne marchent jamais
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous avez essayé des dizaines de régimes. À chaque fois, vous perdez du poids… puis vous le
                reprenez — parfois plus. Cette spirale de frustration n'est pas de votre faute.
              </p>
              <p>
                Les régimes échouent parce qu'ils n'agissent que sur le <strong>comportement conscient</strong> :
                ce que vous mangez, les calories, les interdits. Mais la vraie raison pour laquelle vous
                mangez trop — le grignotage émotionnel, les compulsions, le besoin de réconfort — se trouve
                dans votre <strong>inconscient</strong>.
              </p>
              <p>
                L'hypnose ne vous met pas au régime. Elle transforme votre relation à la nourriture
                pour que manger moins et mieux devienne <strong>naturel</strong>.
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
              Comment l'hypnose vous fait perdre du poids
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne reprogramme les automatismes inconscients liés à l'alimentation.
                En état d'hypnose, je travaille avec vous pour :
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "Supprimer les compulsions alimentaires et le grignotage",
                "Retrouver la sensation naturelle de satiété",
                "Dissocier nourriture et réconfort émotionnel",
                "Renforcer la motivation pour une alimentation équilibrée",
                "Développer le plaisir de manger sainement",
                "Booster votre image de vous-même et votre confiance"
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
              Mon approche pour la perte de poids
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème.
                Mon approche de la perte de poids par l'hypnose est personnalisée : je ne propose pas
                un protocole identique à tout le monde.
              </p>
              <p>
                Lors de la première séance, nous identifions ensemble les mécanismes inconscients
                qui vous poussent à manger : stress, ennui, émotion, habitude, récompense. Ensuite,
                je reprogramme ces automatismes pour qu'ils ne déclenchent plus de comportement
                alimentaire excessif.
              </p>
              <p>
                Je vous transmets aussi des <strong>techniques d'auto-hypnose</strong> pour gérer
                les moments de tentation au quotidien. L'objectif n'est pas de vous frustrer, mais
                de vous libérer — pour que manger juste devienne votre nouvelle normalité.
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
              Une perte de poids durable
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">3-6</div>
                <p className="text-gray-700">séances pour transformer votre relation à la nourriture</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">0</div>
                <p className="text-gray-700">régime restrictif — une approche naturelle et sans frustration</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-orange-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-orange-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Commencez votre transformation
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-orange-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-orange-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-orange-100">
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-arret-tabac-paris" className="hover:text-white underline flex items-center gap-1">
                Arrêt du tabac <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-confiance-en-soi-paris" className="hover:text-white underline flex items-center gap-1">
                Confiance en soi <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};

export default HypnosePoidsParis;
