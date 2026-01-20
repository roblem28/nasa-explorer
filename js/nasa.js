// NASA Explorer — secured version
// Browser never sees the API key
// Netlify function handles NASA calls

function loadAPOD() {
  const output = document.getElementById("output");
  const dateInput = document.getElementById("apodDate");

  let date = dateInput.value;

  if (!date) {
    date = new Date().toISOString().split("T")[0];
  }

  const url = "/.netlify/functions/apod?date=" + encodeURIComponent(date);

  output.innerHTML = "<p>Loading...</p>";

  fetch(url)
    .then(res => res.json())
    .then(data => {

      if (data.error) {
        output.innerHTML =
          "<p style='color:red;'>" + data.error.message + "</p>";
        return;
      }

      if (data.media_type === "image") {
        output.innerHTML =
          "<h3>" + data.title + "</h3>" +
          "<img src='" + data.url + "' style='max-width:100%'>" +
          "<p>" + data.explanation + "</p>";
      }
      else if (data.media_type === "video") {
        output.innerHTML =
          "<h3>" + data.title + "</h3>" +
          "<p><a href='" + data.url +
          "' target='_blank'>View APOD video</a></p>" +
          "<p>" + data.explanation + "</p>";
      }
      else {
        output.innerHTML =
          "<p>Unsupported media type.</p>";
      }

    })
    .catch(err => {
      console.error(err);
      output.innerHTML =
        "<p style='color:red;'>Request failed.</p>";
    });
}
