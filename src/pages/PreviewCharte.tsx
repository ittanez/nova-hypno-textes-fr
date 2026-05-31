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

const domaines = [
  { t: 'Retrouver le calme', d: "Desserrer la pression intérieure, retrouver une respiration ample et un esprit plus posé, au quotidien." },
  { t: 'Des nuits apaisées', d: "Laisser le mental se déposer le soir, et renouer avec un sommeil simple et réparateur." },
  { t: 'Habiter sa confiance', d: "Reprendre votre juste place, avec une assurance tranquille qui vient de l'intérieur." },
  { t: 'Se sentir plus libre', d: "Alléger ce qui retient, dépasser une appréhension, avancer avec plus d'aisance." },
  { t: 'Apprivoiser ses émotions', d: "Accueillir ce qui vous traverse sans être débordé, et retrouver de la stabilité." },
  { t: "Aborder l'instant clé", d: "Prise de parole, échéance, changement : mobiliser votre calme au bon moment." },
  { t: 'Renouer avec son corps', d: "Apaiser le rapport à la nourriture, retrouver des repères justes, habiter son corps avec plus de douceur." },
  { t: "Reprendre l'élan", d: "Sortir de l'inertie qui pèse, retrouver le goût d'agir et avancer vers ce qui compte pour vous." },
  { t: "Sortir d'une habitude", d: "Desserrer un automatisme qui vous échappe, redonner de la place au choix, dans le quotidien." },
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
              <a href="#visio">En visio</a>
              <a href="#domaines">Accompagnement</a>
              <a href="#temoignages">Avis</a>
              <a href="/preview-charte-autohypnose">Auto-hypnose ↗</a>
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

              <div className="about__approche">
                <div className="about__approche-label">Mon approche</div>
                <h3 className="about__approche-title">L'hypnose ericksonienne, <em>concrètement.</em></h3>
                <p>
                  Je pratique l'hypnose ericksonienne, dans la lignée du psychiatre américain Milton H. Erickson.
                  Loin de l'hypnose de scène et des injonctions, c'est une approche <strong>respectueuse,
                  indirecte et permissive</strong> — qui parle à votre inconscient par métaphores et suggestions
                  ouvertes, plutôt qu'en imposant un récit.
                </p>
                <p>
                  Concrètement : pas de transe spectaculaire, pas de perte de contrôle. Vous restez présent,
                  vous entendez tout, vous pouvez ouvrir les yeux quand vous voulez. Ce qui change, c'est
                  votre rapport à ce qui vous encombre — parce que vos propres ressources, déjà là, retrouvent
                  un chemin d'expression.
                </p>
              </div>

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
        </section>

        {/* ── EN VISIO — pendant exact du cabinet ── */}
        <section className="visio" id="visio">
          <div className="container cabinet__grid cabinet__grid--reverse">
            <div className="cabinet__visual reveal" style={{ transitionDelay: '.2s' }} aria-hidden="true">
              <svg viewBox="0 0 520 560" preserveAspectRatio="xMidYMid meet">
                <g filter="url(#riso-full)">
                  <path d="M 90 130 C 220 80, 380 100, 440 220 C 480 310, 460 400, 430 470 C 410 520, 340 540, 240 530 C 140 520, 80 470, 70 380 C 60 290, 70 200, 90 130 Z" fill="#2B4BA0" opacity="0.92" />
                </g>
                <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                  <path d="M 160 200 C 280 160, 380 200, 400 300 C 415 380, 360 450, 260 450 C 160 450, 110 380, 120 290 C 126 240, 140 214, 160 200 Z" fill="#F2A12E" opacity="0.9" />
                </g>
                <rect x="170" y="240" width="180" height="120" rx="10" fill="#F0ECE3" opacity="0.95" />
                <circle cx="260" cy="285" r="14" fill="#2B4BA0" opacity="0.85" />
                <rect x="220" y="310" width="80" height="6" rx="3" fill="#2B4BA0" opacity="0.6" />
                <rect x="200" y="324" width="120" height="6" rx="3" fill="#2B4BA0" opacity="0.4" />
                <rect width="520" height="560" filter="url(#paperGrain)" opacity=".25" />
              </svg>
              <div className="cabinet__addr">En visio · partout en France</div>
            </div>
            <div className="cabinet__copy reveal">
              <div className="section-tag">En visio</div>
              <h2 className="section-title">Le même cabinet,<br /><em>depuis chez vous.</em></h2>
              <p>
                Une séance en visio, c'est <strong>exactement</strong> une séance — la même profondeur,
                la même qualité de travail, le même temps pris. Simplement, le cabinet vient à vous.
              </p>
              <p>
                Beaucoup le découvrent avec surprise : depuis son canapé, dans son propre cocon, on entre
                souvent encore plus vite dans la détente. Et l'hypnose ericksonienne — qui passe par
                la voix, l'écoute, la métaphore — s'y prête remarquablement.
              </p>
              <ul className="cabinet__list">
                <li><strong>Partout en France</strong> — et au-delà, pour les francophones à l'étranger.</li>
                <li><strong>Un endroit à vous</strong> — calme, casque audio, connexion stable. Rien d'autre.</li>
                <li><strong>Même tarif qu'au cabinet</strong> — 90 €, 1h30 la première séance.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── DOMAINES D'ACCOMPAGNEMENT (états recherchés) ── */}
        <section className="seances" id="domaines">
          <div className="container">
            <div className="seances__head reveal">
              <div>
                <div className="section-tag">Accompagnement</div>
                <h2 className="section-title">Là où l'hypnose <em>vous porte.</em></h2>
              </div>
              <p>
                Non pas une liste de problèmes, mais les états vers lesquels nous cheminons ensemble,
                à votre mesure.
              </p>
            </div>

            <div className="cards">
              {domaines.map((d, i) => (
                <article className="card reveal" key={d.t} style={{ transitionDelay: `${(i % 3) * 0.12}s` }}>
                  <span className="card__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="card__title">{d.t}</h3>
                  <p className="card__desc">{d.d}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="temoignages" id="temoignages">
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Ils en parlent</div>
              <h2 className="section-title">Des mots, <em>après.</em></h2>
            </div>

            <div className="temoignages__list">
              {[testimonials[0], testimonials[3], testimonials[8]].map((t, i) => (
                <React.Fragment key={t.name}>
                  <div className="temoignage reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                    <p className="temoignage__quote">« {t.text} »</p>
                    <div className="temoignage__author">
                    <span className="temoignage__stars" aria-label="5 sur 5">★★★★★</span>
                    <strong>{t.name}</strong> · Google
                  </div>
                  </div>
                  {i < 2 && <div className="wave reveal" aria-hidden="true"></div>}
                </React.Fragment>
              ))}
            </div>
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
          © NovaHypnose · Alain Zenatti <em>— pour aller à votre rythme</em> · MMXXVI
        </footer>
      </div>
    </>
  );
};

export default PreviewCharte;
