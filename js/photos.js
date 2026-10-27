const cardsEl = document.querySelector("#cards");
const showMoreButton = document.querySelector("#show-more");

let photos = [];
let displayedCount = 0;

function showNextPhotos() {
  let html = "";

  photos.slice(displayedCount, displayedCount + 10).forEach((photo) => {
    html += `
      <article class="card">
        <img src="${photo.url}" alt="${photo.title}" />
        <h2>${photo.title}</h2>
        <p>Album ${photo.albumId}</p>
      </article>
    `;
  });

  cardsEl.innerHTML += html;
  showMoreButton.hidden = displayedCount >= photos.length;
  showMoreButton.disabled = false;
}

function loadPhotos() {
  showMoreButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((data) => {
      photos = data;
      showNextPhotos();
    })
    .catch((error) => {
      console.log(error);
      showMoreButton.hidden = false;
      showMoreButton.disabled = false;
    });
}

showMoreButton.hidden = true;
showMoreButton.addEventListener("click", () => {
  if (photos.length === 0) {
    loadPhotos();
  } else {
    showNextPhotos();
  }
});
loadPhotos();
