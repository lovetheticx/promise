const cardsEl = document.querySelector("#cards");
const showMoreButton = document.querySelector("#show-more");

let posts = [];
let displayedCount = 0;

function showNextPosts() {
  let html = "";

  posts.slice(displayedCount, displayedCount + 10).forEach((post) => {
    html += `
      <article class="card">
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <p>Post by user ${post.userId}</p>
      </article>
    `;
  });

  cardsEl.innerHTML += html;

  showMoreButton.hidden = displayedCount >= posts.length;
  showMoreButton.disabled = false;
}

function loadPosts() {
  showMoreButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      posts = data;
      showNextPosts();
    })
    .catch((error) => {
      console.log(error);
      showMoreButton.hidden = false;
      showMoreButton.disabled = false;
    });
}

showMoreButton.hidden = true;
showMoreButton.addEventListener("click", () => {
  if (posts.length === 0) {
    loadPosts();
  } else {
    showNextPosts();
  }
});
loadPosts();
