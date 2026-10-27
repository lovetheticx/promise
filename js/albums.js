const cardsEl = document.querySelector("#cards");
const showMoreButton = document.querySelector("#show-more");

let albums = [];
let displayedCount = 0;

function showNextAlbums() {
  let html = "";

  albums.slice(displayedCount, displayedCount + 10).forEach((album) => {
    html += `
      <article class="card">
        <h2>${album.title}</h2>
        <p>Album by user ${album.userId}</p>
      </article>
    `;
  });

  cardsEl.innerHTML += html;
  displayedCount += 10;
  showMoreButton.hidden = displayedCount >= albums.length;
  showMoreButton.disabled = false;
}

function loadAlbums() {
  showMoreButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/albums")
    .then((response) => response.json())
    .then((data) => {
      albums = data;
      showNextAlbums();
    })
    .catch((error) => {
      console.log(error);
      showMoreButton.hidden = false;
      showMoreButton.disabled = false;
    });
}

showMoreButton.hidden = true;
showMoreButton.addEventListener("click", () => {
  if (albums.length === 0) {
    loadAlbums();
  } else {
    showNextAlbums();
  }
});
loadAlbums();
