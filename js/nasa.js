async function loadAPOD() {
  const output = document.getElementById("output");
  const dateInput = document.getElementById("apodDate");

  let date = dateInput.value;

  if (!date) {
    date = new Date().toISOString().split("T")[0];
  }

  output.innerHTML = "Loading…";

  try {
    const res = await fetch(`/.netlify/functions/apod?date=${date}`);
    const data = await res.json();

    if (data.error) {
      output.innerHTML = `<p style="color:red">${data.error.message}</p>`;
      return;
    }

    if (data.media_type === "image") {
      output.innerHTML = `
        <h3>${data.title}</h3>
        <img src="${data.url}">
        <p>${data.explanation}</p>
      `;
    } else if (data.media_type === "video") {
      output.innerHTML = `
        <h3>${data.title}</h3>
        <a href="${data.url}" target="_blank">View video</a>
        <p>${data.explanation}</p>
      `;
    } else {
      output.innerHTML = "Unsupported media type.";
    }

  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to load APOD.";
  }
}

async function loadMars() {
  const output = document.getElementById("output");
  const camera = document.getElementById("camera").value;

  output.innerHTML = "Loading Mars photo…";

  try {
    const res = await fetch(`/.netlify/functions/mars?camera=${camera}`);
    const data = await res.json();

    if (!data || !data.img_src) {
      output.innerHTML = "No photo available.";
      return;
    }

    output.innerHTML = `
      <h3>Mars Rover Photo</h3>
      <img src="${data.img_src}">
    `;
  } catch (err) {
    console.error(err);
    output.innerHTML = "Failed to load Mars photo.";
  }
}
