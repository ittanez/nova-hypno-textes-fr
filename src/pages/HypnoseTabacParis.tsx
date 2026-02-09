import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnoseTabacParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour l'arrêt du tabac à Paris",
    "description": "Arrêtez de fumer grâce à l'hypnose ericksonienne à Paris. Méthode naturelle sans substitut nicotinique. Cabinet Paris 4ème Marais-Bastille.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie arrêt tabac",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose arrêt tabac Paris", "item": "https://novahypnose.fr/hypnose-arret-tabac-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose arrêt du tabac Paris | Alain Zenatti - Hypnothérapeute</title>
        <meta name="description" content="Arrêtez de fumer grâce à l'hypnose à Paris 4ème. Méthode naturelle, sans patch ni substitut. Alain Zenatti, Maître Hypnologue certifié. Sans sensation de manque. Cabinet Marais-Bastille." />
        <meta name="keywords" content="hypnose arrêt tabac paris, arrêter de fumer hypnose paris, hypnose tabac paris, sevrage tabac hypnose paris, hypnothérapeute tabac paris, arrêt cigarette hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-arret-tabac-paris" />
        <meta property="og:title" content="Hypnose arrêt du tabac Paris | Alain Zenatti" />
        <meta property="og:description" content="Arrêtez de fumer grâce à l'hypnose ericksonienne à Paris. Sans patch, sans substitut, sans sensation de manque." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-arret-tabac-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-green-600 mb-2">Arrêt du tabac par l'hypnose</span>
              <span className="block">Devenez non-fumeur à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Vous avez déjà essayé d'arrêter de fumer sans succès ? L'hypnose agit sur la dépendance
              psychologique — la vraie raison pour laquelle vous fumez encore.
              <strong> Sans patch, sans substitut, sans sensation de manque</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
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
              Pourquoi c'est si difficile d'arrêter seul
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous le savez : fumer est dangereux. Vous l'avez lu cent fois, votre médecin vous l'a dit.
                Vous avez peut-être essayé les patchs, les gommes, la cigarette électronique, la volonté pure.
                Et à chaque fois, vous avez repris.
              </p>
              <p>
                Ce n'est pas un manque de volonté. La dépendance au tabac est double : il y a la dépendance
                <strong> physique</strong> à la nicotine (qui disparaît en quelques jours) et la dépendance
                <strong> psychologique</strong> — les habitudes, les gestes, les associations mentales. C'est
                cette seconde dépendance qui fait rechuter.
              </p>
              <p>
                L'hypnose agit précisément là où les autres méthodes échouent : sur le <strong>programme
                inconscient</strong> qui associe la cigarette au plaisir, à la détente, à la pause.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Comment l'hypnose vous libère du tabac
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne reprogramme votre relation inconsciente avec la cigarette. Lors des
                séances, je travaille avec vous pour :
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "Supprimer l'envie automatique de fumer",
                "Dissocier cigarette et plaisir/détente dans votre inconscient",
                "Renforcer votre identité de non-fumeur",
                "Éliminer la peur de prendre du poids",
                "Gérer le stress autrement qu'avec une cigarette",
                "Installer un dégoût naturel pour le tabac"
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
              Mon protocole d'arrêt du tabac
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème.
                Mon protocole d'arrêt du tabac par l'hypnose est personnalisé selon votre profil de fumeur :
                nombre de cigarettes, ancienneté, tentatives passées, déclencheurs.
              </p>
              <p>
                La première séance est consacrée à comprendre votre relation au tabac et à commencer
                le travail hypnotique. Beaucoup de mes patients réduisent considérablement leur consommation
                dès ce premier rendez-vous. En 2 à 4 séances, l'arrêt se consolide.
              </p>
              <p>
                L'avantage de l'hypnose : vous n'arrêtez pas en vous &laquo;&nbsp;privant&nbsp;&raquo;.
                Vous arrêtez parce que vous n'en avez <strong>plus envie</strong>. C'est la différence entre
                la volonté et le changement profond.
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
              Arrêter de fumer, c'est possible
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-green-600 mb-2">2-4</div>
                <p className="text-gray-700">séances pour un arrêt complet et durable</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-green-600 mb-2">0</div>
                <p className="text-gray-700">substitut nicotinique nécessaire</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-green-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-green-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Devenez non-fumeur dès aujourd'hui
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-green-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-green-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-green-100">
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-perte-de-poids-paris" className="hover:text-white underline flex items-center gap-1">
                Perte de poids <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-sommeil-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et sommeil <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};

export default HypnoseTabacParis;
