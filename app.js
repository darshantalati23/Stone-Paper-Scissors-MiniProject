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
  const choices = ["stone", "paper", "scissors"];
  const rand = Math.floor(Math.random() * choices.length);
  return choices[rand];
}

// Reset game function
reset.addEventListener("click", () => {
  playerScore = 0;
  compScore = 0;
  updateScore();
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
  if (!playerChoice || !compChoice) {
    return "error";
  }
  
  if (playerChoice === compChoice) {
    return "draw";
  }
  
  const winningCombinations = {
    stone: "scissors",
    paper: "stone",
    scissors: "paper"
  };
  
  return winningCombinations[playerChoice] === compChoice ? "player" : "computer";
}

// Event listeners for player choices
const choices = document.querySelectorAll(".choice");
choices.forEach(choice => {
  choice.addEventListener("click", (e) => {
    const playerChoice = e.target.id;
    playRound(playerChoice);
  });
});

function playRound(playerChoice) {
  if (!playerChoice) {
    console.error("Invalid player choice");
    return;
  }

  const compChoice = compInput();

  // First letter uppercase and rest as it is
  playerMove.innerText = `Your Move: ${playerChoice.charAt(0).toUpperCase() + playerChoice.slice(1)}`;
  computerMove.innerText = `Computer Move: ${compChoice.charAt(0).toUpperCase() + compChoice.slice(1)}`;

  const winner = determineWinner(playerChoice, compChoice);

  switch (winner) {
    case "player":
      playerScore++;
      result.innerText = "You Win!";
      result.className = "win-msg";
      break;
    case "computer":
      compScore++;
      result.innerText = "You Lose!";
      result.className = "lost-msg";
      break;
    case "draw":
      result.innerText = "Draw!";
      result.className = "draw-msg";
      break;
    case "error":
      result.innerText = "Error occurred!";
      result.className = "error-msg";
      console.error("Error in determining winner");
      break;
  }

  updateScore();
}
