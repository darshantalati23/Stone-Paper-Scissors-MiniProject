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
  playerScoreElement.innerText = playerScore;
  computerScoreElement.innerText = compScore;
  playerMove.innerText = "Your Move: -";
  computerMove.innerText = "Computer Move: -";
  result.innerText = "Click a button to play!";
  result.className = "draw-msg";
});

function updateScore() {
  playerScoreElement.innerText = playerScore;
  computerScoreElement.innerText = compScore;
}

function determineWinner(playerChoice, compChoice) {
  if (playerChoice === compChoice) {
    return "draw";
  }
  if (
    (playerChoice === "stone" && compChoice === "scissors") ||
    (playerChoice === "paper" && compChoice === "stone") ||
    (playerChoice === "scissors" && compChoice === "paper")
  ) {
    return "player";
  }
  return "computer";
}

// Event listeners for player choices
stone.addEventListener("click", () => playRound("stone"));
paper.addEventListener("click", () => playRound("paper"));
scissors.addEventListener("click", () => playRound("scissors"));

function playRound(playerChoice) {
  const choices = ["stone", "paper", "scissors"];
  let rand = Math.floor(Math.random() * 3);
  let compChoice;
  if (rand === 0) {
    compChoice = "stone";
  } else if (rand === 1) {
    compChoice = "paper";
  } else {
    compChoice = "scissors";
  }

  // First letter uppercase and rest as it is -> String functions
  playerMove.innerText = `Your Move: ${
    playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)
  }`;
  computerMove.innerText = `Computer Move: ${
    compChoice.charAt(0).toUpperCase() + compChoice.slice(1)
  }`;

  const winner = determineWinner(playerChoice, compChoice);

  if (winner === "player") {
    playerScore++;
    result.innerText = "You Win!";
    result.className = "win-msg";
  } else if (winner === "computer") {
    compScore++;
    result.innerText = "You Lose!";
    result.className = "lost-msg";
  } else {
    result.innerText = "Draw!";
    result.className = "draw-msg";
  }

  // Update score display
  updateScore();
}
