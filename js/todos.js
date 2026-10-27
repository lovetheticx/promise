const cardsEl = document.querySelector("#cards");
const showMoreButton = document.querySelector("#show-more");

let todos = [];
let displayedCount = 0;

function showNextTodos() {
  let html = "";

  todos.slice(displayedCount, displayedCount + 10).forEach((todo) => {
    const status = todo.completed ? "Completed" : "Not completed";

    html += `
      <article class="card">
        <h2>${todo.title}</h2>
        <p>${status}</p>
        <p>Todo for user ${todo.userId}</p>
      </article>
    `;
  });

  cardsEl.innerHTML += html;

  showMoreButton.hidden = displayedCount >= todos.length;
  showMoreButton.disabled = false;
}

function loadTodos() {
  showMoreButton.disabled = true;

  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      todos = data;
      showNextTodos();
    })
    .catch((error) => {
      console.log(error);
      showMoreButton.hidden = false;
      showMoreButton.disabled = false;
    });
}

showMoreButton.hidden = true;
showMoreButton.addEventListener("click", () => {
  if (todos.length === 0) {
    loadTodos();
  } else {
    showNextTodos();
  }
});
loadTodos();
