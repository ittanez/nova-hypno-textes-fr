import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

export default async function handler(_req: Request, _ctx: Context): Promise<Response> {
  const upstreamUrl = `${SUPABASE_URL}/functions/v1/generate-sitemap`;

  const response = await fetch(upstreamUrl, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  const xml = await response.text();

  return new Response(xml, {
    status: response.status,
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

