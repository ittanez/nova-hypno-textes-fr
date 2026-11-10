/**
 * decryptage-submit — tunnel « Décryptage » (novahypnose.fr/decryptage).
 *
 * Appelée uniquement quand la personne a saisi un email ET coché le
 * consentement. Elle :
 *   1. valide les réponses (valeurs connues uniquement) ;
 *   2. limite à 1 envoi / 10 min / email (_shared/rateLimiter) ;
 *   3. enregistre la réponse dans `decryptage_responses` (clé service_role) ;
 *   4. envoie le décryptage au client et une notification à Alain via Brevo
 *      (envoi transactionnel : les réponses ne sont pas stockées dans les
 *      fiches contacts Brevo).
 *
 * Le contenu de l'email est reconstruit ici à partir des identifiants de
 * réponse : le navigateur n'envoie aucun texte d'email.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts";
import { checkRateLimit } from "../_shared/rateLimiter.ts";
import {
  BANDEAU_PRUDENCE,
  BLOC_D,
  CALENDLY_URL,
  CONSENT_VERSION,
  MAX_AUTRE,
  MAX_MESSAGE,
  MAX_PRENOM,
  QUESTIONS,
  REPERE_LABEL,
  SMS_NUMERO_AFFICHE,
  SMS_TEXTE,
  buildDecryptage,
  buildSmsHref,
  computeRepere,
  computeSignaux,
  isValidAnswers,
  labelFor,
} from "../_shared/decryptageContent.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL") || "a.zenatti@gmail.com";
const SENDER = { name: "Alain Zenatti — NovaHypnose", email: "contact@novahypnose.fr" };

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendBrevo(payload: Record<string, unknown>): Promise<void> {
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY! },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Brevo ${res.status}: ${await res.text()}`);
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const headers = { ...corsHeaders, "Content-Type": "application/json" };
  const fail = (status: number, error: string) =>
    new Response(JSON.stringify({ error }), { status, headers });

  if (req.method !== "POST") return fail(405, "Méthode non autorisée");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(400, "Body JSON invalide");
  }

  // ── 1. Validation ──────────────────────────────────────────────────────────
  const email = sanitizeString(String(body.email ?? ""), 254).trim().toLowerCase();
  const prenom = sanitizeString(String(body.prenom ?? ""), MAX_PRENOM).trim();
  const autreTexte = sanitizeString(String(body.autreTexte ?? ""), MAX_AUTRE).trim();
  const message = sanitizeString(String(body.message ?? ""), MAX_MESSAGE).trim();
  const answers = body.answers;
  // Source de la visite : minuscules, [a-z0-9_-], 60 caractères max.
  const cleanSource = (v: unknown) =>
    String(v ?? "").toLowerCase().replace(/[^a-z0-9_-]/g, "").slice(0, 60) || null;
  const utmSource = cleanSource(body.utmSource);
  const utmMedium = cleanSource(body.utmMedium);
  const utmContent = cleanSource(body.utmContent);

  if (!isValidEmail(email)) return fail(400, "Email invalide");
  if (!prenom) return fail(400, "Prénom manquant");
  if (!isValidAnswers(answers)) return fail(400, "Réponses invalides");
  if (body.consentVersion !== CONSENT_VERSION) return fail(400, "Consentement manquant");
  if (!BREVO_API_KEY) return fail(500, "BREVO_API_KEY non configurée");

  // ── 2. Limite d'envoi ──────────────────────────────────────────────────────
  const allowed = await checkRateLimit(email, "decryptage-submit");
  if (!allowed) return fail(429, "Une demande a déjà été envoyée récemment pour cet email.");

  const repere = computeRepere(answers);
  const signaux = computeSignaux(answers, message);
  const d = buildDecryptage(answers, prenom, autreTexte);

  // ── 3. Enregistrement ──────────────────────────────────────────────────────
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
  const { error: dbError } = await supabase.from("decryptage_responses").insert({
    prenom,
    email,
    answers,
    autre_texte: autreTexte || null,
    message: message || null,
    repere,
    consent_version: CONSENT_VERSION,
    consent_at: new Date().toISOString(),
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_content: utmContent,
  });
  if (dbError) {
    // On envoie quand même les emails : la personne attend sa copie.
    console.error("decryptage-submit — insertion:", dbError.message);
  }

  // Conservation 12 mois : pg_cron n'est pas activé sur le projet, la purge
  // se fait donc ici, à chaque nouvelle réponse (non bloquant).
  const { error: purgeError } = await supabase.rpc("purge_decryptage_responses");
  if (purgeError) console.error("decryptage-submit — purge:", purgeError.message);

  // ── 4a. Email au client ────────────────────────────────────────────────────
  const calendly = `${CALENDLY_URL}?${new URLSearchParams({ name: prenom, email }).toString()}`;
  const p = (t: string) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#1C2B4A">${esc(t)}</p>`;
  const h = (t: string) =>
    `<h2 style="margin:24px 0 8px;font-family:Georgia,serif;font-weight:400;font-size:22px;color:#2B4BA0">${esc(t)}</h2>`;

  const clientHtml = `<!doctype html><html lang="fr"><body style="margin:0;background:#F7F3EA">
<div style="max-width:560px;margin:0 auto;padding:32px 24px;font-family:Arial,Helvetica,sans-serif;color:#1C2B4A">
<p style="margin:0 0 4px;font-size:13px;color:#2B4BA0">Votre décryptage</p>
<h1 style="margin:0 0 20px;font-family:Georgia,serif;font-weight:400;font-size:28px;line-height:1.15">${esc(d.titre)}</h1>
${p(d.blocA)}
${h("Votre parcours")}${p(d.blocB)}
${h("Une piste pour la suite")}${p(d.blocC)}
<div style="background:#2B4BA0;color:#FFFFFF;border-radius:16px;padding:24px 20px;margin:28px 0">
<h2 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:400;font-size:26px;color:#FFFFFF">${esc(BLOC_D.titre)}</h2>
<p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#FFFFFF">${esc(BLOC_D.texte)}</p>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#FFFFFF"><strong>Mon engagement :</strong> ${esc(BLOC_D.engagement)}</p>
<a href="${esc(calendly)}" style="display:block;text-align:center;background:#FFFFFF;color:#1C2B4A;font-weight:bold;font-size:16px;text-decoration:none;padding:15px 18px;border-radius:999px">Choisir un créneau d'appel (15 min, gratuit)</a>
<p style="margin:16px 0 0;font-size:15px;line-height:1.6;color:#FFFFFF;text-align:center">${esc(SMS_TEXTE)} <a href="${esc(buildSmsHref(prenom))}" style="color:#FFFFFF;font-weight:bold">SMS au ${SMS_NUMERO_AFFICHE}</a></p>
</div>
<p style="margin:0 0 4px;font-size:15px">Alain Zenatti</p>
<p style="margin:0 0 24px;font-size:13px;line-height:1.5;color:#3A4660">Hypnothérapeute · 16 rue Saint-Antoine, 75004 Paris · 06 49 35 80 89<br><a href="https://novahypnose.fr" style="color:#2B4BA0">novahypnose.fr</a></p>
<p style="margin:0;font-size:12px;line-height:1.5;color:#3A4660">${esc(BANDEAU_PRUDENCE)}</p>
</div></body></html>`;

  const clientText = [
    d.titre,
    "",
    d.blocA,
    "",
    "Votre parcours",
    d.blocB,
    "",
    "Une piste pour la suite",
    d.blocC,
    "",
    BLOC_D.titre,
    BLOC_D.texte,
    `Mon engagement : ${BLOC_D.engagement}`,
    "",
    `Choisir un créneau d'appel (15 min, gratuit) : ${calendly}`,
    `${SMS_TEXTE} SMS au ${SMS_NUMERO_AFFICHE}`,
    "",
    "Alain Zenatti, hypnothérapeute, 16 rue Saint-Antoine, 75004 Paris, 06 49 35 80 89",
    "",
    BANDEAU_PRUDENCE,
  ].join("\n");

  let clientOk = true;
  try {
    await sendBrevo({
      sender: SENDER,
      to: [{ email, name: prenom }],
      replyTo: { email: "contact@novahypnose.fr", name: "Alain Zenatti" },
      subject: `Votre décryptage, ${prenom}`,
      htmlContent: clientHtml,
      textContent: clientText,
      tags: ["decryptage"],
    });
  } catch (e) {
    clientOk = false;
    console.error("decryptage-submit — email client:", (e as Error).message);
  }

  // ── 4b. Notification à Alain (non bloquante) ───────────────────────────────
  const lignes = QUESTIONS.map((q) => {
    let rep = labelFor(q.id, (answers as Record<string, string>)[q.id]);
    if (q.id === "q1" && answers.q1 === "autre" && autreTexte) rep += ` : « ${autreTexte} »`;
    return `<li style="margin-bottom:8px"><strong>${esc(q.title)}</strong><br>${esc(rep)}</li>`;
  }).join("");

  const adminHtml = `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1C2B4A;max-width:600px">
<h1 style="font-size:20px;margin:0 0 12px">Nouveau décryptage : ${esc(prenom)}</h1>
<p style="margin:0 0 4px"><strong>Repère :</strong> ${esc(REPERE_LABEL[repere])}</p>
<p style="margin:0 0 4px"><strong>Email :</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></p>
<p style="margin:0 0 16px"><strong>Copie envoyée au client :</strong> ${clientOk ? "oui" : "NON (erreur Brevo)"}</p>
${signaux.length ? `<p style="margin:0 0 4px"><strong>À noter :</strong></p><ul style="margin:0 0 16px">${signaux.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
${message ? `<p style="margin:0 0 4px"><strong>Son message :</strong></p><blockquote style="margin:0 0 16px;padding-left:12px;border-left:3px solid #F2A12E">${esc(message)}</blockquote>` : ""}
<ol style="padding-left:20px;margin:0">${lignes}</ol>
</div>`;

  try {
    await sendBrevo({
      sender: { name: "NovaHypnose", email: "contact@novahypnose.fr" },
      to: [{ email: ADMIN_EMAIL }],
      replyTo: { email, name: prenom },
      subject: `Décryptage : ${prenom} · ${labelFor("q1", answers.q1)} · ${REPERE_LABEL[repere]}`,
      htmlContent: adminHtml,
      tags: ["decryptage-admin"],
    });
  } catch (e) {
    console.error("decryptage-submit — email admin:", (e as Error).message);
  }

  if (!clientOk) return fail(502, "L'email n'a pas pu être envoyé.");
  return new Response(JSON.stringify({ success: true }), { status: 200, headers });
});
