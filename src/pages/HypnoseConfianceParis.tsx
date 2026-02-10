import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import { confianceFaqItems } from '@/data/specialtyFaqData';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnoseConfianceParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour la confiance en soi à Paris",
    "description": "Développez votre confiance en soi grâce à l'hypnose ericksonienne à Paris. Prise de parole, estime de soi, syndrome de l'imposteur. Cabinet Paris 4ème Marais-Bastille.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie confiance en soi",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose confiance en soi Paris", "item": "https://novahypnose.fr/hypnose-confiance-en-soi-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose confiance en soi Paris | Alain Zenatti</title>
        <meta name="description" content="Développez votre confiance en soi par l'hypnose à Paris 4ème. Syndrome de l'imposteur, prise de parole, estime de soi. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose confiance en soi paris, estime de soi hypnose paris, syndrome imposteur hypnose paris, prise de parole hypnose paris, hypnothérapeute confiance paris, timidité hypnose paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-confiance-en-soi-paris" />
        <meta property="og:title" content="Hypnose confiance en soi Paris | Alain Zenatti" />
        <meta property="og:description" content="Développez votre confiance en soi grâce à l'hypnose ericksonienne à Paris. Syndrome de l'imposteur, prise de parole, estime de soi." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-confiance-en-soi-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-yellow-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-amber-600 mb-2">Hypnose et confiance en soi</span>
              <span className="block">Révélez votre potentiel à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Vous doutez de vous, vous n'osez pas prendre la parole, vous vous sentez illégitime ?
              L'hypnose reprogramme les croyances limitantes qui sabotent votre confiance.
              <strong> Résultats visibles en 3 à 5 séances</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
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
              Le manque de confiance vous freine ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous avez les compétences, mais vous n'arrivez pas à les montrer. En réunion, vous
                n'osez pas prendre la parole. Devant une opportunité, vous hésitez, vous vous dites
                que vous n'êtes pas à la hauteur. Vous comparez constamment aux autres — et vous
                trouvez toujours que les autres sont mieux.
              </p>
              <p>
                Le <strong>syndrome de l'imposteur</strong>, la timidité, la peur du jugement, le
                perfectionnisme paralysant — ce ne sont pas des traits de caractère. Ce sont des
                <strong> programmes inconscients</strong> installés depuis l'enfance, renforcés par
                les expériences de vie.
              </p>
              <p>
                Ces programmes peuvent être modifiés. L'hypnose accède directement à ces croyances
                profondes pour les transformer.
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
              Comment l'hypnose renforce la confiance en soi
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne travaille sur les fondations de votre confiance : l'image de soi,
                les croyances, les expériences formatrices. En état d'hypnose, je vous aide à :
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                "Identifier et transformer les croyances limitantes",
                "Neutraliser le syndrome de l'imposteur",
                "Développer une image de soi positive et réaliste",
                "Prendre la parole en public avec aisance",
                "Oser dire non et poser ses limites",
                "Aborder les situations sociales avec sérénité"
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
              Mon approche pour développer votre confiance
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème.
                Le manque de confiance en soi est l'un des motifs les plus fréquents dans mon cabinet.
                Que ce soit pour la vie professionnelle ou personnelle, je vous accompagne pour
                retrouver une confiance authentique et durable.
              </p>
              <p>
                Mon approche combine l'hypnose ericksonienne avec des techniques de PNL. Lors des séances,
                nous travaillons sur les <strong>expériences fondatrices</strong> qui ont installé le doute,
                nous les retraitons, puis nous ancrons de nouvelles ressources de confiance que vous
                pourrez mobiliser dans les situations qui vous posent problème.
              </p>
              <p>
                Je vous transmets également des <strong>techniques d'auto-hypnose</strong> pour
                renforcer votre confiance au quotidien, avant une présentation, un entretien ou
                toute situation importante.
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
              Des résultats qui changent votre vie
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-amber-600 mb-2">3-5</div>
                <p className="text-gray-700">séances pour une transformation profonde de votre confiance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-amber-600 mb-2">100%</div>
                <p className="text-gray-700">personnalisé selon vos objectifs et votre histoire</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-amber-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={confianceFaqItems}
        title="Questions fréquentes sur l'hypnose et la confiance en soi"
        accentColor="text-amber-500"
        pageUrl="https://novahypnose.fr/hypnose-confiance-en-soi-paris"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-amber-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Révélez la confiance qui est en vous
            </h2>
            <p className="text-xl text-amber-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-amber-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-500 hover:bg-amber-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-amber-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-amber-100">
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-phobies-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et phobies <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-blocages-paris" className="hover:text-white underline flex items-center gap-1">
                Blocages et comportements <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};

export default HypnoseConfianceParis;
