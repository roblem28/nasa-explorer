exports.handler = async (event) => {
  try {
    const apiKey = process.env.NASA_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: { message: "NASA_API_KEY is not set in Netlify environment variables." } })
      };
    }

    const qs = event.queryStringParameters || {};
    const date = qs.date || "";

    const url =
      "https://api.nasa.gov/planetary/apod" +
      "?api_key=" + encodeURIComponent(apiKey) +
      (date ? "&date=" + encodeURIComponent(date) : "");

    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: res.status,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: { message: "Function failed", details: String(err) } })
    };
  }
};
