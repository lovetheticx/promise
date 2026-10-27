const cardsEl = document.querySelector("#cards");
const showMoreButton = document.querySelector("#show-more");

let comments = [];
let displayedCount = 0;

function showNextComments() {
  let html = "";

  comments.slice(displayedCount, displayedCount + 10).forEach((comment) => {
    html += `
      <article class="card">
        <h2>${comment.name}</h2>
        <p>${comment.body}</p>
        <p>${comment.email}</p>
      </article>
    `;
  });

  cardsEl.innerHTML += html;

  showMoreButton.hidden = displayedCount >= comments.length;
  showMoreButton.disabled = false;
}

function loadComments() {
  showMoreButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      comments = data;
      showNextComments();
    })
    .catch((error) => {
      console.log(error);
      showMoreButton.hidden = false;
      showMoreButton.disabled = false;
    });
}

showMoreButton.hidden = true;
showMoreButton.addEventListener("click", () => {
  if (comments.length === 0) {
    loadComments();
  } else {
    showNextComments();
  }
});
loadComments();
