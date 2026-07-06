import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import CheckCircle from 'lucide-react/dist/esm/icons/check-circle';
import Brain from 'lucide-react/dist/esm/icons/brain';
import Headphones from 'lucide-react/dist/esm/icons/headphones';
import MessagesSquare from 'lucide-react/dist/esm/icons/messages-square';

const CALENDLY_URL = 'https://calendly.com/zenatti/rdvtelephonique?hide_event_type_details=1&hide_gdpr_banner=1';
const WHATSAPP_URL = 'https://wa.me/33649358089?text=Bonjour%20Alain%2C%20j%27ai%20une%20question%20';

const LandingProfessionnels: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Accompagnement hypnose pour professionnels en souffrance au travail — Paris",
    "description": "Accompagnement individuel en hypnose ericksonienne, auto-hypnose et communication relationnelle pour les salariés et professionnels en souffrance au travail. Stress, burn-out, sommeil, émotions, relations. Cabinet Paris 4ème.",
    "provider": { "@id": "https://novahypnose.fr/#person" },
    "areaServed": { "@type": "City", "name": "Paris" },
    "serviceType": "Hypnothérapie — accompagnement professionnel"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://novahypnose.fr" },
      { "@type": "ListItem", "position": 2, "name": "Accompagnement professionnels", "item": "https://novahypnose.fr/hypnose-professionnels-paris" }
    ]
  };

  const faqItems = [
    {
      question: "C'est quoi exactement un appel découverte ?",
      answer: "C'est un échange de 20 à 30 minutes, gratuit et sans engagement. On fait le point sur votre situation, je vous explique comment l'accompagnement fonctionne, et on voit ensemble si c'est le bon chemin pour vous. Pas de pression, pas de vente forcée.",
    },
    {
      question: "En combien de séances verra-t-on des résultats ?",
      answer: "La plupart de mes clients professionnels ressentent une différence réelle après les 2 premières séances. L'accompagnement complet dure généralement 6 à 8 séances sur 10 à 12 semaines. C'est un parcours structuré, pas un soin à durée indéfinie.",
    },
    {
      question: "Est-ce que c'est possible en visio depuis ma région ?",
      answer: "Oui. Toutes les séances peuvent se faire en visio (Google Meet), depuis n'importe où en France ou à l'étranger. L'efficacité est la même qu'au cabinet — l'hypnose passe par la voix.",
    },
    {
      question: "Comment l'hypnose peut-elle m'aider concrètement pour le burn-out ?",
      answer: "L'hypnose agit directement sur les mécanismes inconscients qui maintiennent le stress chronique : hypervigilance, incapacité à décrocher, ruminations. Elle ne remplace pas un arrêt maladie si nécessaire, mais elle accélère la récupération et modifie les automatismes qui ont mené à l'épuisement.",
    },
  ];

  return (
    <CzLayout
      ctaHref={CALENDLY_URL}
      ctaLabel="Appel découverte gratuit"
    >
      <Helmet>
        <title>Hypnose stress au travail Paris | Alain Zenatti</title>
        <meta name="description" content="Hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Résultats en quelques semaines. Appel découverte gratuit. Cabinet Paris 4ème." />
        <meta name="keywords" content="hypnose professionnels paris, burn-out hypnose, souffrance travail hypnose, stress cadres, accompagnement hypnose paris, communication relationnelle Jacques Salomé, auto-hypnose stress" />
        <link rel="canonical" href="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:title" content="Hypnose stress au travail Paris | Alain Zenatti" />
        <meta property="og:description" content="Accompagnement individuel en hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Appel découverte gratuit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/hypnose-professionnels-paris" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hypnose stress au travail Paris | Alain Zenatti" />
        <meta name="twitter:description" content="Accompagnement individuel en hypnose pour professionnels. Stress, burn-out, sommeil, émotions. Appel découverte gratuit." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(serviceSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
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
          <div className="tag">Accompagnement individuel — Paris 4e &amp; visio</div>
          <h1 className="sp-hero__h1">
            Vous tenez au travail.<br/><em>Mais à quel prix ?</em>
          </h1>
          <p className="sp-hero__lead">
            Un accompagnement individuel sur plusieurs séances, spécifiquement dédié aux personnes en souffrance au travail.
            Hypnose, auto-hypnose et communication relationnelle pour <strong>retrouver énergie, sommeil et sérénité</strong> — durablement.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Réserver un appel découverte gratuit <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Le problème */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Le masque tient. Mais derrière, quelque chose s'effrite.</h2>
          <div className="sp-prose">
            <p>
              Que vous soyez cadre, manager, employé, indépendant ou responsable d'équipe — vous jonglez chaque jour avec une surcharge : objectifs élevés, délais serrés, pression de résultats, tensions relationnelles, sentiment de ne jamais en faire assez.
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Impossible de « couper ». Vos pensées tournent en boucle — au lit, sous la douche, en famille.",
              "La fatigue ne passe plus. Vous êtes irritable, à fleur de peau. L'enthousiasme a disparu.",
              "Votre corps parle à votre place. Oppression thoracique, mâchoire serrée, dos bloqué, sommeil perturbé.",
              "Vos relations en pâtissent — au travail comme à la maison. Vous pouvez vous sentir au bord du craquage.",
              "Vous avez peut-être tout essayé — sport, méditation, coaching. Ça aide un temps, puis le mécanisme se réenclenche.",
            ].map((text, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transformation */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Sortir du mode survie. Revenir à quelque chose de plus vivant.</h2>
          <div className="sp-prose">
            <p>
              Vous aspirez à vivre votre travail autrement. Pas à tout quitter — mais à <strong>retrouver une énergie stable</strong>, dormir mieux, vous réveiller plus clair et disponible.
              Poser des limites sans culpabilité. Retrouver du sens dans ce que vous faites.
            </p>
          </div>
          <div className="sp-checklist">
            {[
              "Moins de stress, moins de tensions internes.",
              "Un sommeil qui redevient réparateur.",
              "Des émotions que vous traversez sans en être submergé.",
              "Plus d'énergie, plus de clarté au quotidien.",
              "Des relations plus apaisées — au travail comme à la maison.",
              "Une posture professionnelle plus posée, plus juste pour vous.",
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* L'accompagnement — 3 piliers */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Un accompagnement individuel sur 10 à 12 semaines</h2>
          <div className="sp-prose">
            <p>
              Ce n'est pas de la thérapie sans fin. C'est un <strong>accompagnement structuré, individuel, sur mesure</strong> — conçu pour les professionnels qui veulent des résultats concrets. En quelques semaines, vous passez du mode « tenir » au mode « avancer ».
            </p>
          </div>
          <div className="sp-grid-2" style={{gridTemplateColumns:'1fr 1fr 1fr'}}>
            <div className="sp-card reveal" style={{gridColumn:'1'}}>
              <div style={{color:'var(--cobalt)', marginBottom: 8}}><Brain size={28} /></div>
              <div className="sp-card__title">Hypnose Ericksonienne</div>
              <div className="sp-card__desc">Apaiser le stress, améliorer le sommeil, alléger la charge mentale — en agissant là où la volonté seule ne suffit pas.</div>
            </div>
            <div className="sp-card reveal" style={{gridColumn:'2'}}>
              <div style={{color:'var(--cobalt)', marginBottom: 8}}><Headphones size={28} /></div>
              <div className="sp-card__title">Auto-Hypnose</div>
              <div className="sp-card__desc">Des outils simples que vous utilisez au quotidien pour devenir autonome dans la gestion de votre stress et de vos émotions.</div>
            </div>
            <div className="sp-card reveal" style={{gridColumn:'3'}}>
              <div style={{color:'var(--cobalt)', marginBottom: 8}}><MessagesSquare size={28} /></div>
              <div className="sp-card__title">Communication Relationnelle</div>
              <div className="sp-card__desc">Oser dire, poser des limites, clarifier vos besoins — avec l'approche de Jacques Salomé.</div>
            </div>
          </div>

          <div className="sp-prose" style={{marginTop: 32}}>
            <p><strong>Le cadre :</strong></p>
          </div>
          <div className="sp-checklist">
            {[
              "Séances individuelles, adaptées à votre réalité",
              "Un parcours structuré sur quelques semaines",
              "En présentiel (Paris 4e) ou en visio",
              "Des pratiques simples entre les séances (10-15 min/jour)",
              "Un suivi par messages si besoin entre les rendez-vous",
              "Un programme cohérent : soulager, stabiliser, rendre autonome",
            ].map((item, i) => (
              <div key={i} className="sp-check-item">
                <CheckCircle size={18} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div style={{marginTop: 40, textAlign:'center'}}>
            <p style={{fontFamily:'var(--f-serif)', fontSize:'1.05rem', color:'var(--texte)', marginBottom: 8}}>
              Comment savoir si c'est fait pour vous ?
            </p>
            <p style={{fontSize:'.9rem', color:'var(--gris)', marginBottom: 24, maxWidth: 480, margin:'0 auto 24px'}}>
              Un appel découverte gratuit, sans engagement. On fait le point sur votre situation, je vous explique comment l'accompagnement fonctionne, et on voit ensemble si c'est le bon chemin pour vous.
            </p>
            <a className="btn btn--primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
              Réserver mon appel découverte <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Ce que n'est pas / ce que c'est */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <div className="sp-grid-2">
            <div className="sp-card reveal">
              <div className="sp-card__title">Ce que n'est pas cet accompagnement</div>
              <div className="sp-card__desc">
                Il ne s'agit pas d'un coaching de performance pour « tenir plus » ou « faire encore plus avec moins de ressources ». C'est un accompagnement thérapeutique par l'hypnose, centré sur la souffrance que vous vivez et sur la manière dont votre corps et vos émotions tirent la sonnette d'alarme.
              </div>
            </div>
            <div className="sp-card reveal">
              <div className="sp-card__title">Ce que c'est</div>
              <div className="sp-card__desc">
                Un parcours de 6 séances pour apaiser les symptômes, retrouver de l'espace intérieur, remettre du sens et poser un cadre plus respectueux de vous dans votre vie professionnelle.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide ebook */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Pas encore prêt pour un appel ? Commencez ici.</h2>
          <div style={{background:'var(--paper, #F5F2EB)', borderRadius: 16, padding:'36px 40px', display:'flex', gap: 40, alignItems:'center', flexWrap:'wrap'}}>
            <img
              src="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/couverture-guide.webp"
              alt="Guide gratuit — Vous tenez. Mais jusqu'à quand ?"
              style={{width: 160, borderRadius: 8, boxShadow:'0 8px 32px rgba(0,0,0,.15)', flexShrink: 0}}
              loading="lazy"
            />
            <div style={{flex: 1, minWidth: 240}}>
              <p style={{fontFamily:'var(--f-serif)', fontSize:'1.05rem', color:'var(--texte)', marginBottom: 12}}>
                J'ai écrit un guide de 19 pages pour les professionnels qui sentent que quelque chose ne va plus — mais qui ne savent pas encore exactement ce qui se passe en eux.
              </p>
              <p style={{fontSize:'.88rem', color:'var(--gris)', marginBottom: 20}}>
                Des repères concrets pour comprendre vos émotions au travail, identifier ce que votre corps essaie de vous dire, et trois pratiques simples applicables dès ce soir.
              </p>
              <Link to="/guide-emotions-travail" className="btn btn--primary">
                Recevoir le guide gratuit <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Crédibilité */}
      <section className="sp-section sp-section--cobalt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Ce n'est pas mon premier professionnel épuisé.</h2>
          <div className="sp-stats">
            {[
              { value: '5+', label: "années d'accompagnement d'actifs en souffrance au travail" },
              { value: '5/5', label: 'note moyenne sur plus de 40 avis Google vérifiés' },
              { value: '6', label: 'séances en moyenne pour un résultat durable et ancré' },
            ].map((s, i) => (
              <div key={i} className="sp-stat reveal">
                <div className="sp-stat__val">{s.value}</div>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
          <blockquote className="sp-quote reveal" style={{marginTop: 40, background:'rgba(240,236,227,.06)', borderRadius: 16, padding:'40px 44px'}}>
            <p style={{color:'rgba(240,236,227,.9)'}}>
              En quelques séances, j'ai pu me libérer de certains blocages et entamer des
              changements pérennes. Alain est à l'écoute, calme et réfléchi.
            </p>
            <footer style={{color:'rgba(240,236,227,.5)'}}>— Philippe A., avis Google vérifié</footer>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Questions fréquentes</h2>
          <div>
            {faqItems.map((item, i) => (
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

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Prêt à faire le premier pas ?</h2>
          <p className="sp-lead">
            Un appel découverte gratuit de 20 minutes • Sans engagement • Pour savoir si c'est la bonne voie pour vous
          </p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Réserver mon appel découverte <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
               style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>
              WhatsApp
            </a>
          </div>
          <div className="sp-links">
            <Link to="/hypnose-stress-anxiete-paris">Hypnose et stress →</Link>
            <Link to="/hypnose-sommeil-paris">Hypnose et sommeil →</Link>
            <Link to="/autohypnose">Auto-hypnose →</Link>
            <Link to="/blog">Blog hypnose →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default LandingProfessionnels;
