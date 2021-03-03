// https://www.youtube.com/watch?v=qWPtKtYEsN4

const game = () => {
  let [pScore, cScore] = [0,0];
  let currTurn = 1;

  // Start Game function
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const matchScreen = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      matchScreen.classList.add("fadeIn");
    });
  };

  // Play Match function
  const playMatch = () => {
    const options = document.querySelectorAll('.options button');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');
    const currentTurn = document.querySelector(".currTurn");
    const maxTurns = document.querySelector(".maxWins");

    let maxTurn = maxTurns.value;
    maxTurns.addEventListener("change", () => {
      maxTurn = maxTurns.value;
      console.log(maxTurn);
    })
    

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
        }, 2000);

        // Animation
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";
      });
    });

    if (currTurn > maxTurn) {
      console.log(maxTurn);
      if (pScore > cScore) {
        winner.textContent = `Player Wins: ${pScore} + '-' + ${cScore}`;
      }
      else if (pScore < cScore) {
        winner.textContent = `Computer Wins: ${cScore} + '-' + ${pScore}`;
      }
      else {
        winner.textContent = `It's a Tie: ${cScore} + '-' + ${pScore}`;
      }
    }
  };

  const compareHands = (playerMove, computerMove) => {
    const winner = document.querySelector(".winner");
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
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  }

  // Call all inner functions
  startGame();
  playMatch();
};

game();