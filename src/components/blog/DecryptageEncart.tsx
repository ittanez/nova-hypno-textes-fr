/**
 * Encart « Décryptage » en fin d'article (version B validée le 2026-11-09) :
 * la question 1 du tunnel, posée dans l'article. Un clic ouvre /decryptage à
 * la question 2, réponse transmise par l'état de navigation (pas dans l'URL).
 */
import { Link } from 'react-router-dom';
import { trackCTAClick } from '@/lib/analytics';
import { QUESTIONS } from '@/data/decryptage';
import './DecryptageEncart.css';

const Q1 = QUESTIONS[0];
const OPTIONS = Q1.options.filter((o) => o.value !== 'autre');

interface DecryptageEncartProps {
  /** Encart en fin d'article de blog. */
  articleSlug?: string;
  /** Encart sur la page merci d'un guide (ex. « sommeil »). */
  guide?: string;
}

const DecryptageEncart = ({ articleSlug, guide }: DecryptageEncartProps) => {
  // Convention de source : utm_source / utm_medium / utm_content, relue par le
  // tunnel et enregistrée avec la réponse (colonnes utm_* de decryptage_responses).
  const utm = guide
    ? { utm_source: 'guide', utm_medium: 'merci', utm_content: guide }
    : { utm_source: 'blog', utm_medium: 'encart', utm_content: articleSlug ?? '' };
  const to = `/decryptage?${new URLSearchParams(utm).toString()}`;
  const kicker = guide
    ? 'Et maintenant ? Décryptage en 5 questions · 2 minutes'
    : 'Décryptage en 5 questions · 2 minutes';

  return (
    <aside className="dxe" aria-labelledby="dxe-titre">
      <div className="dxe__bar" aria-hidden="true" />
      <p className="dxe__kicker">{kicker}</p>
      <h2 id="dxe-titre" className="dxe__titre">
        {Q1.title}
      </h2>
      <div className="dxe__opts">
        {OPTIONS.map((o) => (
          <Link
            key={o.value}
            to={to}
            state={{ q1: o.value }}
            className="dxe__opt"
            onClick={() => trackCTAClick('decryptage', guide ? `merci_${guide}` : 'blog_encart')}
          >
            {o.label}
          </Link>
        ))}
      </div>
      <p className="dxe__fine">Gratuit · Alain Zenatti, hypnothérapeute à Paris 4e</p>
    </aside>
  );
};

export default DecryptageEncart;
