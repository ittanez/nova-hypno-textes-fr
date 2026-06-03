import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getCorsHeaders, isValidEmail, sanitizeString } from "../_shared/cors.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "a.zenatti@gmail.com";

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

    const nom     = sanitizeString(String(body.nom     ?? ""), 100).trim();
    const email   = sanitizeString(String(body.email   ?? ""), 254).trim().toLowerCase();
    const tel     = sanitizeString(String(body.tel     ?? ""), 20).trim();
    const message = sanitizeString(String(body.message ?? ""), 2000).trim();

    if (!nom) {
      return new Response(
        JSON.stringify({ error: "Le nom est obligatoire" }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!email || !isValidEmail(email)) {
      return new Response(
        JSON.stringify({ error: "Email invalide" }),
        { status: 400, headers: responseHeaders }
      );
    }
    if (!message) {
      return new Response(
        JSON.stringify({ error: "Le message est obligatoire" }),
        { status: 400, headers: responseHeaders }
      );
    }

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY non configurée");
    }

    const date = new Date().toLocaleDateString("fr-FR", {
      day: "numeric", month: "long", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "NovaHypnose <contact@updates.novahypnose.fr>",
        to: [ADMIN_EMAIL],
        reply_to: email,
        subject: `Message de ${nom} — novahypnose.fr`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <h2 style="color:#2B4BA0;">Nouveau message — novahypnose.fr</h2>
            <div style="background:#f4f1ea;padding:16px;border-left:4px solid #F2A12E;border-radius:0 8px 8px 0;margin:20px 0;">
              <p style="margin:0 0 6px"><strong>Nom :</strong> ${nom}</p>
              <p style="margin:0 0 6px"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></p>
              ${tel ? `<p style="margin:0 0 6px"><strong>Téléphone :</strong> ${tel}</p>` : ""}
              <p style="margin:12px 0 0;color:#555;font-size:13px">${date}</p>
            </div>
            <h3 style="color:#1C2B4A;">Message :</h3>
            <div style="background:#fff;padding:16px;border-radius:8px;border:1px solid #e5e0d5;white-space:pre-wrap;line-height:1.7;">
              ${message.replace(/\n/g, "<br>")}
            </div>
            <p style="margin-top:24px;font-size:13px;color:#888;">
              Répondre directement à cet email répondra à ${email}.
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      console.error("send-contact-preview — Resend error:", data);
      throw new Error(`Resend ${res.status}`);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: responseHeaders }
    );
  } catch (err) {
    console.error("send-contact-preview — erreur:", err);
    return new Response(
      JSON.stringify({ error: "Erreur interne, veuillez réessayer" }),
      { status: 500, headers: responseHeaders }
    );
  }
});
