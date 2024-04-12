const board = document.getElementById('board');
const cells = document.querySelectorAll('[data-cell]');
const statusText = document.querySelector('.status');
const restartButton = document.getElementById('restartButton');
const gameOverPopup = document.getElementById('gameOverPopup');
const winnerMessage = document.getElementById('winnerMessage');
const newGameButton = document.getElementById('newGameButton');
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let oTurn;

startGame();


restartButton.addEventListener('click', startGame); // Existing line
newGameButton.addEventListener('click', () => {
    gameOverPopup.classList.add('hidden'); // Hide the popup
    startGame(); // Restart the game
});

function startGame() {
    oTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
    statusText.innerText = "X's Turn";
    gameOverPopup.classList.add('hidden'); // Ensure the popup is hidden when the game starts
}

function endGame(draw) {
    if (draw) {
        winnerMessage.innerText = 'Draw!';
    } else {
        winnerMessage.innerText = `${oTurn ? "O's" : "X's"} Wins!`;
    }
    gameOverPopup.classList.remove('hidden'); // Show the popup
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? 'o' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}


function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    oTurn = !oTurn;
    statusText.innerText = `${oTurn ? "O's" : "X's"} Turn`;
}

function setBoardHoverClass() {
    board.classList.remove('x', 'o');
    if (oTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}