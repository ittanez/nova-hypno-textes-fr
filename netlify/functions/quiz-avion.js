export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const response = await fetch(
    "https://akrlyzmfszumibwgocae.supabase.co/functions/v1/send-quiz-avion-results",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      body: event.body,
    }
  );

  const text = await response.text();
  return {
    statusCode: response.status,
    headers: { "Content-Type": "application/json" },
    body: text,
  };
}
