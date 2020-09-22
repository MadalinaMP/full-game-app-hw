function getGames() {
  displayLoader();
  return fetch("https://games-world.herokuapp.com/games").then(function (
    response
  ) {
    return response.json();
  });
}

const container = document.querySelector("#generatedGame");
function displayGames() {
  getGames()
    .then(function (games) {
      console.log(games);

      games.forEach(function (game) {
        const gameDOM = createGameDOM(game);
        const deleteButton = createDeleteButton();
        deleteButton.addEventListener("click", function () {
          displayLoader();
          deleteGame(game._id)
            .then(function (response) {
              console.log(response);
              container.removeChild(gameDOM);
            })
            .catch(function (err) {
              console.log(err);
            })
            .finally(hideLoader);
        });
        gameDOM.appendChild(deleteButton);
        container.appendChild(gameDOM);
      });
    })
    .finally(hideLoader);
}
displayGames();

function createGameDOM(game) {
  const gameDOM = document.createElement("div");
  gameDOM.innerHTML = `
    <h2>${game.title}</h2>
    <p>${game.description}<p>`;

  gameDOM.classList.add("gameStyle");

  return gameDOM;
}

function createDeleteButton() {
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("buton");

  return deleteButton;
}

function deleteGame(gameId) {
  return fetch(`https://games-world.herokuapp.com/games/${gameId}`, {
    method: "DELETE",
  }).then(function (response) {
    return response.text();
  });
}

function getGameData() {
  const gameTitle = document.querySelector("#title").value;
  const gameDescription = document.querySelector("#description").value;

  return {
    title: gameTitle,
    description: gameDescription,
  };
}

function saveGameOnServer(game) {
  const promise = fetch("https://games-world.herokuapp.com/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Accept": "*/*",
    },
    body: `title=${game.title}&description=${game.description}`,
  }).then(function (response) {
    return response.json();
  });

  return promise;
}

const addGameButton = document.querySelector("#buton");
addGameButton.addEventListener("click", createGame);
function createGame() {
  const game = getGameData();
  console.log(game);
  saveGameOnServer(game)
    .then(function (response) {
      console.log(response);
      container.innerHTML = "";
      displayGames();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function displayLoader() {
  const myLoader = document.querySelector("#loader");
  myLoader.style.display = "block";
}

function hideLoader() {
  const myLoader = document.querySelector("#loader");
  myLoader.style.display = "none";
}
