import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const REGIONS_VALIDES = ["IDF", "Autre"];
const JOURS_VALIDES = ["Samedi", "Dimanche"];
const THEMES_VALIDES = ["Stress", "Sommeil", "Confiance", "Autre"];

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const responseHeaders = { ...corsHeaders, "Content-Type": "application/json" };

  try {
    // ── 1. VALIDATION ─────────────────────────────────────────────────────────
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Body JSON invalide" }),
        { status: 400, headers: responseHeaders }
      );
    }

    const email = sanitizeString(String(body.email ?? ""), 254).trim().toLowerCase();
    const region = sanitizeString(String(body.region ?? ""), 50).trim();
    const jour_prefere = sanitizeString(String(body.jour_prefere ?? ""), 50).trim();
    const theme_prioritaire = sanitizeString(String(body.theme_prioritaire ?? ""), 50).trim();
    const commentaire_libre = sanitizeString(String(body.commentaire_libre ?? ""), 2000).trim();

    console.log("formation-questionnaire — body reçu:", JSON.stringify({ email, region, jour_prefere, theme_prioritaire, commentaire_libre }));

    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Email invalide ou manquant" }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!REGIONS_VALIDES.includes(region)) {
      return new Response(
        JSON.stringify({ error: `Région invalide. Valeurs acceptées : ${REGIONS_VALIDES.join(", ")}` }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!JOURS_VALIDES.includes(jour_prefere)) {
      return new Response(
        JSON.stringify({ error: `Jour invalide. Valeurs acceptées : ${JOURS_VALIDES.join(", ")}` }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!THEMES_VALIDES.includes(theme_prioritaire)) {
      return new Response(
        JSON.stringify({ error: `Thème invalide. Valeurs acceptées : ${THEMES_VALIDES.join(", ")}` }),
        { status: 400, headers: responseHeaders }
      );
    }

    console.log("formation-questionnaire — réponse reçue:", { email, region, jour_prefere, theme_prioritaire });

    // ── 2. MISE À JOUR EN BASE ────────────────────────────────────────────────
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { data: updated, error: dbError } = await supabase
      .from("formation_attente")
      .update({
        region,
        jour_prefere,
        theme_prioritaire,
        commentaire_libre: commentaire_libre || null,
        questionnaire_complete: true,
      })
      .eq("email", email)
      .select("prenom, email, created_at")
      .single();

    if (dbError) {
      console.error("formation-questionnaire — Erreur DB:", dbError);
      throw new Error(`Erreur base de données : ${dbError.message}`);
    }

    const prenom = updated?.prenom || "là";
    const prenomAffiche = prenom.charAt(0).toUpperCase() + prenom.slice(1);
    const createdAt = updated?.created_at
      ? new Date(updated.created_at).toLocaleDateString("fr-FR", {
          day: "2-digit", month: "2-digit", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        })
      : new Date().toLocaleDateString("fr-FR");

    console.log("formation-questionnaire — base mise à jour pour:", email);

    if (!BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY non configurée");
    }

    // ── 3. EMAIL DE CONFIRMATION À LA PERSONNE ────────────────────────────────
    const confirmationRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Alain — NovaHypnose", email: "contact@novahypnose.fr" },
        to: [{ email }],
        subject: `${prenomAffiche}, c'est bien noté ✓`,
        textContent: `Bonjour ${prenomAffiche},

Merci pour vos réponses — je les ai bien reçues.

Je reviendrai vers vous en priorité dès que la prochaine session sera programmée.

Belle journée,
Alain Zenatti
NovaHypnose — 06 49 35 80 89`,
      }),
    });

    if (!confirmationRes.ok) {
      const errText = await confirmationRes.text();
      console.error("formation-questionnaire — Erreur email confirmation:", errText);
      throw new Error(`Erreur envoi email confirmation : ${errText}`);
    }

    console.log("formation-questionnaire — email confirmation envoyé à:", email);

    // ── 4. EMAIL DE NOTIFICATION À ALAIN ─────────────────────────────────────
    const notifRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "NovaHypnose", email: "contact@novahypnose.fr" },
        to: [{ email: "a.zenatti@gmail.com" }],
        subject: "🔔 Nouveau répondant — Formation liste d'attente",
        textContent: `Nouveau répondant au questionnaire formation :

Prénom : ${prenomAffiche}
Email : ${email}
Région : ${region}
Jour préféré : ${jour_prefere}
Thème : ${theme_prioritaire}
Commentaire : ${commentaire_libre || "(aucun)"}
Date inscription : ${createdAt}`,
      }),
    });

    if (!notifRes.ok) {
      // Non bloquant — on logue mais on ne fait pas échouer la requête
      const errText = await notifRes.text();
      console.error("formation-questionnaire — Erreur email notification admin:", errText);
    } else {
      console.log("formation-questionnaire — notification admin envoyée");
    }

    // ── 5. RÉPONSE 200 ────────────────────────────────────────────────────────
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    console.error("formation-questionnaire — Erreur inattendue:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne, veuillez réessayer" }),
      { status: 500, headers: responseHeaders }
    );
  }
});
