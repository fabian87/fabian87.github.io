// game.js
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;

// Variables for the second game
let correctNumber;
let guesses = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function firstBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const game = document.createElement('h1')
    game.innerHTML = 'Encuentra las parejas de cartas!';
    game.classList.add('title');
    gameBoard.appendChild(game);
    shuffle(cards);
    for (let i = 0; i < cards.length; i++) {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = cards[i];
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
        cardElements.push(cardElement);
    }
}

function flipCard() {
    if (flippedCards.length === 2) return;
    this.innerText = this.dataset.value;
    flippedCards.push(this);
    if (flippedCards.length === 2) {
        checkForMatch();
    }
}

function checkForMatch() {
    if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === cards.length / 2) {
            document.getElementById('second').classList.remove('disabled');
            document.getElementById('first').innerText = 'N';
            secondGame();
        }
    } else {
        setTimeout(unflipCards, 500);
    }
}

function unflipCards() {
    for (let card of flippedCards) {
        card.innerText = '';
    }
    flippedCards = [];
}

////////////////////////////////////////////////////////////////////////////

function secondGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const game = document.createElement('h1')
    game.innerHTML = 'Adivina el numero!';
    game.classList.add('title');
    gameBoard.appendChild(game);

    correctNumber = Math.floor(Math.random() * 100) + 1;
    for (let i = 1; i <= 100; i++) {
        const numberElement = document.createElement('div');
        numberElement.classList.add('number');
        numberElement.innerText = i;
        numberElement.addEventListener('click', guessNumber);
        gameBoard.appendChild(numberElement);
    }
}

function guessNumber() {
    guesses++;
    if (this.innerText == correctNumber) {
        this.style.backgroundColor = 'green';
        setTimeout(nextGame, 1000);
    } else {
        this.style.backgroundColor = 'red';
    }

    function nextGame() {
        document.getElementById('third').classList.remove('disabled');
        document.getElementById('second').innerText = 'E';
        thirdGame();
    }
}


////////////////////////////////////////////////////////////////////////////

const words = ['dragon', 'elefante', 'tigre', 'jirafa', 'perezoso', 'delfin', 'hipopotamo', 'ballena'];
let correctWord;
let wordGuesses = 0;
let revealedWord;

function thirdGame() {
  wordGuesses = 0;
  const gameBoard = document.getElementById('game-board');
  gameBoard.innerHTML = '';
  const game = document.createElement('h1')
  game.innerHTML = 'Adivina la palabra!';
  game.classList.add('title');
  correctWord = words[Math.floor(Math.random() * words.length)];
  revealedWord = correctWord.split('').map(() => '_ ').join('');
  correctWord = correctWord.split('').map((letter) => letter + ' ').join('');
  gameBoard.appendChild(game);

  const rowElement = document.createElement('div');
  rowElement.classList.add('row');
  
  const wordElement = document.createElement('div');
  wordElement.classList.add('word');
  wordElement.innerText = revealedWord;
  rowElement.appendChild(wordElement);

  // Add a counter for tries left
  const triesLeftElement = document.createElement('div');
  triesLeftElement.classList.add('tries-left');
  triesLeftElement.style.color = 'red';
  triesLeftElement.innerText = 'Intentos restantes: ' + (5 - wordGuesses);
  rowElement.appendChild(triesLeftElement);

  gameBoard.appendChild(rowElement);

  const inputElement = document.createElement('input');
  inputElement.name = 'input';
  inputElement.type = 'text';
  inputElement.maxLength = 1;
  inputElement.style.width = '50px';
  inputElement.style.border = '1px solid black';
  inputElement.addEventListener('keyup', guessLetter);
  gameBoard.appendChild(inputElement);
  document.getElementsByName('input')[0].focus();
}

function guessLetter() {
  const guessedLetter = this.value.toLowerCase();
  let letterFound = false;
  for (let i = 0; i < correctWord.length; i++) {
      if (correctWord[i] === guessedLetter) {
          revealedWord = revealedWord.substr(0, i) + guessedLetter + revealedWord.substr(i + 1);
          letterFound = true;
      }
  }
  document.querySelector('.word').innerText = revealedWord;
  // Update the counter
  if (!letterFound) {
      wordGuesses++;
      document.querySelector('.tries-left').innerText = 'Intentos restantes: ' + (5 - wordGuesses);
      if (wordGuesses == 5) {
          alert('Game over!');
          thirdGame();
      }
  } else if (revealedWord === correctWord) {
    document.getElementById('last').classList.remove('disabled');
    document.getElementById('third').innerText = 'N';
    fourthGame();
  }
  this.value = '';
}

function fourthGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const game = document.createElement('h1')
    game.innerHTML = 'Ya casi terminamos!';
    game.classList.add('title');
    gameBoard.appendChild(game);

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerText = 'El';
    gameBoard.appendChild(cardElement);
    
    const inputElement = document.createElement('input');
    inputElement.name = 'input';
    inputElement.type = 'text';
    inputElement.style.border = '1px solid black';
    inputElement.addEventListener('keypress', guessAnimal);
    gameBoard.appendChild(inputElement);

    const cardElement2 = document.createElement('div');
    cardElement2.classList.add('card');
    cardElement2.innerText = '\u03A0 O';
    gameBoard.appendChild(cardElement2);
    document.getElementsByName('input')[0].focus();
}

function guessAnimal() {
    if (event.keyCode !== 13) return;
    if (this.value.toLowerCase() === 'pollito') {
        document.getElementById('last').innerText = 'A';
        document.getElementById('game-board').innerHTML = '';
    } else {
        alert('¡Inténtalo de nuevo!');
    }
    this.value = '';
}


firstBoard();
