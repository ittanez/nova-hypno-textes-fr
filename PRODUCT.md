# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Personnes cherchant un accompagnement en hypnothérapie à Paris (ou à distance en visio), pour des problématiques telles que : stress et anxiété, troubles du sommeil, manque de confiance en soi, phobies, blocages émotionnels, préparation mentale, troubles alimentaires, douleurs et allergies. Le public cible est adulte, en recherche active d'une solution à un problème précis, souvent après avoir essayé d'autres approches.

## Product Purpose

NovaHypnose est le site vitrine du cabinet d'hypnothérapie d'Alain Zenatti à Paris. Il informe les visiteurs sur les applications de l'hypnothérapie, construit la confiance via témoignages et preuve sociale (avis Google), et convertit vers une prise de rendez-vous (cabinet à Paris ou consultation en visio via Resalib).

## Positioning

Certification Maître Hypnologue (École Psynapse) combinée à une approche sur-mesure structurée en véritables parcours de transformation plutôt qu'en séances isolées et interchangeables — un positionnement que les témoignages clients corroborent spontanément (accompagnement à l'écoute, résultats en quelques séances).

## Operating Context

- Cabinet physique à Paris + consultations à distance en visio
- Prise de rendez-vous via Resalib (`https://www.resalib.fr/agenda/47325`)
- Présence Google Business Profile active (avis clients réels intégrés comme témoignages)
- Blog d'articles avec back-office admin (`/admin-blog/*`)
- Pages dédiées par problématique ("spécialités") : stress/anxiété, sommeil, confiance en soi, phobies (+ pages phobies spécifiques), blocages, gestion des émotions, troubles alimentaires

## Capabilities and Constraints

- Site SPA React (Vite) avec prérendu SEO via edge functions Netlify pour les crawlers
- Backend Supabase (contenu blog, formulaires, emails transactionnels via Brevo)
- Charte graphique propriétaire "ZENatti / risographie" (voir Brand Commitments) déjà en place — toute évolution visuelle doit s'appuyer sur `document`/`extract` avant remplacement
- **Contrainte absolue non négociable** : le praticien ne pratique pas le sevrage tabagique — ne jamais créer, suggérer ou documenter de page/service lié à l'arrêt du tabac

## Brand Commitments

- Nom : NovaHypnose — praticien : Alain Zenatti, Maître Hypnologue certifié (École Psynapse), entrepreneur individuel
- Charte visuelle "ZENatti / risographie" : bleu `#2B4BA0` + orange `#F2A12E`, texture grain papier, titres bicolores avec emphase en italique
- Typographies : Cormorant Garamond (titres) + DM Sans (texte courant) ; Playfair Display et Poppins également chargées (usage à vérifier/documenter)
- Composants shadcn/ui sur base Radix, cohérence à préserver dans tout nouveau composant

## Evidence on Hand

- Témoignages clients réels issus de Google Business Profile, stockés dans `src/data/testimonials.ts` (ne pas inventer de nouveaux témoignages)
- Contenu des applications de l'hypnose dans `src/data/applicationsData.ts`, FAQ dans `src/data/faqData.ts` et `src/data/specialtyFaqData.ts`
- Schémas structurés (LocalBusiness, Person, FAQ) dans `src/data/schemaOrg.ts` — source de vérité pour les faits d'entreprise (adresse, identifiants GBP, etc.)

## Product Principles

1. Chaque page "spécialité" doit parler à une problématique précise et rassurer via preuve sociale réelle (témoignages GBP), jamais fabriquée.
2. La charte ZENatti/risographie prime sur les conventions génériques d'UI — ne pas la diluer vers un style IA générique.
3. Le SEO/GEO est structurel au produit (prérendu bot, JSON-LD, sitemap Supabase) : toute évolution UI doit rester compatible avec le prérendu.
4. Ne jamais créer de contenu lié à l'arrêt du tabac, quelle que soit la demande ou l'opportunité SEO perçue.

## Accessibility & Inclusion

Aucune exigence spécifique au-delà des standards web classiques (WCAG) établie à ce jour.
