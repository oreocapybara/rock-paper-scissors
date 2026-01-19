// This file contains the functions needed to implement the rock paper scissors game
const pScore = document.querySelector(".score#player");
const cScore = document.querySelector(".score#computer");

const playerAction = document.querySelector(".player-action");
const computerAction = document.querySelector(".computer-action");

const playerActionCard = document.querySelector(".display-action.player");
const computerActionCard = document.querySelector(".display-action.computer");

const round = document.querySelector(".round");
const roundCard = document.querySelector(".round-card");
const result = document.querySelector(".round-message");
const roundInfo = document.querySelector(".round-info");

const actionHistory = document.querySelector(".scroll-area");
const actions = document.querySelectorAll(".action:not(#restart)"); //select all actions except "restart"
const restart = document.querySelector("#restart");

const toggleHistory = document.querySelector("#toggle-history");
const roundContainer = document.querySelector(".round-history");

const baseURL = "./assets/";

const MAXPOINTS = 5;

//Computer action logic
function getComputerChoice() {
	const computerChoice = Math.floor(Math.random() * 3 + 1); //Select randomly from 1-3

	switch (computerChoice) {
		case 1:
			return "rock";
		case 2:
			return "paper";
		case 3:
			return "scissors";
	}
}

function playGame() {
	round.textContent = `Round ${counter}`;
	roundInfo.textContent = "Take your pick!";

	displayScore();

	actions.forEach((action) => {
		//Add listeners to every action button and use their value  for player input to play a round
		action.addEventListener("click", () => {
			const playerSelection = action.value;
			const computerSelection = getComputerChoice();

			playRound(playerSelection, computerSelection);
		});
	});
}

// Main Program

// Initialize Scores
let computerScore = 0;
let playerScore = 0;
let roundMessage = "";
let counter = 1;
let isHidden = false;

playGame();

function playRound(playerSelection, computerSelection) {
	console.log("Play");

	// Disable actions during round
	disableActions();

	//Round Tie
	if (playerSelection === computerSelection) {
		roundMessage = "Tie";
	} else if (roundResult(playerSelection, computerSelection)) {
		roundMessage = "Win";
		playerScore++;
	} else {
		roundMessage = "Lose";
		computerScore++;
	}

	// Show round win
	const roundDetail = displayRoundWin(
		playerSelection,
		computerSelection,
		roundMessage,
	);

	setTimeout(() => {
		clearRoundHelper();
	}, 4000);

	if (isGameEnd()) {
		toggleActions();
		gameEndMessage();
		displayGameWin();
	}
}

function toggleActions() {
	actions.forEach((action) => {
		action.toggleAttribute("disabled", "disabled"); // set to true
	});
}

function disableActions() {
	actions.forEach((action) => {
		action.classList.add("disabled");
		action.classList.remove("re-entrance");
	});
}

function enableActions() {
	actions.forEach((action) => {
		// Reset opacity for re-entrance animation
		action.style.opacity = "0";
		action.classList.remove("disabled");
		action.classList.add("re-entrance");

		// Remove re-entrance class after animation completes
		action.addEventListener(
			"animationend",
			() => {
				action.classList.remove("re-entrance");
				action.style.opacity = "1";
				action.style.animation = "none";
			},
			{ once: true },
		);
	});
}

function roundResult(playerSelection, computerSelection) {
	//Return true or false (win/lose)
	return (
		(playerSelection === "rock" && computerSelection === "scissors") ||
		(playerSelection === "paper" && computerSelection === "rock") ||
		(playerSelection === "scissors" && computerSelection === "paper")
	);
}

function isGameEnd() {
	return playerScore === MAXPOINTS || computerScore === MAXPOINTS; // Check if the game Ends
}

function gameEndMessage() {
	return playerScore > computerScore ? "Win" : "Lose";
}

function displayGameWin() {
	const gameMessage = gameEndMessage();
	const newElement = document.createElement("H3");
	newElement.textContent = gameMessage;

	selectionContainer.insertBefore(newElement, playerAction);
}

