const NASA_MARS_URL =
  "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos";

exports.handler = async (event) => {
  const apiKey = process.env.NASA_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "NASA API key not configured." })
    };
  }

  const camera = event.queryStringParameters?.camera || "FHAZ";
  const url = new URL(NASA_MARS_URL);
  url.searchParams.set("sol", "1000");
  url.searchParams.set("camera", camera);
  url.searchParams.set("api_key", apiKey);

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
      body: JSON.stringify({ error: "Failed to load Mars rover photos." })
    };
  }
};
