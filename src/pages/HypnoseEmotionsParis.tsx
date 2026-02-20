import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import ContentLayout from '@/components/layout/ContentLayout';
import SpecialtyFAQ from '@/components/SpecialtyFAQ';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import { emotionsFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import Calendar from 'lucide-react/dist/esm/icons/calendar';
import Phone from 'lucide-react/dist/esm/icons/phone';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right';

const HypnoseEmotionsParis = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour la gestion des émotions à Paris",
    "description": "Apprenez à gérer vos émotions grâce à l'hypnose ericksonienne à Paris. Colère, hypersensibilité, deuil, frustration. Cabinet Paris 4ème Marais-Bastille.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie gestion des émotions",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose gestion des émotions Paris", "item": "https://novahypnose.fr/hypnose-gestion-emotions-paris" }
    ]
  };

  return (
    <ContentLayout>
      <Helmet>
        <title>Hypnose gestion des émotions Paris | Alain Zenatti</title>
        <meta name="description" content="Gérez vos émotions par l'hypnose à Paris 4ème. Colère, hypersensibilité, deuil, frustration. Alain Zenatti, Maître Hypnologue certifié. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose gestion émotions paris, hypnose colère paris, hypersensibilité hypnose paris, deuil hypnose paris, débordement émotionnel hypnose, gestion colère hypnothérapie paris, hypnose émotions paris" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-gestion-emotions-paris" />
        <meta property="og:title" content="Hypnose gestion des émotions Paris | Alain Zenatti" />
        <meta property="og:description" content="Apprenez à gérer vos émotions grâce à l'hypnose ericksonienne à Paris. Colère, hypersensibilité, deuil, frustration." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-gestion-emotions-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose gestion des émotions Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Gérez vos émotions par l'hypnose à Paris 4ème. Colère, hypersensibilité, deuil, frustration. Maître Hypnologue certifié." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              <span className="block text-rose-600 mb-2">Hypnose et gestion des émotions</span>
              <span className="block">Retrouvez votre équilibre à Paris</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Colère incontrôlable, hypersensibilité, deuil difficile, frustration permanente…
              Vos émotions vous submergent et vous ne savez plus comment les gérer ?
              L'hypnose vous aide à <strong>retrouver un équilibre émotionnel durable</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Prendre rendez-vous sur Resalib (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
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
              Vos émotions prennent le dessus ?
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Une remarque anodine et vous explosez de colère. Un souvenir et les larmes montent
                sans prévenir. Vous vous sentez à fleur de peau, comme si tout était amplifié.
                Vous oscillez entre des émotions intenses qui vous épuisent et une sensation de vide
                quand vous essayez de les contenir.
              </p>
              <p>
                L'hypersensibilité, les accès de colère, la difficulté à faire un deuil, la frustration
                chronique — ces difficultés ne sont pas un signe de faiblesse. Ce sont des <strong>réactions
                émotionnelles automatiques</strong> que votre inconscient a mises en place, souvent pour
                vous protéger.
              </p>
              <p>
                Le problème, c'est que ces mécanismes qui vous protégeaient autrefois vous empêchent
                aujourd'hui de vivre sereinement. L'hypnose permet de les recalibrer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ce que je traite */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Les troubles émotionnels que je traite
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: "Colère et irritabilité", desc: "Réactions disproportionnées, explosions de colère, impatience permanente" },
                { title: "Hypersensibilité", desc: "Émotions amplifiées, pleurs faciles, sensation d'être submergé(e)" },
                { title: "Deuil et séparation", desc: "Difficulté à surmonter une perte, une rupture ou un changement de vie" },
                { title: "Frustration chronique", desc: "Sentiment d'insatisfaction permanent, difficulté à accepter les situations" },
                { title: "Anxiété émotionnelle", desc: "Peur d'être submergé(e) par ses émotions, évitement des situations intenses" },
                { title: "Charge émotionnelle", desc: "Accumulation d'émotions non exprimées, sensation de trop-plein" }
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
              Comment l'hypnose régule vos émotions
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                L'hypnose ericksonienne ne supprime pas vos émotions — elle vous apprend à les vivre
                sans en être prisonnier. En accédant à votre inconscient, elle permet de :
              </p>
            </div>

            <div className="space-y-4 mt-8">
              {[
                "Identifier les déclencheurs émotionnels inconscients",
                "Retraiter les expériences passées qui amplifient vos réactions",
                "Installer des mécanismes de régulation naturels",
                "Développer votre capacité à ressentir sans être submergé(e)",
                "Transformer la colère et la frustration en énergie constructive",
                "Accompagner le processus de deuil en douceur"
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
              Mon approche pour l'équilibre émotionnel
            </h2>
            <div className="prose prose-lg text-gray-700 leading-relaxed">
              <p>
                Je suis <strong>Alain Zenatti, Maître Hypnologue certifié</strong> à Paris 4ème.
                La gestion des émotions est au cœur de ma pratique. Que vous soyez submergé(e) par
                la colère, paralysé(e) par un deuil ou épuisé(e) par votre hypersensibilité, je vous
                accompagne vers un nouvel équilibre.
              </p>
              <p>
                Mon approche est douce et progressive. Lors de la première séance, nous identifions
                ensemble les mécanismes émotionnels qui posent problème et leur origine. Ensuite,
                en hypnose profonde, je vous guide pour <strong>retraiter ces schémas</strong> et
                installer de nouvelles réponses émotionnelles plus adaptées.
              </p>
              <p>
                Je vous transmets aussi des <strong>techniques d'auto-hypnose</strong> pour gérer
                les moments d'intensité émotionnelle au quotidien — un outil que vous garderez pour la vie.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cas concrets */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Exemples de parcours au cabinet
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-rose-500">
                <h3 className="font-semibold text-gray-900 mb-2">Colères incontrôlables</h3>
                <p className="text-gray-700 leading-relaxed">
                  David*, chef de projet, explosait régulièrement au travail et à la maison. Ses accès
                  de colère disproportionnés abîmaient ses relations avec sa compagne et ses collègues.
                  Il se sentait coupable après chaque épisode mais ne parvenait pas à se contrôler.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  En 4 séances d'hypnose dans mon cabinet du Marais, nous avons identifié l'origine
                  de cette colère — une blessure d'enfance non traitée — et retraité la mémoire
                  émotionnelle. David réagit désormais de manière proportionnée et ses relations
                  se sont considérablement améliorées.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-rose-500">
                <h3 className="font-semibold text-gray-900 mb-2">Deuil difficile</h3>
                <p className="text-gray-700 leading-relaxed">
                  Anne*, 50 ans, était figée dans son deuil depuis la perte de sa mère un an plus tôt.
                  Elle ne parvenait plus à éprouver de joie, s'isolait, et avait perdu tout intérêt
                  pour ses activités. La tristesse omniprésente l'empêchait de vivre.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  En 5 séances d'hypnose ericksonienne, nous avons accompagné le processus de deuil en
                  douceur, en transformant la douleur en souvenirs apaisés et en gratitude. Anne a
                  retrouvé progressivement goût à la vie tout en gardant un lien serein avec sa mère.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-l-4 border-rose-500">
                <h3 className="font-semibold text-gray-900 mb-2">Hypersensibilité envahissante</h3>
                <p className="text-gray-700 leading-relaxed">
                  Sarah*, infirmière, absorbait les émotions de ses patients comme une éponge. Le soir,
                  elle était vidée, submergée par les émotions des autres au point de ne plus savoir
                  distinguer les siennes. Son hypersensibilité devenait un handicap professionnel.
                </p>
                <p className="text-gray-700 leading-relaxed mt-2">
                  En 3 séances, nous avons installé une &laquo;&nbsp;bulle de protection émotionnelle&nbsp;&raquo;
                  lui permettant de rester empathique sans être envahie. Sarah continue d'exercer
                  avec passion, mais sans se vider émotionnellement.
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4 italic">* Prénoms modifiés pour préserver la confidentialité</p>
          </div>
        </div>
      </section>

      {/* Témoignage */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <blockquote className="relative bg-rose-50 p-8 rounded-xl">
              <div className="absolute top-4 left-6 text-6xl text-rose-200 font-serif leading-none">"</div>
              <p className="text-lg text-gray-700 leading-relaxed italic pl-8">
                Découvrir NovaHypnose est une expérience marquante. J'ai laissé derrière moi certaines
                croyances figées et j'ai ouvert un espace intérieur plus souple, plus libre.
                Me voilà en adéquation avec mon présent et les envies que je croyais inaccessibles.
              </p>
              <footer className="mt-4 pl-8 text-gray-600 font-medium">— Edward, avis Google vérifié</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Retrouvez la paix intérieure
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-rose-600 mb-2">3-5</div>
                <p className="text-gray-700">séances pour un équilibre émotionnel durable</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-rose-600 mb-2">100%</div>
                <p className="text-gray-700">personnalisé selon votre vécu et vos émotions</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="text-4xl font-bold text-rose-600 mb-2">5/5</div>
                <p className="text-gray-700">note moyenne sur plus de 40 avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpecialtyFAQ
        items={emotionsFaqItems}
        title="Questions fréquentes sur l'hypnose et les émotions"
        accentColor="text-rose-500"
        pageUrl="https://novahypnose.fr/hypnose-gestion-emotions-paris"
      />

      <SpecialtyBlogArticles
        keywords={["émotion", "colère", "amoureux", "deuil"]}
        categories={["Gestion des émotions & bien-être"]}
        title="Articles sur la gestion des émotions"
        accentColor="text-rose-600"
      />

      {/* CTA final */}
      <section className="py-16 md:py-20 bg-rose-600">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Reprenez le contrôle de vos émotions
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Cabinet Paris 4ème – Marais-Bastille • Métro Bastille (lignes 1, 5, 8) • 90&nbsp;€ la séance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris"
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="Prendre rendez-vous sur Resalib (nouvel onglet)"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-100 text-rose-600 rounded-lg font-bold text-lg transition-all shadow-lg"
              >
                <Calendar size={22} />
                Prendre rendez-vous
              </a>
              <a
                href="tel:+33649358089"
                aria-label="Appeler le 06 49 35 80 89"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg border border-rose-400"
              >
                <Phone size={22} />
                06 49 35 80 89
              </a>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-rose-100">
              <Link to="/hypnose-stress-anxiete-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et stress <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-blocages-paris" className="hover:text-white underline flex items-center gap-1">
                Blocages et comportements <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-confiance-en-soi-paris" className="hover:text-white underline flex items-center gap-1">
                Confiance en soi <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-phobies-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et phobies <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-sommeil-paris" className="hover:text-white underline flex items-center gap-1">
                Hypnose et sommeil <ArrowRight size={14} />
              </Link>
              <Link to="/hypnose-professionnels-paris" className="hover:text-white underline flex items-center gap-1">
                Stress au travail <ArrowRight size={14} />
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

export default HypnoseEmotionsParis;
