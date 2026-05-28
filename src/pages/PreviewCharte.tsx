/**
 * PreviewCharte — aperçu de la charte graphique « ZENatti / risographie »
 * Page autoportante (noindex), styles scopés .cz, contenu réel du site.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import { testimonials } from '@/data/testimonials';
import { applications } from '@/data/applicationsData';
import { faqItems } from '@/data/faqData';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

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
        <title>Aperçu charte ZENatti — NovaHypnose</title>
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
              <a href="#applications">Domaines</a>
              <a href="#temoignages">Avis</a>
              <a href="#tarifs">Tarifs</a>
              <a href="#faq">FAQ</a>
              <a href="#contact">Contact</a>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Rendez-vous <span className="arrow">→</span>
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
              <g filter="url(#riso-full)">
                <path d="M 1340 920 C 1400 900, 1450 940, 1450 990 C 1450 1040, 1410 1060, 1360 1050 C 1300 1040, 1280 990, 1300 950 C 1310 935, 1325 925, 1340 920 Z" fill="#F2A12E" opacity="0.95" />
              </g>
              <rect width="1440" height="1000" filter="url(#paperGrain)" opacity=".25" />
            </svg>
          </div>

          <div className="hero__dots" aria-hidden="true"></div>
          <div className="zen-mark" aria-hidden="true">zen</div>

          <div className="container hero__container">
            <div className="reveal hero__panel" style={{ transitionDelay: '.1s' }}>
              <div className="tag">Hypnothérapeute — Paris 4 · Bastille · Marais</div>
              <h1 className="hero__name">
                <span className="alain">Alain</span>
                <span className="full"><span className="zen">Zen</span><span className="atti">atti</span></span>
              </h1>
              <div className="hero__rule"></div>
              <p className="hero__lead">
                Stress · anxiété · phobies · sommeil.<br />
                <em>Maître Hypnologue certifié.</em><br />
                Résultats durables en 3 à 5 séances.
              </p>
              <div className="hero__sub">
                Cabinet Paris 4ème (Marais-Bastille) &amp; visio partout en France
              </div>
              <div className="hero__cta">
                <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Prendre rendez-vous <span className="arrow">→</span>
                </a>
                <a className="btn btn--ghost" href="#about">Découvrir l'approche</a>
              </div>
            </div>

            <aside className="hero__card reveal" style={{ transitionDelay: '.35s' }}>
              <div className="hero__card-label">Première séance</div>
              <p className="hero__card-quote">« Vous êtes accueilli sans jugement, accompagné à votre rythme. »</p>
              <div className="hero__card-row"><span>Durée</span><span>1h30</span></div>
              <div className="hero__card-row"><span>Tarif</span><span>90 €</span></div>
              <div className="hero__card-row"><span>Cabinet</span><span>16 rue Saint-Antoine, Paris 4e</span></div>
              <div className="hero__card-row"><span>Visio</span><span>Partout en France</span></div>
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
                Alain Zenatti,<br /><em>Hypnothérapeute à Paris.</em>
              </h2>
              <p>
                <strong>Maître Hypnologue certifié</strong>, je vous accompagne au cœur de Paris avec
                plus de 5 années d'expérience en hypnose ericksonienne. Mon cabinet dans le Marais
                (Paris 4ème) offre un accompagnement professionnel de haut niveau, alliant formation
                approfondie et approche entièrement personnalisée.
              </p>
              <p>
                L'hypnose ericksonienne repose sur l'idée que l'inconscient de chaque personne est
                une source immense de solutions. Cette approche est douce, permissive, et respecte
                pleinement votre rythme. Vous n'êtes pas dirigé — vous êtes accompagné dans un
                dialogue avec votre propre ressource intérieure. Vous gardez le contrôle,
                du premier instant au dernier.
              </p>
              <p>
                Contrairement aux thérapies longues traditionnelles, l'hypnose ericksonienne est une
                <strong> thérapie brève orientée solutions</strong> : la plupart des accompagnements
                aboutissent en <strong>3 à 5 séances</strong>. Des résultats concrets, pas
                d'exploration sans fin.
              </p>
              <div className="about__stat">
                <div><div className="about__stat-n">5+</div><div className="about__stat-l">années d'expérience</div></div>
                <div><div className="about__stat-n">9</div><div className="about__stat-l">certifications</div></div>
                <div><div className="about__stat-n">5/5</div><div className="about__stat-l">22 avis Google</div></div>
              </div>
              <div style={{ marginTop: 32 }}>
                <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Prendre rendez-vous <span className="arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── DOMAINES D'APPLICATION ── */}
        <section className="seances" id="applications">
          <div className="container">
            <div className="seances__head reveal">
              <div>
                <div className="section-tag">Domaines d'application</div>
                <h2 className="section-title">
                  L'hypnose <em>pour quoi ?</em>
                </h2>
              </div>
              <p>
                L'hypnose ericksonienne s'adapte à un large éventail de problématiques.
                Voici les motifs les plus fréquents en consultation.
              </p>
            </div>

            <div className="cards">
              {applications.map((app, i) => {
                const Icon = app.icon;
                return (
                  <article className="card reveal" key={app.title} style={{ transitionDelay: `${(i % 3) * 0.12}s` }}>
                    <div className="card__icon-lc">
                      <Icon size={26} strokeWidth={1.5} style={{ color: 'var(--amber)' }} />
                    </div>
                    <h3 className="card__title">{app.title}</h3>
                    <p className="card__desc">{app.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section className="temoignages" id="temoignages">
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Avis clients</div>
              <h2 className="section-title">Ce qu'<em>on en dit.</em></h2>
            </div>

            <div className="temoignages__list">
              {[testimonials[1], testimonials[2], testimonials[8]].map((t, i) => (
                <React.Fragment key={t.name}>
                  <div className="temoignage reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
                    <p className="temoignage__quote">« {t.text} »</p>
                    <div className="temoignage__author">
                      <strong>{t.name}</strong> · {t.date} · Google
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
            <div className="reveal">
              <div className="section-tag">Tarifs</div>
              <h2 className="section-title">Choisissez <em>votre formule.</em></h2>
            </div>

            <div className="tarifs-grid">
              {/* Cabinet */}
              <article className="tarif-card tarif-card--featured reveal">
                <div className="tarif-badge">⭐ RECOMMANDÉE</div>
                <h3>Cabinet Paris Bastille</h3>
                <div className="tarif-price">90<sup>€</sup></div>
                <p className="tarif-desc">Au cœur de Paris</p>
                <ul>
                  <li>1h30 (première séance)</li>
                  <li>1h (séances suivantes)</li>
                  <li>Métro Bastille, St Paul, Sully-Morland</li>
                </ul>
                <a className="btn btn--amber" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver au cabinet <span className="arrow">→</span>
                </a>
              </article>

              {/* Visio */}
              <article className="tarif-card reveal" style={{ transitionDelay: '.15s' }}>
                <h3>Téléconsultation</h3>
                <div className="tarif-price">90<sup>€</sup></div>
                <p className="tarif-desc">Depuis chez vous</p>
                <ul>
                  <li>1h30 (première séance)</li>
                  <li>1h (séances suivantes)</li>
                  <li>Connexion sécurisée (Google Meet)</li>
                  <li>Partout en France &amp; à l'étranger</li>
                </ul>
                <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver en visio <span className="arrow">→</span>
                </a>
              </article>

              {/* Domicile */}
              <article className="tarif-card reveal" style={{ transitionDelay: '.3s' }}>
                <div className="tarif-badge" style={{ background: 'var(--cobalt)', color: 'var(--lin)' }}>NOUVEAU</div>
                <h3>À Domicile</h3>
                <div className="tarif-price">140<sup>€</sup></div>
                <p className="tarif-desc">Paris Centre</p>
                <ul>
                  <li>1h30 (première séance)</li>
                  <li>1h (séances suivantes)</li>
                  <li>Arrondissements 1–4, 9–11</li>
                </ul>
                <a className="btn btn--ghost" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
                  Réserver à domicile <span className="arrow">→</span>
                </a>
              </article>
            </div>

            <p className="tarifs-note reveal">
              Paiement par carte bancaire, espèces, Wero ou en ligne via Stripe.
              Certaines mutuelles remboursent partiellement les séances — renseignez-vous auprès de la vôtre.
              Annulation sans frais jusqu'à 48h avant le rendez-vous.
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="faq-sect" id="faq">
          <div className="container">
            <div className="reveal">
              <div className="section-tag">Questions fréquentes</div>
              <h2 className="section-title">Vos <em>questions.</em></h2>
            </div>

            <div className="faq-list">
              {faqItems.slice(0, 6).map((item, i) => (
                <div className="faq-item reveal" key={i} style={{ transitionDelay: `${i * 0.07}s` }}>
                  <button
                    className={`faq-q${openFaq === i ? ' open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    {item.question}
                    <span className="faq-chevron">+</span>
                  </button>
                  {openFaq === i && (
                    <div className="faq-a">{item.answer}</div>
                  )}
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
              <h2 className="section-title">Prenons <em>contact.</em></h2>
              <p className="contact__lead">
                Un appel suffit. Nous échangeons quelques minutes sur votre demande, je réponds à vos
                questions, et nous fixons une première séance si vous le souhaitez.
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
                <textarea id="cz-msg" placeholder="Quelques mots sur votre demande…" rows={3}></textarea>
              </div>
              <button className="btn btn--amber" type="submit">Envoyer <span className="arrow">→</span></button>
              {sent && <p className="contact__success">Merci — je vous recontacte sous 24h.</p>}
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
                <p style={{ marginTop: 32, fontSize: 14, lineHeight: 1.7, maxWidth: 520, opacity: .75 }}>
                  Deux encres principales — ambre et cobalt — qui, en se superposant, font apparaître
                  la brume. Le lin est le papier qui les accueille. Le grain n'est jamais retiré : c'est
                  lui qui dit que ce qu'on regarde a été <em>imprimé</em>.
                </p>
              </div>

              <div className="reveal" style={{ transitionDelay: '.2s' }}>
                <div className="charte__block-label">② Typographies</div>
                <div className="typo-row">
                  <div className="typo-row__label">— Cormorant Garamond · Light</div>
                  <div className="typo-row__sample-1">Une parenthèse au cœur du Marais.</div>
                  <div className="typo-row__role">Titres · accroches · élégance, sérénité, légèreté.</div>
                </div>
                <div className="typo-row">
                  <div className="typo-row__label">— Cormorant Garamond · Italic · pour le fil rouge ZEN</div>
                  <div className="typo-row__sample-2"><em>Zen</em><span className="at">atti</span></div>
                  <div className="typo-row__role">Lettres ZEN en italic cobalt — atti en romain ambre. Toujours.</div>
                </div>
                <div className="typo-row">
                  <div className="typo-row__label">— DM Sans · Regular</div>
                  <div className="typo-row__sample-3">Body · Hypnothérapeute à Paris 4. Réservations en ligne.</div>
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
