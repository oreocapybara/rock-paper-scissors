// This file contains the functions needed to implement the rock paper scissors game

const human = document.getElementById("human");
const computer = document.getElementById("computer");
const buttons = document.querySelectorAll(".action:not(#restart)");
const restart = document.getElementById("restart");

const roundMessage = document.querySelector(".roundMessage"); 
const result = document.getElementById("result"); //Game Results


// track whether a game loop is running
let gameRunning = false;

// Scores
let humanScore = 0, computerScore = 0;

// Function to get computer choice randomly
function getComputerChoice() {
	let computerChoice = Math.floor(Math.random() * 3) + 1;
	switch (computerChoice) {
		case 1:
			return "rock";
		case 2:
			return "paper";
		case 3:
			return "scissors";
	}
}

//Function to get player input / choice
function getHumanChoice() {
	return new Promise((resolve) => { //Create promise
		function handleClick(e) {
			resolve(e.currentTarget.value);
		}

		//Add event listeners to each button
		buttons.forEach((button) => {
			button.addEventListener("click", handleClick);
		});
	});
}

//Rounds
function playRound(humanChoice, computerChoice) {
	if (humanChoice === computerChoice) {
		const message = "Draw! both chose " + humanChoice;
		console.log(message);
		roundMessage.textContent = message;
		return message;
	}

	if (
		// Player Win Cases
		(humanChoice === "rock" && computerChoice === "scissors") ||
		(humanChoice === "paper" && computerChoice === "rock") ||
		(humanChoice === "scissors" && computerChoice === "paper")
	) {
		humanScore++; //Update player score
		const message =
			"You win!" +
			" " +
			(humanChoice === "rock"
				? "rock beats scissors"
				: humanChoice === "paper"
				? "paper beats rock"
				: "scissors beats paper");
		console.log(message);
		roundMessage.textContent = message;
		return message;
	}

	//Computer Win Cases
	computerScore++;
	const message =
		"You lose!" +
		" " +
		(humanChoice === "rock"
			? "scissors beats rock"
			: humanChoice === "paper"
			? "scissors beats paper"
			: "rock beats scissors");
	console.log(message);
	roundMessage.textContent = message;
	return message;
}

//play Game
async function gameLoop() {
	// run five rounds; if "restart" is chosen we reset scores and restart the round counter
	for (let i = 1; i <= 5; i++) {
		const computerChoice = getComputerChoice();
		const humanChoice = await getHumanChoice();

		if (humanChoice === "restart") {
			i = 0; // will become 1 after the loop increment
			continue; // go to next loop iteration
		}

		if (humanChoice !== "restart") {
			playRound(humanChoice, computerChoice);
		}

		console.log(
			`Player: ${humanScore}
			\nComputer: ${computerScore}`
		);
		displayText();
	}

	// roundMessage.textContent = "";
	if (humanScore === computerScore) {
		const message = "Match Draw!";
		console.log(message);
		result.textContent = message;
		result.style = "color: gray"
	} else if (humanScore > computerScore) {
		const message = "You win!";
		console.log(message);
		result.textContent = message;
		result.style = "color: green"

	} else {
		const message = "You lose!";
		console.log(message);
		result.textContent = message;
		result.style = "color: red"

	}
}

async function playGame() {
	if (gameRunning) return;
	gameRunning = true;
	if (restart) restart.style.display = "none";
	await gameLoop();
	// show restart after the game ends
	if (restart) restart.style.display = "";
	gameRunning = false;
}

function resetGame() {
	resetGameUI();
	if (restart) restart.style.display = "none";
	if (!gameRunning) playGame();
}

// wire the restart button
if (restart) {
	restart.addEventListener("click", resetGame);
}

function resetGameUI() {
	// reset scores and UI, restart the rounds counter
	humanScore = 0;
	computerScore = 0;
	if (human) human.textContent = "0";
	if (computer) computer.textContent = "0";
	if (result) result.textContent = "";
	if (roundMessage) roundMessage.textContent = "";
}

//Display Text Content
function displayText() {
	if (human) human.textContent = humanScore.toString();
	if (computer) computer.textContent = computerScore.toString();
}

//main program

// start the first game
playGame();
