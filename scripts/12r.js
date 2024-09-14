let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

/*
if (!score)
{
  score = {
    wins: 0;
    losses: 0;
    ties: = 0
  } 
};
*/

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".auto-play-button").innerHTML = "Stop playing"; 

  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".auto-play-button").innerHTML = "Auto play";
  }
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
  removeMovesAndResult();
}

// Get the modal element
const modal = document.getElementById("reset-button-modal");

// Get the button that opens the modal
const openModalBtn = document.getElementById("openModal");

// Get the button that reset the score
const yesBtn = document.getElementById("yes-button");

// Get the button that closes the modal
const noBtn = document.getElementById("no-button");

// Event listener to open modal when the "Reset" button is clicked
openModalBtn.addEventListener("click", function() {
  modal.style.display = "flex"; // Display the modal as a flexbox (to center it)
});

// Event listener to close modal when the "Yes" button is clicked
yesBtn.addEventListener("click", function() {
  resetScore();  // Resets the score
  modal.style.display = "none"; // Hide the modal
});

// Event listener to close modal when the "No" button is clicked
noBtn.addEventListener("click", function() {
  modal.style.display = "none"; // Hide the modal
});

// Optional: Close the modal if the user clicks anywhere outside the modal content
window.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});


document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissor-button").addEventListener("click", () => {
  playGame("scissor");
});

document.querySelector(".js-auto-play-button").addEventListener("click", () => {
  autoPlay();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissor");
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    resetScore();
  }
});

function playGame(playerMove) {
  computerMove = pickComputerMove();

  result = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissor") {
      result = "You win.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissor") {
      result = "You lose.";
    }
  } else if (playerMove === "scissor") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissor") {
      result = "Tie.";
    }
  }

  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = result;

  document.querySelector(
    ".js-moves"
  ).innerHTML = `You  <img src="photos/${playerMove}.jpg" class = "move-icon"> - 
    <img src="photos/${computerMove}.jpg" class = "move-icon">  Computer`;
}

function removeMovesAndResult() {
  document.querySelector(".js-result").innerHTML = ``;
  document.querySelector(".js-moves").innerHTML = ``;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissor";
  }

  return computerMove;
}
