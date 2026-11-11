// Pied de page du HTML pré-rendu (pages statiques et blog).
//
// Le pré-rendu ne contenait que « Accueil » et « Mentions légales » : pour un robot,
// /faq, /tarifs, /guides-gratuits ou /hypnose-douleur-chronique-paris n'avaient
// presque aucun lien entrant, et les 145 articles du blog ne menaient à aucune page
// de séance. Ces liens reprennent ceux que voit un internaute dans le menu et le
// pied de page du site (CzLayout, navigationData) : rien n'est réservé aux robots.

const GROUPS: { label: string; links: [string, string][] }[] = [
  {
    label: "Accompagnements",
    links: [
      ["/hypnose-stress-anxiete-paris", "Stress et anxiété"],
      ["/hypnose-phobies-paris", "Peurs et phobies"],
      ["/hypnose-sommeil-paris", "Sommeil"],
      ["/hypnose-gestion-emotions-paris", "Émotions"],
      ["/hypnose-confiance-en-soi-paris", "Confiance en soi"],
      ["/hypnose-blocages-paris", "Blocages"],
      ["/hypnose-troubles-alimentaires-paris", "Rapport au poids"],
      ["/hypnose-deuil-paris", "Deuil"],
      ["/hypnose-traumatismes-paris", "Traumatismes"],
      ["/hypnose-douleur-chronique-paris", "Douleur chronique"],
      ["/hypnose-arret-tabac-paris", "Arrêt du tabac"],
      ["/hypnose-professionnels-paris", "Souffrance au travail"],
    ],
  },
  {
    label: "Cabinet",
    links: [
      ["/alain-zenatti", "Alain Zenatti, hypnothérapeute"],
      ["/hypnose-en-ligne", "Séances en visio"],
      ["/zone-intervention", "Accès au cabinet (Paris 4e)"],
      ["/tarifs", "Tarifs"],
      ["/avis", "Avis"],
      ["/faq", "Questions fréquentes"],
      ["/contact", "Contact"],
    ],
  },
  {
    label: "Ressources",
    links: [
      ["/blog", "Blog"],
      ["/guides-gratuits", "Guides gratuits"],
      ["/autohypnose", "Auto-hypnose"],
      ["/test-receptivite", "Test de réceptivité à l'hypnose"],
    ],
  },
];

/** Bloc <footer> complet. `currentPath` : la page en cours n'est pas liée à elle-même. */
export function siteFooterHtml(siteUrl: string, currentPath = ""): string {
  const groups = GROUPS.map(({ label, links }) => {
    const items = links
      .filter(([path]) => path !== currentPath)
      .map(([path, text]) => `<a href="${siteUrl}${path}">${text}</a>`)
      .join(" · ");
    return `<p><strong>${label} :</strong> ${items}</p>`;
  }).join("\n    ");

  return `<footer>
    ${groups}
    <p><a href="${siteUrl}">NovaHypnose</a> — Hypnothérapeute Paris 4 | Alain Zenatti</p>
    <p><a href="${siteUrl}/mentions-legales">Mentions légales</a> · <a href="${siteUrl}/politique-de-confidentialite">Confidentialité</a></p>
  </footer>`;
}
