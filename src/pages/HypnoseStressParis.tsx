import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import SpecialtyBlogArticles from '@/components/blog/SpecialtyBlogArticles';
import SpecialtyReferences from '@/components/SpecialtyReferences';
import { stressFaqItems } from '@/data/specialtyFaqData';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema } from '@/data/schemaOrg';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const HypnoseStressParis = () => {
  const { openResalibPopup } = useResalibPopup();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hypnose pour le stress et l'anxiété à Paris",
    "description": "Séances d'hypnose ericksonienne pour traiter le stress, l'anxiété et le burn-out. Cabinet Paris 4ème Marais-Bastille. Résultats en 3 à 5 séances.",
    "url": "https://novahypnose.fr/hypnose-stress-anxiete-paris",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": [
      { "@type": "City", "name": "Paris" },
      { "@type": "Country", "name": "France" }
    ],
    "serviceType": "Hypnothérapie anti-stress",
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
      { "@type": "ListItem", "position": 2, "name": "Hypnose stress et anxiété Paris", "item": "https://novahypnose.fr/hypnose-stress-anxiete-paris" }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": stressFaqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": { "@type": "Answer", "text": item.answer }
    }))
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Hypnose stress & anxiété à Paris et en ligne | Alain Zenatti</title>
        <meta name="description" content="Libérez-vous du stress chronique et de l'anxiété par l'hypnose à Paris 4ème ou en visio partout en France. Alain Zenatti, Maître Hypnologue certifié. Résultats durables en 3 à 5 séances." />
        <meta name="keywords" content="hypnose stress paris, hypnose anxiété paris, hypnothérapeute stress paris, gestion stress hypnose, burn-out hypnose paris, anxiété hypnothérapie paris, stress travail hypnose, hypnose stress en ligne, séance hypnose anxiété visio France, hypnose stress à distance, téléconsultation hypnose stress" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-stress-anxiete-paris" />
        <meta property="og:title" content="Hypnose stress & anxiété à Paris et en ligne | Alain Zenatti" />
        <meta property="og:description" content="Libérez-vous du stress chronique et de l'anxiété par l'hypnose à Paris 4ème ou en visio partout en France. Alain Zenatti, Maître Hypnologue certifié. Résultats durables en 3 à 5 séances." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-stress-anxiete-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème – Hypnose stress et anxiété" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose stress & anxiété à Paris et en ligne | Alain Zenatti" />
        <meta name="twitter:description" content="Libérez-vous du stress chronique et de l'anxiété par l'hypnose à Paris 4ème ou en visio partout en France. Alain Zenatti, Maître Hypnologue certifié. Résultats durables en 3 à 5 séances." />
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
          <div className="tag">Stress &amp; Anxiété — Paris</div>
          <h1 className="sp-hero__h1">
            Retrouvez la sérénité<br/><em>par l'hypnose</em>
          </h1>
          <p className="sp-hero__lead">
            Le stress et l'anxiété vous empêchent de vivre pleinement ? L'hypnose ericksonienne est une méthode
            naturelle et efficace pour retrouver le calme intérieur. <strong>Résultats durables en 3 à 5 séances</strong>,
            au cabinet à Paris 4ème ou en <strong>visio partout en France</strong>.
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
      <section className="sp-section sp-deco-wrap">
        <svg className="sp-deco-blob sp-deco-blob--right" width="380" height="420" viewBox="0 0 380 420" aria-hidden="true">
          <g filter="url(#riso-full)">
            <path d="M 80 50 C 200 10, 340 50, 360 160 C 375 250, 320 330, 350 390 C 365 430, 290 445, 190 435 C 80 423, 20 400, 10 310 C 0 220, 30 120, 80 50 Z" fill="#F2A12E" opacity="0.55" />
          </g>
          <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
            <path d="M 130 140 C 230 100, 320 140, 330 240 C 338 320, 270 375, 180 370 C 90 365, 50 295, 65 210 C 73 163, 100 156, 130 140 Z" fill="#2B4BA0" opacity="0.3" />
          </g>
          <rect width="380" height="420" filter="url(#paperGrain)" opacity=".15" />
        </svg>
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Le stress vous empêche de vivre ?</h2>
          <div className="sp-prose">
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
      </section>

      {/* Comment l'hypnose agit */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Comment l'hypnose agit sur le stress et l'anxiété</h2>
          <div className="sp-prose">
            <p>
              L'hypnose ericksonienne travaille directement avec votre inconscient — là où se trouvent les automatismes
              qui génèrent le stress. En état d'hypnose, le cerveau réduit naturellement la production de <strong>cortisol</strong>,
              l'hormone du stress, tout en activant le <strong>système nerveux parasympathique</strong>. Concrètement, votre cerveau
              réapprend à distinguer un vrai danger d'une simple pression du quotidien.
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Reprogrammer les réactions automatiques de stress",
              "Relâcher les tensions accumulées dans le corps",
              "Retrouver un sommeil profond et réparateur",
              "Développer des ressources internes de calme",
              "Prendre du recul face aux situations anxiogènes",
              "Stopper le cercle vicieux des pensées négatives"
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cas concrets */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Exemples de parcours au cabinet</h2>
          <div className="sp-cases">
            <div className="sp-case reveal">
              <div className="sp-case__title">Stress professionnel chronique</div>
              <p>
                Sophie*, cadre dans la finance à Paris, ne dormait plus que 4 heures par nuit. Les tensions au
                bureau avaient envahi toute sa vie : maux de tête, irritabilité, incapacité à décrocher le soir.
              </p>
              <p>
                En 4 séances d'hypnose dans mon cabinet du Marais, nous avons identifié et neutralisé les
                mécanismes inconscients qui maintenaient son hypervigilance. Sophie a retrouvé un sommeil
                réparateur et une capacité à poser des limites saines au travail.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Crises d'angoisse dans les transports</div>
              <p>
                Marc*, 35 ans, évitait le métro depuis un an après une première crise de panique en heure de
                pointe. Il prenait des taxis pour aller travailler, ce qui pesait sur son budget et renforçait
                son sentiment d'impuissance face à l'anxiété.
              </p>
              <p>
                Après 3 séances d'hypnose ericksonienne, Marc a repris le métro — d'abord aux heures creuses,
                puis normalement. La technique d'auto-hypnose rapide que je lui ai enseignée lui permet de
                gérer toute montée d'anxiété en quelques respirations.
              </p>
            </div>
            <div className="sp-case reveal">
              <div className="sp-case__title">Anxiété liée aux examens</div>
              <p>
                Léa*, étudiante en droit, se paralysait systématiquement devant ses copies d'examen.
                Elle connaissait son cours, mais le trac lui faisait perdre tous ses moyens.
              </p>
              <p>
                En 3 séances, nous avons reprogrammé sa réponse au stress d'examen et ancré un état de
                concentration calme qu'elle peut activer avant chaque épreuve. Ses résultats se sont
                nettement améliorés dès la session suivante.
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
              J'ai consulté pour un problème d'anxiété, dès la première séance je me suis sentie
              apaisée et sereine. Alain est à l'écoute et mon anxiété a totalement disparu en 3 séances.
              Je recommande vivement.
            </p>
            <footer>— Marie H., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* Stats */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <div className="sp-stats">
            {[
              { value: '90%', label: 'de mes patients constatent une amélioration dès la première séance' },
              { value: '3-5', label: 'séances suffisent en moyenne pour un résultat durable' },
              { value: '5/5', label: 'note moyenne sur Resalib et Google — plus de 40 avis vérifiés' },
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
      <section className="sp-section sp-section--alt sp-deco-wrap">
        <svg className="sp-deco-blob sp-deco-blob--left" width="340" height="380" viewBox="0 0 340 380" aria-hidden="true">
          <g filter="url(#riso-full)">
            <path d="M 70 80 C 170 30, 300 70, 320 170 C 335 250, 280 320, 250 360 C 230 390, 150 390, 80 360 C 20 335, -10 260, 10 180 C 25 115, 60 100, 70 80 Z" fill="#2B4BA0" opacity="0.45" />
          </g>
          <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' as const }}>
            <path d="M 110 150 C 200 110, 280 155, 285 240 C 290 315, 230 365, 155 358 C 80 350, 45 285, 60 205 C 69 160, 90 160, 110 150 Z" fill="#F2A12E" opacity="0.25" />
          </g>
          <rect width="340" height="380" filter="url(#paperGrain)" opacity=".15" />
        </svg>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes sur l'hypnose et le stress</h2>
          <div>
            {stressFaqItems.map((item, i) => (
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
          keywords={["stress", "anxiété", "anxieux"]}
          categories={["Gestion du Stress", "Troubles Anxieux"]}
          title="Articles sur le stress et l'anxiété"
          accentColor="text-blue-600"
        />
      </div>

      <div className="sp-ext-section">
        <SpecialtyReferences
          pageUrl="https://novahypnose.fr/hypnose-stress-anxiete-paris"
          pageTitle="Hypnose stress et anxiété à Paris"
          pageDescription="Hypnose ericksonienne pour traiter le stress chronique et l'anxiété au cabinet Paris 4ème."
          topic="le stress et l'anxiété"
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
              authors: "Valentine KE, Milling LS, Clark LJ, Moriarty CL",
              title: "The Efficacy of Hypnosis as a Treatment for Anxiety: A Meta-Analysis",
              source: "International Journal of Clinical and Experimental Hypnosis",
              year: 2019,
              url: "https://pubmed.ncbi.nlm.nih.gov/31251710/",
            },
            {
              authors: "Hammond DC",
              title: "Hypnosis in the treatment of anxiety- and stress-related disorders",
              source: "Expert Review of Neurotherapeutics",
              year: 2010,
              url: "https://pubmed.ncbi.nlm.nih.gov/20128679/",
            },
          ]}
        />
      </div>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="sp-cta-final__blob" aria-hidden="true"></div>
        <div className="sp-cta-final__blob sp-cta-final__blob--2" aria-hidden="true"></div>
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à retrouver la sérénité ?</h2>
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
            <Link to="/hypnose-phobies-paris">Hypnose et phobies →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/hypnose-gestion-emotions-paris">Gestion des émotions →</Link>
            <Link to="/hypnose-blocages-paris">Blocages et comportements →</Link>
            <Link to="/hypnose-confiance-en-soi-paris">Confiance en soi →</Link>
            <Link to="/hypnose-professionnels-paris">Stress au travail →</Link>
            <Link to="/test-receptivite">Tester ma réceptivité →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default HypnoseStressParis;
