import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import { phobiesFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnosePhobiesParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les phobies à Paris",
    "description": "Traitement des phobies et des peurs par l'hypnose ericksonienne. Cabinet Paris 4ème Marais-Bastille. Résultats rapides en 2 à 4 séances.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie phobies",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose phobies Paris", "item": "https://novahypnose.fr/hypnose-phobies-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose phobies et peurs Paris | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous de vos phobies par l'hypnose à Paris 4ème. Phobie avion, claustrophobie, peur de parler en public. Résultats en 2 à 4 séances." />
        <meta name="keywords" content="hypnose phobie paris, hypnose peur paris, phobie avion hypnose paris, claustrophobie hypnose, arachnophobie hypnose paris, peur parler public hypnose paris, traitement phobie paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-phobies-paris" />
        <meta property="og:title" content="Hypnose phobies et peurs Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous de vos phobies grâce à l'hypnose ericksonienne à Paris. Résultats rapides en 2 à 4 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-phobies-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-purple-600 mb-2">Hypnose et phobies</span>
              <span className="block">Libérez-vous de vos peurs à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Peur de l'avion, des araignées, du vide, des espaces clos, de parler en public…
              Vos phobies limitent votre vie quotidienne ? L'hypnose est l'une des méthodes les plus
              efficaces pour s'en libérer. <strong>Résultats en 2 à 4 séances</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Prendre rendez-vous sur Resalib (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar size={20} />
                Prendre rendez-vous
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

      {/* Le problème */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Une phobie vous gâche la vie ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous évitez certaines situations par peur. Vous annulez des voyages, vous refusez des opportunités,
                vous arrangez votre vie entière autour de cette peur. Vous savez que c'est irrationnel — mais
                c'est plus fort que vous.
              </p>
              <p>
                La phobie est un mécanisme de protection que votre inconscient a mis en place, souvent à la suite
                d'une expérience marquante. Ce mécanisme était peut-être utile à un moment, mais aujourd'hui il
                vous limite. La bonne nouvelle : <strong>ce qui a été appris peut être désappris</strong>.
              </p>
              <p>
                L'hypnose permet de reprogrammer cette réaction automatique rapidement, sans avoir à revivre
                l'événement traumatisant, et sans exposition forcée à l'objet de votre peur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types de phobies */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Les phobies que je traite par l'hypnose
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Phobie de l'avion", desc: "Voyagez enfin sereinement, sans anxiété ni crise de panique" },
                { title: "Claustrophobie", desc: "Ascenseurs, métro, IRM… retrouvez votre liberté de mouvement" },
                { title: "Arachnophobie", desc: "Araignées, insectes… cessez de vivre dans l'appréhension" },
                { title: "Peur du vide (acrophobie)", desc: "Balcons, escaliers, hauteurs… reprenez le contrôle" },
                { title: "Peur de parler en public", desc: "Présentations, réunions, oral… exprimez-vous avec aisance" },
                { title: "Phobie sociale", desc: "Retrouvez le plaisir des interactions et de la vie en société" },
                { title: "Peur de conduire (amaxophobie)", desc: "Reprenez le volant en toute confiance" },
                { title: "Autres phobies", desc: "Peur du sang, des aiguilles, de l'eau, du dentiste…" }
              ].map((phobie, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">{phobie.title}</h3>
                  <p className="text-gray-600 text-sm">{phobie.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment ça marche */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Comment l'hypnose élimine les phobies
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne agit sur la racine de la phobie : le programme inconscient qui déclenche
                la réaction de panique. Lors de la séance, vous restez conscient et en contrôle. Je vous guide
                dans un état de relaxation profonde pour :
              </p>
            </div>

            <div className="space-y-4 mt-8">
              {[
                "Identifier l'origine de la phobie et le déclencheur inconscient",
                "Dissocier l'émotion de peur du stimulus (l'objet, la situation)",
                "Créer de nouvelles associations positives et neutres",
                "Renforcer votre sentiment de sécurité et de contrôle",
                "Installer des automatismes de calme face à la situation redoutée"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong>, spécialisé dans le traitement
                des phobies par l'hypnose. Mon cabinet est situé à <strong>Paris 4ème, quartier Marais-Bastille</strong>.
                Chaque accompagnement est personnalisé selon votre phobie spécifique et votre histoire.
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
              Des résultats rapides et durables
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-purple-600 mb-2">2-4</div>
                <p className="text-gray-700">séances suffisent en moyenne pour traiter une phobie</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
                <p className="text-gray-700">des phobies simples peuvent être traitées par l'hypnose</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-purple-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={phobiesFaqItems}
        title="Questions fréquentes sur l'hypnose et les phobies"
        accentColor="text-purple-500"
        pageUrl="https://novahypnose.fr/hypnose-phobies-paris"
      />

      <SpecialtyBlogArticles
        keywords={["phobie", "peur", "phobique"]}
        categories={["Troubles Anxieux"]}
        title="Articles sur les phobies"
        accentColor="text-purple-600"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Libérez-vous de vos phobies
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Prendre rendez-vous sur Resalib (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-purple-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                aria-label="Appeler le 06 49 35 80 89"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-500 hover:bg-purple-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-purple-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-purple-100">
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-sommeil-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et sommeil <ArrowRight size={14} />
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

export default HypnosePhobiesParis;
