document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector("#startButton")
    startButton.addEventListener("click", startGame)

    let N = 0
    let options =[]
    let running = false
    let moverCounter = 0
    let currentPlayer = "X"

    const board = document.querySelector("#board")
    if (board) {
        board.innerHTML = ""
    }

    createBoard(n)
    initializeGame()


function createBoard(n) {
    const board = document.querySelector("#board")
    board.innerHTML = ""

    const rowTemplate = Array(n)
    .fill("")
    .map((_, row) => {
        const rowTemplate = Array(n)
          .fill("")
          .map((_, col) => `<div class='cell' data-row=${row} data-col=${col}></div>`)   
          .join("")

    return `<div class='row'>${rowTemplate}</div>`
    })
    .join("")

    board.innerHTML = rowTemplate

    const cells = document.querySelectorAll(".cell")
    const statusText = document.querySelector("#statusText")
    const restartButton = document.querySelector("#restartButton")
    const moveCountText = document.querySelector("#moveCount")

    const conditions = winConditions(n)

    options = Array(n * n).fill("")
    moveCount = 0
    currentPlayer = "X"
    running = true

   cells.forEach(cell => cell.addEventListener("click", cellClicked))
   restartButton.addEventListener("click", restartGame)
   statusText.textContent = `Сейчас ходит: ${currentPlayer}`
   updateMoveCount()

function cellClicked() {
const row = parseInt(this.getAttribute("data-row")) 
const col = parseInt(this.getAttribute("data-col")) 
const cellIndex = row * n + col

if(options[cellIndex] != "" || !running) {
    return
}

updateCell(this, cellIndex)
checkWinner()
incrementMoveCount()
updateMoveCount(
)
}
function updateCell(cell, index) {
options[index] = currentPlayer
cell.textContent = currentPlayer
}

function changePlayer() {
 currentPlayer = currentPlayer === "X" ? "O" : "X"
 statusText.textContent = `Сейчас ходит: ${currentPlayer}`
}

function checkWinner() {
let roundWon = false

  conditions.some(condition => {
    const cellValues = condition.map(index => options[index])

    if (cellValues.every(value => value === currentPlayer)) {
       roundWon = true
       return true
    }
})

if (roundWon) {
    statusText.textContent = `${currentPlayer} победил!`
    running = false
}
else if(!options.includes("")) {
    statusText.textContent = `Ничья!`
    running = false
}
else{
    changePlayer();
    }
}

function restartGame() {
currentPlayer = "X"
options.fill("")
statusText.textContent = `Сейчас ходит: ${currentPlayer}`
cells.forEach(cell => cell.textContent = "")
running = true
moveCount = 0
updateMoveCount()
}


function winConditions(n) {
    const conditions = []

    conditions.push(...Array(n).fill("").map((_, i) => Array(n).fill("").map((_, j) => i * n + j)))

    conditions.push(...Array(n).fill("").map((_, i) => Array(n).fill("").map((_, j) => j * n + i)))

    const diagonal1 = Array(n).fill("").map((_, i) => i * n + i)
    const diagonal2 = Array(n).fill("").map((_, i) => i * n + (n - 1 - i))
    conditions.push(diagonal1, diagonal2)

    return conditions
   }

   function incrementMoveCount() {
    moveCount++
   }

   function updateMoveCount() {
    moveCountText.textContent = `Ход номер: ${moveCount}`
   }
  }
})

function startGame() {
    const sizeInput = document.querySelector("#sizeInput")
    n = parseInt(sizeInput.value)

    if (isNaN(N) || N < 2 || N > 20) {
        alert("Размер поля может быть от 2 до 20")
        return
    }}
