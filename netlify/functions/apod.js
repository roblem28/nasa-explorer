const NASA_APOD_URL = "https://api.nasa.gov/planetary/apod";

exports.handler = async (event) => {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "NASA API key not configured." })
    };
  }

  const date = event.queryStringParameters?.date;
  const url = new URL(NASA_APOD_URL);
  url.searchParams.set("api_key", apiKey);

  if (date) {
    url.searchParams.set("date", date);
  }

  try {
    const response = await fetch(url.toString());
    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load APOD data." })
    };
  }
};
