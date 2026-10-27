const cardsEl = document.querySelector("#cards");
const showMoreButton = document.querySelector("#show-more");

let users = [];
let displayedCount = 0;

function showNextUsers() {
  let html = "";

  users.slice(displayedCount, displayedCount + 10).forEach((user) => {
    html += `
      <article class="card">
        <h2>${user.name}</h2>
        <p>${user.email}</p>
        <p>${user.phone}</p>
        <p>${user.website}</p>
        <p>${user.address.city}</p>
        <p>${user.company.name}</p>
      </article>
    `;
  });

  cardsEl.innerHTML += html;

  showMoreButton.hidden = displayedCount >= users.length;
  showMoreButton.disabled = false;
}

function loadUsers() {
  showMoreButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      users = data;
      showNextUsers();
    })
    .catch((error) => {
      console.log(error);
      showMoreButton.hidden = false;
      showMoreButton.disabled = false;
    });
}

showMoreButton.hidden = true;
showMoreButton.addEventListener("click", () => {
  if (users.length === 0) {
    loadUsers();
  } else {
    showNextUsers();
  }
});
loadUsers();
