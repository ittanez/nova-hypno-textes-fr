// ============================================================================
// Edge function : send-questionnaire-reminder
// ----------------------------------------------------------------------------
// À déclencher quotidiennement (cron Supabase) pour relancer les personnes
// dont le crédit de 10€ expire dans 15 jours et n'a pas encore été utilisé.
//
// Sécurité : la requête doit fournir le header `x-cron-secret` correspondant
// à la variable d'environnement CRON_SECRET (configurée côté Supabase).
//
// Exemple d'invocation cron :
//   curl -X POST https://<project>.supabase.co/functions/v1/send-questionnaire-reminder \
//        -H "x-cron-secret: $CRON_SECRET"
// ============================================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const CRON_SECRET = Deno.env.get("CRON_SECRET");

const RESERVATION_URL = "https://www.resalib.fr/p/47325";

function frDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

serve(async (req) => {
  // Sécurité : header secret requis pour éviter les appels publics
  if (CRON_SECRET && req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    // Cible : crédits valides exactement dans 15 jours, non utilisés, non relancés
    const target = new Date();
    target.setDate(target.getDate() + 15);
    const targetIso = target.toISOString().slice(0, 10);

    const { data: rows, error } = await supabase
      .from("questionnaire_ebook")
      .select("id, email, code_promo, bon_valide_jusqu_au, ebook_telecharge")
      .eq("bon_valide_jusqu_au", targetIso)
      .is("rappel_envoye_le", null)
      .is("bon_utilise_le", null)
      .not("email", "is", null);

    if (error) {
      console.error("send-questionnaire-reminder — Erreur DB:", error);
      throw error;
    }

    if (!rows || rows.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "Aucun rappel à envoyer" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    let sent = 0;
    let failed = 0;

    for (const row of rows) {
      if (!row.email || !row.code_promo) continue;

      const dateFr = frDate(row.bon_valide_jusqu_au);

      const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; background:#f6f7fb; margin:0; padding:24px; color:#333;">
  <div style="max-width:580px; margin:0 auto; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.06);">
    <div style="background: linear-gradient(135deg,#1a3a5f,#3b6fa8); color:#fff; padding:32px;">
      <div style="font-size:32px; line-height:1; margin-bottom:8px;">⏳</div>
      <h1 style="margin:0; font-family:'Playfair Display', Georgia, serif; font-size:24px; line-height:1.3;">
        Votre crédit de 10€ expire bientôt
      </h1>
    </div>
    <div style="padding:32px;">
      <p style="margin:0 0 16px;">Bonjour,</p>
      <p style="margin:0 0 16px; line-height:1.6;">
        Un petit mot pour vous rappeler en toute bienveillance que votre
        <strong>crédit de bienvenue de 10€</strong> arrive à expiration dans
        <strong>15 jours</strong>.
      </p>
      <p style="margin:0 0 24px; line-height:1.6;">
        Si vous hésitiez encore à franchir le pas, c'est peut-être le moment
        idéal pour réserver votre première séance.
      </p>

      <div style="margin:24px 0; padding:24px; border:2px dashed #f57c00; border-radius:14px; text-align:center; background:#fff8ee;">
        <div style="font-size:13px; color:#666; text-transform:uppercase; letter-spacing:1.5px;">Votre crédit</div>
        <div style="font-size:30px; font-weight:bold; color:#1a3a5f; margin:10px 0; font-family:'Courier New',monospace;">
          ${row.code_promo}
        </div>
        <div style="font-size:14px; color:#666;">Valable jusqu'au <strong>${dateFr}</strong></div>
      </div>

      <div style="text-align:center; margin:32px 0;">
        <a href="${RESERVATION_URL}"
           style="display:inline-block; background:#f57c00; color:#fff; text-decoration:none; padding:16px 32px; border-radius:999px; font-weight:600; font-size:16px; box-shadow:0 4px 14px rgba(245,124,0,0.35);">
          Réserver ma séance avec mon crédit
        </a>
      </div>

      <p style="margin:24px 0 0; line-height:1.6; font-size:14px; color:#555;">
        Pensez à indiquer le code <strong style="color:#1a3a5f;">${row.code_promo}</strong>
        en commentaire lors de la réservation sur Resalib.
      </p>

      <p style="margin:24px 0 0; line-height:1.6;">
        Au plaisir,<br>
        <strong>Alain Zenatti</strong><br>
        <span style="color:#666;">NovaHypnose — 06 49 35 80 89</span>
      </p>
    </div>
  </div>
</body>
</html>`;

      const emailRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-key": BREVO_API_KEY! },
        body: JSON.stringify({
          sender: { name: "Alain — NovaHypnose", email: "contact@novahypnose.fr" },
          to: [{ email: row.email }],
          subject: "⏳ Votre crédit de 10€ expire dans 15 jours",
          htmlContent: html,
        }),
      });

      if (emailRes.ok) {
        await supabase
          .from("questionnaire_ebook")
          .update({ rappel_envoye_le: new Date().toISOString() })
          .eq("id", row.id);
        sent++;
      } else {
        failed++;
        console.error(
          "send-questionnaire-reminder — Échec envoi pour",
          row.email,
          await emailRes.text().catch(() => "")
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, sent, failed, total: rows.length }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("send-questionnaire-reminder — Erreur inattendue:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
