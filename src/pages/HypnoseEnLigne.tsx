import React from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, visioServiceSchema } from '@/data/schemaOrg';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import Video from 'lucide-react/dist/esm/icons/video';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';
import MapPin from 'lucide-react/dist/esm/icons/map-pin';

const visioFaqItems = [
  {
    question: "L'hypnose en visio est-elle aussi efficace qu'au cabinet ?",
    answer: "Oui. L'hypnose ne repose pas sur le contact physique mais sur la voix, l'attention et la relation thérapeutique — qui passent parfaitement par la visioconférence. De nombreux patients suivis à distance obtiennent les mêmes résultats qu'en présentiel, en 3 à 5 séances. Vous restez pleinement conscient et acteur du processus, exactement comme au cabinet.",
  },
  {
    question: "Comment se déroule concrètement une séance d'hypnose en ligne ?",
    answer: "Vous recevez un lien de connexion sécurisé (Google Meet). La première séance dure environ 1h30 : entretien pour cerner votre objectif, séance d'hypnose guidée par la voix, puis debriefing. Les séances suivantes durent 1h. Vous avez simplement besoin d'un endroit calme, d'une connexion internet stable et d'un casque ou d'écouteurs.",
  },
  {
    question: "Depuis où peut-on consulter en visio ?",
    answer: "Depuis n'importe où dans le monde ! La séance en visio n'a pas de frontières : que vous soyez en France, à l'étranger ou en voyage, la seule condition est de disposer d'une connexion internet stable et d'un endroit calme et confortable. C'est l'un des grands avantages du format en ligne.",
  },
  {
    question: "De quel matériel ai-je besoin pour une téléconsultation d'hypnose ?",
    answer: "Un ordinateur, une tablette ou un smartphone avec caméra et micro, une connexion internet stable, un casque ou des écouteurs (pour une meilleure immersion), et un endroit calme où vous ne serez pas dérangé pendant environ une heure. C'est tout.",
  },
  {
    question: "Comment payer une séance d'hypnose en visio ?",
    answer: "Le règlement s'effectue en ligne de façon simple et sécurisée, selon votre préférence : par carte bancaire via Stripe — le lien de paiement vous est transmis lors de la réservation — ou par Wero, en envoyant le paiement au 06 49 35 80 89. Une facture peut vous être fournie sur demande, pour une éventuelle prise en charge par votre mutuelle.",
  },
  {
    question: "Puis-je alterner séances en visio et séances au cabinet ?",
    answer: "Tout à fait. Vous pouvez commencer en visio puis venir au cabinet à Paris 4ème, ou inversement, selon votre situation et vos déplacements. L'accompagnement reste cohérent quel que soit le format choisi.",
  },
];

