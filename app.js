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
  // Better Code:
  // {
  //   if (!playerChoice || !compChoice) {
  //     return "error";
  //   }
  
  //   if (playerChoice === compChoice) {
  //     return "draw";
  //   }
  
  //   const winningCombinations = {
  //     stone: "scissors",
  //     paper: "stone",
  //     scissors: "paper"
  //   };
  
  //   return winningCombinations[playerChoice] === compChoice ? "player" : "computer";
  // }

  // Normal Code
  if (playerChoice === compChoice) {
    return "draw";
  }

  if (playerChoice === "stone" && compChoice === "scissors") {
    return "player";
  }

  if (playerChoice === "paper" && compChoice === "stone") {
    return "player";
  }

  if (playerChoice === "scissors" && compChoice === "paper") {
    return "player";
  }

  return "computer";
}

// Event listeners for player choices
const choices = document.querySelectorAll(".btn");
choices.forEach(choice => {
  choice.addEventListener("click", (e) => {
    choices.forEach(btn => btn.classList.remove('active'));
    choice.classList.add('active');
    const playerChoice = choice.id;
    playRound(playerChoice);
  });
});

function playRound(playerChoice) {
  if (!playerChoice) {
    console.error("Invalid player choice");
    return;
  }

  const compChoice = compInput();

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
