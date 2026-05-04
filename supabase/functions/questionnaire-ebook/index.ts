import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const EBOOKS_VALIDES = ["autohypnose", "sommeil", "procrastination"];
const EBOOKS_LABELS: Record<string, string> = {
  autohypnose: "Auto-hypnose",
  sommeil: "Sommeil",
  procrastination: "Procrastination",
};

// Génère un code promo court et unique : EBOOK-XXXXXX
function generatePromoCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "EBOOK-";
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return code;
}

// Date de validité : 6 mois à partir d'aujourd'hui
function getValidityDate(): { iso: string; fr: string } {
  const d = new Date();
  d.setMonth(d.getMonth() + 6);
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

    const ebook_telecharge = sanitizeString(String(body.ebook_telecharge ?? ""), 50).trim().toLowerCase();
    const utilisation_ebook = sanitizeString(String(body.utilisation_ebook ?? ""), 200).trim();
    const progression = sanitizeString(String(body.progression ?? ""), 200).trim();
    const deja_consulte_hypnotherapeute = sanitizeString(String(body.deja_consulte_hypnotherapeute ?? ""), 50).trim();
    const freins_consultation = sanitizeString(String(body.freins_consultation ?? ""), 500).trim();
    const besoin_si_consultation = sanitizeString(String(body.besoin_si_consultation ?? ""), 500).trim();
    const prochain_ebook_souhaite = sanitizeString(String(body.prochain_ebook_souhaite ?? ""), 500).trim();
    const zone_geographique = sanitizeString(String(body.zone_geographique ?? ""), 50).trim();
    const genre = sanitizeString(String(body.genre ?? ""), 50).trim();
    const tranche_age = sanitizeString(String(body.tranche_age ?? ""), 50).trim();
    const emailRaw = sanitizeString(String(body.email ?? ""), 254).trim().toLowerCase();
    const email = emailRaw || null;

    if (!EBOOKS_VALIDES.includes(ebook_telecharge)) {
      return new Response(
        JSON.stringify({ error: `Ebook invalide. Valeurs acceptées : ${EBOOKS_VALIDES.join(", ")}` }),
        { status: 400, headers: responseHeaders }
      );
    }

    if (email && !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Email invalide" }),
        { status: 400, headers: responseHeaders }
      );
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const code_promo = generatePromoCode();
    const validity = getValidityDate();

    const { error: dbError } = await supabase
      .from("questionnaire_ebook")
      .insert({
        ebook_telecharge,
        utilisation_ebook: utilisation_ebook || null,
        progression: progression || null,
        deja_consulte_hypnotherapeute: deja_consulte_hypnotherapeute || null,
        freins_consultation: freins_consultation || null,
        besoin_si_consultation: besoin_si_consultation || null,
        prochain_ebook_souhaite: prochain_ebook_souhaite || null,
        zone_geographique: zone_geographique || null,
        genre: genre || null,
        tranche_age: tranche_age || null,
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

    // Envoi du bon de réduction par email si l'utilisateur a fourni son email
    if (email) {
      if (!BREVO_API_KEY) {
        console.error("questionnaire-ebook — BREVO_API_KEY non configurée");
      } else {
        const ebookLabel = EBOOKS_LABELS[ebook_telecharge] ?? ebook_telecharge;

        const htmlContent = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f6f7fb; margin:0; padding:24px;">
  <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.06);">
    <div style="background: linear-gradient(135deg,#1a3a5f,#3b6fa8); color:#fff; padding:28px 32px;">
      <h1 style="margin:0; font-family:'Playfair Display', Georgia, serif; font-size:26px;">Merci pour vos réponses</h1>
      <p style="margin:8px 0 0; opacity:.9;">Votre bon de 10€ vous attend ci-dessous.</p>
    </div>
    <div style="padding:28px 32px; color:#333;">
      <p>Bonjour,</p>
      <p>Merci d'avoir pris le temps de répondre au questionnaire concernant l'ebook <strong>${ebookLabel}</strong>. Vos retours sont précieux et m'aideront à concevoir des contenus encore plus utiles.</p>
      <p>Comme promis, voici votre <strong>bon de 10€</strong> à utiliser sur votre première séance d'hypnothérapie (en cabinet à Paris ou en visio).</p>

      <div style="margin:24px 0; padding:20px; border:2px dashed #f57c00; border-radius:12px; text-align:center; background:#fff8ee;">
        <div style="font-size:14px; color:#666; text-transform:uppercase; letter-spacing:1px;">Votre code</div>
        <div style="font-size:28px; font-weight:bold; color:#1a3a5f; margin:8px 0; font-family:'Courier New',monospace;">${code_promo}</div>
        <div style="font-size:14px; color:#666;">Valable jusqu'au <strong>${validity.fr}</strong></div>
      </div>

      <p><strong>Comment l'utiliser ?</strong><br>
      Mentionnez ce code lors de la prise de rendez-vous, par téléphone, email ou sur le site novahypnose.fr. La réduction sera appliquée sur votre première séance.</p>

      <p style="margin-top:28px;">À très bientôt peut-être,<br>
      <strong>Alain Zenatti</strong><br>
      <span style="color:#666;">NovaHypnose — 06 49 35 80 89</span></p>
    </div>
    <div style="background:#f6f7fb; padding:16px 32px; font-size:12px; color:#888; text-align:center;">
      Bon non cumulable, valable une fois, sur la première séance uniquement.
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
            subject: `Votre bon de 10€ — code ${code_promo}`,
            htmlContent,
          }),
        });

        if (!emailRes.ok) {
          const errText = await emailRes.text();
          console.error("questionnaire-ebook — Erreur envoi email:", errText);
        }
      }

      // Notification admin
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
            subject: `🔔 Nouveau questionnaire ebook — ${EBOOKS_LABELS[ebook_telecharge]}`,
            textContent: `Nouveau répondant au questionnaire ebook :

Ebook : ${EBOOKS_LABELS[ebook_telecharge]}
Email : ${email ?? "(non fourni)"}
Zone : ${zone_geographique || "(non précisé)"}
Genre : ${genre || "(non précisé)"}
Âge : ${tranche_age || "(non précisé)"}

Utilisation : ${utilisation_ebook || "(non précisé)"}
Progression : ${progression || "(non précisé)"}
Déjà consulté un hypnothérapeute : ${deja_consulte_hypnotherapeute || "(non précisé)"}
Freins : ${freins_consultation || "(aucun)"}
Besoin éventuel : ${besoin_si_consultation || "(aucun)"}
Prochain ebook souhaité : ${prochain_ebook_souhaite || "(aucun)"}

Code promo généré : ${code_promo} (valable jusqu'au ${validity.fr})`,
          }),
        }).catch((err) => console.error("questionnaire-ebook — Erreur notif admin:", err));
      }
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
