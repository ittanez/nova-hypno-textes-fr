import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { sommeilFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseSommeilParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour les troubles du sommeil à Paris",
    "description": "Retrouvez un sommeil profond et réparateur grâce à l'hypnose ericksonienne. Insomnie, réveils nocturnes, endormissement difficile. Cabinet Paris 4ème.",
    "url": "https://novahypnose.fr/hypnose-sommeil-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie sommeil",
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://www.resalib.fr/agenda/47325?src=novahypnose.fr",
      "name": "Au cabinet Paris 4ème ou en visioconférence (Google Meet)"
    },
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": sommeilFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose sommeil & insomnie à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Retrouvez un sommeil profond par l'hypnose à Paris 4ème ou en visio partout en France. Insomnie, réveils nocturnes, endormissement difficile. Sans médicament. Résultats en 3 à 5 séances." />
        <meta name="keywords" content="hypnose sommeil paris, hypnose insomnie paris, troubles sommeil hypnose, hypnothérapeute insomnie paris, retrouver sommeil hypnose, réveils nocturnes hypnose, endormissement hypnose paris, hypnose sommeil en ligne, séance hypnose insomnie visio France, hypnose sommeil à distance, téléconsultation hypnose sommeil" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-sommeil-paris" />
        <meta property="og:title" content="Hypnose sommeil & insomnie à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Retrouvez un sommeil profond par l'hypnose à Paris 4ème ou en visio partout en France. Insomnie, réveils nocturnes, endormissement difficile. Sans médicament. Résultats en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-sommeil-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose troubles du sommeil" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose sommeil & insomnie à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Retrouvez un sommeil profond par l'hypnose à Paris 4ème ou en visio partout en France. Insomnie, réveils nocturnes, endormissement difficile. Sans médicament. Résultats en 3 à 5 séances." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(faqSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-hero__bg" aria-hidden="true">
          <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{width:'100%',height:'100%'}}>
            <g filter="url(#riso-full)">
              <path d="M 200 60 C 400 20, 700 60, 900 160 C 1040 230, 1150 240, 1280 180 C 1360 140, 1440 170, 1440 250 L 1440 0 L 0 0 L 0 200 C 60 130, 130 80, 200 60 Z" fill="#F2A12E" opacity="0.9" />
            </g>
            <g filter="url(#riso-full)" style={{mixBlendMode:'multiply'}}>
              <path d="M 0 720 C 200 660, 500 640, 800 680 C 1100 720, 1280 700, 1440 740 L 1440 900 L 0 900 Z" fill="#2B4BA0" opacity="0.88" />
            </g>
            <rect width="1440" height="900" filter="url(#paperGrain)" opacity=".2" />
          </svg>
        </div>
        <div className="container sp-hero__inner reveal">
          <div className="tag">Sommeil &amp; Insomnie — Paris</div>
          <h1 className="sp-hero__h1">
            Retrouvez des nuits sereines<br/><em>par l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Insomnie, réveils nocturnes, difficultés d'endormissement, sommeil non réparateur…
            L'hypnose est une alternative naturelle et efficace aux somnifères.
            <strong> Retrouvez le sommeil en 3 à 5 séances</strong>, au cabinet à Paris 4ème ou en
            <strong> visio partout en France</strong>.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089">06 49 35 80 89</a>
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Le manque de sommeil détruit votre quotidien ?</h2>
          <div className="sp-prose">
            <p>
              Vous vous couchez épuisé(e) mais votre cerveau ne s'arrête pas. Les pensées tournent en boucle.
              Vous regardez l'heure : 1h, 2h, 3h du matin… Quand le réveil sonne, vous êtes plus fatigué(e)
              qu'en vous couchant.
            </p>
            <p>
              Le manque de sommeil affecte tout : votre humeur, votre concentration, votre santé, vos relations.
              Les somnifères vous assomment sans vous offrir un vrai repos.
            </p>
            <p>
              Le problème n'est pas dans votre corps. Il est dans votre <strong>inconscient</strong>, qui a
              &laquo;&nbsp;oublié&nbsp;&raquo; comment lâcher prise pour s'endormir. L'hypnose lui rappelle.
            </p>
          </div>
        </div>
      </section>

      {/* Comment l'hypnose agit */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment l'hypnose restaure votre sommeil</h2>
          <div className="sp-prose">
            <p>
              L'hypnose ericksonienne travaille sur les causes profondes de vos troubles du sommeil, pas
              seulement sur les symptômes. En accédant à votre inconscient, elle permet de :
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Calmer le mental hyperactif qui empêche l'endormissement",
              "Désactiver l'anxiété anticipatoire liée au coucher",
              "Restaurer le cycle naturel veille-sommeil",
              "Éliminer les réveils nocturnes et les ruminations",
              "Apprendre l'auto-hypnose pour vous endormir seul(e)",
              "Retrouver un sommeil profond et réparateur sans médicament"
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Mon approche pour retrouver le sommeil</h2>
          <div className="sp-prose">
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
      </section>

      {/* Cas concrets */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Insomnie chronique liée au travail</div>
              <p>
                Laurent*, directeur commercial, ne dormait plus que 3 à 4 heures par nuit depuis
                18 mois. Son cerveau continuait à &laquo;&nbsp;travailler&nbsp;&raquo; la nuit, repassant en boucle
                les problèmes du bureau.
              </p>
              <p>
                En 4 séances d'hypnose dans mon cabinet de Paris 4ème, nous avons installé un
                &laquo;&nbsp;interrupteur mental&nbsp;&raquo; lui permettant de couper ses pensées professionnelles
                le soir. Laurent dort désormais 7 heures par nuit et se réveille reposé.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Réveils nocturnes et ruminations</div>
              <p>
                Nathalie*, 42 ans, se réveillait chaque nuit vers 3h du matin avec des pensées
                anxieuses impossibles à stopper. Le manque de sommeil avait des répercussions sur son humeur
                et ses relations familiales.
              </p>
              <p>
                En 3 séances, nous avons traité la source de l'anxiété nocturne et je lui ai transmis une technique d'auto-hypnose pour se rendormir
                en quelques minutes. Ses réveils nocturnes ont cessé dès la deuxième semaine.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Sevrage des somnifères</div>
              <p>
                Patrick*, 55 ans, prenait des somnifères depuis 8 ans. Il voulait arrêter mais
                n'y arrivait pas seul : sans médicament, l'endormissement devenait impossible.
              </p>
              <p>
                En 5 séances progressives, nous avons réappris à son inconscient à s'endormir
                naturellement. Patrick a pu réduire puis arrêter complètement ses somnifères,
                en accord avec son médecin. Il retrouve un sommeil naturel et réparateur.
              </p>
            </div>
          </div>
          <p className="sp-footnote">* Prénoms modifiés pour préserver la confidentialité</p>
        </div>
      </section>

      {/* Témoignage */}
      <section className="sp-section">
        <div className="container sp-narrow">
          <blockquote className="sp-quote reveal">
            <p>
              Excellente séance avec Alain qui sait comprendre nos besoins puis faire en sorte
              que l'on atteigne nos objectifs. Après des mois d'insomnie, j'ai retrouvé des
              nuits complètes en quelques séances seulement.
            </p>
            <footer>— Jaouad M., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '3-5', label: 'séances pour retrouver un sommeil stable et réparateur' },
              { value: '0', label: 'médicament nécessaire — une solution 100% naturelle' },
              { value: '5/5', label: 'note moyenne sur plus de 40 avis vérifiés' },
            ].map((s, i) => (
              <div key={i} className="sp-stat reveal">
                <div className="sp-stat__val">{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et le sommeil</h2>
          <div>
            {sommeilFaqItems.map((item, i) => (
              <div key={i} className={`faq__item${openFaq === i ? ' open' : ''}`}>
                <button className="faq__q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {item.question}
                  <span className="faq__icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                <div className="faq__a">{item.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sp-ext-section">
        <SpecialtyBlogArticles
          keywords={["sommeil", "insomnie", "dormir"]}
          title="Articles sur le sommeil"
          accentColor="text-indigo-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-sommeil-paris"
          pageTitle="Hypnose pour le sommeil à Paris"
          pageDescription="Hypnose ericksonienne pour traiter l'insomnie, les réveils nocturnes et les difficultés d'endormissement au cabinet Paris 4ème."
          topic="les troubles du sommeil"
          dateModified="2026-05-06"
          references={[
            {
              authors: "Inserm",
              title: "Évaluation de l'efficacité de la pratique de l'hypnose",
              source: "Rapport d'expertise collective",
              year: 2015,
              url: "https://www.inserm.fr/expertise-collective/evaluation-efficacite-pratique-hypnose/",
            },
            {
              authors: "Cordi MJ, Schlarb AA, Rasch B",
              title: "Deepening sleep by hypnotic suggestion",
              source: "Sleep",
              year: 2014,
              url: "https://pubmed.ncbi.nlm.nih.gov/24882908/",
            },
            {
              authors: "Chamine I, Atchley R, Oken BS",
              title: "Hypnosis Intervention Effects on Sleep Outcomes: A Systematic Review",
              source: "Journal of Clinical Sleep Medicine",
              year: 2018,
              url: "https://pubmed.ncbi.nlm.nih.gov/29198290/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Retrouvez le sommeil que vous méritez</h2>
          <p className="sp-lead">Cabinet Paris 4ème – Marais-Bastille (Métro Bastille, lignes 1, 5, 8) • Séances au cabinet ou en visio partout en France • 90&nbsp;€ la séance</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseSommeilParis;
