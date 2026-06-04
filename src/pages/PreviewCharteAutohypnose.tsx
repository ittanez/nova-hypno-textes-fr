/**
 * PreviewCharteAutohypnose — page dédiée Auto-hypnose, charte risographie.
 * Même tonalité apaisée, même typographies, même palette ambre/cobalt.
 * Styles scopés .cz (classe racine).
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import { safeJSONStringify } from '@/lib/seo-utils';
import { createBreadcrumbSchema, localBusinessSchema } from '@/data/schemaOrg';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const WAITLIST_URL = 'https://akrlyzmfszumibwgocae.supabase.co/functions/v1/formation-liste-attente';
const NOVARESPIRE_URL = 'https://play.google.com/store/apps/details?id=com.novahypnose.novarespire';

const benefices = [
  { t: 'Retrouver un état apaisé', d: "Le calme apprivoisé en séance, vous le rappelez en quelques minutes — au bureau, dans les transports, avant un moment qui compte." },
  { t: 'Vos propres ancres', d: "Un geste, un mot, une image : votre signal personnel, créé pour vous, qui ramène l'état ressource d'un seul rappel." },
  { t: 'Prolonger entre deux rendez-vous', d: "Faire vivre dans la semaine ce qui s'est ouvert pendant la séance — sans attendre la prochaine pour avancer." },
  { t: 'Un rituel du soir, à vous', d: "Un court moment d'auto-hypnose le soir, le vôtre, pour laisser le mental se déposer et basculer dans la nuit." },
  { t: 'Préparer un moment qui compte', d: "Avant un entretien, un examen, une prise de parole : vous mettre en condition, seul·e, dans votre coin." },
  { t: "L'autonomie, en pratique", d: "Plus besoin de prendre rendez-vous pour rappeler votre calme : l'outil est en vous, vous le portez désormais." },
];

const faq = [
  { q: "Qu'est-ce que l'auto-hypnose, exactement ?", a: "Un état naturel que votre cerveau connaît déjà — celui où l'on est absorbé dans un livre, ou perdu dans ses pensées sur une route familière. En auto-hypnose, vous utilisez volontairement cet état pour vous apaiser, installer une nouvelle habitude, ou retrouver un calme rapide. Vous restez présent, en contrôle, à tout instant." },
  { q: "Vais-je y arriver ?", a: "Oui. Beaucoup pensent être « non-hypnotisables » avant d'essayer ; presque tous découvrent qu'il en est tout autrement, dès la première mise en pratique. Ce qui compte, c'est moins un don que la régularité — quelques minutes par jour suffisent." },
  { q: "En complément des séances, ou à la place ?", a: "Plutôt en complément, et en prolongement. Une séance ouvre un chemin ; l'auto-hypnose, ensuite, vous permet de l'emprunter chaque jour. Certains la pratiquent aussi de manière autonome, sans avoir consulté — c'est une voie tout à fait valide." },
  { q: "Combien de temps avant des résultats ?", a: "Souvent, une sensation différente dès les premiers essais (détente, légèreté). Pour des effets durables sur le stress ou le sommeil, comptez 2 à 4 semaines de pratique régulière, à raison de 5 à 10 minutes par jour." },
];

const PreviewCharteAutohypnose: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prenom || !email) return;
    setStatus('loading');
    try {
      const res = await fetch(WAITLIST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prenom, email }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Helmet>
        <title>Auto-hypnose à Paris — Formation & accompagnement | NovaHypnose</title>
        <meta name="description" content="Apprenez l'auto-hypnose avec Alain Zenatti à Paris : formation en présentiel, accompagnement individuel et formations en entreprise sur devis. Gérez stress, sommeil et émotions en autonomie." />
        <meta name="robots" content="index, follow" />

        <meta property="og:title" content="Auto-hypnose à Paris — Formation & accompagnement | NovaHypnose" />
        <meta property="og:description" content="Apprenez l'auto-hypnose avec Alain Zenatti : formation en présentiel, accompagnement individuel et formations en entreprise sur devis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/autohypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="canonical" href="https://novahypnose.fr/autohypnose" />
        <link rel="alternate" hreflang="fr" href="https://novahypnose.fr/autohypnose" />

        {/* Structured Data JSON-LD */}
        <script type="application/ld+json">{safeJSONStringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://novahypnose.fr/autohypnose#service",
          "name": "Formation Auto-hypnose Paris — NovaHypnose",
          "description": "Formation à l'auto-hypnose en groupe (1 journée, max 6 participants) et accompagnement individuel à Paris. Apprenez à reproduire les états de ressource de vos séances d'hypnose.",
          "url": "https://novahypnose.fr/autohypnose",
          "provider": {
            "@type": "Person",
            "name": "Alain Zenatti",
            "@id": "https://novahypnose.fr/#person"
          },
          "areaServed": { "@type": "City", "name": "Paris" },
          "serviceType": "Formation auto-hypnose",
          "offers": [
            {
              "@type": "Offer",
              "name": "Formation groupe 1 journée",
              "price": "240",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/LimitedAvailability",
              "description": "Formation auto-hypnose 1 journée, groupe max 6 participants, Paris Bastille"
            },
            {
              "@type": "Offer",
              "name": "Accompagnement individuel",
              "price": "90",
              "priceCurrency": "EUR",
              "availability": "https://schema.org/InStock"
            }
          ]
        })}</script>
        <script type="application/ld+json">{safeJSONStringify(createBreadcrumbSchema([
          { name: 'Auto-hypnose', path: '/autohypnose' }
        ]))}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>

        {/* Polices Cormorant Garamond + DM Sans auto-hébergées via @fontsource (voir index.css) */}
      </Helmet>

      <div className="cz" ref={rootRef}>
        {/* ── SVG defs (filtres risographie) ── */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <defs>
            <filter id="riso-full">
              <feTurbulence type="turbulence" baseFrequency="0.018 0.022" numOctaves={2} seed={3} result="turb" />
              <feDisplacementMap in="SourceGraphic" in2="turb" scale={6} result="displaced" />
              <feTurbulence type="fractalNoise" baseFrequency="0.72 0.75" numOctaves={4} seed={8} result="noise" />
              <feColorMatrix type="saturate" values="0" in="noise" result="grey" />
              <feBlend in="displaced" in2="grey" mode="multiply" result="out" />
              <feComposite in="out" in2="displaced" operator="in" />
            </filter>
            <filter id="paperGrain" x="0" y="0" width="100%" height="100%">
              <feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves={4} seed={1} />
              <feColorMatrix values="0 0 0 0 .15  0 0 0 0 .12  0 0 0 0 .08  0 0 0 .15 0" />
            </filter>
          </defs>
        </svg>

        {/* ── NAV ── */}
        <nav className="nav">
          <div className="container nav__row">
            <a className="brand" href="/">
              <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
            </a>
            <button
              className={`nav__burger${navOpen ? ' open' : ''}`}
              aria-label={navOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={navOpen}
              onClick={() => setNavOpen((v) => !v)}
            >
              <span></span><span></span><span></span>
            </button>
            <div className={`nav__links${navOpen ? ' open' : ''}`} onClick={() => setNavOpen(false)}>
              <Link to="/">← Accueil</Link>
              <a href="#approche">L'auto-hypnose</a>
              <a href="#benefices">Bénéfices</a>
              <a href="#formation">Formation</a>
              <a href="#novarespire">L'app</a>
              <a href="#liste">Liste d'attente</a>
              <Link to="/blog">Blog ↗</Link>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero" id="hero">
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full)">
                <path d="M 180 80 C 380 30, 660 80, 820 180 C 920 240, 990 260, 1100 220 C 1240 170, 1380 200, 1440 290 C 1500 380, 1420 470, 1280 500 C 1140 530, 980 490, 880 440 C 740 380, 620 410, 540 480 C 450 560, 320 580, 220 540 C 100 490, 60 380, 80 280 C 95 200, 130 130, 180 80 Z" fill="#F2A12E" opacity="0.95" />
              </g>
              <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 360 680 C 480 570, 660 560, 800 620 C 940 680, 1080 680, 1240 640 C 1340 615, 1420 630, 1480 680 L 1480 1040 L 0 1040 L 0 900 C 80 820, 180 760, 360 680 Z" fill="#2B4BA0" opacity="0.92" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain)" opacity=".25" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">soi</div>

          <div className="container hero__container">
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Auto-hypnose — pratiquer chez soi</div>
              <h1 className="hero__title">
                Devenir <em>acteur</em><br />
                de votre <em>changement.</em>
              </h1>
              <div className="hero__rule"></div>
              <p className="hero__lead">
                Apprendre à porter, en soi,<br />
                l'outil qui vous <em>apaise.</em>
              </p>
              <div className="hero__sub">
                Ce qui se vit en séance, le retrouver — quand vous voulez, où vous voulez.
              </div>
              <div className="hero__cta">
                <a className="btn btn--primary" href="#liste">
                  Rejoindre la liste d'attente <span className="arrow">→</span>
                </a>
                <a className="btn btn--ghost" href="#approche">Comprendre d'abord</a>
              </div>
            </div>

            <aside className="hero__card reveal" style={{ transitionDelay: '.35s' }}>
              <div className="hero__card-label">La Formation</div>
              <p className="hero__card-quote">« Une journée pour apprendre à rappeler, seul·e, ce que vous vivez en séance. »</p>
              <div className="hero__card-row"><span>Format</span><span>1 journée · max 6</span></div>
              <div className="hero__card-row"><span>Lieu</span><span>Paris · Bastille</span></div>
              <div className="hero__card-row"><span>Tarif</span><span>240 €</span></div>
              <div className="hero__card-row"><span>Inclus</span><span>fascicule, audios, suivi à 1 mois</span></div>
            </aside>
          </div>
        </section>

        {/* ── L'APPROCHE ── */}
        <section className="about" id="approche">
          <div className="about__bg" aria-hidden="true"></div>
          <div className="container about__grid">
            <div className="about__copy reveal">
              <div className="section-tag">L'auto-hypnose</div>
              <h2 className="section-title">
                Un état<br /><em>que vous connaissez déjà.</em>
              </h2>
              <p>
                L'auto-hypnose n'est pas une technique ésotérique. C'est l'usage volontaire d'un état
                naturel — celui où l'on est absorbé dans un livre, perdu dans ses pensées au volant
                sur une route familière, ou bercé par une musique.
              </p>
              <p>
                Apprendre à y entrer par soi-même, c'est apprendre à <strong>rappeler votre calme</strong>
                en quelques minutes, sans rien attendre de l'extérieur. Pas de dépendance à une séance.
                Pas de matériel. Juste vous, et un outil que vous portez désormais.
              </p>
              <p>
                C'est aussi le prolongement le plus naturel d'un travail en hypnose : ce qui s'est
                ouvert pendant la séance, vous apprenez à le retrouver — et à l'approfondir — au quotidien.
              </p>

              <div className="about__approche">
                <div className="about__approche-label">Bon à savoir</div>
                <h3 className="about__approche-title">Vous restez <em>aux commandes.</em></h3>
                <p>
                  Comme en hypnose ericksonienne, l'auto-hypnose n'efface ni votre vigilance ni votre
                  volonté. Vous entendez, vous pouvez ouvrir les yeux, sortir de l'état quand vous le
                  décidez. Ce qui change : votre rapport à ce qui vous traverse — plus de marge, moins
                  de réactivité.
                </p>
              </div>
            </div>

            <div className="about__photo reveal" aria-label="Pratique de l'auto-hypnose"></div>
          </div>
        </section>

        {/* ── BÉNÉFICES (cases dans le même esprit que les domaines) ── */}
        <section className="seances" id="benefices">
          <div className="container">
            <div className="seances__head reveal">
              <div>
                <div className="section-tag">Ce que vous apprenez à faire</div>
                <h2 className="section-title">Retrouver, <em>seul·e</em><br />ce qui s'ouvre <em>en séance.</em></h2>
              </div>
              <p>
                Là où l'hypnose se vit à deux, l'auto-hypnose se pratique chez soi — et prolonge ce
                qui a commencé en cabinet. Voici, concrètement, ce qu'elle permet.
              </p>
            </div>

            <div className="cards">
              {benefices.map((b, i) => (
                <article className="card reveal" key={b.t} style={{ transitionDelay: `${(i % 3) * 0.12}s` }}>
                  <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{b.t}</h3>
                  <p className="card__desc">{b.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMATION HARMONIA ── */}
        <section className="cabinet" id="formation">
          <div className="container cabinet__grid">
            <div className="cabinet__copy reveal">
              <div className="section-tag">Première voie — apprendre la méthode</div>
              <h2 className="section-title">La <em>Formation.</em></h2>
              <p>
                Une <strong>journée complète</strong> en présentiel, en petit groupe (six personnes
                maximum), à Paris-Bastille. Le temps d'expérimenter, de comprendre ce qui se passe pour
                <em> vous</em>, et de repartir avec une pratique installée — pas seulement des notions.
              </p>
              <p>
                Un parcours structuré en quatre temps, alternant théorie courte, mises en situation, et
                pratique guidée. Vous repartez avec un fascicule, des audios, et un entretien
                téléphonique un mois après pour ajuster votre pratique.
              </p>
              <ul className="cabinet__list">
                <li><strong>1 journée</strong> — environ 9h30 à 17h30, déjeuner compris.</li>
                <li><strong>Petit groupe</strong> — six participants au maximum.</li>
                <li><strong>240 €</strong> — fascicule, audios et suivi à un mois inclus.</li>
                <li><strong>Paris-Bastille</strong> — lieu confirmé à l'inscription.</li>
              </ul>
              <p style={{ marginTop: 24, fontSize: 14, color: 'var(--gris)' }}>
                Des séances individuelles à distance dédiées à l'auto-hypnose sont à l'étude pour
                celles et ceux qui ne peuvent pas se déplacer.
              </p>
            </div>
            <div className="cabinet__visual reveal" style={{ transitionDelay: '.2s' }} aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 110 70 C 250 30, 410 70, 450 200 C 480 300, 440 380, 470 460 C 490 520, 430 540, 340 530 C 220 516, 120 520, 90 430 C 60 340, 70 230, 80 160 C 86 118, 90 86, 110 70 Z" fill="#F2A12E" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                  <path d="M 170 180 C 290 130, 390 180, 410 290 C 425 380, 360 450, 260 450 C 160 450, 110 370, 120 280 C 126 222, 140 196, 170 180 Z" fill="#2B4BA0" opacity="0.9" />
                </g>
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
              <div className="cabinet__addr">Prochaine session — date à venir</div>
            </div>
          </div>
        </section>

        {/* ── NOVARESPIRE ── */}
        <section className="visio" id="novarespire">
          <div className="container cabinet__grid cabinet__grid--reverse">
            <div className="cabinet__visual reveal" style={{ transitionDelay: '.2s' }} aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 90 130 C 220 80, 380 100, 440 220 C 480 310, 460 400, 430 470 C 410 520, 340 540, 240 530 C 140 520, 80 470, 70 380 C 60 290, 70 200, 90 130 Z" fill="#2B4BA0" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                  <path d="M 160 200 C 280 160, 380 200, 400 300 C 415 380, 360 450, 260 450 C 160 450, 110 380, 120 290 C 126 240, 140 214, 160 200 Z" fill="#F2A12E" opacity="0.9" />
                </g>
                <rect x="200" y="180" width="120" height="220" rx="18" fill="#F0ECE3" opacity="0.95" />
                <rect x="220" y="210" width="80" height="6" rx="3" fill="#2B4BA0" opacity="0.45" />
                <circle cx="260" cy="280" r="32" fill="none" stroke="#2B4BA0" strokeWidth="2" opacity="0.7" />
                <circle cx="260" cy="280" r="20" fill="#F2A12E" opacity="0.85" />
                <rect x="220" y="340" width="80" height="6" rx="3" fill="#2B4BA0" opacity="0.4" />
                <rect x="234" y="354" width="52" height="6" rx="3" fill="#2B4BA0" opacity="0.3" />
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
              <div className="cabinet__addr">NovaRespire · gratuit · Android uniquement</div>
            </div>
            <div className="cabinet__copy reveal">
              <div className="section-tag">Deuxième voie — pratiquer au quotidien</div>
              <h2 className="section-title">L'application <em>NovaRespire.</em></h2>
              <p>
                Une <strong>offre distincte</strong> de la formation : pas un substitut, mais un
                compagnon. Pour s'initier en douceur si vous n'avez pas encore consulté, ou pour
                ancrer la pratique entre deux séances si vous en avez déjà l'habitude.
              </p>
              <p>
                Application <strong>gratuite</strong>, sans publicité, conçue par mes soins : exercices
                guidés de respiration et courtes inductions inspirées de l'hypnose. Trois minutes au
                bureau, dix minutes le soir — l'app est pensée pour s'effacer derrière la pratique,
                pas pour vous retenir devant un écran.
              </p>
              <p style={{
                marginTop: 18, padding: '10px 14px',
                background: 'rgba(43,75,160,.07)', borderRadius: 10,
                fontSize: 14, color: 'var(--cobalt-2)'
              }}>
                <strong>À noter :</strong> NovaRespire est <strong>disponible uniquement sur Android</strong>
                {' '}(Google Play). Une version iOS n'est pas prévue à ce stade.
              </p>
              <div className="hero__cta" style={{ marginTop: 24 }}>
                <a
                  className="btn btn--amber"
                  href={NOVARESPIRE_URL}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  Télécharger sur Google Play <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-sect" id="faq">
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 8px' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Bon à savoir</div>
              <h2 className="section-title">Quelques <em>repères.</em></h2>
            </div>

            <div className="faq-list">
              {faq.map((item, i) => (
                <div className="faq-item reveal" key={i} style={{ transitionDelay: `${i * 0.06}s` }}>
                  <button
                    className={`faq-q${openFaq === i ? ' open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {item.q}
                    <span className="faq-chevron">+</span>
                  </button>
                  {openFaq === i && <div className="faq-a">{item.a}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FORMATIONS ENTREPRISE ── */}
        <section className="visio" id="entreprise">
          <div className="container cabinet__grid">
            <div className="cabinet__copy reveal">
              <div className="section-tag">Troisième voie — organisations &amp; équipes</div>
              <h2 className="section-title">Formations <em>en entreprise.</em></h2>
              <p>
                L'auto-hypnose s'adapte aussi au cadre professionnel. Sur devis, je propose des
                interventions <strong>sur mesure</strong> pour les équipes, les managers et les
                organisations souhaitant intégrer des outils de gestion du stress et de la concentration
                dans leur culture de travail.
              </p>
              <p>
                Ces formations peuvent prendre plusieurs formes : <strong>conférence de sensibilisation</strong>{' '}
                (1 à 2 h), <strong>atelier pratique collectif</strong> (demi-journée ou journée entière),
                ou <strong>parcours individuel</strong> pour des collaborateurs clés — en présentiel dans
                vos locaux ou à Paris, selon vos besoins.
              </p>
              <ul style={{ margin: '18px 0 24px', paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  'Gestion du stress et de la pression au travail',
                  'Concentration, préparation mentale avant un enjeu',
                  'Récupération et qualité du sommeil des équipes',
                  'Prise de parole, gestion du trac et de la performance',
                ].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: '0.97rem', lineHeight: 1.6 }}>
                    <span style={{ color: 'var(--amber)', fontSize: '1.1rem', flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '0.9rem', color: 'var(--gris)', lineHeight: 1.7 }}>
                Tarif établi sur devis selon le format, la durée et le nombre de participants.
                Contactez-moi pour échanger sur vos besoins spécifiques.
              </p>
              <div className="hero__cta" style={{ marginTop: 24 }}>
                <a className="btn btn--primary" href="mailto:contact@novahypnose.fr?subject=Formation%20entreprise%20auto-hypnose">
                  Demander un devis <span className="arrow">→</span>
                </a>
              </div>
            </div>
            <div className="cabinet__visual reveal" style={{ transitionDelay: '.2s' }} aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 100 100 C 220 50, 400 80, 450 220 C 490 330, 440 430, 380 490 C 300 560, 160 540, 100 440 C 50 350, 60 200, 100 100 Z" fill="#F2A12E" opacity="0.85" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                  <path d="M 180 180 C 290 140, 390 190, 400 300 C 410 390, 350 450, 250 445 C 150 440, 110 370, 120 280 C 128 220, 150 200, 180 180 Z" fill="#2B4BA0" opacity="0.88" />
                </g>
                {/* Silhouette personnes en cercle */}
                {[0, 72, 144, 216, 288].map((angle, i) => {
                  const rad = (angle * Math.PI) / 180;
                  const cx = 260 + 80 * Math.cos(rad);
                  const cy = 290 + 70 * Math.sin(rad);
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy - 12} r={10} fill="#F0ECE3" opacity="0.8" />
                      <rect x={cx - 8} y={cy} width={16} height={18} rx={4} fill="#F0ECE3" opacity="0.7" />
                    </g>
                  );
                })}
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".22" />
              </svg>
              <div className="cabinet__addr">Formation sur devis · présentiel ou distanciel</div>
            </div>
          </div>
        </section>

        {/* ── LISTE D'ATTENTE ── */}
        <section className="contact" id="liste">
          <div className="contact__blob" aria-hidden="true"></div>
          <div className="container contact__grid">
            <div className="reveal">
              <div className="section-tag">Liste d'attente</div>
              <h2 className="section-title">Recevoir <em>la prochaine date.</em></h2>
              <p className="contact__lead">
                La prochaine session de La Formation se prépare. Laissez vos coordonnées
                pour être informé(e) en premier — les places sont limitées à six.
              </p>
              <dl className="contact__dl">
                <div className="contact__row"><dt>Lieu</dt><dd>Paris · Bastille</dd></div>
                <div className="contact__row"><dt>Format</dt><dd>1 journée — 6 participants max</dd></div>
                <div className="contact__row"><dt>Tarif</dt><dd>240 € · fascicule + audios + suivi</dd></div>
                <div className="contact__row"><dt>Questions</dt><dd>06 49 35 80 89</dd></div>
              </dl>
            </div>

            <form
              className="contact__form reveal"
              style={{ transitionDelay: '.2s' }}
              onSubmit={handleWaitlist}
            >
              <div className="field">
                <label htmlFor="ah-prenom">Votre prénom <span aria-hidden="true" style={{ color: '#a83232' }}>*</span></label>
                <input
                  id="ah-prenom"
                  type="text"
                  placeholder="Marie"
                  required
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="ah-email">Email <span aria-hidden="true" style={{ color: '#a83232' }}>*</span></label>
                <input
                  id="ah-email"
                  type="email"
                  placeholder="marie@exemple.fr"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <button
                className="btn btn--amber"
                type="submit"
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Envoi…' : 'M\'inscrire à la liste'} <span className="arrow">→</span>
              </button>
              {status === 'success' && (
                <p className="contact__success">C'est noté — vous serez parmi les premier·ères informé·es.</p>
              )}
              {status === 'error' && (
                <p className="contact__success" style={{ background: 'rgba(255,200,200,.2)', color: '#a83232' }}>
                  Une erreur s'est produite. Réessayez ou écrivez-moi directement.
                </p>
              )}
            </form>
          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <a href="/mentions-legales">Mentions légales</a>
              <span className="foot__sep">·</span>
              <a href="tel:+33649358089">06 49 35 80 89</a>
            </nav>
            <div className="foot__copy">
              © NovaHypnose · Alain Zenatti <em>— l'auto-hypnose, en aperçu</em> · MMXXVI
            </div>
          </div>
        </footer>

        <a
          className="floating-cta"
          href="#liste"
          aria-label="Rejoindre la liste d'attente"
        >
          Liste d'attente <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
};

export default PreviewCharteAutohypnose;
