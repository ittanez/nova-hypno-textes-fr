import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

/* ─────────────────────────────────────────────
   Page de redirection WhatsApp — emails Brevo
   Page isolée (pas de Header / Footer)
   ───────────────────────────────────────────── */

const WA_URL =
  'https://wa.me/33649358089?text=Bonjour%2C%20j%27ai%20une%20question%20sur%20l%27hypnoth%C3%A9rapie%20...';

const ContactWaBrevo: React.FC = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace(WA_URL);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Connexion en cours… — NovaHypnose</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="contact-wa-page">
        {/* Arbre SVG illustré */}
        <div className="tree-container" aria-hidden="true">
          <svg
            viewBox="0 0 320 420"
            xmlns="http://www.w3.org/2000/svg"
            className="tree-svg"
          >
            {/* Racines */}
            <path
              d="M160 310 C140 340, 100 360, 80 390"
              stroke="#7a5c3a"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M160 320 C180 345, 220 360, 240 390"
              stroke="#7a5c3a"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M155 330 C145 355, 130 370, 120 395"
              stroke="#7a5c3a"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M165 330 C175 355, 190 370, 200 395"
              stroke="#7a5c3a"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M158 340 C158 370, 158 385, 158 400"
              stroke="#7a5c3a"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />

            {/* Tronc */}
            <path
              d="M145 310 C143 270, 140 230, 138 200"
              stroke="#8b6340"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M175 310 C177 270, 180 230, 182 200"
              stroke="#8b6340"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <rect
              x="144"
              y="195"
              width="32"
              height="118"
              rx="10"
              fill="#9b7248"
            />
            {/* Texture tronc */}
            <path
              d="M152 220 Q160 215 168 220"
              stroke="#7a5c3a"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M150 250 Q160 245 170 250"
              stroke="#7a5c3a"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M153 280 Q160 275 167 280"
              stroke="#7a5c3a"
              strokeWidth="1.5"
              fill="none"
              opacity="0.4"
            />

            {/* Branches principales */}
            <path
              d="M155 200 C130 175, 90 160, 60 145"
              stroke="#8b6340"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M165 200 C190 175, 230 160, 260 145"
              stroke="#8b6340"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M160 195 C160 165, 155 140, 150 115"
              stroke="#8b6340"
              strokeWidth="7"
              fill="none"
              strokeLinecap="round"
            />
            {/* Branches secondaires */}
            <path
              d="M100 165 C80 148, 60 130, 45 115"
              stroke="#9b7248"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M85 155 C70 135, 55 125, 40 105"
              stroke="#9b7248"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M220 165 C240 148, 260 130, 275 115"
              stroke="#9b7248"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M235 155 C250 135, 265 125, 280 105"
              stroke="#9b7248"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M153 148 C135 128, 115 110, 100 90"
              stroke="#9b7248"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M157 140 C170 118, 190 98, 205 80"
              stroke="#9b7248"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Feuillage — couches superposées */}
            {/* Couche arrière (plus foncée) */}
            <ellipse cx="160" cy="80" rx="90" ry="72" fill="#2d5a27" opacity="0.55" />
            <ellipse cx="80" cy="120" rx="72" ry="58" fill="#2d5a27" opacity="0.5" />
            <ellipse cx="240" cy="120" rx="72" ry="58" fill="#2d5a27" opacity="0.5" />
            <ellipse cx="50" cy="100" rx="55" ry="45" fill="#336b2c" opacity="0.5" />
            <ellipse cx="270" cy="100" rx="55" ry="45" fill="#336b2c" opacity="0.5" />
            {/* Couche milieu */}
            <ellipse cx="160" cy="65" rx="80" ry="65" fill="#3a7a32" opacity="0.65" />
            <ellipse cx="95" cy="105" rx="65" ry="52" fill="#3a7a32" opacity="0.6" />
            <ellipse cx="225" cy="105" rx="65" ry="52" fill="#3a7a32" opacity="0.6" />
            <ellipse cx="130" cy="80" rx="55" ry="48" fill="#3a7a32" opacity="0.55" />
            <ellipse cx="190" cy="80" rx="55" ry="48" fill="#3a7a32" opacity="0.55" />
            {/* Couche avant (plus claire) */}
            <ellipse cx="160" cy="55" rx="68" ry="55" fill="#4a9040" opacity="0.7" />
            <ellipse cx="110" cy="85" rx="55" ry="44" fill="#4a9040" opacity="0.65" />
            <ellipse cx="210" cy="85" rx="55" ry="44" fill="#4a9040" opacity="0.65" />
            {/* Reflets lumineux */}
            <ellipse cx="145" cy="45" rx="38" ry="28" fill="#5aaa4e" opacity="0.5" />
            <ellipse cx="185" cy="55" rx="30" ry="22" fill="#5aaa4e" opacity="0.4" />
            <ellipse cx="100" cy="80" rx="28" ry="20" fill="#5aaa4e" opacity="0.35" />
            <ellipse cx="220" cy="80" rx="28" ry="20" fill="#5aaa4e" opacity="0.35" />
          </svg>
        </div>

        {/* Contenu textuel */}
        <div className="content-card">
          <h1 className="page-title">Connexion en cours&hellip;</h1>
          <p className="page-text">
            Un instant, nous vous accompagnons vers la messagerie pour votre séance.
          </p>

          {/* Indicateur de chargement */}
          <div className="loader" aria-label="Chargement">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <a href={WA_URL} className="wa-button" rel="noopener noreferrer">
            <svg
              className="wa-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cliquer ici si la redirection ne se fait pas
          </a>
        </div>

        {/* Mini footer discret */}
        <footer className="page-footer">
          &copy; {new Date().getFullYear()} NovaHypnose &middot; Alain Zenatti &middot; Hypnothérapeute Paris 4<sup>e</sup>
        </footer>
      </div>

      {/* Styles scoped dans une balise style inline */}
      <style>{`
        /* ── Reset & base ── */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .contact-wa-page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.25rem 1.5rem;
          font-family: 'Poppins', 'Segoe UI', sans-serif;
          background: linear-gradient(
            160deg,
            #f0f7ee 0%,
            #e4f0dc 35%,
            #d4e8c8 65%,
            #c8ddb8 100%
          );
          position: relative;
          overflow: hidden;
        }

        /* Halo décoratif en arrière-plan */
        .contact-wa-page::before {
          content: '';
          position: fixed;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 50% at 20% 80%, rgba(74,144,64,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 20%, rgba(155,114,72,0.08) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Arbre ── */
        .tree-container {
          position: relative;
          z-index: 1;
          width: min(280px, 80vw);
          margin-bottom: 1.5rem;
          filter: drop-shadow(0 12px 24px rgba(45,90,39,0.18));
          animation: sway 8s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .tree-svg {
          width: 100%;
          height: auto;
          display: block;
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-0.8deg); }
          50%       { transform: rotate(0.8deg); }
        }

        /* ── Carte de contenu ── */
        .content-card {
          position: relative;
          z-index: 1;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 20px;
          padding: 2rem 1.75rem;
          max-width: 440px;
          width: 100%;
          text-align: center;
          box-shadow:
            0 4px 24px rgba(45,90,39,0.10),
            0 1px 4px rgba(45,90,39,0.06);
        }

        /* ── Titre ── */
        .page-title {
          font-size: clamp(1.35rem, 5vw, 1.75rem);
          font-weight: 600;
          color: #2d5a27;
          letter-spacing: -0.01em;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }

        /* ── Texte ── */
        .page-text {
          font-size: clamp(0.9rem, 3.5vw, 1rem);
          color: #4a6741;
          line-height: 1.65;
          margin-bottom: 1.75rem;
        }

        /* ── Loader 3 points ── */
        .loader {
          display: flex;
          justify-content: center;
          gap: 8px;
          margin-bottom: 1.75rem;
        }

        .loader span {
          display: inline-block;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #4a9040;
          animation: bounce 1.4s ease-in-out infinite;
        }

        .loader span:nth-child(1) { animation-delay: 0s; }
        .loader span:nth-child(2) { animation-delay: 0.22s; }
        .loader span:nth-child(3) { animation-delay: 0.44s; }

        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.5; }
          40%            { transform: scale(1);   opacity: 1;   }
        }

        /* ── Bouton WhatsApp ── */
        .wa-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          background: linear-gradient(135deg, #25d366 0%, #1ebe59 100%);
          color: #fff;
          font-size: clamp(0.88rem, 3.5vw, 0.95rem);
          font-weight: 600;
          text-decoration: none;
          padding: 0.85rem 1.5rem;
          border-radius: 50px;
          box-shadow: 0 4px 18px rgba(37,211,102,0.35);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          width: 100%;
          letter-spacing: 0.01em;
        }

        .wa-button:hover,
        .wa-button:focus-visible {
          transform: translateY(-2px);
          box-shadow: 0 7px 24px rgba(37,211,102,0.45);
          outline: none;
        }

        .wa-button:active {
          transform: translateY(0);
        }

        .wa-icon {
          width: 1.2rem;
          height: 1.2rem;
          flex-shrink: 0;
        }

        /* ── Footer ── */
        .page-footer {
          position: relative;
          z-index: 1;
          margin-top: 1.5rem;
          font-size: 0.72rem;
          color: #6b8c63;
          text-align: center;
          opacity: 0.8;
        }

        /* ── Responsive ── */
        @media (max-width: 380px) {
          .content-card { padding: 1.5rem 1.25rem; }
          .tree-container { width: 70vw; }
        }
      `}</style>
    </>
  );
};

export default ContactWaBrevo;
