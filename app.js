// Get all the DOM elements
const stone = document.getElementById("stone");
const paper = document.getElementById("paper");
const scissors = document.getElementById("scissors");
const reset = document.getElementById("reset");
const result = document.getElementById("res-msg");
const playerScoreElement = document.querySelector("#ply-score .score-amt");
const computerScoreElement = document.querySelector("#comp-score .score-amt");
const playerMove = document.getElementById("ply-move");
const computerMove = document.getElementById("comp-move");

let playerScore = 0;
let compScore = 0;

function compInput() {
  let rand = Math.floor(Math.random() * 3);
  if (rand === 0) {
    return "stone";
  } else if (rand === 1) {
    return "paper";
  } else {
    return "scissors";
  }
}

// Reset game function
reset.addEventListener("click", () => {
  playerScore = 0;
  compScore = 0;
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = compScore;
  playerMove.textContent = "Your Move: -";
  computerMove.textContent = "Computer Move: -";
  result.textContent = "Click a button to play!";
  result.className = "draw-msg";
});

function updateScore() {
  playerScoreElement.textContent = playerScore;
  computerScoreElement.textContent = compScore;
}

function determineWinner(playerChoice, compChoice) {
  if (playerChoice === compChoice) {
    return 'draw';
  }
  if (
    (playerChoice === 'stone' && compChoice === 'scissors') ||
    (playerChoice === 'paper' && compChoice === 'stone') ||
    (playerChoice === 'scissors' && compChoice === 'paper')
  ) {
    return 'player';
  }
  return 'computer';
}

// Event listeners for player choices
stone.addEventListener("click", () => playRound('stone'));
paper.addEventListener("click", () => playRound('paper'));
scissors.addEventListener("click", () => playRound('scissors'));

function playRound(playerChoice) {
  const choices = ['stone', 'paper', 'scissors'];
  const compChoice = choices[Math.floor(Math.random() * choices.length)];
  
  // Update move displays
  playerMove.textContent = `Your Move: ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;
  computerMove.textContent = `Computer Move: ${compChoice.charAt(0).toUpperCase() + compChoice.slice(1)}`;
  
  // Determine the winner
  const winner = determineWinner(playerChoice, compChoice);
  
  // Update scores and display result
  if (winner === 'player') {
    playerScore++;
    result.textContent = 'You Win!';
    result.className = 'win-msg';
  } else if (winner === 'computer') {
    compScore++;
    result.textContent = 'You Lose!';
    result.className = 'lost-msg';
  } else {
    result.textContent = 'Draw!';
    result.className = 'draw-msg';
  }
  
  // Update score display
  updateScore();
}