//reset game
restart.addEventListener("click", () => {
	//Add animation once clicked
	restart.classList.add("clicked");

	// Remove class after animation
	restart.addEventListener(
		"animationend",
		() => {
			restart.classList.remove("clicked");

			location.reload(); //reload
		},
		{ once: true },
	);
});

// show history
toggleHistory.addEventListener("click", () => {
	toggleHistory.classList.toggle("clicked");

	//hide round history
	roundContainer.classList.toggle("hidden");
});

toggleHistory.addEventListener("animationend", () => {
	toggleHistory.style.opacity = "1";
	toggleHistory.style.animation = "none";
});

// Remove initial round animation after it plays
round.addEventListener(
	"animationend",
	() => {
		round.style.animation = "none";
		round.style.opacity = "1";
	},
	{ once: true },
);

roundInfo.addEventListener(
	"animationend",
	() => {
		roundInfo.style.animation = "none";
		roundInfo.style.opacity = "1";
	},
	{ once: true },
);

function displayRoundWin(playerSelection, computerSelection, roundMessage) {
	const roundDetail = { playerSelection, computerSelection, roundMessage };

	//Card animation entrance
	playerActionCard.classList.add("change");
	playerActionCard.addEventListener(
		"animationend",
		() => {
			playerActionCard.classList.remove("change");
		},
		{ once: true },
	);

	let cardNumber = "";

	//Check action to select corresponding card container
	playerSelection === "rock"
		? (cardNumber = 3)
		: playerSelection === "paper"
			? (cardNumber = 2)
			: (cardNumber = "");
	playerActionCard.setAttribute(
		"style",
		`background-image: url("${baseURL}cards/display-card${cardNumber}.png");`,
	);

	//Set corresponding icon and alt text
	playerAction.src = `${baseURL}icons/${playerSelection}.png`;
	playerAction.alt =
		playerSelection[0].toUpperCase() + playerSelection.substring(1);

	//Delay computer actions for suspense
	setTimeout(() => {
		//Card animation entrance
		computerActionCard.classList.add("change");
		computerActionCard.addEventListener(
			"animationend",
			() => {
				computerActionCard.classList.remove("change");
			},
			{ once: true },
		);

		computerSelection === "rock"
			? (cardNumber = 3)
			: computerSelection === "paper"
				? (cardNumber = 2)
				: (cardNumber = "");
		computerActionCard.setAttribute(
			"style",
			`background-image: url("${baseURL}cards/display-card${cardNumber}.png");`,
		);

		//Set icon and alt text
		computerAction.src = `${baseURL}icons/${computerSelection}.png`;
		computerAction.alt =
			computerSelection[0].toUpperCase() + computerSelection.substring(1);
	}, 1500);

	//Delay for suspense
	setTimeout(() => {
		// Round Card animations
		roundCard.classList.add("change");
		roundCard.addEventListener(
			"animationend",
			() => {
				roundCard.style.animation = "none";
				roundCard.style.opacity = "1";
				roundCard.classList.remove("change");
			},
			{ once: true },
		);

		//Display appropriate round win/lose card
		if (roundMessage === "Win") {
			roundCard.setAttribute(
				"style",
				`background-image: url("${baseURL}cards/round-win-card.png");`,
			);
			result.classList.add("win");
		} else {
			roundCard.setAttribute(
				"style",
				`background-image: url("${baseURL}cards/round-lose-card.png");`,
			);

			roundMessage === "Lose"
				? result.classList.add("lose")
				: result.classList.add("tie");
		}

		//Display round message
		result.textContent = roundMessage;

		displayRoundInfo(roundDetail);

		//show current Scores
		displayScore();

		// Add to round History
		roundHistory(roundDetail);
	}, 1800);

	return;
}

function displayRoundInfo(roundDetail) {
	const { roundMessage, playerSelection, computerSelection } = roundDetail;

	// Round Info change animation
	roundInfo.classList.add("change");

	roundInfo.addEventListener(
		"animationend",
		() => {
			roundInfo.classList.remove("change");
		},
		{ once: true },
	);

	if (roundMessage === "Tie") {
		roundInfo.textContent = "It's a draw!";
		return;
	}

	if (roundMessage === "Win") {
		//Player Win message
		roundInfo.textContent = `${
			playerSelection[0].toUpperCase() + playerSelection.substring(1)
		} 
								beats 
								${computerSelection[0].toUpperCase() + computerSelection.substring(1)}`;
		return;
	}

	//Computer Win Message
	roundInfo.textContent = `${
		computerSelection[0].toUpperCase() + computerSelection.substring(1)
	}
							beats
							${playerSelection[0].toUpperCase() + playerSelection.substring(1)} `;
	return;
}

