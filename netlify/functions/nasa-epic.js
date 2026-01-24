export async function handler() {
  try {
    // 1. Read API key from Netlify environment variables
    const apiKey = process.env.NASA_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "NASA_API_KEY is not set in environment variables",
        }),
      };
    }

    // 2. EPIC API endpoint (stable endpoint)
    const url = `https://api.nasa.gov/EPIC/api/natural/images?api_key=${apiKey}`;

    // 3. Call NASA API
    const response = await fetch(url);

    // 4. Handle NASA errors explicitly
    if (!response.ok) {
      const message = await response.text();

      return {
        statusCode: response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: "NASA EPIC request failed",
          status: response.status,
          message,
        }),
      };
    }

    // 5. Parse data
    const data = await response.json();

    // 6. Return a small, safe subset
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.slice(0, 3)),
    };
  } catch (error) {
    // 7. Catch unexpected runtime errors
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        error: "Unexpected server error",
        message: error.message,
      }),
    };
  }
}
