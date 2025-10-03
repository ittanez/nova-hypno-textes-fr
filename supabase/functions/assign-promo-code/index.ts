
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL") as string;
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") as string;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userEmail } = await req.json();
    
    console.log(`Checking for existing promo code for user: ${userEmail}`);

    // First check if user has already been assigned a promo code
    const { data: existingPromo, error: existingError } = await supabase
      .from("promo_codes")
      .select("*")
      .eq("user_email", userEmail)
      .eq("is_assigned", true)
      .maybeSingle();

    if (existingError) {
      console.error("Error checking existing promo code:", existingError);
    }

    // If user already has a promo code, return it
    if (existingPromo) {
      console.log(`User ${userEmail} already has promo code ${existingPromo.code}`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          promoCode: existingPromo.code,
          message: "Existing promo code retrieved" 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Get an unassigned promo code
    const { data: promoCode, error: promoError } = await supabase
      .from("promo_codes")
      .select("*")
      .eq("is_assigned", false)
      .limit(1)
      .single();

    if (promoError) {
      console.error("Error fetching promo code:", promoError);
      return new Response(
        JSON.stringify({ error: "No available promo codes found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Mark the promo code as assigned with the current timestamp
    const now = new Date().toISOString();
    const { error: updateError } = await supabase
      .from("promo_codes")
      .update({ 
        is_assigned: true, 
        assigned_at: now,
        user_email: userEmail 
      })
      .eq("id", promoCode.id);

    if (updateError) {
      console.error("Error updating promo code:", updateError);
      return new Response(
        JSON.stringify({ error: updateError.message }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log(`Successfully assigned promo code ${promoCode.code} to ${userEmail} at ${now}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        promoCode: promoCode.code 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in assign-promo-code function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
