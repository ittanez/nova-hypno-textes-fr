import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")
  ?? "https://akrlyzmfszumibwgocae.supabase.co";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")
  ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrcmx5em1mc3p1bWlid2dvY2FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI3NjUyNDcsImV4cCI6MjA1ODM0MTI0N30.UDVk1wzm36OJGK0usCHEtvmkC2QxABvG9KQ8p2lKz30";

export default async function handler(_req: Request, _ctx: Context): Promise<Response> {
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
