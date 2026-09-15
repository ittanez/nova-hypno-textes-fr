#!/usr/bin/env node
/**
 * Contrôle des limites Google Ads sur toutes les campagnes de docs/google-ads/.
 * Chaque sous-dossier est une campagne et doit contenir un dossier import/.
 *
 * Google compte les caractères, pas les octets : « é » compte pour 1.
 * On utilise [...str].length (points de code) plutôt que str.length (unités UTF-16)
 * pour que « € » ou un emoji éventuel soient comptés comme Google les compte.
 *
 * Usage : node scripts/validate-google-ads.mjs
 */

import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ADS_DIR = join(ROOT, 'docs', 'google-ads');

/** Un dossier par campagne, chacun avec son sous-dossier import/. */
const CAMPAIGNS = readdirSync(ADS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name)
  .sort();

const LIMITS = {
  headline: 30,
  description: 90,
  path: 15,
  sitelinkText: 25,
  sitelinkDescription: 35,
  callout: 25,
  snippetValue: 25,
};

const len = (s) => [...s].length;

/** Parse un CSV en respectant les champs entre guillemets. */
function parseCsv(raw) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];

    if (inQuotes) {
      if (c === '"') {
        if (raw[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
    } else if (c !== '\r') {
      field += c;
    }
  }

  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

function readCsv(campaign, name) {
  const rows = parseCsv(readFileSync(join(ADS_DIR, campaign, 'import', name), 'utf8'));
  const [header, ...body] = rows;
  return body.map((cells) =>
    Object.fromEntries(header.map((key, i) => [key, cells[i] ?? '']))
  );
}

const errors = [];
const warnings = [];

function check(kind, label, value, limit) {
  const n = len(value);
  if (n > limit) {
    errors.push(`${label} — ${n}/${limit} car. : « ${value} »`);
  }
  return n;
}

for (const campaign of CAMPAIGNS) {
  verifyCampaign(campaign);
}

function verifyCampaign(campaign) {
// ---------------------------------------------------------------- Annonces RSA
const ads = readCsv(campaign, '4-annonces-rsa.csv');

for (const ad of ads) {
  const where = `${ad['Ad Group']} / ${ad['Headline 1']}`;

  const headlines = [];
  for (let i = 1; i <= 15; i++) {
    const h = ad[`Headline ${i}`];
    if (h) {
      headlines.push(h);
      check('headline', `[Titre ${i}] ${where}`, h, LIMITS.headline);
    }
  }

  const descriptions = [];
  for (let i = 1; i <= 4; i++) {
    const d = ad[`Description ${i}`];
    if (d) {
      descriptions.push(d);
      check('description', `[Desc. ${i}] ${where}`, d, LIMITS.description);
    }
  }

  for (const p of ['Path 1', 'Path 2']) {
    if (ad[p]) check('path', `[${p}] ${where}`, ad[p], LIMITS.path);
  }

  if (headlines.length < 15) {
    warnings.push(
      `${where} : ${headlines.length}/15 titres — Google plafonne l'efficacité en dessous de 15.`
    );
  }
  if (descriptions.length < 4) {
    warnings.push(`${where} : ${descriptions.length}/4 descriptions.`);
  }

  const uniqueHeadlines = new Set(headlines.map((h) => h.toLowerCase()));
  if (uniqueHeadlines.size !== headlines.length) {
    errors.push(`${where} : titres en double.`);
  }

  const pinned = [1, 2, 3].filter((i) => ad[`Headline ${i} position`]).length;
  if (pinned > 3) {
    warnings.push(`${where} : ${pinned} titres épinglés — l'efficacité va chuter.`);
  }

  if (!ad['Final URL']?.startsWith('https://novahypnose.fr/')) {
    errors.push(`${where} : URL finale inattendue « ${ad['Final URL']} »`);
  }
}

// ------------------------------------------------------------------ Extensions
const assets = readCsv(campaign, '5-extensions.csv');

for (const a of assets) {
  const type = a.Type;
  const text = a.Text;

  if (type === 'Sitelink') {
    check('sitelinkText', `[Lien annexe] ${text}`, text, LIMITS.sitelinkText);
    for (const d of ['Description 1', 'Description 2']) {
      if (a[d]) {
        check('sitelinkDescription', `[Lien annexe · ${d}] ${text}`, a[d], LIMITS.sitelinkDescription);
      }
    }
    if (!a['Final URL']?.startsWith('https://novahypnose.fr/')) {
      errors.push(`[Lien annexe] ${text} : URL inattendue « ${a['Final URL']} »`);
    }
  } else if (type === 'Callout') {
    check('callout', `[Accroche] ${text}`, text, LIMITS.callout);
  } else if (type === 'Structured Snippet Value') {
    check('snippetValue', `[Extrait structuré] ${text}`, text, LIMITS.snippetValue);
  }
}

const sitelinks = assets.filter((a) => a.Type === 'Sitelink').length;
const callouts = assets.filter((a) => a.Type === 'Callout').length;
const snippets = assets.filter((a) => a.Type === 'Structured Snippet Value').length;

if (sitelinks < 4) warnings.push(`Seulement ${sitelinks} liens annexes — Google en affiche jusqu'à 6.`);
if (callouts < 4) warnings.push(`Seulement ${callouts} accroches — minimum 4 requis pour l'affichage.`);
if (snippets < 3) warnings.push(`Seulement ${snippets} valeurs d'extrait structuré — minimum 3 requis.`);

// -------------------------------------------------------------------- Mots-clés
const keywords = readCsv(campaign, '2-mots-cles.csv');
const negatives = readCsv(campaign, '3-mots-cles-negatifs.csv');

// Un mot-clé bloqué par une de ses propres exclusions ne diffusera jamais.
const negativeBroadTerms = negatives
  .filter((n) => n['Criterion Type'] === 'Campaign Negative Broad')
  .map((n) => n.Keyword.toLowerCase().trim());
const negativePhrases = negatives
  .filter((n) => n['Criterion Type'] === 'Campaign Negative Phrase')
  .map((n) => n.Keyword.toLowerCase().trim());

for (const kw of keywords) {
  const text = kw.Keyword.toLowerCase();
  const words = new Set(text.split(/[\s']+/));

  for (const term of negativeBroadTerms) {
    if (words.has(term)) {
      errors.push(`Conflit : le mot-clé « ${kw.Keyword} » est bloqué par l'exclusion large « ${term} ».`);
    }
  }
  for (const phrase of negativePhrases) {
    if (text.includes(phrase)) {
      errors.push(`Conflit : le mot-clé « ${kw.Keyword} » est bloqué par l'exclusion expression « ${phrase} ».`);
    }
  }
}

// ------------------------------------------------------------------- Résultats
console.log(`\n── ${campaign}`);
console.log(`   Annonces ${ads.length}  ·  Mots-clés ${keywords.length}  ·  Exclusions ${negatives.length}`);
console.log(`   Liens annexes ${sitelinks}  ·  Accroches ${callouts}  ·  Extraits ${snippets}`);
}

console.log('');

if (warnings.length) {
  console.log('Avertissements :');
  for (const w of warnings) console.log(`  ! ${w}`);
  console.log('');
}

if (errors.length) {
  console.error(`${errors.length} erreur(s) :`);
  for (const e of errors) console.error(`  x ${e}`);
  console.error('');
  process.exit(1);
}

console.log('Toutes les limites Google Ads sont respectées.\n');
