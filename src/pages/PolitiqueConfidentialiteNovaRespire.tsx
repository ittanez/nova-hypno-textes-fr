/**
 * PolitiqueConfidentialiteNovaRespire — politique de confidentialité de
 * l'application mobile NovaRespire, dans la charte risographie.
 * URL déclarée dans Google Play Console : /politique-de-confidentialite-novarespire/
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import '@/styles/charte-secondary.css';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const retentionRows = [
  {
    data: 'Préférences et historique de session',
    place: 'Votre appareil uniquement',
    duration: 'Jusqu’à la désinstallation de l’app ou la suppression via le menu « Supprimer mes données »',
  },
  {
    data: 'Statistiques d’utilisation anonymes',
    place: 'Firebase Analytics',
    duration: '14 mois maximum, puis suppression automatique',
  },
  {
    data: 'Rapports de plantage',
    place: 'Firebase Crashlytics',
    duration: '90 jours maximum, puis suppression automatique',
  },
  {
    data: 'Ambiances sonores téléchargées',
    place: 'Votre appareil uniquement',
    duration: 'Jusqu’à la désinstallation de l’app',
  },
];

const PolitiqueConfidentialiteNovaRespire: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Politique de confidentialité — Application NovaRespire</title>
        <meta name="description" content="Politique de confidentialité de l'application de respiration guidée NovaRespire : données traitées, durées de conservation, suppression des données et droits RGPD." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/politique-de-confidentialite-novarespire/" />
      </Helmet>

      <div className="cz" ref={rootRef}>
        {/* ── SVG defs ── */}
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
              <a href="/#about">À propos</a>
              <a href="/#cabinet">Le cabinet</a>
              <a href="/#domaines">Accompagnement</a>
              <Link to="/autohypnose">Auto-hypnose ↗</Link>
              <Link to="/blog">Blog ↗</Link>
              <a href="https://hypno-balade.novahypnose.fr/" target="_blank" rel="noopener noreferrer">Hypno-balade ↗</a>
              <a href="/#contact">Contact</a>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section className="hero" id="hero" style={{ minHeight: '28vh', paddingTop: '6rem', paddingBottom: '3rem' }}>
          <div className="hero__bg" aria-hidden="true">
            <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMid slice">
              <g filter="url(#riso-full)">
                <path d="M 0 0 C 300 60, 700 40, 1100 80 C 1250 95, 1380 120, 1440 180 L 1440 400 L 0 400 Z" fill="#2B4BA0" opacity="0.85" />
              </g>
              <g filter="url(#riso-full)" style={{ mixBlendMode: 'multiply' }}>
                <path d="M 0 200 C 200 160, 500 140, 800 180 C 1000 205, 1200 170, 1440 200 L 1440 400 L 0 400 Z" fill="#F2A12E" opacity="0.55" />
              </g>
              <rect width="1440" height="400" filter="url(#paperGrain)" opacity=".2" />
            </svg>
          </div>
          <div className="container hero__container" style={{ alignItems: 'flex-start', paddingTop: '2rem' }}>
            <div className="reveal hero__panel" style={{ maxWidth: 640 }}>
              <div className="tag">Application NovaRespire</div>
              <h1 className="hero__name" style={{ fontSize: 'clamp(2.2rem, 5.5vw, 4rem)', marginTop: '1rem' }}>
                Politique de <em>confidentialité.</em>
              </h1>
              <p className="hero__sub" style={{ marginTop: '1rem' }}>
                Application de respiration guidée NovaRespire · Dernière mise à jour : juin 2026
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTENU ── */}
        <section className="section" id="politique" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
          <div className="container" style={{ maxWidth: 800 }}>

            {/* Introduction */}
            <div className="reveal legal-block" style={{ transitionDelay: '.05s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Introduction
              </h2>
              <p className="legal-text">
                NovaRespire est une application de respiration guidée éditée par Alain Zenatti (NovaHypnose, Paris).
                Cette politique explique quelles données l'application traite, pendant combien de temps, et comment
                les supprimer.
              </p>
            </div>

            {/* Données collectées */}
            <div className="reveal legal-block" style={{ transitionDelay: '.1s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Données <em>collectées</em>
              </h2>
              <p className="legal-text">
                NovaRespire ne demande <strong>aucune création de compte</strong> et ne collecte <strong>aucune donnée
                personnelle identifiable</strong> (ni nom, ni email, ni numéro de téléphone, ni localisation).
              </p>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                L'application traite uniquement :
              </p>
              <ul className="legal-list" style={{ marginTop: '0.75rem' }}>
                <li>
                  <strong>Préférences et historique de session</strong> (technique de respiration, durée, fond d'écran,
                  ambiance sonore choisis) — stockés <strong>localement sur votre appareil</strong>, jamais transmis à
                  des serveurs.
                </li>
                <li>
                  <strong>Statistiques d'utilisation anonymes</strong> (nombre de sessions, type d'exercice, durée de
                  pratique) — via Firebase Analytics (Google), sans identifiant personnel.
                </li>
                <li>
                  <strong>Rapports de plantage anonymes</strong> (modèle d'appareil, version Android, trace technique
                  de l'erreur) — via Firebase Crashlytics (Google).
                </li>
              </ul>
            </div>

            {/* Durée de conservation */}
            <div className="reveal legal-block" style={{ transitionDelay: '.14s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Durée de <em>conservation</em>
              </h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', borderBottom: '2px solid var(--corps, #333)' }}>Données</th>
                      <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', borderBottom: '2px solid var(--corps, #333)' }}>Lieu</th>
                      <th style={{ textAlign: 'left', padding: '0.6rem 0.75rem', borderBottom: '2px solid var(--corps, #333)' }}>Durée</th>
                    </tr>
                  </thead>
                  <tbody>
                    {retentionRows.map((row, i) => (
                      <tr key={i}>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(0,0,0,0.12)', verticalAlign: 'top' }}><strong>{row.data}</strong></td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(0,0,0,0.12)', verticalAlign: 'top' }}>{row.place}</td>
                        <td style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid rgba(0,0,0,0.12)', verticalAlign: 'top' }}>{row.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Suppression des données */}
            <div className="reveal legal-block" style={{ transitionDelay: '.18s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Comment supprimer <em>vos données</em>
              </h2>
              <p className="legal-text">
                Vous pouvez supprimer vos données <strong>à tout moment, directement dans l'application, sans nous
                contacter</strong> :
              </p>
              <ol className="legal-list" style={{ marginTop: '0.75rem', listStyle: 'decimal', paddingLeft: '1.25rem' }}>
                <li>Ouvrez le menu de l'application (icône ⋮ en haut à droite de l'écran d'accueil)</li>
                <li>Choisissez <strong>« Supprimer mes données »</strong></li>
                <li>Confirmez : toutes les données locales (préférences, historique) sont effacées immédiatement et définitivement</li>
              </ol>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                La <strong>désinstallation de l'application</strong> supprime également l'intégralité des données
                stockées sur votre appareil.
              </p>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                Pour toute demande concernant les statistiques anonymes côté serveur, écrivez à{' '}
                <a href="mailto:contact@novahypnose.fr"><strong>contact@novahypnose.fr</strong></a> — nous répondons
                sous 30 jours, conformément au RGPD.
              </p>
            </div>

            {/* Droits RGPD */}
            <div className="reveal legal-block" style={{ transitionDelay: '.22s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Vos droits <em>(RGPD)</em>
              </h2>
              <p className="legal-text">
                Conformément au Règlement Général sur la Protection des Données, vous disposez :
              </p>
              <ul className="legal-list" style={{ marginTop: '0.75rem' }}>
                <li>du <strong>droit d'accès</strong> : consultez vos données via le menu « Exporter mes données » de l'application ;</li>
                <li>du <strong>droit à l'effacement</strong> : menu « Supprimer mes données » (voir ci-dessus) ;</li>
                <li>du <strong>droit à la portabilité</strong> : l'export produit un fichier lisible de vos données de session ;</li>
                <li>du <strong>droit d'opposition</strong> : vous pouvez réinitialiser ou désactiver l'identifiant publicitaire dans les paramètres Android de votre appareil.</li>
              </ul>
            </div>

            {/* Services tiers */}
            <div className="reveal legal-block" style={{ transitionDelay: '.26s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Services tiers
              </h2>
              <p className="legal-text">
                L'application utilise les services Google Firebase (Analytics, Crashlytics, et Firebase Storage pour
                le téléchargement des ambiances sonores — ce dernier ne collecte aucune donnée utilisateur). Ces
                services sont soumis à la{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                  politique de confidentialité de Google
                </a>.
              </p>
            </div>

            {/* Responsable du traitement */}
            <div className="reveal legal-block" style={{ transitionDelay: '.30s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Responsable <em>du traitement</em>
              </h2>
              <div className="legal-callout" style={{ marginTop: '1rem' }}>
                <p>Alain Zenatti — NovaHypnose</p>
                <p>Paris 4ᵉ (Marais-Bastille)</p>
                <p>Email : <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a></p>
                <p>Site : <a href="https://novahypnose.fr">novahypnose.fr</a></p>
              </div>
            </div>

            {/* Modifications */}
            <div className="reveal legal-block" style={{ transitionDelay: '.34s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Modifications
              </h2>
              <p className="legal-text">
                Cette politique peut être mise à jour. La version en vigueur est toujours disponible à cette adresse
                ainsi que dans l'application (menu → Politique de confidentialité).
              </p>
            </div>

          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <a href="/mentions-legales">Mentions légales</a>
              <span className="foot__sep">·</span>
              <a href="tel:+33649358089">06 49 35 80 89</a>
              <span className="foot__sep">·</span>
              <a href="/">← Accueil</a>
            </nav>
            <div className="foot__copy">
              © NovaHypnose · Alain Zenatti <em>— pour aller à votre rythme</em> · MMXXVI
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default PolitiqueConfidentialiteNovaRespire;
