import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Lien direct vers la prise de RDV Resalib
const RESERVATION_URL = "https://www.resalib.fr/p/47325";

// Code universel à mentionner en commentaire de la réservation Resalib
const PROMO_CODE = "ebook10";

// Mapping des libellés affichés dans le questionnaire vers des clés normalisées
const EBOOK_LABEL_TO_KEY: Record<string, string> = {
  "L'auto-hypnose": "autohypnose",
  "Le sommeil": "sommeil",
  "La procrastination": "procrastination",
};

// Validité : J+180 (6 mois)
function getValidityDate(): { iso: string; fr: string } {
  const d = new Date();
  d.setDate(d.getDate() + 180);
  const iso = d.toISOString().slice(0, 10);
  const fr = d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return { iso, fr };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  const responseHeaders = { ...corsHeaders, "Content-Type": "application/json" };

  try {
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Body JSON invalide" }),
        { status: 400, headers: responseHeaders }
      );
    }

    // ── Champs (entonnoir inversé : ebook → besoins → utilité → frein → admin → ouverture) ──
    const ebooks_raw = sanitizeString(String(body.ebooks_telecharges ?? ""), 200).trim();
    const sujet_principal = sanitizeString(String(body.sujet_principal ?? ""), 500).trim();
    const pepite_ebook = sanitizeString(String(body.pepite_ebook ?? ""), 500).trim();
    const pratique_ressenti = sanitizeString(String(body.pratique_ressenti ?? ""), 1000).trim();
    const interrogation_principale = sanitizeString(String(body.interrogation_principale ?? ""), 500).trim();
    const deja_seance = sanitizeString(String(body.deja_seance ?? ""), 10).trim().toLowerCase();
    const localisation = sanitizeString(String(body.localisation ?? ""), 50).trim();
    const message_libre = sanitizeString(String(body.message_libre ?? ""), 2000).trim();
    const emailRaw = sanitizeString(String(body.email ?? ""), 254).trim().toLowerCase();
    const email = emailRaw || null;

    // Normalisation des ebooks téléchargés ("L'auto-hypnose|Le sommeil" → "autohypnose|sommeil")
    const ebooks_keys = ebooks_raw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean)
      .map((label) => EBOOK_LABEL_TO_KEY[label] ?? label.toLowerCase());
    const ebook_telecharge = ebooks_keys.join("|");

    if (email && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Email invalide" }),
        { status: 400, headers: responseHeaders }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const code_promo = PROMO_CODE;
    const validity = getValidityDate();

    // Libellé naturel des ebooks pour l'affichage dans les emails
    const ebooksLabels = ebooks_raw
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    const ebookLabel =
      ebooksLabels.length === 0
        ? "votre ebook"
        : ebooksLabels.length === 1
        ? ebooksLabels[0]
        : ebooksLabels.slice(0, -1).join(", ") + " et " + ebooksLabels[ebooksLabels.length - 1];

    const { error: dbError } = await supabase
      .from("questionnaire_ebook")
      .insert({
        ebook_telecharge: ebook_telecharge || null,
        sujet_principal: sujet_principal || null,
        pepite_ebook: pepite_ebook || null,
        pratique_ressenti: pratique_ressenti || null,
        interrogation_principale: interrogation_principale || null,
        deja_seance: deja_seance || null,
        prochain_guide: message_libre || null,
        localisation: localisation || null,
        email,
        questionnaire_complete: true,
        code_promo,
        bon_montant_eur: 10,
        bon_valide_jusqu_au: validity.iso,
      });

    if (dbError) {
      console.error("questionnaire-ebook — Erreur DB:", dbError);
      throw new Error(`Erreur base de données : ${dbError.message}`);
    }

    // ── Email "Cadeau de bienvenue" au répondant ──
    if (email && BREVO_API_KEY) {
      const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f6f7fb; margin:0; padding:24px; color:#333;">
  <div style="max-width:580px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">

    <div style="background: linear-gradient(135deg,#1a3a5f,#3b6fa8); color:#fff; padding:32px;">
      <div style="font-size:38px; line-height:1; margin-bottom:8px;">🎁</div>
      <h1 style="margin:0; font-family:'Playfair Display', Georgia, serif; font-size:26px; line-height:1.3;">
        Votre cadeau de bienvenue
      </h1>
      <p style="margin:8px 0 0; opacity:.92;">…et un grand merci pour votre aide.</p>
    </div>

    <div style="padding:32px;">
      <p style="margin:0 0 16px;">Bonjour,</p>

      <p style="margin:0 0 16px; line-height:1.6;">
        Comme promis, voici votre <strong>crédit de 10€</strong> à valoir sur votre première séance d'hypnose,
        en cabinet à Paris ou en visio.
      </p>

      <p style="margin:0 0 24px; line-height:1.6;">
        <em>Vous avez fait le premier pas en lisant mon guide « ${ebookLabel} ».
        Le second est souvent le plus transformateur.</em>
      </p>

      <div style="margin:24px 0; padding:24px; border:2px dashed #f57c00; border-radius:14px; text-align:center; background:#fff8ee;">
        <div style="font-size:13px; color:#666; text-transform:uppercase; letter-spacing:1.5px;">
          Votre crédit
        </div>
        <div style="font-size:30px; font-weight:bold; color:#1a3a5f; margin:10px 0; font-family:'Courier New',monospace; letter-spacing:1px;">
          ${code_promo}
        </div>
        <div style="font-size:14px; color:#666;">
          Valable jusqu'au <strong>${validity.fr}</strong>
        </div>
      </div>

      <div style="text-align:center; margin:32px 0;">
        <a href="${RESERVATION_URL}"
           style="display:inline-block; background:#f57c00; color:#fff; text-decoration:none; padding:16px 32px; border-radius:999px; font-weight:600; font-size:16px; box-shadow:0 4px 14px rgba(245,124,0,0.35);">
          Réserver ma séance avec mon crédit
        </a>
      </div>

      <p style="margin:24px 0 0; line-height:1.6; font-size:14px; color:#555;">
        Au moment de réserver sur Resalib, indiquez simplement le code
        <strong style="color:#1a3a5f;">${code_promo}</strong> dans le champ
        « commentaire » : je déduirai les 10€ de votre première séance.
      </p>

      <p style="margin:32px 0 0; line-height:1.6;">
        Au plaisir de vous accompagner,<br>
        <strong>Alain Zenatti</strong><br>
        <span style="color:#666;">NovaHypnose — 06 49 35 80 89</span>
      </p>
    </div>

    <div style="background:#f6f7fb; padding:16px 32px; font-size:12px; color:#888; text-align:center;">
      Crédit non cumulable, valable une fois, sur la première consultation uniquement.
    </div>
  </div>
</body>
</html>`;

      const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "Alain — NovaHypnose", email: "contact@novahypnose.fr" },
          to: [{ email }],
          subject: "🎁 Votre cadeau de bienvenue (et un grand merci)",
          htmlContent,
        }),
      });

      if (!emailRes.ok) {
        const errText = await emailRes.text();
        console.error("questionnaire-ebook — Erreur envoi email:", errText);
      }
    }

    // ── Notification admin ──
    if (BREVO_API_KEY) {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { name: "NovaHypnose", email: "contact@novahypnose.fr" },
          to: [{ email: "a.zenatti@gmail.com" }],
          subject: `🔔 Nouveau questionnaire — ${ebookLabel}`,
          textContent: `Nouveau répondant au questionnaire ebook :

Ebook : ${ebookLabel}
Email : ${email ?? "(non fourni)"}
Localisation : ${localisation || "(non précisé)"}

— Q1. Sujet qui occupe le plus :
${sujet_principal || "(non précisé)"}

— Q2. Pépite de l'ebook :
${pepite_ebook || "(non précisé)"}

— Q3. Mise en pratique / ressenti :
${pratique_ressenti || "(non précisé)"}

— Q4. Principale interrogation à consulter :
${interrogation_principale || "(non précisé)"}

— Q5. Déjà vécu une séance d'hypnose : ${deja_seance || "(non précisé)"}

— Q6. Mot libre / suggestion prochain guide :
${message_libre || "(aucun)"}

Crédit de bienvenue : ${code_promo} (valable jusqu'au ${validity.fr})`,
        }),
      }).catch((err) => console.error("questionnaire-ebook — Erreur notif admin:", err));
    }

    return new Response(
      JSON.stringify({
        success: true,
        code_promo: email ? code_promo : null,
        bon_valide_jusqu_au: validity.fr,
      }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    console.error("questionnaire-ebook — Erreur inattendue:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne, veuillez réessayer" }),
      { status: 500, headers: responseHeaders }
    );
  }
});
