/**
 * PolitiqueConfidentialite — politique de confidentialité RGPD du site novahypnose.fr.
 * Même charte graphique que PreviewCharteMentionsLegales.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import '@/styles/charte-secondary.css';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const PolitiqueConfidentialite: React.FC = () => {
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
        <title>Politique de confidentialité — NovaHypnose</title>
        <meta name="description" content="Politique de confidentialité du site novahypnose.fr — traitement des données personnelles, droits RGPD, cookies, hébergement." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/politique-de-confidentialite" />
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
              <a href="/autohypnose">Auto-hypnose ↗</a>
              <a href="/blog">Blog ↗</a>
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
              <div className="tag">Données personnelles</div>
              <h1 className="hero__name" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', marginTop: '1rem' }}>
                Politique de <em>confidentialité.</em>
              </h1>
              <p className="hero__sub" style={{ marginTop: '1rem' }}>
                novahypnose.fr · Mise à jour : 13 juin 2026
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTENU ── */}
        <section className="section" id="confidentialite" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
          <div className="container" style={{ maxWidth: 800 }}>

            <div className="reveal" style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--corps)', opacity: 0.85 }}>
                Le site <strong>novahypnose.fr</strong> est édité par Alain Zenatti, hypnothérapeute exerçant à titre individuel.
                La présente politique décrit la manière dont vos données personnelles sont collectées, utilisées et protégées
                lorsque vous visitez ce site.
              </p>
            </div>

            {/* Responsable du traitement */}
            <div className="reveal legal-block" style={{ transitionDelay: '.05s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Responsable <em>du traitement</em>
              </h2>
              <ul className="legal-list">
                <li><strong>Nom :</strong> Alain ZENATTI EI</li>
                <li><strong>Adresse :</strong> 16 rue Saint-Antoine, 75004 Paris</li>
                <li><strong>Email :</strong> <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a></li>
                <li><strong>Téléphone :</strong> <a href="tel:0649358089">06 49 35 80 89</a></li>
              </ul>
            </div>

            {/* Données collectées */}
            <div className="reveal legal-block" style={{ transitionDelay: '.08s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Données collectées <em>et finalités</em>
              </h2>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1rem 0 0.5rem' }}>Formulaires de contact et guides gratuits</h3>
              <p className="legal-text">
                Lorsque vous remplissez un formulaire (contact, téléchargement de guide, quiz), les données suivantes peuvent
                être collectées : nom, prénom, adresse e-mail, numéro de téléphone (optionnel) et le contenu de votre message.
                Ces données sont utilisées exclusivement pour répondre à votre demande et, si vous y avez consenti, pour vous
                envoyer des ressources liées à votre démarche. Elles ne sont jamais revendues ni transmises à des tiers à des
                fins commerciales.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.25rem 0 0.5rem' }}>Prise de rendez-vous en ligne</h3>
              <p className="legal-text">
                La réservation est gérée par <strong>Resalib</strong> (tierce partie). Consultez la{' '}
                <a href="https://www.resalib.fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">
                  politique de confidentialité de Resalib
                </a>{' '}
                pour connaître le traitement de vos données sur leur plateforme.
              </p>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: '1.25rem 0 0.5rem' }}>Données de navigation (analytics)</h3>
              <p className="legal-text">
                Ce site utilise <strong>Google Analytics 4</strong> pour analyser le trafic de façon anonymisée (pages visitées,
                durée de session, source du trafic). Les adresses IP sont anonymisées. Aucune donnée d'identification personnelle
                n'est transmise à Google via cet outil. Vous pouvez refuser cette collecte en installant l'extension{' '}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Google Analytics Opt-out
                </a>.
              </p>
            </div>

            {/* Durée de conservation */}
            <div className="reveal legal-block" style={{ transitionDelay: '.12s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Durée de <em>conservation</em>
              </h2>
              <p className="legal-text">
                Les données issues des formulaires sont conservées pendant <strong>3 ans</strong> à compter du dernier contact,
                puis supprimées. Les données d'analyse agrégées ne contiennent pas d'informations personnelles et peuvent être
                conservées indéfiniment.
              </p>
            </div>

            <div className="reveal legal-divider" style={{ transitionDelay: '.15s' }}></div>

            {/* Droits RGPD */}
            <div className="reveal legal-block" style={{ transitionDelay: '.16s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Vos droits <em>(RGPD)</em>
              </h2>
              <p className="legal-text">
                Conformément au Règlement Général sur la Protection des Données (RGPD — Règlement UE 2016/679), vous disposez
                des droits suivants sur les données vous concernant :
              </p>
              <ul className="legal-list" style={{ marginTop: '0.75rem' }}>
                <li><strong>Droit d'accès</strong> — consulter les données vous concernant</li>
                <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
                <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
                <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
                <li><strong>Droit d'opposition</strong> — vous opposer à certains traitements</li>
                <li><strong>Droit à la limitation</strong> — demander la suspension du traitement</li>
              </ul>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                Pour exercer ces droits, contactez-nous à{' '}
                <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a>. En cas de réponse insatisfaisante,
                vous pouvez adresser une réclamation à la{' '}
                <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">Commission Nationale Informatique et Libertés (CNIL)</a>.
              </p>
            </div>

            {/* Cookies */}
            <div className="reveal legal-block" style={{ transitionDelay: '.20s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Cookies
              </h2>
              <p className="legal-text">
                Ce site utilise des cookies fonctionnels (nécessaires au bon fonctionnement) et des cookies analytics
                (Google Analytics 4, voir ci-dessus). Aucun cookie publicitaire n'est déposé. Vous pouvez gérer vos
                préférences via les paramètres de votre navigateur ou via notre bandeau de consentement.
              </p>
            </div>

            {/* Hébergement */}
            <div className="reveal legal-block" style={{ transitionDelay: '.24s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Hébergement <em>et sécurité</em>
              </h2>
              <p className="legal-text">
                Le site est hébergé par <strong>Netlify</strong> (San Francisco, États-Unis). Les données de formulaires
                et de blog sont stockées sur <strong>Supabase</strong> (infrastructure AWS, région Europe). Les transferts
                de données hors UE s'effectuent dans le respect des clauses contractuelles types adoptées par la Commission
                européenne. Les communications sont chiffrées via HTTPS/TLS.
              </p>
            </div>

            {/* Modifications */}
            <div className="reveal legal-block" style={{ transitionDelay: '.28s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Modifications
              </h2>
              <p className="legal-text">
                Cette politique peut être mise à jour à tout moment pour refléter les évolutions légales ou techniques.
                La date de dernière mise à jour est indiquée dans l'en-tête de la page. En cas de modification substantielle,
                une information sera publiée sur le site.
              </p>
            </div>

          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <a href="/mentions-legales">Mentions légales</a>
              <span className="foot__sep">·</span>
              <a href="/politique-de-confidentialite" aria-current="page">Confidentialité</a>
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

        <a
          className="floating-cta"
          href={RESALIB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Prendre rendez-vous"
        >
          Prendre rendez-vous <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
};

export default PolitiqueConfidentialite;
