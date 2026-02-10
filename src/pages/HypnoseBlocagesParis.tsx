import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import { blocagesFaqItems } from '@/data/specialtyFaqData';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnoseBlocagesParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les blocages et troubles du comportement à Paris",
    "description": "Libérez-vous de vos blocages et troubles du comportement grâce à l'hypnose ericksonienne à Paris. Procrastination, TOC, addictions, schémas répétitifs. Cabinet Paris 4ème.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie blocages comportementaux",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose blocages Paris", "item": "https://novahypnose.fr/hypnose-blocages-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose blocages et comportements Paris | Zenatti</title>
        <meta name="description" content="Libérez vos blocages par l'hypnose à Paris 4ème. Procrastination, schémas répétitifs, TOC, addictions. Alain Zenatti, Maître Hypnologue." />
        <meta name="keywords" content="hypnose blocage paris, troubles comportement hypnose paris, procrastination hypnose paris, TOC hypnose paris, onychophagie hypnose paris, schémas répétitifs hypnose, hypnose addictions paris, blocage psychologique hypnose" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-blocages-paris" />
        <meta property="og:title" content="Hypnose blocages et troubles du comportement Paris | Alain Zenatti" />
        <meta property="og:description" content="Libérez vos blocages et changez vos comportements grâce à l'hypnose ericksonienne à Paris. Procrastination, TOC, schémas répétitifs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-blocages-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 to-cyan-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-teal-600 mb-2">Blocages et troubles du comportement</span>
              <span className="block">Libérez-vous par l'hypnose à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Vous procrastinez, vous répétez les mêmes erreurs, vous n'arrivez pas à changer
              malgré votre volonté ? Ces comportements ne sont pas un choix — ce sont des
              <strong> programmes inconscients</strong> que l'hypnose peut débloquer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
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
              Vous êtes bloqué(e) malgré votre volonté ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Vous savez exactement ce que vous devriez faire, mais vous n'y arrivez pas. Vous repoussez
                sans cesse ce qui est important. Vous répétez les mêmes schémas relationnels ou professionnels.
                Vous avez des comportements que vous aimeriez changer — vous ronger les ongles, des tics,
                des habitudes compulsives — mais c'est plus fort que vous.
              </p>
              <p>
                Ce n'est ni de la paresse, ni un manque de volonté. Ces comportements sont <strong>pilotés
                par votre inconscient</strong>. Ils répondent à un besoin profond — souvent de protection
                ou de réconfort — que votre conscient ne perçoit pas. C'est pour ça que la volonté seule
                ne suffit pas.
              </p>
              <p>
                L'hypnose va directement à la source : elle dialogue avec l'inconscient pour comprendre
                le besoin caché derrière le comportement et proposer une alternative plus adaptée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Types de blocages */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Les blocages et troubles que je traite
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Procrastination", desc: "Vous repoussez constamment les tâches importantes, même quand vous en connaissez les conséquences" },
                { title: "Schémas répétitifs", desc: "Vous reproduisez toujours les mêmes erreurs dans vos relations, votre travail ou vos choix de vie" },
                { title: "Onychophagie", desc: "Vous vous rongez les ongles compulsivement, souvent sans même vous en rendre compte" },
                { title: "TOC et rituels", desc: "Comportements répétitifs, vérifications excessives, pensées obsessionnelles envahissantes" },
                { title: "Blocages professionnels", desc: "Incapacité à passer à l'action, peur de réussir ou de l'échec, auto-sabotage" },
                { title: "Addictions comportementales", desc: "Écrans, jeux, achats compulsifs… des comportements dont vous ne parvenez pas à vous défaire" }
              ].map((item, index) => (
                <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comment l'hypnose agit */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Comment l'hypnose débloque vos comportements
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne ne combat pas le comportement — elle le rend inutile en traitant
                sa cause. En état d'hypnose, je vous guide pour :
              </p>
            </div>

            <div className="space-y-4 mt-8">
              {[
                "Identifier le besoin inconscient qui maintient le comportement",
                "Retraiter les expériences à l'origine du blocage",
                "Remplacer les automatismes dysfonctionnels par de nouvelles réponses",
                "Briser les schémas répétitifs en créant de nouveaux circuits mentaux",
                "Retrouver la capacité d'agir et de passer à l'action",
                "Ancrer de nouveaux comportements qui deviennent naturels"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Mon approche pour libérer vos blocages
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème.
                Les blocages et les troubles du comportement sont des problématiques que je traite
                quotidiennement au cabinet. Mon approche est sans jugement et entièrement personnalisée.
              </p>
              <p>
                Lors de la première séance, nous explorons ensemble le comportement qui vous pose problème :
                quand il est apparu, ce qui le déclenche, ce que vous avez déjà essayé. Ensuite, en hypnose,
                nous allons chercher la <strong>fonction cachée</strong> de ce comportement pour proposer
                à votre inconscient une meilleure solution.
              </p>
              <p>
                Je combine l'hypnose ericksonienne avec des techniques de PNL pour maximiser l'efficacité.
                Vous repartirez aussi avec des <strong>outils d'auto-hypnose</strong> pour consolider
                le travail entre les séances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Changez enfin ce qui semblait impossible
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-teal-600 mb-2">3-5</div>
                <p className="text-gray-700">séances pour débloquer les comportements les plus ancrés</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
                <p className="text-gray-700">personnalisé selon votre blocage et votre histoire</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-teal-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={blocagesFaqItems}
        title="Questions fréquentes sur l'hypnose et les blocages"
        accentColor="text-teal-500"
        pageUrl="https://novahypnose.fr/hypnose-blocages-paris"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-teal-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Libérez-vous de vos blocages
            </h2>
            <p className="text-xl text-teal-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-teal-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-teal-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-teal-100">
              <Link to="/hypnose-gestion-emotions-paris" className="hover:text-white underline flex items-center gap-1">
                Gestion des émotions <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
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

export default HypnoseBlocagesParis;
