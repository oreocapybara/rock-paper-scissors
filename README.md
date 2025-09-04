# rock-paper-scissors

Simple numbered pseudocode (layman's terms) for `script.js`:

1. Grab page elements: the two score displays (human, computer), the result text, the round message, the choice buttons, and the restart button.
2. Set both scores to 0.
3. Computer picks randomly: return "rock", "paper", or "scissors".
4. Wait for the player to click a choice button; use the clicked button's value as the player's choice.
5. Play one round:
	- If input isn't rock/paper/scissors, ignore it.
	- If both chose the same thing -> show "draw".
	- Otherwise decide who wins, increment winner's score, and show a short message explaining the win.
6. After each round, update the score numbers shown on the page.
7. Play five rounds (each round waits for a click). Hide the "Play Again" button while playing.
8. After five rounds, display the final result: "You win", "You lose", or "Match Draw". Show the restart button.
9. When restart is clicked:
	- Reset both scores to 0.
	- Clear the result and round messages.
	- Hide the restart button and start a fresh five-round game.
10. Implementation tips:
	- Don't treat the restart button as a choice button.
	- Either wait for clicks with a Promise/await or let clicks directly drive the rounds.
	- Use one-time listeners or remove listeners after a click to avoid duplicate handling.

