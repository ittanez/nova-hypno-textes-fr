// Copie décodée (UTF-8, apostrophes simples) de lot-N/avant/*.html vers lot-N/apres/ (sans écraser l'existant).
import fs from 'node:fs';
const E = { eacute:'é',egrave:'è',agrave:'à',ecirc:'ê',ccedil:'ç',ocirc:'ô',icirc:'î',ugrave:'ù',acirc:'â',Eacute:'É',euml:'ë',iuml:'ï',nbsp:' ',laquo:'«',raquo:'»',rsquo:'’',hellip:'…',oelig:'œ',ucirc:'û',Agrave:'À',Egrave:'È',amp:'&',quot:'"',lt:'<',gt:'>',ndash:'–',mdash:'—',Ecirc:'Ê',apos:"'",lsquo:'‘',ldquo:'“',rdquo:'”',harr:'↔',euro:'€',ouml:'ö',uuml:'ü',auml:'ä',Ccedil:'Ç',times:'×',deg:'°',middot:'·',bull:'•',larr:'←',rarr:'→',ntilde:'ñ',oacute:'ó',aacute:'á',iacute:'í',uacute:'ú',Icirc:'Î',Ocirc:'Ô',Acirc:'Â' };
const dec = (s) => s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&([a-zA-Z]+);/g, (m, e) => E[e] ?? m).replace(/''/g, "'");
const lot = process.argv[2];
fs.mkdirSync(`${lot}/apres`, { recursive: true });
for (const f of fs.readdirSync(`${lot}/avant`).filter((x) => x.endsWith('.html'))) {
  const out = `${lot}/apres/${f}`;
  if (fs.existsSync(out)) continue;
  fs.writeFileSync(out, dec(fs.readFileSync(`${lot}/avant/${f}`, 'utf8')));
}
