import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");

export default async function handler(_req: Request, _ctx: Context): Promise<Response> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return new Response("Configuration Error: SUPABASE_URL or SUPABASE_ANON_KEY is missing", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }

  const upstreamUrl = `${SUPABASE_URL}/functions/v1/generate-sitemap`;

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    const xml = await response.text();
    const isSuccess = response.status === 200;

    return new Response(xml, {
      status: response.status,
      headers: {
        "Content-Type": isSuccess ? "application/xml" : "text/plain",
        "Cache-Control": isSuccess ? "public, max-age=3600" : "no-cache, no-store, must-revalidate",
      },
    });
  } catch (error) {
    return new Response(`Error fetching sitemap: ${error instanceof Error ? error.message : error}`, {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    });
  }
}
