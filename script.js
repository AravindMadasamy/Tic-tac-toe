// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const statusText = document.getElementById('statusText');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameActive = true;

const winningCombinations = [
  [0,1,2], [3,4,5], [6,7,8], // Rows
  [0,3,6], [1,4,7], [2,5,8], // Columns
  [0,4,8], [2,4,6]           // Diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  if (!gameActive || cell.classList.contains('X') || cell.classList.contains('O')) return;
  
  cell.classList.add(currentPlayer);
  cell.textContent = currentPlayer;
  
  if (checkWin(currentPlayer)) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if ([...cells].every(cell => cell.classList.contains('X') || cell.classList.contains('O'))) {
    statusText.textContent = 'Draw!';
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => cells[index].classList.contains(player));
  });
}

function restartGame() {
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

statusText.textContent = `Player ${currentPlayer}'s turn`;
