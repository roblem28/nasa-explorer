export async function handler() {
  try {
    const apiKey = process.env.NASA_API_KEY;

    if (!apiKey) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "NASA_API_KEY missing" }),
      };
    }

    const url = `https://api.nasa.gov/EPIC/api/natural?api_key=${apiKey}`;
    const res = await fetch(url);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "NASA request failed" }),
      };
    }

    const data = await res.json();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data.slice(0, 3)),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message }),
    };
  }
}
