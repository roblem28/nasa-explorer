function loadAPOD() {
  const date = document.getElementById("apodDate").value;

  let url = "/.netlify/functions/apod";

  if (date) {
    url += "?date=" + date;
  }

  fetch(url)
    .then(r => r.json())
    .then(d => {
      document.getElementById("output").innerHTML =
        "<h2>" + d.title + "</h2>" +
        "<img src='" + d.url + "'>" +
        "<p>" + d.explanation + "</p>";
    });
}

function loadMars() {
  const camera = document.getElementById("camera").value;

  const url = "/.netlify/functions/mars?camera=" + camera;

  fetch(url)
    .then(r => r.json())
    .then(d => {
      if (d.photos.length === 0) {
        document.getElementById("output").innerHTML =
          "No photos for that camera.";
        return;
      }

      document.getElementById("output").innerHTML =
        "<h2>Mars Rover</h2>" +
        "<img src='" + d.photos[0].img_src + "'>";
    });
}
