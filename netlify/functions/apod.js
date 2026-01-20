exports.handler = async (event) => {
  const apiKey = process.env.NASA_API_KEY;
  const date = event.queryStringParameters?.date;

  const url =
    "https://api.nasa.gov/planetary/apod" +
    "?api_key=" + apiKey +
    (date ? "&date=" + date : "");

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "APOD fetch failed" })
    };
  }
};
