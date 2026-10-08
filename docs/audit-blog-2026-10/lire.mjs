// Affiche un article exporté (entités HTML décodées, apostrophes doublées corrigées) pour relecture.
import fs from 'node:fs';
const E = { eacute:'é',egrave:'è',agrave:'à',ecirc:'ê',ccedil:'ç',ocirc:'ô',icirc:'î',ugrave:'ù',acirc:'â',Eacute:'É',euml:'ë',iuml:'ï',nbsp:' ',laquo:'«',raquo:'»',rsquo:'’',hellip:'…',oelig:'œ',ucirc:'û',Agrave:'À',Egrave:'È',amp:'&',quot:'"',lt:'<',gt:'>',ndash:'–',mdash:'—',Ecirc:'Ê',apos:"'",lsquo:'‘',ldquo:'“',rdquo:'”',harr:'↔',euro:'€',ouml:'ö',uuml:'ü',auml:'ä',Ccedil:'Ç',times:'×',deg:'°',middot:'·',bull:'•',larr:'←',rarr:'→',egrave:'è',ntilde:'ñ',oacute:'ó',aacute:'á',iacute:'í',uacute:'ú',Icirc:'Î',Ocirc:'Ô',Acirc:'Â' };
const [f] = process.argv.slice(2);
const dec = (s) => s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&([a-zA-Z]+);/g, (m, e) => E[e] ?? m).replace(/''/g, "'");
const meta = JSON.parse(fs.readFileSync(f + '.meta.json', 'utf8'));
console.log(JSON.stringify({ title: meta.title, excerpt: meta.excerpt, meta: meta.meta_description, cat: meta.categories, tags: meta.tags }));
console.log(dec(fs.readFileSync(f + '.html', 'utf8')));
