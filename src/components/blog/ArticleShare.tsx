import React, { useState } from 'react';

interface ArticleShareProps {
  url: string;
  title: string;
}

/**
 * Boutons de partage d'un article : liens de partage classiques (pas de script tiers)
 * et copie du lien. Les liens externes s'ouvrent dans un nouvel onglet.
 */
const ArticleShare: React.FC<ArticleShareProps> = ({ url, title }) => {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copiez ce lien :', url);
    }
  };

  const links = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'E-mail', href: `mailto:?subject=${t}&body=${u}` },
  ];

  return (
    <div className="article-share" role="group" aria-label="Partager cet article">
      <span className="article-share__label">Partager cet article</span>
      <div className="article-share__buttons">
        {links.map((l) => (
          <a
            key={l.label}
            className="btn btn--ghost article-share__btn"
            href={l.href}
            target={l.label === 'E-mail' ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={`Partager sur ${l.label}`}
          >
            {l.label}
          </a>
        ))}
        <button type="button" className="btn btn--ghost article-share__btn" onClick={copy} aria-live="polite">
          {copied ? 'Lien copié ✓' : 'Copier le lien'}
        </button>
      </div>
    </div>
  );
};

export default ArticleShare;
