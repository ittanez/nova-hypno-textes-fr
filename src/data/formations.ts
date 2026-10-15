/**
 * Formations et certifications d'Alain Zenatti (liste validée par Alain le 2026-10-15).
 *
 * Source unique pour la page /alain-zenatti et le schéma Person (hasCredential).
 * La version servie aux robots (netlify/edge-functions/seo-prerender-static.ts,
 * route "/alain-zenatti") en recopie le contenu : la garder en phase.
 */

export interface Formation {
  title: string;
  school: string;
  schoolUrl: string;
  year: string;
  /** Durée en jours, quand elle est connue */
  days?: number;
  description?: string;
}

export interface FormationCycle {
  name: string;
  formations: Formation[];
}

const PSYNAPSE = { school: "École Psynapse", schoolUrl: "https://psynapse.fr/formation-hypnose/" };
const MHD = {
  school: "MHD Formation (Paris)",
  schoolUrl: "https://mhd-formation.com/nos-formations/formation-praticien-hypnose/",
};

export const formationCycles: FormationCycle[] = [
  {
    name: "Première formation",
    formations: [
      {
        title: "Praticien en hypnose ericksonienne",
        ...MHD,
        year: "2020",
        days: 10,
        description:
          "Première formation complète en hypnose ericksonienne : deux séminaires de cinq jours, à Paris.",
      },
    ],
  },
  {
    name: "Cycle 1 — Hypno-Praticien",
    formations: [
      {
        title: "Technicien et Praticien en hypnose ericksonienne",
        ...PSYNAPSE,
        year: "2021",
        days: 12,
        description:
          "Les fondements de l'hypnose ericksonienne : langage permissif (modèle de Milton Erickson), rapport, inductions, puis protocoles thérapeutiques, gestion des résistances, ancrages, métaphores et restructuration des états internes.",
      },
    ],
  },
  {
    name: "Cycle 2 — Hypnologue",
    formations: [
      {
        title: "Maître-Praticien en hypnose ericksonienne",
        ...PSYNAPSE,
        year: "2023",
        days: 12,
        description:
          "Stratégies de changement complexes : travail sur les croyances, les valeurs et construction de métaphores sur mesure.",
      },
      {
        title: "Psychopathologie clinique",
        ...PSYNAPSE,
        year: "2023",
        days: 8,
        description:
          "Les grands troubles de la santé mentale (névroses, psychoses, troubles de l'humeur et de la personnalité), pour sécuriser le cadre de l'accompagnement et savoir orienter vers un médecin quand c'est nécessaire.",
      },
    ],
  },
  {
    name: "Cycle 3 — Maître Hypnologue",
    formations: [
      {
        title: "Hypnose Hyperempiria",
        ...PSYNAPSE,
        year: "2025",
        days: 2,
        description: "Élargissement de la conscience et suggestion positive, sans recherche de transe profonde.",
      },
      {
        title: "Deep Hypnose",
        ...PSYNAPSE,
        year: "2025",
        days: 2,
        description: "États de transe très profonds (somnambulisme, état d'Esdaile), catalepsie et hypno-analgésie.",
      },
      {
        title: "Hypnose directe",
        ...PSYNAPSE,
        year: "2025",
        days: 4,
        description: "Approche directe inspirée de Dave Elman : contournement du facteur critique et suggestions claires.",
      },
      {
        title: "Speed Hypnose",
        ...PSYNAPSE,
        year: "2025",
        days: 4,
        description: "Inductions rapides et instantanées (rupture de séquence, inductions physiques).",
      },
    ],
  },
  {
    name: "Formation complémentaire",
    formations: [
      {
        title: "Hypnose spirituelle",
        ...PSYNAPSE,
        year: "2023",
      },
    ],
  },
];

export const allFormations: Formation[] = formationCycles.flatMap((c) => c.formations);
