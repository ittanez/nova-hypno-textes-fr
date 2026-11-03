// Détection « inversée » des clients non-navigateurs (audit T-02) et en-tête Vary.
//
// Un vrai navigateur envoie toujours « Mozilla/5.0 ... ». Tout client sans UA, sans
// « mozilla », ou dont l'UA contient un mot-clé de robot est traité comme un robot
// et reçoit le HTML pré-rendu. Cela couvre les crawlers IA absents de la liste
// nominative (BOT_USER_AGENTS), qui n'exécutent pas le JavaScript.

const AUTOMATED_HINTS = /bot|crawl|spider|slurp|fetch|preview|scrap|curl|wget|python|axios|go-http|java\/|okhttp|node-fetch|undici|libwww/i;

export function looksAutomated(userAgent: string | null): boolean {
  const ua = (userAgent || "").trim();
  if (!ua) return true;
  if (!/mozilla/i.test(ua)) return true;
  return AUTOMATED_HINTS.test(ua);
}

/** Ajoute Vary: User-Agent : la réponse dépend du client (pré-rendu vs SPA). */
export function withVaryUA(response: Response): Response {
  const headers = new Headers(response.headers);
  const vary = headers.get("vary");
  if (!vary) {
    headers.set("vary", "User-Agent");
  } else if (!/(^|,)\s*(user-agent|\*)\s*(,|$)/i.test(vary)) {
    headers.set("vary", `${vary}, User-Agent`);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
