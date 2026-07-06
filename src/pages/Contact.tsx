import React, { useState } from 'react';
import { useResalibPopup } from '@/hooks/useResalibPopup';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import CzLayout from '@/components/charte/CzLayout';
import { safeJSONStringify } from '@/lib/seo-utils';
import { localBusinessSchema, personSchema, createBreadcrumbSchema } from '@/data/schemaOrg';

const RESALIB_URL = 'https://www.resalib.fr/agenda/47325?src=novahypnose.fr';
const CONTACT_URL = 'https://akrlyzmfszumibwgocae.supabase.co/functions/v1/send-contact-preview';

const Contact = () => {
  const { openResalibPopup } = useResalibPopup();
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: 'Contact', url: 'https://novahypnose.fr/contact' },
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom || !email || !message) return;
    setStatus('loading');
    try {
      const res = await fetch(CONTACT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom, email, tel, message }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <CzLayout>
      <Helmet>
        <title>Contact — Cabinet NovaHypnose Paris 4ème | Alain Zenatti</title>
        <meta name="description" content="Contactez Alain Zenatti, hypnothérapeute à Paris 4ème (Marais-Bastille) : téléphone, email, formulaire, adresse et horaires. Cabinet et visioconférence, du lundi au vendredi de 11h à 20h30." />
        <meta name="keywords" content="contact novahypnose, contacter hypnothérapeute paris, adresse cabinet hypnose paris, téléphone hypnose paris, hypnose marais bastille" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/contact" />
        <meta property="og:title" content="Contact — Cabinet NovaHypnose Paris 4ème | Alain Zenatti" />
        <meta property="og:description" content="Téléphone, email, formulaire, adresse et horaires du cabinet NovaHypnose. Paris 4ème (Marais-Bastille) et visioconférence partout en France." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://novahypnose.fr/contact" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="NovaHypnose" />
        <meta property="og:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Alain Zenatti, Maître Hypnologue – Cabinet NovaHypnose Paris 4ème" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact — Cabinet NovaHypnose Paris 4ème | Alain Zenatti" />
        <meta name="twitter:description" content="Téléphone, email, formulaire, adresse et horaires du cabinet NovaHypnose." />
        <meta name="twitter:image" content="https://akrlyzmfszumibwgocae.supabase.co/storage/v1/object/public/images/alain-nov2025.webp" />
        <script type="application/ld+json">{safeJSONStringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{safeJSONStringify(personSchema)}</script>
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
          <div className="tag">Contact — Faire le premier pas</div>
          <h1 className="sp-hero__h1">
            Nous contacter<br/><em>au cabinet ou en visio</em>
          </h1>
          <p className="sp-hero__lead">
            Un message ou un appel suffit. Nous échangeons quelques minutes,
            et nous fixons une première séance si vous le souhaitez.
          </p>
          <div className="hero__cta">
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089">06 49 35 80 89</a>
          </div>
        </div>
      </section>

      {/* Coordonnées + Formulaire */}
      <section className="sp-section">
        <div className="container sp-narrow reveal">
          <div className="sp-grid-2">
            <div>
              <h2 className="sp-h2">Coordonnées</h2>
              <div className="sp-prose">
                <p>
                  <strong>Téléphone</strong><br/>
                  <a href="tel:+33649358089">06 49 35 80 89</a>
                </p>
                <p>
                  <strong>Email</strong><br/>
                  <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a>
                </p>
                <p>
                  <strong>Cabinet</strong><br/>
                  16 rue Saint-Antoine, 75004 Paris<br/>
                  Métro Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1)
                </p>
                <p>
                  <strong>Horaires</strong><br/>
                  Du lundi au vendredi, 11h — 20h30
                </p>
                <p>
                  Consultations également en <Link to="/hypnose-en-ligne">visioconférence</Link>,
                  partout en France. Voir les <Link to="/tarifs">tarifs des séances</Link>.
                </p>
              </div>
            </div>

            <form className="sp-form reveal" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="ct-nom">Votre nom <span aria-hidden="true" className="req">*</span></label>
                <input
                  id="ct-nom" type="text" placeholder="Marie Dupont" required
                  value={nom} onChange={(e) => setNom(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="ct-email">Email <span aria-hidden="true" className="req">*</span></label>
                <input
                  id="ct-email" type="email" placeholder="marie@exemple.fr" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="ct-tel">Téléphone</label>
                <input
                  id="ct-tel" type="tel" placeholder="06 12 34 56 78"
                  value={tel} onChange={(e) => setTel(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <div className="field">
                <label htmlFor="ct-msg">Message <span aria-hidden="true" className="req">*</span></label>
                <textarea
                  id="ct-msg" placeholder="Quelques mots sur ce qui vous amène…" rows={4} required
                  value={message} onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'loading' || status === 'success'}
                ></textarea>
              </div>
              <button className="btn btn--amber" type="submit" disabled={status === 'loading' || status === 'success'}>
                {status === 'loading' ? 'Envoi…' : 'Envoyer'} <span className="arrow">→</span>
              </button>
              {status === 'success' && (
                <p className="contact__success">Merci — je vous recontacte sous 24 h.</p>
              )}
              {status === 'error' && (
                <p className="contact__error">
                  Une erreur s'est produite. Écrivez-moi directement à contact@novahypnose.fr ou appelez le 06 49 35 80 89.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Accès */}
      <section className="sp-section sp-section--alt">
        <div className="container sp-narrow reveal">
          <h2 className="sp-h2">Accès au cabinet</h2>
          <div className="sp-prose">
            <p>
              Le cabinet se situe au <strong>16 rue Saint-Antoine, 75004 Paris</strong>, dans le
              quartier du Marais-Bastille, à deux pas de la place de la Bastille.
            </p>
            <p>
              <strong>Métro</strong> : Bastille (lignes 1, 5, 8) ou Saint-Paul (ligne 1), à
              quelques minutes à pied.
            </p>
            <p>
              Vous préférez ne pas vous déplacer ? Les séances en <Link to="/hypnose-en-ligne">visioconférence</Link> sont
              aussi efficaces qu'au cabinet, depuis n'importe où en France.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="sp-cta-final">
        <div className="container sp-narrow">
          <h2 className="sp-h2">Une question avant de réserver ?</h2>
          <p className="sp-lead">Cabinet Paris 4ème Marais-Bastille • ou en visio partout en France • 90&nbsp;€ la séance</p>
          <div className="hero__cta" style={{justifyContent:'center'}}>
            <a className="btn btn--primary" href={RESALIB_URL}
               onClick={(e) => { e.preventDefault(); openResalibPopup(); }}
               style={{background:'var(--lin)', color:'var(--cobalt)'}}>
              Prendre rendez-vous <span className="arrow">→</span>
            </a>
            <a className="btn btn--ghost" href="tel:+33649358089" style={{borderColor:'rgba(240,236,227,.4)', color:'var(--lin)'}}>06 49 35 80 89</a>
          </div>
          <div className="sp-links">
            <Link to="/tarifs">Tarifs des séances →</Link>
            <Link to="/avis">Avis des clients →</Link>
            <Link to="/hypnose-en-ligne">Hypnose en visio →</Link>
          </div>
        </div>
      </section>
    </CzLayout>
  );
};

export default Contact;
