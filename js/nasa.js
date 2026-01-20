function loadAPOD() {
  const date = document.getElementById("apodDate").value;
  const output = document.getElementById("output");

  let url = "/.netlify/functions/apod";
  if (date) {
    url += "?date=" + date;
  }

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        output.innerHTML = "<p style='color:red'>" + data.error + "</p>";
        return;
      }

      output.innerHTML =
        "<h3>" + data.title + "</h3>" +
        (data.media_type === "image"
          ? "<img src='" + data.url + "'>"
          : "<a href='" + data.url + "' target='_blank'>View video</a>") +
        "<p>" + data.explanation + "</p>";
    });
}
