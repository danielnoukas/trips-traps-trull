const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let playerOscore = 0
let playerXscore = 0
let draw = 0

const winningMessage = () => `Pelur ${currentPlayer} võitis lahingu!`;
const drawMessage = () => `Mäng lõppes viigiga, keegi ei võitnud!`;
const currentPlayerTurn = () => `${currentPlayer}' kord otsus teha`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }

    }

    
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        console.log(currentPlayer);
        if (currentPlayer === "X") {
    
            playerXscore++
            
        } else if (currentPlayer === "O") {
            playerOscore++
            
        }
         
        console.log(playerXscore, draw, playerOscore);
        changeScore(playerXscore, draw, playerOscore);
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        console.log(drawMessage());
        draw++
        console.log(playerXscore, draw, playerOscore);
        changeScore(playerXscore, draw, playerOscore);
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function changeScore(playerXscore, draw, playerOscore) {
    var elem = document.getElementById('skoorX');
    var elum = document.getElementById('skoorD');
    var elim = document.getElementById('skoorO');
    elem.innerHTML = playerXscore;
    elum.innerHTML = draw;
    elim.innerHTML = playerOscore;
    return;
}