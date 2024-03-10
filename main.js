const players = ["X", "O"]; // Можно увеличить для поддержки большего к-ва игроков
let currentPlayer; 
let totalMoves; 
let isGameOver; 
let cells; 

const EMPTY_CONTENT = " "

function startGame() {
  const sizeInput = document.getElementById("size");
  const size = parseInt(sizeInput.value);

  if (isNaN(size) || size < 2 || size > 20) {
    alert("Пожалуйста, введите размер сетки от 2 до 20 (включительно)");
    return;
  }

  const board = document.getElementById("board");
  board.innerHTML = "";

  board.style['gridTemplateRows'] = `repeat(${size},minmax(0,1fr))`
  board.style['gridTemplateColumns'] = `repeat(${size},minmax(0,1fr))`

  cells = Array.from(
      {length: size},
      (_, i) => Array.from({length: size}, (_, j) => {
        const cell = document.createElement("div");
        setPlayer(cell, EMPTY_CONTENT)
        cell.className = "cell";
        cell.dataset.player = EMPTY_CONTENT
        cell.addEventListener("click", () => makeMove(i, j));
        board.appendChild(cell)
        return cell;
      }
  ))

  currentPlayer = players[0];
  totalMoves = 0;
  isGameOver = false;

  updateMessage(`Текущий ход №${totalMoves + 1}. Сейчас ходит ${currentPlayer}`);
}

function setPlayer(cell, player) {
  cell.innerHTML = player
}

function makeMove(i, j) {
  if (isGameOver || cells[i][j].dataset.player !== EMPTY_CONTENT) {
    return;
  }

  setPlayer(cells[i][j], currentPlayer)
  cells[i][j].dataset.player = currentPlayer
  totalMoves++;

  if (checkWin()) {
    endGame(`${currentPlayer} выиграл на ${totalMoves} ходу`);
    return;
  }

  if (totalMoves === cells.length * cells.length) {
    endGame(`Ничья на ${totalMoves} ходе`);
    return;
  }

  currentPlayer = getNextPlayer();
  updateMessage(`Текущий ход №${totalMoves + 1}. Сейчас ходит ${currentPlayer}`);
}

function getNextPlayer() {
  return players[totalMoves % players.length]
}

function checkWin() {
  const checkRow = currentPlayer.repeat(cells.length)
  return [
    cells.map(r => r.map(cell => cell.dataset.player).join(""))
        .some(r => r.includes(checkRow)),
    cells[0].map((columns, i) => cells.map(row => row[i]))
        .map(r => r.map(cell => cell.dataset.player).join(""))
        .some(r => r.includes(checkRow)),
    cells.reduce((acc, row, i) => acc + row[i].dataset.player, "").includes(checkRow),
    cells.reduce((acc, row, i) => acc + row[cells.length - 1 - i].dataset.player, "").includes(checkRow),
  ].some(it => it)
}

function endGame(message) {
  isGameOver = true;
  updateMessage(message);
  cells.flat().forEach(cell => {
    cell.style.pointerEvents = "none";
  });
}

function updateMessage(message) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
}

document.getElementById("startBtn").addEventListener("click", startGame);
