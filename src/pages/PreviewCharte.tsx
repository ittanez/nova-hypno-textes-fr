/**
 * PreviewCharte — page de prévisualisation de la nouvelle charte graphique
 * « ZENatti / risographie ». Page autoportante (pas de header/footer du site),
 * styles scopés sous .cz (src/styles/preview-charte.css) pour ne pas affecter
 * le reste de l'application.
 *
 * Données réelles du cabinet (et non les placeholders de la maquette) :
 * adresse 16 rue Saint-Antoine 75004, « Hypnothérapeute », tarif 90 €, etc.
 * NOTE : page en noindex — c'est un essai visuel, pas une page publique.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const PreviewCharte: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);

  // Reveal-on-scroll (scopé aux éléments de cette page)
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>('.reveal');
    if (!('IntersectionObserver' in window)) {
      els.forEach((e) => e.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
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
        {/* ===== SVG defs — filtres risographie (montés une fois) ===== */}
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

        {/* ===== NAV ===== */}
        <nav className="nav">
          <div className="container nav__row">
            <a className="brand" href="#hero">
              <span className="alain">Alain</span><span className="zen">Zen</span><span className="atti">atti</span>
            </a>
            <div className="nav__links">
              <a href="#about">À propos</a>
              <a href="#seances">Séances</a>
              <a href="#temoignages">Récits</a>
              <a href="#charte">Charte</a>
              <a href="#contact">Contact</a>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ===== HERO ===== */}
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
              <div className="tag">Hypnothérapeute — Paris 4 · Marais</div>
              <h1 className="hero__name">
                <span className="alain">Alain</span>
                <span className="full"><span className="zen">Zen</span><span className="atti">atti</span></span>
              </h1>
              <div className="hero__rule"></div>
              <p className="hero__lead">
                Retrouvez votre équilibre <em>ZEN</em>.<br />
                Une approche <em>ZENith</em> de vous-même,<br />
                dans un cabinet pensé comme une parenthèse.
              </p>
              <div className="hero__sub">
                <span style={{ color: 'var(--cobalt)' }}>novahypnose.fr</span> · 06 49 35 80 89
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
              <p className="hero__card-quote">« Une parenthèse. Un dialogue. À votre rythme. »</p>
              <div className="hero__card-row"><span>Durée</span><span>1h30</span></div>
              <div className="hero__card-row"><span>Tarif</span><span>90 €</span></div>
              <div className="hero__card-row"><span>Lieu</span><span>16 rue Saint-Antoine, Paris 4e &amp; visio</span></div>
            </aside>
          </div>
        </section>

        {/* ===== À PROPOS ===== */}
        <section className="about" id="about">
          <div className="about__bg" aria-hidden="true"></div>
          <div className="container about__grid">
            <div className="about__photo reveal" aria-label="Portrait d'Alain Zenatti"></div>
            <div className="about__copy reveal" style={{ transitionDelay: '.15s' }}>
              <div className="section-tag">À propos</div>
              <h2 className="section-title">
                Une parenthèse <span className="zenith">ZENith</span><br />
                au cœur du Marais.
              </h2>
              <p>
                Hypnothérapeute certifié, Maître Hypnologue formé à l'École Psynapse, je reçois
                dans un cabinet pensé comme une zone de dépose — un endroit pour ralentir, écouter
                ce qui se dit à l'intérieur, et accompagner ce qui demande à bouger.
              </p>
              <p>
                L'hypnose ericksonienne n'est pas un tour de force. C'est un dialogue permissif avec
                la part de vous qui sait déjà. Vous gardez le contrôle, du premier instant au dernier.
              </p>
              <div className="about__stat">
                <div>
                  <div className="about__stat-n">5+</div>
                  <div className="about__stat-l">années d'expérience</div>
                </div>
                <div>
                  <div className="about__stat-n">9</div>
                  <div className="about__stat-l">certifications</div>
                </div>
                <div>
                  <div className="about__stat-n">5/5</div>
                  <div className="about__stat-l">22 avis Google</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SÉANCES ===== */}
        <section className="seances" id="seances">
          <div className="container">
            <div className="seances__head reveal">
              <div>
                <div className="section-tag">Séances</div>
                <h2 className="section-title">
                  Retrouvez <em>votre ZEN</em>.<br />
                  Sur trois terrains.
                </h2>
              </div>
              <p>
                Trois motifs de consultation parmi les plus fréquents au cabinet —
                l'hypnose ericksonienne s'adapte à un large éventail de situations.
              </p>
            </div>

            <div className="cards">
              <article className="card reveal" style={{ transitionDelay: '.1s' }}>
                <svg className="card__icon" viewBox="0 0 100 100" aria-hidden="true">
                  <g filter="url(#riso-full)">
                    <path d="M 50 12 C 78 12, 90 32, 88 56 C 86 80, 64 90, 44 86 C 24 82, 12 62, 16 42 C 20 24, 32 12, 50 12 Z" fill="#F2A12E" opacity=".92" />
                  </g>
                </svg>
                <h3 className="card__title"><em>Anxiété</em> &amp; stress</h3>
                <p className="card__desc">Désactiver le mode alerte chronique, restaurer une respiration ample, désamorcer les ruminations.</p>
                <div className="card__link">3 — 5 séances →</div>
              </article>

              <article className="card reveal" style={{ transitionDelay: '.25s' }}>
                <svg className="card__icon" viewBox="0 0 100 100" aria-hidden="true">
                  <g filter="url(#riso-full)">
                    <path d="M 16 50 C 16 26, 38 12, 60 16 C 84 22, 92 44, 84 66 C 76 86, 52 92, 32 80 C 18 70, 14 60, 16 50 Z" fill="#F2A12E" opacity=".92" />
                  </g>
                </svg>
                <h3 className="card__title"><em>Sommeil</em> retrouvé</h3>
                <p className="card__desc">Reprogrammer en douceur les cycles, apaiser les ruminations du soir, retrouver un sommeil réparateur.</p>
                <div className="card__link">3 séances en moyenne →</div>
              </article>

              <article className="card reveal" style={{ transitionDelay: '.4s' }}>
                <svg className="card__icon" viewBox="0 0 100 100" aria-hidden="true">
                  <g filter="url(#riso-full)">
                    <path d="M 24 24 C 44 8, 72 14, 84 36 C 96 58, 84 84, 60 88 C 36 92, 14 76, 12 54 C 11 42, 16 32, 24 24 Z" fill="#F2A12E" opacity=".92" />
                  </g>
                </svg>
                <h3 className="card__title"><em>Confiance</em> en soi</h3>
                <p className="card__desc">Travailler les croyances limitantes, redéployer un sentiment juste de sa propre valeur.</p>
                <div className="card__link">4 — 6 séances →</div>
              </article>
            </div>
          </div>
        </section>

        {/* ===== TÉMOIGNAGES ===== */}
        <section className="temoignages" id="temoignages">
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center' }}>
              <div className="section-tag" style={{ justifyContent: 'center' }}>Récits</div>
              <h2 className="section-title">Ce qu'<em>on en dit</em>.</h2>
            </div>

            <div className="temoignages__list">
              <div className="temoignage reveal">
                <p className="temoignage__quote">« Un univers singulier coloré, installé au cœur du Marais. Y accéder à pied, repartir en flânant place des Vosges — la parenthèse se referme avec douceur. »</p>
                <div className="temoignage__author"><strong>Dominique B.</strong> · Avril 2025 · Resalib</div>
              </div>
              <div className="wave reveal" aria-hidden="true"></div>

              <div className="temoignage reveal">
                <p className="temoignage__quote">« Le travail thérapeutique a été très rapide et efficace. L'hypnose est vraiment un outil puissant — je me suis sentie en confiance tout au long du chemin. »</p>
                <div className="temoignage__author"><strong>Marina L.</strong> · Mars 2025 · Google</div>
              </div>
              <div className="wave reveal" aria-hidden="true"></div>

              <div className="temoignage reveal">
                <p className="temoignage__quote">« Praticien calme et réfléchi. Son écoute attentive lui a permis de déterminer les axes de travail. En quelques séances, libéré de blocages. »</p>
                <div className="temoignage__author"><strong>Pierre H.</strong> · Février 2025 · Resalib</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CHARTE — palette & typographie ===== */}
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
                <div className="typo-row">
                  <div className="typo-row__label">— Échelle d'usage</div>
                  <ul className="typo-scale">
                    <li><strong style={{ fontFamily: 'var(--f-serif)', fontSize: 16, fontWeight: 400, fontStyle: 'italic' }}>Display</strong> — Cormorant 72–156 px · ZEN en italic</li>
                    <li><strong style={{ fontFamily: 'var(--f-serif)', fontSize: 16, fontWeight: 400, fontStyle: 'italic' }}>H2 — section</strong> — Cormorant 40–72 px</li>
                    <li><strong style={{ fontFamily: 'var(--f-serif)', fontSize: 14, fontWeight: 400, fontStyle: 'italic' }}>Lead</strong> — Cormorant italic 22–26 px</li>
                    <li><strong style={{ fontFamily: 'var(--f-sans)', fontSize: 14 }}>Body</strong> — DM Sans 16 px · line-height 1.75</li>
                    <li><strong style={{ fontFamily: 'var(--f-sans)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase' }}>TAG</strong> — DM Sans 11 px · 0.22em letter-spacing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CONTACT ===== */}
        <section className="contact" id="contact">
          <div className="contact__blob" aria-hidden="true"></div>
          <div className="container contact__grid">
            <div className="reveal">
              <div className="section-tag">Contact</div>
              <h2 className="section-title">Au cœur <em>du ZEN.</em></h2>
              <p className="contact__lead">
                Un appel suffit. Nous échangeons quelques minutes sur votre demande, je réponds à vos
                questions, et nous fixons une première séance si vous le souhaitez.
              </p>
              <dl className="contact__dl">
                <div className="contact__row"><dt>Tél.</dt><dd>06 49 35 80 89</dd></div>
                <div className="contact__row"><dt>Email</dt><dd>contact@novahypnose.fr</dd></div>
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

        <footer className="foot">
          © NovaHypnose · Alain Zenatti <em>— pour aller à votre rythme</em> · MMXXVI
        </footer>
      </div>
    </>
  );
};

export default PreviewCharte;
