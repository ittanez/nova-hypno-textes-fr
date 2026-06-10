import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const WINDOW_MINUTES = 10;

/**
 * Checks rate limit for an email+function pair.
 * Allows 1 request per WINDOW_MINUTES per email per function.
 * Returns true if the request is allowed, false if rate-limited.
 */
export async function checkRateLimit(
  email: string,
  functionName: string
): Promise<boolean> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !serviceRoleKey) return true; // fail open if misconfigured

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  // Cleanup old entries and check in one query
  const { count } = await supabase
    .from("email_rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("email", email)
    .eq("function_name", functionName)
    .gte("created_at", windowStart);

  if ((count ?? 0) > 0) return false; // rate-limited

  // Record this request
  await supabase
    .from("email_rate_limits")
    .insert({ email, function_name: functionName });

  // Async cleanup of old entries (fire and forget)
  supabase
    .from("email_rate_limits")
    .delete()
    .lt("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .then(() => {});

  return true;
}
