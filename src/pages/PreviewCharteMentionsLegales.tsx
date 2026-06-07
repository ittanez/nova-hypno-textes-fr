/**
 * PreviewCharteMentionsLegales — mentions légales dans la charte risographie.
 * Page autoportante, noindex.
 */

import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import '@/styles/preview-charte.css';
import '@/styles/charte-secondary.css';
import ExternalLink from 'lucide-react/dist/esm/icons/external-link';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';

const partners = [
  { name: "Psychonaute", url: "https://psychonaute.org/" },
  { name: "Proxi Bien Être", url: "https://www.proxibienetre.fr" },
  { name: "Résalib", url: "https://www.resalib.fr" },
  { name: "Annuaire Thérapeutes", url: "https://www.annuaire-therapeutes.com" },
  { name: "Juste à côté", url: "https://www.justacote.com" },
  { name: "Bonjour Hypnose", url: "https://www.bonjourhypnose.fr" },
  { name: "Now Online", url: "https://now.online" },
  { name: "Psynapse", url: "https://psynapse.fr/" },
  { name: "Proxi Hypnose", url: "https://www.proxihypnose.fr/" },
];

const PreviewCharteMentionsLegales: React.FC = () => {
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
        <title>Mentions légales — NovaHypnose</title>
        <meta name="description" content="Mentions légales du site novahypnose.fr — éditeur Alain Zenatti EI, hébergement, propriété intellectuelle, données personnelles et médiation." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/mentions-legales" />
        {/* Polices Cormorant Garamond + DM Sans auto-hébergées via @fontsource (voir index.css) */}
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
              <a href="https://hypno-balade.novahypnose.fr/" target="_blank" rel="noopener noreferrer">Hypno-balades ↗</a>
              <a href="/#contact">Contact</a>
            </div>
            <a className="btn btn--primary" href={RESALIB_URL} target="_blank" rel="noopener noreferrer">
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
          </div>
        </nav>

        {/* ── HERO MENTIONS ── */}
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
              <div className="tag">Informations légales</div>
              <h1 className="hero__name" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.5rem)', marginTop: '1rem' }}>
                Mentions <em>légales.</em>
              </h1>
              <p className="hero__sub" style={{ marginTop: '1rem' }}>
                novahypnose.fr · Cabinet d'hypnothérapie à Paris
              </p>
            </div>
          </div>
        </section>

        {/* ── CONTENU MENTIONS ── */}
        <section className="section" id="mentions" style={{ paddingTop: '4rem', paddingBottom: '5rem' }}>
          <div className="container" style={{ maxWidth: 800 }}>

            <div className="reveal" style={{ marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '0.97rem', lineHeight: 1.8, color: 'var(--corps)', opacity: 0.85 }}>
                Merci de lire avec attention les différentes modalités d'utilisation du présent site avant d'y parcourir ses pages.
                En vous connectant sur ce site, vous acceptez sans réserves les présentes modalités. Conformément à l'article n°6
                de la Loi n°2004-575 du 21 Juin 2004 pour la confiance dans l'économie numérique, Alain Zenatti est le responsable
                du site internet novahypnose.fr.
              </p>
            </div>

            {/* Éditeur */}
            <div className="reveal legal-block" style={{ transitionDelay: '.05s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Éditeur <em>du site</em>
              </h2>
              <ul className="legal-list">
                <li><strong>Raison sociale :</strong> Alain ZENATTI EI</li>
                <li><strong>Numéro Siren :</strong> 894898907</li>
                <li><strong>Numéro Siret :</strong> 89489890700015 (siège de l'entreprise)</li>
                <li><strong>Code NAF / APE :</strong> 8690F</li>
                <li><strong>Adhérent :</strong> SDMH (Syndicat des Métiers de l'Hypnose)</li>
                <li><strong>Forme juridique :</strong> Entrepreneur individuel</li>
                <li><strong>Responsable éditorial :</strong> Alain ZENATTI</li>
                <li><strong>Adresse :</strong> 16 rue Saint-Antoine, 75004 Paris, France</li>
                <li><strong>Téléphone :</strong> <a href="tel:0649358089">06 49 35 80 89</a></li>
                <li><strong>Email :</strong> <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a></li>
                <li><strong>Site Web :</strong> novahypnose.fr</li>
              </ul>
            </div>

            {/* Hébergement */}
            <div className="reveal legal-block" style={{ transitionDelay: '.1s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Hébergement
              </h2>
              <ul className="legal-list">
                <li><strong>Société :</strong> HOSTINGER INTERNATIONAL LTD</li>
                <li><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</li>
                <li><strong>Site Web :</strong> hostinger.fr</li>
              </ul>
            </div>

            {/* RCP */}
            <div className="reveal legal-block" style={{ transitionDelay: '.12s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Responsabilité civile <em>professionnelle</em>
              </h2>
              <ul className="legal-list">
                <li><strong>Assureur :</strong> GRAS SAVOYE</li>
                <li><strong>Adresse :</strong> Immeuble Quai 33 CS70001, 33 Quai de Dion Bouton, 92814 Puteaux Cedex</li>
                <li><strong>Téléphone :</strong> 09 72 72 01 35</li>
              </ul>
            </div>

            {/* Développement */}
            <div className="reveal legal-block" style={{ transitionDelay: '.14s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Développement
              </h2>
              <ul className="legal-list">
                <li><strong>Société :</strong> Alain ZENATTI EI</li>
                <li><strong>Adresse :</strong> 16 rue Saint-Antoine, 75004 Paris</li>
              </ul>
            </div>

            <div className="reveal legal-divider" style={{ transitionDelay: '.15s' }}></div>

            {/* Conditions d'utilisation */}
            <div className="reveal legal-block" style={{ transitionDelay: '.16s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Conditions <em>d'utilisation</em>
              </h2>
              <p className="legal-text">
                Ce site (novahypnose.fr) utilise divers langages web (HTML, HTML5, JavaScript, CSS, etc.) pour offrir un meilleur
                confort d'utilisation et une esthétique agréable. Nous vous recommandons d'utiliser des navigateurs modernes comme
                Internet Explorer, Safari, Firefox, Google Chrome, etc.
              </p>
            </div>

            {/* Responsabilité */}
            <div className="reveal legal-block" style={{ transitionDelay: '.18s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Responsabilité et mise à jour <em>des informations</em>
              </h2>
              <p className="legal-text">
                Alain Zenatti met en œuvre tous les moyens disponibles pour fournir des informations fiables et actualisées sur ses
                sites internet. Cependant, des erreurs ou omissions peuvent survenir. Nous vous recommandons de vérifier l'exactitude
                des informations et de signaler toute modification que vous jugeriez nécessaire. Alain Zenatti ne peut être tenu
                responsable de l'utilisation des informations disponibles sur le site, ni des préjudices directs ou indirects qui
                pourraient en découler.
              </p>
            </div>

            {/* Cookies */}
            <div className="reveal legal-block" style={{ transitionDelay: '.2s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Cookies
              </h2>
              <p className="legal-text">
                Le site novahypnose.fr peut vous demander d'accepter des cookies pour des besoins de statistiques et d'affichage.
                Un cookie est un fichier texte placé sur votre disque dur par le serveur du site que vous visitez. Certaines parties
                de ce site ne fonctionnent pas sans l'acceptation des cookies.
              </p>
            </div>

            {/* Liens hypertextes */}
            <div className="reveal legal-block" style={{ transitionDelay: '.22s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Liens hypertextes
              </h2>
              <p className="legal-text">
                Les sites internet d'Alain Zenatti peuvent contenir des liens vers d'autres sites ou ressources disponibles sur
                Internet. Alain Zenatti ne contrôle pas ces sites externes et ne peut garantir leur disponibilité. Il n'est pas
                responsable des dommages résultant de leur contenu, de leurs produits ou services, ou de leur utilisation. Toute
                utilisation de ces ressources relève de la responsabilité de l'utilisateur, qui doit respecter leurs conditions
                d'utilisation.
              </p>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                Les utilisateurs, abonnés ou visiteurs des sites d'Alain Zenatti ne peuvent mettre en place un hyperlien vers ce
                site sans autorisation expresse préalable. Si vous souhaitez créer un hyperlien, envoyez une demande par e-mail.
                Alain Zenatti se réserve le droit d'accepter ou de refuser cette demande sans justification.
              </p>
            </div>

            {/* Services */}
            <div className="reveal legal-block" style={{ transitionDelay: '.24s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Services fournis
              </h2>
              <p className="legal-text">
                Le site novahypnose.fr présente toutes les activités et informations de la société. Alain Zenatti s'efforce de
                fournir des informations aussi précises que possible, bien que celles-ci ne soient pas exhaustives et que les
                photos ne soient pas contractuelles. Les informations sont susceptibles de changer sans préavis.
              </p>
            </div>

            {/* Limitation contractuelle */}
            <div className="reveal legal-block" style={{ transitionDelay: '.26s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Limitation contractuelle <em>sur les données</em>
              </h2>
              <p className="legal-text">
                Les informations présentes sur ce site sont aussi précises que possible et le site est mis à jour régulièrement.
                Toutefois, il peut contenir des inexactitudes ou des omissions. Si vous constatez un problème, veuillez le signaler
                par e-mail à <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a>, en décrivant la nature du problème.
              </p>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                Tout contenu téléchargé se fait aux risques et périls de l'utilisateur. Alain Zenatti ne saurait être tenu
                responsable des dommages subis par l'ordinateur de l'utilisateur ou des pertes de données résultant d'un
                téléchargement. Les liens hypertextes mis en place vers d'autres ressources sur Internet ne sauraient engager la
                responsabilité d'Alain Zenatti.
              </p>
            </div>

            {/* Propriété intellectuelle */}
            <div className="reveal legal-block" style={{ transitionDelay: '.28s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Propriété intellectuelle
              </h2>
              <p className="legal-text">
                Tout le contenu du site novahypnose.fr, y compris les graphismes, images, textes, vidéos, animations, sons, logos,
                gifs et icônes, est la propriété exclusive d'Alain Zenatti, sauf indication contraire. Toute reproduction,
                modification ou diffusion de ce contenu sans autorisation écrite est strictement interdite et constitue une
                contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
              </p>
            </div>

            {/* Litiges */}
            <div className="reveal legal-block" style={{ transitionDelay: '.30s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Litiges
              </h2>
              <p className="legal-text">
                Les présentes conditions du site novahypnose.fr sont régies par la loi française. Tout litige lié à l'interprétation
                ou à l'exécution de ces conditions sera soumis à la compétence exclusive des tribunaux français. La langue de
                référence pour le règlement des litiges est le français.
              </p>
            </div>

            {/* Médiation */}
            <div className="reveal legal-block" style={{ transitionDelay: '.32s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Médiation
              </h2>
              <p className="legal-text">
                Conformément à l'article L. 612-1 du Code de la consommation, nous vous informons que nous avons adhéré à la
                Société de la Médiation Professionnelle (SMP) pour le règlement amiable des litiges. Si vous avez un différend
                avec nos services et que vous n'avez pas trouvé de solution directement avec nous, vous pouvez contacter le
                médiateur à l'adresse suivante :
              </p>
              <div className="legal-callout" style={{ marginTop: '1rem' }}>
                <p>Société de la Médiation Professionnelle – Médiateurs Associés</p>
                <p>24, rue Albert de Mun — 33000 Bordeaux</p>
                <p>Siret : 81438535700011 · RCS B814385357</p>
                <p>Courriel : <a href="mailto:saisine@www.mediateur-consommation-smp.fr">saisine@www.mediateur-consommation-smp.fr</a></p>
                <p>Adresse de correspondance : Alteritae, 5 rue Salvaing, 12000 Rodez</p>
              </div>
            </div>

            {/* Données personnelles */}
            <div className="reveal legal-block" style={{ transitionDelay: '.34s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Données personnelles
              </h2>
              <p className="legal-text">
                En général, vous n'êtes pas obligé de fournir vos données personnelles lors de votre visite sur le site
                novahypnose.fr. Cependant, certaines exceptions existent, notamment pour les services qui nécessitent des
                informations telles que votre nom, adresse électronique et numéro de téléphone. Vous pouvez refuser de fournir
                ces données, mais cela pourrait limiter l'utilisation de certains services du site, comme demander des
                renseignements ou recevoir des lettres d'information.
              </p>
              <p className="legal-text" style={{ marginTop: '0.75rem' }}>
                Certaines informations peuvent également être collectées automatiquement lors de votre navigation, telles que les
                zones visitées, l'adresse IP, le type de navigateur et les temps d'accès. Ces informations sont utilisées
                uniquement à des fins statistiques pour améliorer la qualité des services.
              </p>
            </div>

            {/* Partenaires */}
            <div className="reveal legal-block" style={{ transitionDelay: '.36s' }}>
              <h2 className="section-title" style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '1rem' }}>
                Partenaires
              </h2>
              <div className="legal-partners">
                {partners.map((partner, index) => (
                  <a
                    key={index}
                    href={partner.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="legal-partner-link"
                  >
                    <span>{partner.name}</span>
                    <ExternalLink size={14} />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </section>

        <footer className="foot">
          <div className="container">
            <nav className="foot__links" aria-label="Pieds de page">
              <a href="/mentions-legales" aria-current="page">Mentions légales</a>
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

export default PreviewCharteMentionsLegales;