const HypnoseEnLigne = () => {
  const { openResalibPopup } = useResalibPopup();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Hypnose en ligne (visio)", "item": "https://novahypnose.fr/hypnose-en-ligne" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose en ligne & visioconférence partout en France | NovaHypnose</title>
        <meta name="description" content="Consultez un hypnothérapeute certifié en visio, partout en France. Séances d'hypnose en ligne (Google Meet) aussi efficaces qu'au cabinet. Alain Zenatti, Maître Hypnologue. 90 € la séance." />
        <meta name="keywords" content="hypnose en ligne, hypnothérapeute en ligne, hypnose visio, séance hypnose visio France, hypnose à distance, téléconsultation hypnose, hypnothérapeute à distance, hypnose en ligne France, consultation hypnose visio" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-en-ligne" />
        <meta property="og:title" content="Hypnose en ligne & visioconférence partout en France | NovaHypnose" />
        <meta property="og:description" content="Consultez un hypnothérapeute certifié en visio, partout en France. Séances d'hypnose en ligne aussi efficaces qu'au cabinet. Alain Zenatti, Maître Hypnologue." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-en-ligne" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Hypnose en visioconférence partout en France" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose en ligne & visioconférence partout en France | NovaHypnose" />
        <meta name="twitter:description" content="Consultez un hypnothérapeute certifié en visio, partout en France. Séances aussi efficaces qu'au cabinet." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(visioServiceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(personSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-nova-green/10 text-nova-green-dark rounded-full text-sm font-semibold">
              <Video size={16} /> Disponible partout en France
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-teal-600 mb-2">Hypnose en visioconférence</span>
              <span className="block">partout en France</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Où que vous soyez en France, consultez un hypnothérapeute certifié depuis chez vous.
              Les séances d'hypnose en ligne sont <strong>aussi efficaces qu'au cabinet</strong>, sans
              aucun déplacement. <strong>Résultats en 3 à 5 séances</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
                onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
                aria-label="Réserver une séance d'hypnose en visio sur Resalib (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar size={20} />
                Réserver ma séance en visio
              </a>
              <a
                href="tel:+33649358089"
                aria-label="Appeler le 06 49 35 80 89"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 text-gray-900 rounded-lg font-semibold transition-all shadow-md border border-gray-200"
              >
                <Phone size={20} />
                06 49 35 80 89
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça se passe */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Comment se passe une séance d'hypnose en ligne ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Une séance d'hypnose en visio se déroule exactement comme au cabinet — la seule
                différence est que vous restez dans le confort de votre domicile. Vous recevez un
                <strong> lien de connexion sécurisé</strong> (Google Meet) et nous
                échangeons en face à face, par vidéo.
              </p>
              <p>
                La <strong>première séance dure environ 1h30</strong> : un entretien approfondi pour
                cerner votre problématique et définir vos objectifs, puis la séance d'hypnose
                ericksonienne guidée par la voix, et enfin un debriefing pour ancrer les changements.
                Les séances suivantes durent <strong>1 heure</strong>.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {[
                "Un ordinateur, une tablette ou un smartphone avec caméra",
                "Une connexion internet stable",
                "Un casque ou des écouteurs pour une meilleure immersion",
                "Un endroit calme où vous ne serez pas dérangé(e)",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-teal-50 p-4 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              La visio, pour qui ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                La téléconsultation d'hypnose s'adresse à toute personne qui souhaite être
                accompagnée sans contrainte géographique :
              </p>
            </div>
            <div className="space-y-4 mt-6">
              {[
                "Vous habitez en région, en zone rurale, ou loin de Paris",
                "Vous vivez à l'étranger et cherchez un accompagnement en français",
                "Votre emploi du temps ou vos déplacements rendent le présentiel difficile",
                "Vous êtes à mobilité réduite ou préférez le confort de chez vous",
                "Vous voyagez souvent et avez besoin de souplesse dans vos rendez-vous",
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border-l-4 border-teal-500">
                  <CheckCircle className="h-6 w-6 text-teal-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-700 leading-relaxed mt-6">
              La visio convient à la plupart des accompagnements :{' '}
              <Link to="/hypnose-stress-anxiete-paris" className="text-teal-600 hover:underline">stress et anxiété</Link>,{' '}
              <Link to="/hypnose-sommeil-paris" className="text-teal-600 hover:underline">troubles du sommeil</Link>,{' '}
              <Link to="/hypnose-confiance-en-soi-paris" className="text-teal-600 hover:underline">confiance en soi</Link>,{' '}
              <Link to="/hypnose-gestion-emotions-paris" className="text-teal-600 hover:underline">gestion des émotions</Link>,{' '}
              <Link to="/hypnose-blocages-paris" className="text-teal-600 hover:underline">blocages</Link>{' '}
              et préparation mentale.
            </p>
          </div>
        </div>
      </section>

      {/* Les avantages */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Les avantages de l'hypnose en visio
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { t: "Aucun déplacement", d: "Pas de transport, pas de temps perdu : vous gagnez en énergie et en sérénité avant la séance." },
                { t: "Partout en France", d: "Le même accompagnement, que vous soyez à Lyon, Marseille, Lille, Bordeaux, en campagne ou à l'étranger." },
                { t: "Dans votre environnement", d: "Être chez soi favorise le lâcher-prise. Les apprentissages s'ancrent dans votre cadre de vie réel." },
                { t: "Flexibilité des horaires", d: "Des créneaux plus faciles à caler dans un emploi du temps chargé, sans contrainte de trajet." },
                { t: "Même efficacité", d: "L'hypnose passe par la voix et la relation : la visio n'enlève rien à la profondeur du travail." },
                { t: "Continuité assurée", d: "Vous pouvez alterner visio et cabinet Paris 4ème selon vos besoins et vos déplacements." },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-teal-50 to-white p-6 rounded-xl border border-teal-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.t}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={visioFaqItems}
        title="Questions fréquentes sur l'hypnose en ligne"
        accentColor="text-teal-500"
        pageUrl="https://novahypnose.fr/hypnose-en-ligne"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Prêt à commencer, où que vous soyez ?
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Séances en visioconférence partout en France • ou au cabinet Paris 4ème Marais-Bastille • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/agenda/47325?src=novahypnose.fr"
                onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
                aria-label="Réserver une séance d'hypnose en visio sur Resalib (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-teal-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Réserver ma séance en visio
              </a>
              <a
                href="tel:+33649358089"
                aria-label="Appeler le 06 49 35 80 89"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-teal-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-teal-100">
              <Link to="/zone-intervention" className="hover:text-white underline flex items-center gap-1">
                <MapPin size={14} /> Zone d'intervention &amp; cabinet
              </Link>
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/test-receptivite" className="hover:text-white underline flex items-center gap-1">
                Tester ma réceptivité <ArrowRight size={14} />
              </Link>
              <Link to="/blog" className="hover:text-white underline flex items-center gap-1">
                Blog hypnose <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </ContentLayout>
  );
};

export default HypnoseEnLigne;
