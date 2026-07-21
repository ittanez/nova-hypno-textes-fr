/**
 * Registre des pages thématiques (spécialités) du cabinet, avec leurs mots-clés
 * éditoriaux (repris des composants SpecialtyBlogArticles de chaque page).
 * Sert à retrouver la page thématique la plus pertinente à suggérer depuis un
 * article de blog, pour créer un maillage interne naturel articles ↔ spécialités.
 */

export interface SpecialtyLink {
  path: string;
  label: string;
  keywords: string[];
}

export const specialtyLinks: SpecialtyLink[] = [
  { path: '/hypnose-stress-anxiete-paris', label: 'Hypnose stress & anxiété', keywords: ['stress', 'anxiété', 'anxieux'] },
  { path: '/hypnose-phobies-paris', label: 'Hypnose et phobies', keywords: ['phobie', 'peur', 'phobique'] },
  { path: '/hypnose-sommeil-paris', label: 'Hypnose et sommeil', keywords: ['sommeil', 'insomnie', 'dormir'] },
  { path: '/hypnose-gestion-emotions-paris', label: 'Gestion des émotions', keywords: ['émotion', 'émotions', 'colère', 'amoureux', 'deuil'] },
  { path: '/hypnose-blocages-paris', label: 'Blocages et comportements', keywords: ['blocage', 'procrastination', 'comportement'] },
  { path: '/hypnose-confiance-en-soi-paris', label: 'Confiance en soi', keywords: ['confiance', 'estime', 'imposteur'] },
  { path: '/hypnose-troubles-alimentaires-paris', label: 'Troubles alimentaires', keywords: ['alimentation', 'comportement alimentaire', 'boulimie'] },
  { path: '/hypnose-arret-tabac-paris', label: 'Arrêt du tabac', keywords: ['tabac', 'fumer', 'cigarette', 'sevrage'] },
  { path: '/hypnose-arachnophobie-paris', label: "L'arachnophobie", keywords: ['araignées', 'arachnophobie', 'phobie', 'peur'] },
  { path: '/hypnose-acrophobie-paris', label: 'La peur du vide (acrophobie)', keywords: ['acrophobie', 'peur du vide', 'hauteurs', 'vertige'] },
  { path: '/hypnose-claustrophobie-paris', label: 'La claustrophobie', keywords: ['claustrophobie', 'espaces clos', 'enfermement', 'angoisse'] },
  { path: '/hypnose-peur-parler-public-paris', label: 'La peur de parler en public', keywords: ['trac', 'parler en public', 'glossophobie', 'prise de parole'] },
  { path: '/hypnose-peur-dentiste-paris', label: 'La peur du dentiste', keywords: ['dentiste', 'peur du dentiste'] },
  { path: '/hypnose-peur-aiguilles-paris', label: 'La peur des aiguilles', keywords: ['aiguilles', 'injections'] },
  { path: '/hypnose-peur-sang-paris', label: 'La peur du sang', keywords: ['sang', 'hématophobie'] },
  { path: '/hypnose-aquaphobie-paris', label: "La peur de l'eau", keywords: ['eau', 'aquaphobie', 'natation'] },
  { path: '/hypnose-amaxophobie-paris', label: 'La peur de conduire', keywords: ['conduite', 'voiture', 'amaxophobie'] },
  { path: '/hypnose-phobie-sociale-paris', label: 'La phobie sociale', keywords: ['phobie sociale', 'anxiété sociale', 'timidité', 'peur du jugement'] },
  { path: '/hypnose-procrastination-paris', label: 'La procrastination', keywords: ['procrastination', "passage à l'action", "peur de l'échec"] },
  { path: '/hypnose-onychophagie-paris', label: "L'onychophagie", keywords: ['onychophagie', 'ongles', 'rongement des ongles'] },
  { path: '/hypnose-toc-rituels-paris', label: 'Les TOC et rituels compulsifs', keywords: ['toc', 'rituels compulsifs', 'obsession', 'trichotillomanie'] },
  { path: '/hypnose-schemas-repetitifs-paris', label: 'Les schémas répétitifs', keywords: ['schémas répétitifs', 'cycles relationnels', 'auto-sabotage'] },
  { path: '/hypnose-blocages-professionnels-paris', label: 'Les blocages professionnels', keywords: ['blocage professionnel', 'syndrome imposteur', 'confiance professionnelle'] },
  { path: '/hypnose-addictions-comportementales-paris', label: 'Les addictions comportementales', keywords: ["addiction", "jeux d'argent", 'dépendance comportementale'] },
  { path: '/hypnose-troubles-emotionnels-paris', label: 'Les troubles émotionnels', keywords: ['troubles émotionnels', 'régulation émotionnelle'] },
  { path: '/hypnose-colere-paris', label: "La colère et l'irritabilité", keywords: ['colère', 'irritabilité'] },
  { path: '/hypnose-hypersensibilite-paris', label: "L'hypersensibilité", keywords: ['hypersensibilité', 'sensibilité'] },
  { path: '/hypnose-charge-emotionnelle-paris', label: 'La charge émotionnelle', keywords: ['charge émotionnelle', 'épuisement émotionnel'] },
  { path: '/hypnose-deuil-paris', label: 'Le deuil et la séparation', keywords: ['deuil', 'séparation', 'rupture', 'perte'] },
  { path: '/hypnose-traumatismes-paris', label: 'Les traumatismes', keywords: ['traumatisme', 'choc', 'stress post-traumatique', 'agression'] },
  { path: '/hypnose-frustration-paris', label: "La frustration et l'insatisfaction", keywords: ['frustration', 'insatisfaction'] },
  { path: '/hypnose-anxiete-emotionnelle-paris', label: 'Anxiété émotionnelle', keywords: ['anxiété émotionnelle'] },
  { path: '/hypnose-compulsions-alimentaires-paris', label: 'Les compulsions alimentaires', keywords: ['compulsions alimentaires', 'craving'] },
  { path: '/hypnose-grignotage-paris', label: 'Le grignotage', keywords: ['grignotage', 'automatisme alimentaire', 'snacking'] },
  { path: '/hypnose-addiction-sucre-paris', label: 'Addiction au sucre', keywords: ['addiction sucre', 'envies sucrées', 'sucre émotionnel'] },
  { path: '/hypnose-boulimie-paris', label: 'La boulimie', keywords: ['boulimie'] },
  { path: '/hypnose-alimentation-emotionnelle-paris', label: 'Alimentation émotionnelle', keywords: ['alimentation émotionnelle', 'manger ses émotions', 'faim émotionnelle'] },
  { path: '/hypnose-image-corporelle-paris', label: "L'image corporelle", keywords: ['image corporelle', 'rapport au corps'] },
];

interface ArticleLike {
  title?: string;
  excerpt?: string;
  categories?: string[] | null;
  tags?: (string | { name: string })[] | null;
  keywords?: string[] | null;
}

/**
 * Retourne la page thématique dont les mots-clés recoupent le mieux
 * le titre/extrait/tags/mots-clés de l'article, ou null si aucune correspondance.
 */
export function findSpecialtyMatch(article: ArticleLike): SpecialtyLink | null {
  const tagNames = (article.tags || []).map((t) => (typeof t === 'string' ? t : t.name));

  const haystack = [
    article.title || '',
    article.excerpt || '',
    ...(article.categories || []),
    ...tagNames,
    ...(article.keywords || []),
  ].join(' ').toLowerCase();

  let best: SpecialtyLink | null = null;
  let bestScore = 0;

  for (const specialty of specialtyLinks) {
    const score = specialty.keywords.reduce(
      (acc, kw) => acc + (haystack.includes(kw.toLowerCase()) ? 1 : 0),
      0
    );
    if (score > bestScore) {
      bestScore = score;
      best = specialty;
    }
  }

  return bestScore > 0 ? best : null;
}
