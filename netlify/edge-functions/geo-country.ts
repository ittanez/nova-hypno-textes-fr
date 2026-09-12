import type { Context } from "https://edge.netlify.com";

// Renvoie le pays du visiteur (déduit par Netlify depuis son IP) pour que le
// client puisse décider, avant de charger des scripts tiers, si le visiteur
// se trouve dans une zone à exclure (ex: suivi Microsoft Clarity désactivé
// pour les visiteurs des États-Unis). Réponse minuscule, mise en cache
// courte, ne bloque jamais le rendu de la page appelante.
export default function handler(_req: Request, ctx: Context): Response {
  const country = ctx.geo?.country?.code ?? null;

  return new Response(JSON.stringify({ country }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=3600",
    },
  });
}
