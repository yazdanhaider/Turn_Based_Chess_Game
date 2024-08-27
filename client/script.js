const webSocket = new WebSocket(
  "https://yazdan-haider-21bce10015.onrender.com"
);
let gameDetails = {};
let chosenCharacter = null;
let chosenPosition = null;

const gameBoard = document.getElementById("board");
const controlPanel = document.getElementById("controls");
const gameStatus = document.getElementById("status");
const moveHistoryList = document.getElementById("history-list");
const capturedItemsList = document.getElementById("captured-list");
const resetButton = document.getElementById("reset-button");

webSocket.addEventListener("message", (event) => {
  const dataMessage = JSON.parse(event.data);
  if (
    dataMessage.type === "init" ||
    dataMessage.type === "update" ||
    dataMessage.type === "reset"
  ) {
    gameDetails = dataMessage.data;
    displayBoard();
    updateGameStatus();
    showMoveHistory();
    showCapturedItems();
    chosenCharacter = null;
    chosenPosition = null;
    updateControlPanel();
  } else if (dataMessage.type === "invalid") {
    alert(dataMessage.message);
  }
});

function displayBoard() {
  gameBoard.innerHTML = "";
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    for (let colIndex = 0; colIndex < 5; colIndex++) {
      const gridCell = document.createElement("div");
      gridCell.className = "cell";

      if (gameDetails.grid[rowIndex][colIndex]) {
        const [playerTag, characterTag] =
          gameDetails.grid[rowIndex][colIndex].split("-");
        gridCell.classList.add(playerTag);
        gridCell.textContent = `${playerTag}-${characterTag}`;

        if (
          chosenPosition &&
          chosenPosition.row === rowIndex &&
          chosenPosition.col === colIndex
        ) {
          gridCell.classList.add("selected");
        }

        if (playerTag === gameDetails.currentPlayer) {
          gridCell.addEventListener("click", () =>
            selectGameCharacter(characterTag, rowIndex, colIndex)
          );
        }
      }

      gameBoard.appendChild(gridCell);
    }
  }
}

function selectGameCharacter(characterTag, rowIndex, colIndex) {
  chosenCharacter = characterTag;
  chosenPosition = { row: rowIndex, col: colIndex };
  displayBoard();
  updateControlPanel();
}

function updateControlPanel() {
  controlPanel.innerHTML = "";
  if (!chosenCharacter) return;

  const movementDirections = ["L", "R", "F", "B"];
  const diagonalMovements = ["FL", "FR", "BL", "BR"];

  if (chosenCharacter === "H2") {
    diagonalMovements.forEach((direction) => {
      const button = document.createElement("button");
      button.className = "btn";
      button.textContent = direction;
      button.addEventListener("click", () => initiateMove(direction));
      controlPanel.appendChild(button);
    });
  } else {
    movementDirections.forEach((direction) => {
      const button = document.createElement("button");
      button.className = "btn";
      button.textContent = direction;
      button.addEventListener("click", () => initiateMove(direction));
      controlPanel.appendChild(button);
    });
  }
}

function initiateMove(direction) {
  if (!chosenCharacter) return;

  webSocket.send(
    JSON.stringify({
      player: gameDetails.currentPlayer,
      character: chosenCharacter,
      move: direction,
    })
  );
  chosenCharacter = null;
  chosenPosition = null;
}

function showMoveHistory() {
  moveHistoryList.innerHTML = "";
  gameDetails.moveHistory.forEach((move, index) => {
    const historyItem = document.createElement("li");
    historyItem.textContent = `${index + 1}. ${move}`;
    moveHistoryList.appendChild(historyItem);
  });
}

function showCapturedItems() {
  capturedItemsList.innerHTML = "";
  gameDetails.capturedHistory.forEach((capture, index) => {
    const capturedItem = document.createElement("li");
    capturedItem.textContent = `${index + 1}. ${capture}`;
    capturedItemsList.appendChild(capturedItem);
  });
}

function updateGameStatus() {
  if (gameDetails.winner) {
    gameStatus.textContent = `Player ${gameDetails.winner} wins!`;
  } else {
    gameStatus.textContent = `Current Player: ${gameDetails.currentPlayer}`;
  }
}

function resetGame() {
  webSocket.send(JSON.stringify({ type: "reset" }));
}

resetButton.addEventListener("click", resetGame);
