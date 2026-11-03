import type { Context } from "https://edge.netlify.com";

// Garde anti soft-404 (audit SEO R-01).
// Le site est une SPA : sans cette fonction, toute URL inconnue renvoie le
// shell index.html avec un statut 200 (le composant Custom404 s'affiche mais
// Google voit une page valide -> "Soft 404" et doublons d'accueil).
// Ici, toute URL HTML qui n'est pas une route connue reçoit le même shell
// (le routeur React affiche Custom404, noindex) mais avec un vrai statut 404.
//
// Les chemins sont listés dans KNOWN_PATHS : le test
// scripts/__tests__/not-found-guard.test.ts échoue si une route de App.tsx
// n'y figure pas.

export const KNOWN_PATHS = new Set<string>([
  "/",
  "/admin-blog",
  "/admin-blog/article/new",
  "/admin-blog/articles",
  "/admin-blog/dashboard",
  "/admin-blog/direct",
  "/admin-blog/login",
  "/alain-zenatti",
  "/anxiete-hypnose",
  "/autohypnose",
  "/autohypnose-gratitude",
  "/autohypnose-questionnaire",
  "/autohypnose/quiz",
  "/avis",
  "/blog",
  "/blog-maquette",
  "/blog/categories",
  "/contact",
  "/contact-wa-brevo",
  "/faq",
  "/guide-arret-tabac",
  "/guide-arret-tabac/merci",
  "/guide-autohypnose",
  "/guide-autohypnose/merci",
  "/guide-carriere",
  "/guide-carriere/merci",
  "/guide-colere",
  "/guide-colere/merci",
  "/guide-emotions-travail",
  "/guide-emotions-travail/merci",
  "/guide-procrastination",
  "/guide-procrastination/merci",
  "/guide-sommeil",
  "/guide-sommeil/merci",
  "/hypnose-acrophobie-paris",
  "/hypnose-addiction-sucre-paris",
  "/hypnose-addictions-comportementales-paris",
  "/hypnose-alimentation-emotionnelle-paris",
  "/hypnose-amaxophobie-paris",
  "/hypnose-anxiete-emotionnelle-paris",
  "/hypnose-aquaphobie-paris",
  "/hypnose-arachnophobie-paris",
  "/hypnose-arret-tabac-paris",
  "/hypnose-blocages-paris",
  "/hypnose-blocages-professionnels-paris",
  "/hypnose-boulimie-paris",
  "/hypnose-charge-emotionnelle-paris",
  "/hypnose-claustrophobie-paris",
  "/hypnose-colere-paris",
  "/hypnose-compulsions-alimentaires-paris",
  "/hypnose-confiance-en-soi-paris",
  "/hypnose-deuil-paris",
  "/hypnose-deuil-separation-paris",
  "/hypnose-en-ligne",
  "/hypnose-frustration-chronique-paris",
  "/hypnose-frustration-paris",
  "/hypnose-gestion-emotions-paris",
  "/hypnose-grignotage-paris",
  "/hypnose-hypersensibilite-paris",
  "/hypnose-image-corporelle-paris",
  "/hypnose-onychophagie-paris",
  "/hypnose-peur-aiguilles-paris",
  "/hypnose-peur-avion-paris",
  "/hypnose-peur-dentiste-paris",
  "/hypnose-peur-parler-public-paris",
  "/hypnose-peur-sang-paris",
  "/hypnose-phobie-sociale-paris",
  "/hypnose-phobies-paris",
  "/hypnose-procrastination-paris",
  "/hypnose-professionnels-paris",
  "/hypnose-schemas-repetitifs-paris",
  "/hypnose-sommeil-paris",
  "/hypnose-stress-anxiete-paris",
  "/hypnose-toc-rituels-paris",
  "/hypnose-traumatismes-paris",
  "/hypnose-troubles-alimentaires-paris",
  "/hypnose-troubles-emotionnels-paris",
  "/maquette",
  "/mentions-legales",
  "/peur-avion-maquette",
  "/politique-de-confidentialite",
  "/politique-de-confidentialite-novarespire",
  "/preview-charte",
  "/preview-charte-admin",
  "/preview-charte-autohypnose",
  "/preview-charte-blog",
  "/preview-charte-mentions-legales",
  "/questionnaire-ebook",
  "/tarifs",
  "/test-ebook",
  "/test-receptivite",
  "/test-receptivite-archive",
  "/v1",
  "/v1/autohypnose",
  "/v1/blog",
  "/v1/mentions-legales",
  "/wa",
  "/zone-intervention",
]);

// Préfixes dont le contenu est dynamique (slugs Supabase) ou administratif :
// on ne peut pas les valider ici, ils restent gérés par le routeur React.
export const DYNAMIC_PREFIXES = [
  "/blog/article/",
  "/blog/categorie/",
  "/v1/blog/article/",
  "/preview-charte-blog/article/",
  "/admin-blog/",
  "/api/",
  "/assets/",
  "/images/",
  "/fonts/",
  "/lovable-uploads/",
  "/.netlify/",
];

export function normalizePath(pathname: string): string {
  return pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
}

export function shouldReturn404(pathname: string): boolean {
  const p = normalizePath(pathname);
  if (KNOWN_PATHS.has(p)) return false;
  if (DYNAMIC_PREFIXES.some((prefix) => (p + "/").startsWith(prefix))) return false;
  // Fichiers statiques (robots.txt, sitemap.xml, *.html de public/, images...)
  if (/\.[a-z0-9]+$/i.test(p)) return false;
  return true;
}

export default async function handler(request: Request, context: Context): Promise<Response> {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return context.next();
  }

  const url = new URL(request.url);
  if (!shouldReturn404(url.pathname)) {
    return context.next();
  }

  // On laisse d'abord le reste de la chaîne répondre : une règle de
  // redirection (301) ou un fichier réel ne doit pas être écrasé en 404.
  const response = await context.next();
  const type = response.headers.get("content-type") || "";
  if (response.status !== 200 || !type.includes("text/html")) {
    return response;
  }

  const headers = new Headers(response.headers);
  headers.set("X-Robots-Tag", "noindex");
  headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return new Response(request.method === "HEAD" ? null : response.body, {
    status: 404,
    statusText: "Not Found",
    headers,
  });
}
