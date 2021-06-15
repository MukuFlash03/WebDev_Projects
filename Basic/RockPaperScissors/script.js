// https://www.youtube.com/watch?v=qWPtKtYEsN4
// https://medium.com/@javitocor/how-to-build-a-rock-paper-scissors-game-with-javascript-4b176ecc777d

const game = () => {
  let [pScore, cScore] = [0,0];
  let currTurn = 1;
  const currentTurn = document.querySelector(".currTurn");
  const maxTurns = document.querySelector(".maxWins");
  let maxTurn = maxTurns.value;
  const winner = document.querySelector(".winner");
  const introScreen = document.querySelector(".intro");
  const matchScreen = document.querySelector(".match");
  const playerScore = document.querySelector('.player-score p');
  const computerScore = document.querySelector('.computer-score p');

  // Start Game function
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");

    playBtn.addEventListener("click", () => {
      introScreen.classList.remove("fadeIn");
      matchScreen.classList.remove("fadeOut");
      introScreen.classList.add("fadeOut");
      matchScreen.classList.add("fadeIn");
      winner.textContent = "Pick your move";
      maxTurn = maxTurns.value;
      console.log(maxTurn);
    });
  };

  // Play Match function
  const playMatch = () => {
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');


    const hands = document.querySelectorAll('.hands img');
    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = '';
      });
    });

    const computerOptions = ['rock', 'paper', 'scissors'];
    options.forEach(option => {
      option.addEventListener("click", function() {
        const computerNum = Math.floor(Math.random() * 3);
        const computerMove = computerOptions[computerNum];
        const playerMove = this.className;

        setTimeout(() => {
          compareHands(playerMove, computerMove);
          currentTurn.textContent = `Turn ${currTurn++}`;
          // Update Hand Images
          playerHand.src = `./assets/${this.className}.png`;
          computerHand.src = `./assets/${computerMove}.png`;

          setTimeout(() => {
            whoWon();
            reset();
          }, 2000);
        }, 2000);

        // Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";

      });
    });
  };

  const compareHands = (playerMove, computerMove) => {
    if (playerMove === computerMove) {
      winner.textContent = "It is a Tie";
      return;
    }

    // Rock check
    if (playerMove === 'rock') {
      if (computerMove === 'scissors') {
        winner.textContent = "Player Wins!";
        pScore += 1;
        updateScore();
        return;
      }
      else {
        winner.textContent = "Computer Wins!";
        cScore += 1;
        updateScore();
        return;
      }
    }

    // Paper check
    if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        winner.textContent = "Player Wins!";
        pScore += 1;
        updateScore();
        return;
      }
      else {
        winner.textContent = "Computer Wins!";
        cScore += 1;
        updateScore();
        return;
      }
    }

    // Scissors check
    if (playerMove === 'scissors') {
      if (computerMove === 'paper') {
        winner.textContent = "Player Wins!";
        pScore += 1;
        updateScore();
        return;
      }
      else {
        winner.textContent = "Computer Wins!";
        cScore += 1;
        updateScore();
        return;
      }
    }
  };

  const updateScore = () => {
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    console.log(currTurn);
  }

  const endGame = () => {
    if (currTurn > maxTurn) {
      console.log(`${currTurn} > ${maxTurn}`);
      return true
    }
    return false;
  }
  
  const whoWon = () => {
    if (endGame()) {
      if (pScore > cScore) {
        winner.textContent = `Player Wins: ${pScore} - ${cScore}`;
        currentTurn.textContent = "Woohoo!!!";
      }
      else if (pScore < cScore) {
        winner.textContent = `Computer Wins: ${cScore} - ${pScore}`;
        currentTurn.textContent = "Oh ho...Better Luck Next Time!";
      }
      else {
        winner.textContent = `It's a Tie: ${cScore} - ${pScore}`;
        currentTurn.textContent = "Points Apiece!";
      }
    }
  }

  const reset = () => {
    if (endGame()) {
      setTimeout(() => {
        pScore = 0;
        cScore = 0;
        currTurn = 1;
        playerScore.textContent = 0;
        computerScore.textContent = 0;
        winner.innerHTML = '';
        currentTurn.innerHTML = '';

        matchScreen.classList.remove("fadeIn");
        matchScreen.classList.add("fadeOut");
        introScreen.classList.remove("fadeOut");
        introScreen.classList.add("fadeIn");
      }, 2000);    
    }
  }
  

  // Call all inner functions
  startGame();
  playMatch();
};

game();