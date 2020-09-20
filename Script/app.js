//this app doesn't work properly
//it has no OOP elements because I didnt know how to mix them
//this was made strictly based on the blog example
//i tried following each step by adding comments to make sure i understood the logic
//where i added an (?) i am uncertain of my interpretation and i would like a validation

const container = document.querySelector("#generatedGame"); //the container for the games
const addGameButton = document.querySelector("#buton"); //the button that adds new games

function getGames() {
  //we need to return the fetch in order to call the function and add .then (?)
  return fetch("https://games-world.herokuapp.com/games").then(function (
    response
  ) {
    return response.json(); //un-string the response (from json object to js object)
  });
}

getGames().then(function (games) {
  //the object returned : 'games'
  console.log(games); //an array of games; check if it's displayed in the console

  games.forEach(function (game) {
    //for each game in the array:
    const gameDOM = createGameDOM(game); //1.we create a new game DOM (that's like a template function) - to be put in the document

    const deleteButton = createDeleteButton(); //2. we create a delete button
    deleteButton.addEventListener("click", function () {
      deleteGame(game._id) //3. on click, we delete the game by id (?)
        .then(function (response) {
          console.log(response); // 4. we pick the response from the deleteGame function (?)
          container.removeChild(gameDOM); //5. we remove the game DOM from the container
        })
        .catch(function (err) {
          console.log(err); //error handling
        });
    });
    gameDOM.appendChild(deleteButton); //6. we add the buttom to the game DOM

    container.appendChild(gameDOM); //7. we add the game DOM to the main container
  });
});

function createGameDOM(game) {
  //game refers to a game element. whether it is already from the server's list or input (?)
  const gameDOM = document.createElement("div"); //we make a div named game DOM
  //we populate the div with what we need
  gameDOM.innerHTML = `
    <h2>${game.title}</h2>
    <p>${game.description}<p>`;

  gameDOM.classList.add("gameStyle"); //added style to the DOM

  return gameDOM; //we need to return the const in order to create new game DOMs in other functions (?)
}

function createDeleteButton() {
  const deleteButton = document.createElement("button"); //we create a button
  deleteButton.innerText = "Delete"; //we add text to the button
  deleteButton.classList.add("buton"); //we style the button with a class

  return deleteButton; //we need to return the const in order to be able to create buttons with this function in other functions(?)
}

function deleteGame(gameId) {
  //we delete a game based on its ID. we need to return the fetch in order to be able to call this function somewhere else(?)
  //depends on which game we pick, the ID will vary
  return fetch(`http://localhost:3000/posts/${gameId}`, {
    method: "DELETE",
  }).then(function (response) {
    return response.json(); //we get the response from the picked game and we also turn it into a JS object in order to operate with it
  });
}

function getGameData() {
  const gameTitle = document.querySelector("#title").value; //we get the value from the title input
  const gameDescription = document.querySelector("#description").value; //we get the value from the text area
  //we return an object of this form that will be populated with the said inputs we gave
  //we need to return this object in order to be able to use this function in another one (?)
  return {
    title: gameTitle,
    description: gameDescription,
  };
}

function saveGameOnServer(game) {
  //'game' refers to the game we input (?)
  //we make a promise const that fetches the server url and adds the input game on it (?)
  const promise = fetch("https://games-world.herokuapp.com/games", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(game), //we need to stringify the object we made in order to fit it in the server
  }).then(function (response) {
    return response.json(); //after we add it to the server we get the whole response (the game) and turn it into a JS object that can be added to the document (?)
  });

  return promise; //we need to return the promise in order to be able to call this function in another one (?)
}

addGameButton.addEventListener("click", createGame); //for the button that adds games, on click we call the createGame function
function createGame() {
  const game = getGameData(); //we create a new const that creates a new game object that takes its values from the inputs
  console.log(game); //we print it in the console to check

  //we call the save on server function in order to add the input game to it
  saveGameOnServer(game)
    .then(function (response) {
      console.log(response); //after the function does its part, we get the JS object response and check it in the console
    })
    .catch(function (err) {
      console.log(err); //error handling just in case
    });
}
