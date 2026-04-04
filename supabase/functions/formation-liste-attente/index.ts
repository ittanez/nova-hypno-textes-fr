import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// ID de la liste Brevo "Attente Formation Présentielle"
const BREVO_LIST_ID_FORMATION_ATTENTE = 17;

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

    const prenom = sanitizeString(String(body.prenom ?? ""), 100).trim();
    const email = sanitizeString(String(body.email ?? ""), 254).trim().toLowerCase();

    if (!prenom) {
      return new Response(
        JSON.stringify({ error: "Le prénom est obligatoire" }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!email) {
      return new Response(
        JSON.stringify({ error: "L'email est obligatoire" }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Format d'email invalide" }),
        { status: 400, headers: responseHeaders }
      );
    }

    console.log("formation-liste-attente — inscription:", { prenom, email });

    // ── 2. INSERTION EN BASE (dédupliquée sur email) ──────────────────────────
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const { error: dbError } = await supabase
      .from("formation_attente")
      .upsert(
        { prenom, email },
        { onConflict: "email", ignoreDuplicates: true }
      );

    if (dbError) {
      console.error("formation-liste-attente — Erreur DB:", dbError);
      throw new Error(`Erreur base de données : ${dbError.message}`);
    }

    console.log("formation-liste-attente — inscrit en base (ou déjà existant):", email);

    // ── 3. AJOUT DANS BREVO ───────────────────────────────────────────────────
    if (!BREVO_API_KEY) {
      throw new Error("BREVO_API_KEY non configurée");
    }

    const brevoBody: Record<string, unknown> = {
      email,
      attributes: { PRENOM: prenom },
      updateEnabled: true,
    };

    brevoBody.listIds = [BREVO_LIST_ID_FORMATION_ATTENTE];

    const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify(brevoBody),
    });

    const brevoText = await brevoRes.text();
    const brevoData = brevoText ? JSON.parse(brevoText) : {};

    if (!brevoRes.ok && brevoRes.status !== 204) {
      // 400 avec "Contact already exist" est toléré (updateEnabled devrait couvrir ça)
      const isDuplicate =
        brevoRes.status === 400 &&
        typeof brevoData?.message === "string" &&
        brevoData.message.toLowerCase().includes("contact already exist");

      if (!isDuplicate) {
        console.error("formation-liste-attente — Erreur Brevo:", brevoData);
        throw new Error(`Erreur Brevo : ${brevoData?.message ?? brevoRes.status}`);
      }
    }

    console.log("formation-liste-attente — contact Brevo OK:", email);

    // ── 4. EMAIL DE CONFIRMATION ──────────────────────────────────────────────
    const prenomAffiche = prenom.charAt(0).toUpperCase() + prenom.slice(1);

    const confirmRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { name: "Alain — NovaHypnose", email: "contact@novahypnose.fr" },
        to: [{ email }],
        subject: `${prenomAffiche}, vous êtes sur la liste d'attente ✓`,
        textContent: `Bonjour ${prenomAffiche},

Je confirme votre inscription sur la liste d'attente pour la prochaine formation en auto-hypnose.

Vous serez parmi les premiers informés dès que la date sera annoncée — les places sont limitées à 6 participants.

À très bientôt,
Alain Zenatti
NovaHypnose — 06 49 35 80 89
https://novahypnose.fr/autohypnose`,
      }),
    });

    if (!confirmRes.ok) {
      // Non bloquant — l'inscription est enregistrée, on logue sans faire échouer
      const errText = await confirmRes.text();
      console.error("formation-liste-attente — Erreur email confirmation:", errText);
    } else {
      console.log("formation-liste-attente — email confirmation envoyé à:", email);
    }

    // ── 5. RÉPONSE 200 ────────────────────────────────────────────────────────
    return new Response(
      JSON.stringify({ success: true, message: "Inscription enregistrée" }),
      { status: 200, headers: responseHeaders }
    );
  } catch (error) {
    // ── 5. ERREUR 500 ─────────────────────────────────────────────────────────
    console.error("formation-liste-attente — Erreur inattendue:", error);
    return new Response(
      JSON.stringify({ error: "Erreur interne, veuillez réessayer" }),
      { status: 500, headers: responseHeaders }
    );
  }
});