function displayScore() {
	pScore.textContent = playerScore;
	cScore.textContent = computerScore;
}

function roundHistory(roundDetail) {
	const { playerSelection, computerSelection, roundMessage } = roundDetail;

	//Insert new element before existing
	const existingElement = actionHistory.querySelector("li");

	//<li class="round-pill-container">
	const newRoundLine = document.createElement("li");
	newRoundLine.className = "round-pill-container";

	// <span class="round-number">
	const previousRoundNumber = document.createElement("span");
	previousRoundNumber.className = "round-number";
	previousRoundNumber.textContent = counter;

	// <span class="previous-message">
	const previousMessage = document.createElement("span");
	previousMessage.className = "previous-message";

	if (roundMessage === "Win") {
		previousMessage.classList.add("round-win");
	} else if (roundMessage === "Lose") {
		previousMessage.classList.add("round-lose");
	} else {
		previousMessage.classList.add("round-tie");
	}

	previousMessage.textContent = roundMessage.toUpperCase();

	// <img src="" alt="" class="previous-action player">
	const previousPlayerAction = document.createElement("img");
	previousPlayerAction.className = "previous-action player";
	previousPlayerAction.src = `${baseURL}icons/${playerSelection}.png`;
	previousPlayerAction.alt = playerSelection;

	// <span class="vs-text">
	const vsText = document.createElement("span");
	vsText.className = "vs-text";
	vsText.textContent = "vs";

	const previousComputerAction = document.createElement("img");
	previousComputerAction.className = "previous-action computer";
	previousComputerAction.src = `${baseURL}icons/${computerSelection}.png`;
	previousComputerAction.alt = computerSelection;

	//Assemble elements
	newRoundLine.append(
		previousRoundNumber,
		previousMessage,
		previousPlayerAction,
		vsText,
		previousComputerAction,
	);

	if (!existingElement) {
		console.log(actionHistory.appendChild(newRoundLine));
	} else if (existingElement) {
		console.log(actionHistory.insertBefore(newRoundLine, existingElement));
	}

	counter++;
}

function clearRoundHelper() {
	// Add fade-out animation
	playerActionCard.classList.add("fade-out");
	computerActionCard.classList.add("fade-out");
	roundCard.classList.add("fade-out");

	// Wait for fade-out animation to complete, then clear
	setTimeout(() => {
		// clear
		playerActionCard.style = "";
		playerAction.src = "";
		playerAction.alt = "";

		computerActionCard.style = "";
		computerAction.src = "";
		computerAction.alt = "";

		roundCard.style = "";
		roundCard.src = "";

		result.classList.remove("win", "lose", "tie");
		roundInfo.textContent = "Take your pick!";
		roundInfo.classList.add("change");
		round.addEventListener("animationend", () => {
			round.classList.remove("change");
		});

		round.textContent = `Round ${counter}`;
		//On round change play animation
		round.classList.add("change");
		round.addEventListener(
			"animationend",
			() => {
				round.classList.remove("change");
			},
			{ once: true },
		);

		// Remove fade-out class and other animation classes
		playerActionCard.classList.remove("fade-out", "change");
		computerActionCard.classList.remove("fade-out", "change");
		roundCard.classList.remove("fade-out", "change");

		// Re-enable actions with entrance animation
		enableActions();
	}, 400); // Match the fadeOut animation duration
}

function toggleHide() {
	playerActionCard.classList.toggle("hidden");
	computerActionCard.classList.toggle("hidden");
	roundCard.classList.toggle("hidden");
}

//remove action entrance animation
document.querySelectorAll(".action").forEach((action) => {
	action.addEventListener("animationend", () => {
		action.style.animation = "none";
		action.style.opacity = "1";
	});
});
