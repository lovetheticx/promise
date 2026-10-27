function myPromise() {
  return new Promise((resolve, reject) => {
    let internet = true;

    setTimeout(() => {
      if (internet) {
        resolve("Connected to the internet");
      } else {
        reject("No internet connection");
      }
    }, 2000);
  });
}

myPromise()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });

const usersEl = document.querySelector(".users");

function getNames(arr) {
  arr.forEach((user) => {
    usersEl.innerHTML += `<h1>${user.name}</h1>`;
  });
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((json) => getNames(json))
  .catch((error) => console.log(error));
