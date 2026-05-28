/**
 * PreviewCharte — aperçu de la charte « ZENatti / risographie ».
 * Palette risographie : ambre #F2A12E · cobalt #2B4BA0 · lin #F0ECE3 · encre #1C2B4A.
 * Contenu au ton apaisé, aéré, orienté états recherchés (et non listes de symptômes).
 * Page autoportante, noindex, styles scopés .cz.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import { testimonials } from '@/data/testimonials';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const NOVARESPIRE_URL = 'https://play.google.com/store/apps/details?id=com.novahypnose.novarespire&pcampaignid=web_share';

const domaines = [
  { t: 'Retrouver le calme', d: "Desserrer la pression intérieure, retrouver une respiration ample et un esprit plus posé, au quotidien.", href: '/hypnose-stress-anxiete-paris' },
  { t: 'Des nuits apaisées', d: "Laisser le mental se déposer le soir, et renouer avec un sommeil simple et réparateur.", href: '/hypnose-sommeil-paris' },
  { t: 'Habiter sa confiance', d: "Reprendre votre juste place, avec une assurance tranquille qui vient de l'intérieur.", href: '/hypnose-confiance-en-soi-paris' },
  { t: 'Se sentir plus libre', d: "Alléger ce qui retient, dépasser une appréhension, avancer avec plus d'aisance.", href: '/hypnose-phobies-paris' },
  { t: 'Apprivoiser ses émotions', d: "Accueillir ce qui vous traverse sans être débordé, et retrouver de la stabilité.", href: '/hypnose-gestion-emotions-paris' },
  { t: "Aborder l'instant clé", d: "Prise de parole, échéance, changement : mobiliser votre calme au bon moment.", href: '/hypnose-blocages-paris' },
];

const certifications = [
  { t: 'Maître Hypnologue', s: 'École Psynapse · 2025' },
  { t: 'Maître Praticien — Hypnose Ericksonienne', s: '2023' },
  { t: 'Hypnose Directive & Hyperemperia', s: '2025' },
  { t: 'Hypnose Ericksonienne', s: 'École Psynapse · 2021' },
  { t: 'Hypnose spirituelle', s: 'École Psynapse · 2023' },
];

const articles = [
  { cat: 'Stress & anxiété', t: "L'anxiété n'est pas une fatalité : ce que l'hypnose change vraiment", min: '6 min' },
  { cat: 'Sommeil', t: 'Retrouver un sommeil réparateur, sans somnifères', min: '5 min' },
  { cat: 'Confiance', t: "Habiter sa confiance : le rôle discret de l'inconscient", min: '7 min' },
];

const faq = [
  { q: 'Comment se déroule une séance ?', a: "Un échange pour comprendre ce qui vous amène, puis un temps d'hypnose dans un état de profonde détente. Vous restez présent, à chaque instant." },
  { q: 'Vais-je garder le contrôle ?', a: "Toujours. L'hypnose ericksonienne est un dialogue permissif : vous ne ferez jamais rien qui aille contre vos valeurs. Vous gardez le contrôle du début à la fin." },
  { q: 'En combien de séances ?', a: "L'hypnose est une thérapie brève : la plupart des accompagnements trouvent leur aboutissement en 3 à 5 séances. Des changements concrets, sans exploration sans fin." },
  { q: 'Est-ce que cela fonctionne en visio ?', a: "Oui, tout aussi bien qu'au cabinet. Depuis chez vous, partout en France, il suffit d'un endroit calme et d'une connexion stable." },
  { q: 'À qui s\'adressent les séances ?', a: "Aux adultes, pour un travail thérapeutique complet et personnalisé, dans un cadre confidentiel et sécurisant." },
];

const PreviewCharte: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const avis = [testimonials[0], testimonials[1], testimonials[2], testimonials[3], testimonials[8], testimonials[5]];
  const [avisIdx, setAvisIdx] = useState(0);

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

  return (
    <>
      <Helmet>
        <title>Aperçu charte — NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
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
            <a className="brand" href="#hero">
              <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
            </a>
            <div className="nav__links">
              <a href="#about">À propos</a>
              <a href="#cabinet">Le cabinet</a>
              <a href="#domaines">Spécialités</a>
              <a href="#autohypnose">Auto-hypnose</a>
              <a href="#balades">Hypno-balades</a>
              <a href="#temoignages">Avis</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
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
              <g filter="url(#riso-full)">
                <path d="M 280 480 C 400 460, 500 510, 510 600 C 520 690, 460 750, 360 750 C 260 750, 180 690, 180 600 C 180 530, 220 490, 280 480 Z" fill="#F2A12E" opacity="0.95" />
              </g>
              <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 360 540 C 480 430, 660 420, 800 480 C 940 540, 1080 540, 1240 500 C 1340 475, 1420 490, 1480 540 L 1480 1040 L 360 1040 C 280 1000, 260 900, 280 800 C 300 700, 320 620, 360 540 Z" fill="#2B4BA0" opacity="0.92" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain)" opacity=".25" />
            </svg>
          </div>

          <div className="zen-mark" aria-hidden="true">zen</div>

          <div className="container hero__container">
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Hypnose Ericksonienne — Paris · Le Marais</div>
              <h1 className="hero__name">
                <span className="alain">Alain</span>
                <span className="full"><span className="zen">Zen</span><span className="atti">atti</span></span>
              </h1>
              <div className="hero__rule"></div>
              <p className="hero__lead">
                Un espace pour ralentir.<br />
                Un accompagnement pour avancer <em>plus léger</em>.
              </p>
              <div className="hero__sub">
                Maître Praticien en Hypnose Ericksonienne · Adultes
              </div>
              <div className="hero__cta">
                <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Prendre rendez-vous <span className="arrow">→</span>
                </a>
                <a className="btn btn--ghost" href="#about">Découvrir l'approche</a>
              </div>
            </div>

            <aside className="hero__card reveal" style={{ transitionDelay: '.35s' }}>
              <div className="hero__card-label">La première séance</div>
              <p className="hero__card-quote">« Un temps complet, pour entrer dans un véritable travail — sans précipitation. »</p>
              <div className="hero__card-row"><span>Durée</span><span>1h30</span></div>
              <div className="hero__card-row"><span>Tarif</span><span>90 €</span></div>
              <div className="hero__card-row"><span>Au cabinet</span><span>16 rue Saint-Antoine, Paris 4e</span></div>
              <div className="hero__card-row"><span>Ou en visio</span><span>Partout en France</span></div>
            </aside>
          </div>
        </section>

        {/* ── À PROPOS ── */}
        <section className="about" id="about">
          <div className="about__bg" aria-hidden="true"></div>
          <div className="container about__grid">
            <div className="about__photo reveal" aria-label="Portrait d'Alain Zenatti"></div>
            <div className="about__copy reveal" style={{ transitionDelay: '.15s' }}>
              <div className="section-tag">À propos</div>
              <h2 className="section-title">
                Vous accueillir,<br /><em>simplement.</em>
              </h2>
              <p>
                Je suis Alain Zenatti, Maître Praticien en hypnose ericksonienne. Je reçois les
                adultes dans un cadre confidentiel et bienveillant, au cœur de Paris.
              </p>
              <p>
                Mon approche est douce et permissive : vous n'êtes pas dirigé, vous êtes accompagné,
                à votre rythme. Vous gardez le contrôle du premier instant au dernier — l'hypnose
                ne fait qu'ouvrir l'accès à vos propres ressources.
              </p>
              <p>
                C'est une thérapie brève : la plupart des accompagnements trouvent leur aboutissement
                en <strong>3 à 5 séances</strong>. Des changements concrets et durables, sans
                exploration sans fin.
              </p>
              <div className="about__stat">
                <div><div className="about__stat-n">5+</div><div className="about__stat-l">années d'expérience</div></div>
                <div><div className="about__stat-n">9</div><div className="about__stat-l">certifications</div></div>
                <div><div className="about__stat-n">5/5</div><div className="about__stat-l">22 avis Google</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LE CABINET — sas / cocon urbain ── */}
        <section className="cabinet" id="cabinet">
          <div className="container cabinet__grid">
            <div className="cabinet__copy reveal">
              <div className="section-tag">Le cabinet</div>
              <h2 className="section-title">Un sas,<br /><em>au milieu de la ville.</em></h2>
              <p>
                16 rue Saint-Antoine. Vous poussez la porte, et l'agitation de Paris reste dehors.
              </p>
              <p>
                Un lieu feutré, pensé comme un cocon : lumière douce, silence, confort. Le temps
                d'une séance, vous n'avez nulle part où aller, rien à prouver. Juste un espace à vous.
              </p>
              <ul className="cabinet__list">
                <li><strong>Feutré &amp; confidentiel</strong> — une vraie parenthèse, loin du bruit.</li>
                <li><strong>À deux pas de Bastille</strong> — Paris 4e, métro Bastille &amp; Saint-Paul.</li>
                <li><strong>Un rythme qui ralentit</strong> — séances complètes, jamais expédiées.</li>
              </ul>
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
              <div className="cabinet__addr">16 rue Saint-Antoine · 75004 Paris</div>
            </div>
          </div>

          <div className="container cabinet__access reveal">
            <div className="access__item">
              <div className="access__k">Métro</div>
              <div className="access__v">Bastille (1 · 5 · 8) à 2 min · Saint-Paul (1)</div>
            </div>
            <div className="access__item">
              <div className="access__k">Bus &amp; Vélib’</div>
              <div className="access__v">Lignes 69 · 76 · 86 · 87 · 96 · stations Bastille</div>
            </div>
            <div className="access__item">
              <div className="access__k">Stationnement</div>
              <div className="access__v">Parking Bastille Saint-Antoine, à 50 m</div>
            </div>
            <div className="access__item">
              <div className="access__k">Le jour J</div>
              <div className="access__v">Code &amp; étage transmis avec la confirmation</div>
            </div>
          </div>
        </section>

        {/* ── DOMAINES D'ACCOMPAGNEMENT (états recherchés) ── */}
        <section className="seances" id="domaines">
          <div className="container">
            <div className="seances__head reveal">
              <div>
                <div className="section-tag">Spécialités</div>
                <h2 className="section-title">Là où l'hypnose <em>vous porte.</em></h2>
              </div>
              <p>
                Non pas une liste de problèmes, mais les états vers lesquels nous cheminons ensemble,
                à votre mesure.
              </p>
            </div>

            <div className="cards">
              {domaines.map((d, i) => (
                <a className="card reveal" key={d.t} href={d.href} style={{ transitionDelay: `${(i % 3) * 0.12}s` }}>
                  <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{d.t}</h3>
                  <p className="card__desc">{d.d}</p>
                  <span className="card__link">En savoir plus <span className="arrow">→</span></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── AUTO-HYPNOSE — autonomie ── */}
        <section className="autohypnose" id="autohypnose">
          <div className="container autoh__grid">
            <div className="autoh__copy reveal">
              <div className="section-tag">Auto-hypnose</div>
              <h2 className="section-title">Devenir acteur<br /><em>de votre changement.</em></h2>
              <p>
                Mon rôle n'est pas de vous rendre dépendant d'un cabinet. C'est de vous transmettre
                des clés — des techniques d'auto-hypnose simples, à pratiquer chez vous.
              </p>
              <p>
                Entre deux séances, et bien après, vous gardez la main : quelques minutes suffisent
                pour retrouver le calme, vous ré-ancrer, prolonger le travail engagé ensemble.
              </p>
              <div className="autoh__app">
                <div className="autoh__app-txt">
                  <strong>NovaRespire</strong>
                  <span>Mon application de respiration &amp; d'auto-hypnose guidée, pour pratiquer au quotidien.</span>
                </div>
                <a className="btn btn--ghost" href={NOVARESPIRE_URL} target="_blank" rel="noopener noreferrer">
                  Découvrir l'app <span className="arrow">→</span>
                </a>
              </div>
            </div>
            <div className="autoh__visual reveal" style={{ transitionDelay: '.2s' }} aria-hidden="true">
              <svg viewBox="0 0 480 480" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <circle cx="240" cy="240" r="170" fill="#F2A12E" opacity="0.9" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                  <circle cx="240" cy="240" r="110" fill="#2B4BA0" opacity="0.9" />
                </g>
                <rect width="480" height="480" filter="url(#paperGrain)" opacity=".22" />
              </svg>
            </div>
          </div>
        </section>

        {/* ── HYPNO-BALADES — Perche ── */}
        <section className="balades" id="balades">
          <div className="balades__bg" aria-hidden="true"></div>
          <div className="container balades__inner">
            <div className="reveal" style={{ maxWidth: 640 }}>
              <div className="section-tag">Hors les murs</div>
              <h2 className="section-title">Les hypno-balades,<br /><em>dans le Perche.</em></h2>
              <p className="balades__lead">
                Une autre façon de pratiquer : marcher en pleine nature, dans la forêt domaniale de
                Senonches, guidé par la voix, entre relaxation profonde et grand air.
              </p>
            </div>
            <div className="balades__cards">
              <div className="balade-card reveal"><span className="balade-card__k">En groupe</span><span className="balade-card__v">25 €</span><span className="balade-card__d">7 personnes max · 1h30 à 2h</span></div>
              <div className="balade-card reveal" style={{ transitionDelay: '.1s' }}><span className="balade-card__k">En solo</span><span className="balade-card__v">75 €</span><span className="balade-card__d">Promenade individualisée</span></div>
              <div className="balade-card reveal" style={{ transitionDelay: '.2s' }}><span className="balade-card__k">En couple</span><span className="balade-card__v">120 €</span><span className="balade-card__d">À deux, à votre rythme</span></div>
            </div>
            <p className="balades__note reveal">
              Forêt domaniale de Senonches · point de rendez-vous communiqué à l'inscription ·
              <a href="mailto:contact@novahypnose.fr"> contact@novahypnose.fr</a> · 06 49 35 80 89
            </p>
          </div>
        </section>

        {/* ── TARIFS ── */}
        <section className="tarifs-sect" id="tarifs">
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Séances</div>
              <h2 className="section-title">Un cadre clair, <em>posé d'emblée.</em></h2>
              <p style={{ color: 'var(--corps)', marginTop: 8 }}>
                Des séances complètes, réservées aux adultes. Au cabinet, en visio, ou à domicile.
              </p>
            </div>

            <div className="tarifs-grid">
              <article className="tarif-card tarif-card--featured reveal">
                <h3>Au cabinet</h3>
                <div className="tarif-price">90<sup>€</sup></div>
                <p className="tarif-desc">Au cœur du Marais</p>
                <ul>
                  <li>1h30 — première séance</li>
                  <li>1h — séances suivantes</li>
                  <li>Métro Bastille &amp; Saint-Paul</li>
                </ul>
                <a className="btn btn--amber" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver <span className="arrow">→</span>
                </a>
              </article>

              <article className="tarif-card reveal" style={{ transitionDelay: '.15s' }}>
                <h3>En visio</h3>
                <div className="tarif-price">90<sup>€</sup></div>
                <p className="tarif-desc">Depuis chez vous</p>
                <ul>
                  <li>1h30 — première séance</li>
                  <li>1h — séances suivantes</li>
                  <li>Partout en France</li>
                </ul>
                <a className="btn btn--ghost" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver <span className="arrow">→</span>
                </a>
              </article>

              <article className="tarif-card reveal" style={{ transitionDelay: '.3s' }}>
                <h3>À domicile</h3>
                <div className="tarif-price">140<sup>€</sup></div>
                <p className="tarif-desc">Paris Centre</p>
                <ul>
                  <li>1h30 — première séance</li>
                  <li>1h — séances suivantes</li>
                  <li>Arrondissements 1–4, 9–11</li>
                </ul>
                <a className="btn btn--ghost" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver <span className="arrow">→</span>
                </a>
              </article>
            </div>

            <p className="tarifs-note reveal">
              Règlement par carte bancaire, Wero ou en ligne via Stripe. Certaines mutuelles
              participent au remboursement. Annulation sans frais jusqu'à 48 h avant le rendez-vous.
            </p>
          </div>
        </section>

        {/* ── TÉMOIGNAGES — carrousel ── */}
        <section className="temoignages" id="temoignages">
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Ils en parlent</div>
              <h2 className="section-title">Des mots, <em>après.</em></h2>
              <div className="avis-rating">
                <span className="avis-stars" aria-hidden="true">★★★★★</span>
                <span>5/5 · avis vérifiés Google</span>
              </div>
            </div>

            <div className="avis-carousel reveal">
              <button className="avis-nav avis-nav--prev" aria-label="Avis précédent"
                onClick={() => setAvisIdx((avisIdx - 1 + avis.length) % avis.length)}>‹</button>
              <blockquote className="avis-quote" key={avisIdx}>
                <p>« {avis[avisIdx].text} »</p>
                <footer><strong>{avis[avisIdx].name}</strong> · {avis[avisIdx].date} · Google</footer>
              </blockquote>
              <button className="avis-nav avis-nav--next" aria-label="Avis suivant"
                onClick={() => setAvisIdx((avisIdx + 1) % avis.length)}>›</button>
            </div>
            <div className="avis-dots">
              {avis.map((_, i) => (
                <button key={i} className={`avis-dot${i === avisIdx ? ' on' : ''}`}
                  aria-label={`Avis ${i + 1}`} onClick={() => setAvisIdx(i)} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS — bandeau ── */}
        <section className="certifs" id="certifs">
          <div className="container">
            <div className="certifs__head reveal">
              <div className="section-tag" style={{ justifyContent: 'center' }}>Formation &amp; éthique</div>
              <p className="certifs__intro">Une pratique encadrée, nourrie par <strong>9 certifications</strong> et la formation continue.</p>
            </div>
            <div className="certifs__band reveal">
              {certifications.map((c) => (
                <div className="certif" key={c.t}>
                  <span className="certif__t">{c.t}</span>
                  <span className="certif__s">{c.s}</span>
                </div>
              ))}
              <div className="certif certif__more"><span className="certif__t">+ 4 autres</span><span className="certif__s">formation continue</span></div>
            </div>
          </div>
        </section>

        {/* ── BLOG — derniers articles ── */}
        <section className="blog" id="blog">
          <div className="container">
            <div className="blog__head reveal">
              <div>
                <div className="section-tag">Le journal</div>
                <h2 className="section-title">Lire, <em>à tête reposée.</em></h2>
              </div>
              <a className="btn btn--ghost" href="/blog">Tous les articles <span className="arrow">→</span></a>
            </div>
            <div className="blog__grid">
              {articles.map((a, i) => (
                <a className="post reveal" key={a.t} href="/blog" style={{ transitionDelay: `${i * 0.12}s` }}>
                  <div className="post__cat">{a.cat}</div>
                  <h3 className="post__title">{a.t}</h3>
                  <div className="post__meta">Lecture {a.min} <span className="arrow">→</span></div>
                </a>
              ))}
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

        {/* ── CONTACT ── */}
        <section className="contact" id="contact">
          <div className="contact__blob" aria-hidden="true"></div>
          <div className="container contact__grid">
            <div className="reveal">
              <div className="section-tag">Contact</div>
              <h2 className="section-title">Faire le <em>premier pas.</em></h2>
              <p className="contact__lead">
                Un message ou un appel suffit. Nous échangeons quelques minutes, et nous fixons une
                première séance si vous le souhaitez.
              </p>
              <dl className="contact__dl">
                <div className="contact__row"><dt>Tél.</dt><dd>06 49 35 80 89</dd></div>
                <div className="contact__row"><dt>Site</dt><dd>novahypnose.fr</dd></div>
                <div className="contact__row"><dt>Adresse</dt><dd>16 rue Saint-Antoine, 75004 Paris</dd></div>
                <div className="contact__row"><dt>Horaires</dt><dd>Lun. — Ven. · 11h — 20h</dd></div>
              </dl>
            </div>

            <form
              className="contact__form reveal"
              style={{ transitionDelay: '.2s' }}
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            >
              <div className="field">
                <label htmlFor="cz-nom">Votre nom</label>
                <input id="cz-nom" type="text" placeholder="Marie Dupont" required />
              </div>
              <div className="field">
                <label htmlFor="cz-email">Email</label>
                <input id="cz-email" type="email" placeholder="marie@exemple.fr" required />
              </div>
              <div className="field">
                <label htmlFor="cz-tel">Téléphone</label>
                <input id="cz-tel" type="tel" placeholder="06 12 34 56 78" />
              </div>
              <div className="field">
                <label htmlFor="cz-msg">Message</label>
                <textarea id="cz-msg" placeholder="Quelques mots sur ce qui vous amène…" rows={3}></textarea>
              </div>
              <button className="btn btn--amber" type="submit">Envoyer <span className="arrow">→</span></button>
              {sent && <p className="contact__success">Merci — je vous recontacte sous 24 h.</p>}
            </form>
          </div>
        </section>

        {/* ── CHARTE — palette & typographie ── */}
        <section className="charte" id="charte">
          <div className="container">
            <div className="reveal">
              <div className="section-tag">Charte graphique</div>
              <h2 className="section-title">Le langage <em>de la marque.</em></h2>
            </div>

            <div className="charte__grid">
              <div className="reveal" style={{ transitionDelay: '.1s' }}>
                <div className="charte__block-label">① Palette risographie</div>
                <div className="swatches">
                  <div className="swatch swatch--filtered" style={{ background: '#F2A12E', color: '#1C2B4A' }}>
                    <div><div className="swatch__name">Ambre</div><div className="swatch__hex">#F2A12E</div></div>
                    <div className="swatch__role">Chaleur, éveil</div>
                  </div>
                  <div className="swatch swatch--filtered" style={{ background: '#2B4BA0', color: '#F0ECE3' }}>
                    <div><div className="swatch__name">Cobalt</div><div className="swatch__hex">#2B4BA0</div></div>
                    <div className="swatch__role">Profondeur, calme</div>
                  </div>
                  <div className="swatch swatch--filtered" style={{ background: '#8A9BB8', color: '#1C2B4A' }}>
                    <div><div className="swatch__name">Brume</div><div className="swatch__hex">#8A9BB8</div></div>
                    <div className="swatch__role">Intersection riso</div>
                  </div>
                  <div className="swatch" style={{ background: '#F0ECE3', color: '#1C2B4A', border: '1px solid rgba(28,43,74,.1)' }}>
                    <div><div className="swatch__name">Lin</div><div className="swatch__hex">#F0ECE3</div></div>
                    <div className="swatch__role">Papier, espace</div>
                  </div>
                  <div className="swatch" style={{ background: '#1C2B4A', color: '#F0ECE3' }}>
                    <div><div className="swatch__name">Profond</div><div className="swatch__hex">#1C2B4A</div></div>
                    <div className="swatch__role">Texte, nuit</div>
                  </div>
                </div>
                <p style={{ marginTop: 32, fontSize: 14, lineHeight: 1.7, maxWidth: 520, color: 'var(--corps)', opacity: .8 }}>
                  Deux encres principales — ambre et cobalt — qui, en se superposant, font apparaître
                  la brume. Le lin est le papier qui les accueille. Le grain n'est jamais retiré : il
                  dit que ce qu'on regarde a été <em>imprimé</em>.
                </p>
              </div>

              <div className="reveal" style={{ transitionDelay: '.2s' }}>
                <div className="charte__block-label">② Typographies</div>
                <div className="typo-row">
                  <div className="typo-row__label">— Cormorant Garamond · Light</div>
                  <div className="typo-row__sample-1">Un sas au milieu de la ville.</div>
                  <div className="typo-row__role">Titres · accroches · élégance, sérénité, légèreté.</div>
                </div>
                <div className="typo-row">
                  <div className="typo-row__label">— Cormorant Garamond · Italic · le fil ZEN</div>
                  <div className="typo-row__sample-2"><em>Zen</em><span className="at">atti</span></div>
                  <div className="typo-row__role">ZEN en italic cobalt — atti en romain ambre.</div>
                </div>
                <div className="typo-row">
                  <div className="typo-row__label">— DM Sans · Regular</div>
                  <div className="typo-row__sample-3">Body · Hypnose ericksonienne à Paris. Réservation en ligne.</div>
                  <div className="typo-row__role">Texte courant · modernité douce, lisibilité.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="foot">
          <div className="container foot__inner">
            <div className="foot__brand">
              <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
              <span className="foot__tag">— pour aller à votre rythme</span>
            </div>
            <nav className="foot__links">
              <a href="/mentions-legales">Mentions légales</a>
              <a href="/mentions-legales">Politique de confidentialité</a>
              <a href="/mentions-legales">CGV</a>
            </nav>
          </div>
          <div className="foot__copy">© MMXXVI · NovaHypnose · 16 rue Saint-Antoine, 75004 Paris</div>
        </footer>
      </div>
    </>
  );
};

export default PreviewCharte;
