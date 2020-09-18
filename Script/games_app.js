function getGames() {
    return fetch('https://games-world.herokuapp.com/games')
    .then(function(response) {
        return response.json()
    })
}

const container = document.querySelector('#generatedGame')
getGames().then(function (games) {
  console.log(games)

  games.forEach(function (game) {
    const gameDOM = createGameDOM(game);

    const deleteButton = createDeleteButton();
    deleteButton.addEventListener('click', function () {
      deleteGame(game._id)
        .then(function (response) {
          console.log(response);
          container.removeChild(gameDOM);
        })
        .catch(function (err) {
          console.log(err);
        })
    })
    gameDOM.appendChild(deleteButton);

    container.appendChild(gameDOM);
  })

})

function deleteGame(gameId) {
    return fetch(`http://localhost:3000/posts/${gameId}`, {
      method: 'DELETE'
    }).then(function (response) {
      return response.json();
    })
  }

function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("buton");
  
    return deleteButton; 
}

const addGameButton = document.querySelector("#buton");
addGameButton.addEventListener('click', createGame);
function createGame() {
  
    const game = getGameData();
    console.log(game)
  
    saveGameOnServer(game)
      .then(function (response) {
        console.log(response)
      }).catch(function (err) {
        console.log(err)
      })
  
}

function createGameDOM(game) {
    const gameDOM = document.createElement('div');
  
    gameDOM.innerHTML = `
    <h2>${game.title}</h2>
    <p>${game.description}<p>`

    gameDOM.classList.add("gameStyle")
  
    return gameDOM;
  }
  
function saveGameOnServer(game) {
    const promise = fetch("https://games-world.herokuapp.com/games", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(game)
    }).then(function(response){
      return response.json()
    });
  
   return promise;
}

function getGameData() {
    const gameTitle = document.querySelector('#title').value;
    const gameDescription = document.querySelector('#description').value;
  
    return {
      title: gameTitle,
      description: gameDescription,
    }
}

function Game () {
    this.title = game.title;
    this.description = game.description;
}
