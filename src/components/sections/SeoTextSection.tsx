/**
 * SeoTextSection - Section de contenu SEO riche pour la page d'accueil
 *
 * Objectifs SEO :
 * - Contenu textuel minimum 400 mots (résout le problème "4 mots détectés")
 * - Hiérarchie H2 → H3 logique (sous le H1 du HeroCarousel)
 * - Liens internes vers les pages de spécialités, blog et contact
 * - Mots-clés prioritaires intégrés naturellement
 * - E-E-A-T : expertise, expérience, autorité, fiabilité
 */

import React from 'react';
import { Link } from 'react-router-dom';

const SeoTextSection: React.FC = () => {
  return (
    <section
      id="presentation"
      className="py-16 bg-gray-50"
      aria-label="Présentation du cabinet d'hypnothérapie NovaHypnose Paris 4ème"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          {/* ── Présentation du praticien ── */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
            Alain Zenatti – Hypnothérapeute certifié à Paris 4ème
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Bienvenue chez <strong>NovaHypnose</strong>, cabinet d'<strong>hypnothérapie Paris</strong>{' '}
            situé au cœur du Marais-Bastille (Paris 4ème). <strong>Alain Zenatti</strong>, Maître
            Praticien en <strong>Hypnose Ericksonienne</strong> et Maître Hypnologue certifié,
            vous accompagne avec bienveillance et expertise dans votre démarche de transformation
            personnelle. Fort de plus de 5 années d'expérience et de 9 certifications
            professionnelles obtenues à l'École Psynapse, il a développé une approche thérapeutique
            unique alliant l'hypnose ericksonienne, la PNL et des techniques de pleine conscience.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Chaque séance est entièrement personnalisée : vous êtes accueilli dans votre
            singularité, sans jugement, avec une écoute attentive. L'approche d'Alain Zenatti
            s'appuie sur la conviction que votre inconscient détient déjà toutes les ressources
            nécessaires pour surmonter vos difficultés. Son rôle est de vous aider à y accéder,
            en douceur et en toute sécurité.
          </p>

          {/* ── Spécialités ── */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Les spécialités du cabinet NovaHypnose
          </h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Le <strong>cabinet hypnose Paris 4</strong> traite un large éventail de
            problématiques personnelles et professionnelles. Chaque accompagnement est
            conçu sur mesure, avec des résultats concrets en 3 à 5 séances.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Blocages, procrastination et performance
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Blocages créatifs, procrastination chronique, perfectionnisme paralysant,
                préparation mentale aux examens ou prises de parole…{' '}
                <Link to="/hypnose-blocages-paris" className="text-blue-600 hover:underline">
                  L'hypnose contre les blocages
                </Link>{' '}
                libère votre potentiel en agissant directement sur les schémas
                inconscients qui vous freinent.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestion du stress et de l'anxiété
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                La{' '}
                <Link to="/hypnose-stress-anxiete-paris" className="text-blue-600 hover:underline">
                  gestion du stress par hypnose
                </Link>{' '}
                agit en profondeur sur les mécanismes de l'anxiété. Idéal pour les
                professionnels parisiens soumis à une forte pression, l'
                <strong>hypnose ericksonienne Paris</strong> réduit durablement
                le stress chronique et les crises d'angoisse.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Troubles du sommeil
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Insomnies, réveils nocturnes, sommeil non réparateur…{' '}
                <Link to="/hypnose-sommeil-paris" className="text-blue-600 hover:underline">
                  L'hypnose pour les troubles du sommeil
                </Link>{' '}
                reprogramme naturellement vos cycles et retrouve un sommeil
                profond et réparateur. La plupart des patients constatent une
                amélioration significative dès les 3 premières séances.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Phobies et peurs irrationnelles
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Peur de l'avion, claustrophobie, phobie sociale, arachnophobie…{' '}
                <Link to="/hypnose-phobies-paris" className="text-blue-600 hover:underline">
                  L'hypnose contre les phobies à Paris
                </Link>{' '}
                désensibilise efficacement ces peurs en accédant à leur origine
                inconsciente, souvent en 2 à 4 séances.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confiance en soi et estime de soi
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Manque de confiance, voix intérieure critique, peur du jugement des
                autres…{' '}
                <Link to="/hypnose-confiance-en-soi-paris" className="text-blue-600 hover:underline">
                  L'hypnose pour la confiance en soi
                </Link>{' '}
                transforme profondément votre rapport à vous-même pour vous aider
                à avancer avec assurance dans votre vie personnelle et professionnelle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gestion des émotions et blocages
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Colère, tristesse persistante, deuil difficile, traumatismes, TCA…{' '}
                <Link to="/hypnose-gestion-emotions-paris" className="text-blue-600 hover:underline">
                  La gestion des émotions par hypnose
                </Link>{' '}
                libère les émotions bloquées et restaure un équilibre intérieur stable
                et durable.
              </p>
            </div>
          </div>

          {/* ── Déroulement d'une séance ── */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Comment se déroule une séance d'hypnose à NovaHypnose ?
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Chaque séance au <strong>cabinet d'hypnothérapie Paris 4ème</strong> se déroule
            en trois étapes : un entretien initial approfondi pour cerner votre
            problématique et définir vos objectifs, puis la séance d'
            <strong>hypnose ericksonienne</strong> proprement dite (40 à 60 minutes de
            relaxation profonde guidée), et enfin un debriefing pour ancrer les changements
            et vous donner des outils autonomes. La première consultation dure environ
            1h30&nbsp;; les séances suivantes 1h. Tarif&nbsp;: 90&nbsp;€ la séance.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Des séances en téléconsultation sont également disponibles, aussi efficaces
            qu'en cabinet, pour les personnes éloignées de Paris ou préférant
            la flexibilité du domicile.
          </p>

          {/* ── Qu'est-ce que l'hypnose ericksonienne ── */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 mb-8 border-l-4 border-blue-500">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Qu'est-ce que l'hypnose ericksonienne ?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              L'<strong>hypnose ericksonienne</strong> est une approche thérapeutique développée par <strong>Milton H. Erickson</strong>, psychiatre et psychologue américain pionnier de l'hypnothérapie moderne. Contrairement aux formes anciennes et directrices d'hypnose, l'hypnose ericksonienne est une méthode <strong>non-autoritaire et adaptée à chaque patient</strong>. Elle utilise un état de conscience modifié pour accéder aux ressources de l'inconscient et faciliter le changement thérapeutique.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Cette approche repose sur trois principes fondamentaux : le <strong>respect de l'autonomie du patient</strong> (vous gardez toujours le contrôle), l'<strong>utilisation des ressources inconscientes</strong> (votre inconscient détient déjà les solutions), et l'<strong>adaptation personnalisée</strong> (chaque personne reçoit une suggestion formulée pour sa situation unique). L'hypnose ericksonienne est reconnue comme une thérapie brève et efficace, particulièrement adaptée aux problèmes de stress, d'anxiété, de phobies et de troubles du sommeil.
            </p>
          </div>

          {/* ── Infos pratiques ── */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Informations pratiques – Cabinet Paris 4ème Marais-Bastille
          </h2>
          <div className="bg-blue-50 rounded-xl p-6 mb-8 grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>Adresse&nbsp;:</strong> 16 rue Saint-Antoine, 75004 Paris
              </li>
              <li>
                <strong>Métro&nbsp;:</strong> Bastille (lignes&nbsp;1, 5, 8) à 2&nbsp;min
                • Saint-Paul (ligne&nbsp;1)
              </li>
              <li>
                <strong>Horaires&nbsp;:</strong> Lundi au vendredi, 9h00–19h00
              </li>
              <li>
                <strong>Téléphone&nbsp;:</strong> 06&nbsp;49&nbsp;35&nbsp;80&nbsp;89
              </li>
            </ul>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li>
                <strong>Premier échange&nbsp;:</strong> 15 minutes gratuites par téléphone
              </li>
              <li>
                <strong>Paiement&nbsp;:</strong> CB, espèces, Wero, paiement en ligne
              </li>
              <li>
                <strong>Téléconsultation&nbsp;:</strong> disponible partout en France
              </li>
              <li>
                <strong>Remboursement&nbsp;:</strong> certaines mutuelles (facture fournie)
              </li>
            </ul>
          </div>

          {/* ── FAQ courte ── */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
            Questions fréquentes sur l'hypnothérapie
          </h2>

          <div className="space-y-5 mb-8">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                L'hypnose fonctionne-t-elle vraiment ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Oui. L'hypnose ericksonienne est une thérapie brève validée scientifiquement,
                reconnue par{' '}
                <a
                  href="https://www.inserm.fr/rapport/evaluation-de-lefficacite-de-la-pratique-de-lhypnose-2015/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  l'INSERM
                </a>
                {' '}et pratiquée en milieu hospitalier (anesthésie, douleurs
                chroniques, oncologie). Les résultats sont concrets et mesurables, généralement
                visibles dès les premières séances. Consultez notre{' '}
                <Link to="/blog" className="text-blue-600 hover:underline">
                  blog sur l'hypnose
                </Link>{' '}
                pour en savoir plus.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Reste-t-on conscient pendant l'hypnose ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Absolument. L'hypnose n'est pas le sommeil. Vous restez pleinement
                conscient, vous entendez tout et gardez le contrôle à tout moment.
                C'est un état de relaxation profonde et de concentration accrue qui
                ressemble à ce que vous ressentez en étant absorbé dans un livre ou
                un film.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Combien de séances sont nécessaires ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                La plupart des problématiques se résolvent en 3 à 5 séances.
                Certaines phobies simples ou blocages spécifiques peuvent se traiter en
                1 à 2 séances. La thérapie est brève et orientée solutions, sans
                exploration interminable.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                Comment prendre rendez-vous ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Réservez directement en ligne via Resalib ou{' '}
                <a href="#contact" className="text-blue-600 hover:underline">
                  contactez le cabinet
                </a>{' '}
                par téléphone ou e-mail. Un premier échange de 15 minutes est offert
                pour répondre à vos questions avant de démarrer.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                <strong>Alain Zenatti hypnothérapeute</strong> : quelles certifications ?
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Alain Zenatti est Maître Hypnologue et Maître Praticien en Hypnose
                Ericksonienne, certifié par l'École Psynapse. Il possède également
                des certifications en Hypnose Directive, Hypnose Spirituelle et PNL.
                Sa formation continue lui permet de proposer des techniques
                thérapeutiques toujours à jour.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SeoTextSection;
