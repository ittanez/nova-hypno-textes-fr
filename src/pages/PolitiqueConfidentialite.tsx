import React from 'react';
import { Helmet } from 'react-helmet';
import CzLayout from '@/components/charte/CzLayout';

const PolitiqueConfidentialite: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité | NovaHypnose</title>
        <meta
          name="description"
          content="Politique de confidentialité du site NovaHypnose.fr — traitement des données personnelles, droits RGPD, cookies, hébergement."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://novahypnose.fr/politique-de-confidentialite" />
      </Helmet>

      <CzLayout>
        <section className="sp-section" style={{ maxWidth: 820, margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
          <h1 style={{ marginBottom: '2rem' }}>Politique de confidentialité</h1>

          <p style={{ marginBottom: '1.5rem', color: '#555' }}>
            <em>Dernière mise à jour : 13 juin 2026</em>
          </p>

          <p>
            Le site <strong>NovaHypnose.fr</strong> est édité par Alain Zenatti, hypnothérapeute exerçant à titre
            individuel. La présente politique décrit la manière dont vos données personnelles sont collectées,
            utilisées et protégées lorsque vous visitez ce site.
          </p>

          <h2>1. Responsable du traitement</h2>
          <p>
            Alain Zenatti — NovaHypnose<br />
            16 rue Saint-Antoine, 75004 Paris<br />
            Email : <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a><br />
            Téléphone : 06 49 35 80 89
          </p>

          <h2>2. Données collectées et finalités</h2>

          <h3>2.1 Formulaire de contact et prise de rendez-vous</h3>
          <p>
            Lorsque vous remplissez un formulaire sur ce site (contact, téléchargement de guide, quiz), les données
            suivantes peuvent être collectées : nom, prénom, adresse e-mail, numéro de téléphone (optionnel) et le
            contenu de votre message.
          </p>
          <p>
            Ces données sont utilisées exclusivement pour répondre à votre demande et, si vous y avez consenti,
            pour vous envoyer des ressources liées à votre demande (guide, résultats de quiz). Elles ne sont jamais
            revendues ni transmises à des tiers à des fins commerciales.
          </p>

          <h3>2.2 Prise de rendez-vous en ligne</h3>
          <p>
            La réservation en ligne est gérée par <strong>Resalib</strong> (tierce partie). Consultez la{' '}
            <a href="https://www.resalib.fr/politique-de-confidentialite" target="_blank" rel="noopener noreferrer">
              politique de confidentialité de Resalib
            </a>{' '}
            pour connaître le traitement de vos données sur leur plateforme.
          </p>

          <h3>2.3 Données de navigation (analytics)</h3>
          <p>
            Ce site utilise <strong>Google Analytics 4</strong> pour analyser le trafic de façon anonymisée
            (pages visitées, durée de session, source du trafic). Les adresses IP sont anonymisées. Aucune donnée
            d'identification personnelle n'est transmise à Google via cet outil.
          </p>
          <p>
            Vous pouvez refuser cette collecte en installant l'extension de navigateur{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Analytics Opt-out
            </a>
            .
          </p>

          <h2>3. Durée de conservation</h2>
          <p>
            Les données issues des formulaires sont conservées pendant <strong>3 ans</strong> à compter du dernier
            contact, puis supprimées. Les données d'analyse agrégées (analytics) ne contiennent pas d'informations
            personnelles et peuvent être conservées indéfiniment.
          </p>

          <h2>4. Vos droits (RGPD)</h2>
          <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul>
            <li><strong>Droit d'accès</strong> — consulter les données vous concernant</li>
            <li><strong>Droit de rectification</strong> — corriger des données inexactes</li>
            <li><strong>Droit à l'effacement</strong> — demander la suppression de vos données</li>
            <li><strong>Droit à la portabilité</strong> — recevoir vos données dans un format structuré</li>
            <li><strong>Droit d'opposition</strong> — vous opposer à certains traitements</li>
          </ul>
          <p>
            Pour exercer ces droits, contactez-nous à{' '}
            <a href="mailto:contact@novahypnose.fr">contact@novahypnose.fr</a>. Vous pouvez également adresser
            une réclamation à la{' '}
            <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">CNIL</a>.
          </p>

          <h2>5. Cookies</h2>
          <p>
            Ce site utilise des cookies fonctionnels (nécessaires au bon fonctionnement du site) et des cookies
            analytics (Google Analytics, voir section 2.3). Aucun cookie publicitaire n'est déposé. Vous pouvez
            gérer vos préférences via les paramètres de votre navigateur.
          </p>

          <h2>6. Hébergement et sécurité</h2>
          <p>
            Le site est hébergé par <strong>Netlify</strong> (États-Unis, certifié Privacy Shield) et utilise
            <strong> Supabase</strong> (infrastructure PostgreSQL hébergée sur AWS Europe) pour le stockage des
            données. Les transferts hors UE s'effectuent dans le respect des clauses contractuelles types de la
            Commission européenne.
          </p>

          <h2>7. Liens externes</h2>
          <p>
            Ce site contient des liens vers des sites tiers (Resalib, Instagram, LinkedIn, etc.). NovaHypnose ne
            saurait être responsable des pratiques de confidentialité de ces sites.
          </p>

          <h2>8. Modifications</h2>
          <p>
            Cette politique peut être mise à jour à tout moment. La date de dernière mise à jour est indiquée en
            haut de page.
          </p>
        </section>
      </CzLayout>
    </>
  );
};

export default PolitiqueConfidentialite;
