window.addEventListener("DOMContentLoaded", loadBreeds);
//Got rid of the load button and just loaded breeds with the page automatically.

//Buttons
const breedSelect = document.getElementById("breed-select");
const loadBtn = document.getElementById("load-images");
const clearBtn = document.getElementById("clear-images");
const mixedBtn = document.getElementById("mixed-images");
const imageCount = document.getElementById("image-count");

//Event Listeners
breedSelect.addEventListener("change", () => {
  if (breedSelect.value === "") {
    loadBtn.disabled = true;
  } else loadBtn.disabled = false;
});
loadBtn.addEventListener("click", () => {
  getImages(breedSelect.value);
});
mixedBtn.addEventListener("click", oneOfEach);
clearBtn.addEventListener("click", clearPictures);

//Variable needed for oneOfEach()
let breedList = [];

//functions
async function loadBreeds() {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    if (!response.ok) {
      throw new Error("Error: Network response was (${response.status})");
    }
    const data = await response.json();
    breedList = Object.keys(data.message);
    console.log(breedList);
    breedSelect.innerHTML += addBreeds(breedList);
    mixedBtn.disabled = false;
  } catch (e) {
    console.error("Error: Coult not fetch list" + e);
  }
}

function addBreeds(list) {
  let output = "";
  list.forEach((i) => {
    output += `<option value="${i}">${i}</option>`;
  });
  return output;
}

async function getImages(breed) {
  // const qty = document.getElementById("breed-select").value;
  try {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/${imageCount.value}`
    );
    if (!response.ok) {
      throw new Error("Error: Network response was (${response.status})");
    }
    const data = await response.json();
    document.querySelector("#output").innerHTML = displayImages(
      data.message,
      breed
    );
  } catch (error) {
    console.error("Error: Could not fetch images:", error);
  }
}

function displayImages(list, breed) {
  let output = "";
  list.forEach((url) => {
    output += `<div class="gallery-item">
    <div class="image-wrapper">
      <img src="${url}" alt="Image">
    </div>
    <div class="info-wrapper">
      <h2>Breed: ${breed}</h2>
      <p><strong>Source:</strong> <a href="${url}" target="_blank">${url}</a></p>
    </div>
  </div>`;
  });
  return output;
}

function oneOfEach() {
  clearPictures();
  breedList.forEach(async (breed) => {
    try {
      const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random/1`
      );
      if (!response.ok) {
        throw new Error("Error: Network response was (${response.status})");
      }
      const data = await response.json();
      //   console.log(breed + " : " + data.message);
      document.querySelector("#output").innerHTML += displayImages(
        data.message,
        breed
      );
    } catch (e) {
      console.error("Error: Could not fetch image" + e);
    }
  });
}

function clearPictures() {
  document.querySelector("#output").innerHTML = "";
}
