async function loadAPOD() {
  const output = document.getElementById("output");
  const dateInput = document.getElementById("apodDate");

  let date = dateInput.value;

  if (!date) {
    const today = new Date();
    date = today.toISOString().split("T")[0];
  }

  output.innerHTML = "<p>Loading APOD...</p>";

  try {
    const res = await fetch(`/.netlify/functions/apod?date=${date}`);
    const data = await res.json();

    if (data.error) {
      output.innerHTML =
        "<p style='color:red;'>" + data.error + "</p>";
      return;
    }

    if (data.media_type === "image") {
      output.innerHTML =
        `<h3>${data.title}</h3>
         <img src="${data.url}">
         <p>${data.explanation}</p>`;
    } else if (data.media_type === "video") {
      output.innerHTML =
        `<h3>${data.title}</h3>
         <a href="${data.url}" target="_blank">View video</a>
         <p>${data.explanation}</p>`;
    } else {
      output.innerHTML = "<p>Unsupported media type.</p>";
    }

  } catch (err) {
    console.error(err);
    output.innerHTML =
      "<p style='color:red;'>Failed to load APOD.</p>";
  }
}

async function loadMars() {
  const output = document.getElementById("output");
  const camera = document.getElementById("camera").value;

  output.innerHTML = "<p>Loading Mars photo...</p>";

  try {
    const res = await fetch(`/.netlify/functions/mars?camera=${camera}`);
    const data = await res.json();

    if (!data || !data.img_src) {
      output.innerHTML = "<p>No image returned.</p>";
      return;
    }

    output.innerHTML =
      `<h3>Mars Rover Photo</h3>
       <img src="${data.img_src}">`;

  } catch (err) {
    console.error(err);
    output.innerHTML =
      "<p style='color:red;'>Failed to load Mars photo.</p>";
  }
}
