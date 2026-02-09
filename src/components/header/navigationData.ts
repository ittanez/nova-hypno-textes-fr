/**
 * Configuration des liens de navigation du Header
 */

export interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

export interface NavSection {
  title: string;
  links: NavLink[];
}

// Liens principaux (sans dropdown)
export const mainNavLinks: NavLink[] = [
  { name: 'Accueil', href: '/' },
];

export const mainNavLinksAfter: NavLink[] = [
  { name: 'Blog', href: '/blog' },
];

// Sections avec dropdown
export const aboutLinks: NavLink[] = [
  { name: 'Présentation', href: '/#about' },
  { name: 'Témoignages', href: '/#temoignages' },
];

export const hypnoseLinks: NavLink[] = [
  { name: 'Comment fonctionne l\'hypnose', href: '/#comment-fonctionne' },
  { name: 'L\'auto-hypnose', href: '/#self-hypnosis' },
  { name: 'Déroulement des séances', href: '/#deroulement' },
  { name: 'Test de réceptivité', href: '/test-receptivite' },
];

export const accompagnementsLinks: NavLink[] = [
  { name: 'Applications', href: '/#applications' },
  { name: 'Stress et anxiété', href: '/hypnose-stress-anxiete-paris' },
  { name: 'Phobies et peurs', href: '/hypnose-phobies-paris' },
  { name: 'Troubles du sommeil', href: '/hypnose-sommeil-paris' },
  { name: 'Gestion des émotions', href: '/hypnose-gestion-emotions-paris' },
  { name: 'Blocages et comportements', href: '/hypnose-blocages-paris' },
  { name: 'Confiance en soi', href: '/hypnose-confiance-en-soi-paris' },
  { name: 'Formation auto-hypnose', href: 'https://novahypnose.fr/autohypnose', external: true },
  { name: 'Offre Liberté Aérienne', href: '/peurdelavion.html' },
];

export const infosPratiquesLinks: NavLink[] = [
  { name: 'Tarifs', href: '/#tarifs' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Zone d\'intervention', href: '/zone-intervention' },
  { name: 'Contact', href: '/#contact' },
];

// Configuration des dropdowns pour le mapping
export const dropdownSections: NavSection[] = [
  { title: 'À propos', links: aboutLinks },
  { title: 'L\'hypnose', links: hypnoseLinks },
  { title: 'Mes accompagnements', links: accompagnementsLinks },
];

export const infosPratiquesSection: NavSection = {
  title: 'Infos pratiques',
  links: infosPratiquesLinks,
};

// URLs externes
export const externalLinks = {
  instagram: 'https://www.instagram.com/novahypnose/',
  appointment: 'https://www.resalib.fr/praticien/47325-alain-zenatti-hypnotherapeute-paris',
};
