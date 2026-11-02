interface PillarPage {
  url: string;
  label: string;
}

const PILLAR_RULES: { keywords: string[]; pillar: PillarPage }[] = [
  { keywords: ["avion", "vol-long"], pillar: { url: "/hypnose-peur-avion-paris", label: "Hypnose peur de l'avion à Paris" } },
  { keywords: ["conduire", "amaxophobie", "volant"], pillar: { url: "/hypnose-amaxophobie-paris", label: "Hypnose peur de conduire à Paris" } },
  { keywords: ["araign", "arachnophobie"], pillar: { url: "/hypnose-arachnophobie-paris", label: "Hypnose arachnophobie à Paris" } },
  { keywords: ["claustrophobie", "ascenseur", "irm-claustro"], pillar: { url: "/hypnose-claustrophobie-paris", label: "Hypnose claustrophobie à Paris" } },
  { keywords: ["acrophobie", "peur-du-vide", "vertige"], pillar: { url: "/hypnose-acrophobie-paris", label: "Hypnose peur du vide à Paris" } },
  { keywords: ["aquaphobie", "peur-de-l-eau"], pillar: { url: "/hypnose-aquaphobie-paris", label: "Hypnose peur de l'eau à Paris" } },
  { keywords: ["peur-du-sang", "hemophobie", "phobie-du-sang"], pillar: { url: "/hypnose-peur-sang-paris", label: "Hypnose peur du sang à Paris" } },
  { keywords: ["aiguille", "piqure"], pillar: { url: "/hypnose-peur-aiguilles-paris", label: "Hypnose peur des aiguilles à Paris" } },
  { keywords: ["dentiste"], pillar: { url: "/hypnose-peur-dentiste-paris", label: "Hypnose peur du dentiste à Paris" } },
  { keywords: ["parler-en-public", "parler-public", "glossophobie", "prise-de-parole"], pillar: { url: "/hypnose-peur-parler-public-paris", label: "Hypnose peur de parler en public à Paris" } },
  { keywords: ["phobie-sociale", "rougir", "ereutophobie"], pillar: { url: "/hypnose-phobie-sociale-paris", label: "Hypnose phobie sociale à Paris" } },
  { keywords: ["sommeil", "insomni", "dormir", "endormissement"], pillar: { url: "/hypnose-sommeil-paris", label: "Hypnose troubles du sommeil à Paris" } },
  { keywords: ["confiance-en-soi", "estime-de-soi", "devalorisation", "imposteur"], pillar: { url: "/hypnose-confiance-en-soi-paris", label: "Hypnose confiance en soi à Paris" } },
  { keywords: ["stress", "anxie", "panique", "respiration-anti-stress", "bruxisme"], pillar: { url: "/hypnose-stress-anxiete-paris", label: "Hypnose stress et anxiété à Paris" } },
  { keywords: ["colere", "emotion", "hypersensib", "frustration", "charge-emotionnelle"], pillar: { url: "/hypnose-gestion-emotions-paris", label: "Hypnose gestion des émotions à Paris" } },
  { keywords: ["procrastin"], pillar: { url: "/hypnose-procrastination-paris", label: "Hypnose procrastination à Paris" } },
  { keywords: ["toc", "rituels-compulsifs", "trichotillomanie", "mysophobie"], pillar: { url: "/hypnose-toc-rituels-paris", label: "Hypnose TOC et rituels à Paris" } },
  { keywords: ["schema-repetitif", "schemas-repetitifs", "relation-toxique"], pillar: { url: "/hypnose-schemas-repetitifs-paris", label: "Hypnose schémas répétitifs à Paris" } },
  { keywords: ["blocage-professionnel", "autosabotage", "peur-de-reussir"], pillar: { url: "/hypnose-blocages-professionnels-paris", label: "Hypnose blocages professionnels à Paris" } },
  { keywords: ["tabac", "fumer", "cigarette"], pillar: { url: "/hypnose-arret-tabac-paris", label: "Hypnose arrêt du tabac à Paris" } },
  { keywords: ["alimenta", "boulimi", "grignot", "compulsion", "addiction-sucre", "image-corporelle"], pillar: { url: "/hypnose-troubles-alimentaires-paris", label: "Hypnose troubles alimentaires à Paris" } },
  { keywords: ["deuil", "separation", "rupture"], pillar: { url: "/hypnose-deuil-paris", label: "Hypnose deuil et séparation à Paris" } },
  { keywords: ["traumatisme", "trauma", "choc"], pillar: { url: "/hypnose-traumatismes-paris", label: "Hypnose traumatismes à Paris" } },
  { keywords: ["phobie", "peur"], pillar: { url: "/hypnose-phobies-paris", label: "Hypnose phobies et peurs à Paris" } },
];

export function findPillarPage(articleSlug: string): PillarPage | null {
  const slug = articleSlug.toLowerCase();
  for (const rule of PILLAR_RULES) {
    if (rule.keywords.some((kw) => slug.includes(kw))) {
      return rule.pillar;
    }
  }
  return null;
}
