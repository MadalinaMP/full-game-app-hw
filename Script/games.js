var baseUrl = "https://games-world.herokuapp.com";
var buton = document.querySelector("#buton");
var myLoader = document.getElementById("loader");
var container = document.getElementById("container");
var games;

buton.addEventListener("click", getGame);

function getGame() {
  displayLoader();
  fetch(baseUrl + "/games", { method: "GET" })
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonResp) {
      console.log(jsonResp);

      games = jsonResp;
      for (var i = 0; i < games.length; i++) {
        displayGame(games[i]);
      }
    })
    .finally(hideLoader);
}

function displayGame(game) {
  var myGame = document.getElementById("generatedGame");

  var gameTitle = document.createElement("p");
  gameTitle.innerText = game.title;
  gameTitle.classList.add("titleStyle");

  var gameDescription = document.createElement("p");
  gameDescription.innerText = game.description;
  gameDescription.classList.add("descriptionStyle");

  var gameImg = document.createElement("img");
  gameImg.src = game.imageUrl;
  gameImg.classList.add("imgStyle");

  myGame.appendChild(gameTitle);
  myGame.appendChild(gameDescription);
  myGame.appendChild(gameImg);

  var screen = document.getElementById("game");
  screen.style.display = "block";
}

function displayLoader() {
  container.style.opacity = 0.3;
  myLoader.style.display = "block";
}

function hideLoader() {
  container.style.opacity = 1;
  myLoader.style.display = "none";
}
