/**
 * SpecialtyReferences — affiche un bloc final commun à toutes les pages
 * "spécialité" : date de mise à jour, références scientifiques, disclaimer santé.
 *
 * Ce composant a un double objectif GEO/E-E-A-T :
 *  - rendre la page citable par les moteurs IA (sources datées + autorités)
 *  - aligner les pages santé YMYL sur les attentes de Google AI Overviews.
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { safeJSONStringify } from '@/lib/seo-utils';

export type ScientificReference = {
  authors?: string;
  title: string;
  source: string;
  year?: string | number;
  url: string;
};

type Props = {
  /** URL canonique de la page (sans trailing slash). */
  pageUrl: string;
  /** Titre H1 de la page (réutilisé dans WebPage.name). */
  pageTitle: string;
  /** Description courte (réutilisée dans WebPage.description). */
  pageDescription: string;
  /** Date de dernière mise à jour éditoriale (ISO YYYY-MM-DD). */
  dateModified: string;
  /** Date de première publication (ISO YYYY-MM-DD). Optionnelle. */
  datePublished?: string;
  /** Sujet médical principal (ex. "stress et anxiété") — utilisé dans le disclaimer. */
  topic: string;
  /** Références scientifiques affichées dans la section. */
  references: ScientificReference[];
};

const formatDateFr = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
};

export const buildWebPageSchema = (props: Props) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${props.pageUrl}#webpage`,
  url: props.pageUrl,
  name: props.pageTitle,
  description: props.pageDescription,
  inLanguage: 'fr-FR',
  isPartOf: { '@id': 'https://novahypnose.fr/#website' },
  about: {
    '@type': 'MedicalCondition',
    name: props.topic,
  },
  author: { '@id': 'https://novahypnose.fr/#person' },
  reviewedBy: { '@id': 'https://novahypnose.fr/#person' },
  datePublished: props.datePublished ?? props.dateModified,
  dateModified: props.dateModified,
  citation: props.references.map((ref) => ({
    '@type': 'CreativeWork',
    name: ref.title,
    author: ref.authors,
    publisher: { '@type': 'Organization', name: ref.source },
    datePublished: ref.year ? String(ref.year) : undefined,
    url: ref.url,
  })),
});

const SpecialtyReferences: React.FC<Props> = (props) => {
  const { dateModified, topic, references, pageUrl } = props;
  const webPageSchema = buildWebPageSchema(props);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{safeJSONStringify(webPageSchema)}</script>
      </Helmet>

      <section
        aria-labelledby="references-scientifiques"
        className="py-12 md:py-16 bg-white border-t border-gray-200"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-gray-500 mb-6">
              <time dateTime={dateModified}>
                Page mise à jour le {formatDateFr(dateModified)}
              </time>
              {' '}— Auteur :{' '}
              <a
                href="https://novahypnose.fr/alain-zenatti"
                className="underline hover:text-gray-700"
              >
                Alain Zenatti, Maître Hypnologue certifié
              </a>
              .
            </p>

            <h2
              id="references-scientifiques"
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-6"
            >
              Références scientifiques
            </h2>

            <ol className="list-decimal pl-6 space-y-3 text-gray-700">
              {references.map((ref, i) => (
                <li key={i}>
                  {ref.authors && <span>{ref.authors}. </span>}
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-700"
                  >
                    {ref.title}
                  </a>
                  . <em>{ref.source}</em>
                  {ref.year && <span>, {ref.year}</span>}.
                </li>
              ))}
            </ol>

            <p className="mt-8 text-sm text-gray-600 bg-gray-50 border-l-4 border-gray-300 p-4 rounded">
              <strong>Information importante.</strong> Ce contenu sur l'hypnose
              et {topic} est fourni à titre informatif et ne se substitue pas à
              un avis médical, un diagnostic ou un traitement délivré par un
              professionnel de santé. En cas de symptômes persistants ou
              sévères, consultez votre médecin traitant. L'hypnose pratiquée
              au cabinet est une démarche complémentaire, non substitutive
              d'un suivi médical.{' '}
              <a href={pageUrl} className="underline">
                Page de référence
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SpecialtyReferences;
