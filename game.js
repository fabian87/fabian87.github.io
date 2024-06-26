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
        setTimeout(nextGame, 500);
    } else {
        this.style.backgroundColor = 'red';
        this.classList.add('disabled');
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
let guessedLetters = [];
let revealedWord;

function thirdGame() {
    guessedLetters = [];
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const game = document.createElement('h1')
    game.innerHTML = 'Encuentra el animal!';
    game.classList.add('title');
    correctWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    revealedWord = correctWord.split('').map(() => '_ ').join('');
    correctWord = correctWord.split('').map((letter) => letter + ' ').join('');
    gameBoard.appendChild(game);

    const wordElement = document.createElement('div');
    wordElement.classList.add('word');
    wordElement.innerText = revealedWord;
    gameBoard.appendChild(wordElement);

    // Add a counter for tries left
    const triesLeftElement = document.createElement('div');
    triesLeftElement.classList.add('tried-letters');
    triesLeftElement.style.color = 'red';
    triesLeftElement.innerText = 'Intentos: ';
    gameBoard.appendChild(triesLeftElement);

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
    const guessedLetter = this.value.toUpperCase();
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
        if (guessedLetters.includes(guessedLetter)){
            this.value = '';
            return;
        }
        guessedLetters.push(guessedLetter);
        document.querySelector('.tried-letters').innerText = 'Intentos: ' + guessedLetters.join(' - ');
        if (guessedLetters.size === 5) {
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

let attempts = 0;
function fourthGame() {
    let attempts = 0;
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    const game = document.createElement('h1')
    game.innerHTML = 'Ya casi, completa la frase!';
    game.classList.add('title');
    gameBoard.appendChild(game);

    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerText = 'El';
    gameBoard.appendChild(cardElement);

    const inputWrapper = document.createElement('div');
    inputWrapper.style.position = 'relative';

    const inputElement = document.createElement('input');
    inputElement.name = 'input';
    inputElement.type = 'text';
    inputElement.style.border = '1px solid black';
    inputElement.style.paddingRight = '40px'; // Make room for the icon
    inputElement.addEventListener('keypress', (event) => enterKeyPressed(event, inputElement));
    inputWrapper.appendChild(inputElement);

    // Create a submit icon
    const submitIcon = document.createElement('i');
    submitIcon.className = 'fa fa-paper-plane';
    submitIcon.attributes['aria-hidden'] = 'true';
    submitIcon.style.position = 'absolute';
    submitIcon.style.right = '20px';
    submitIcon.style.top = '50%';
    submitIcon.style.transform = 'translateY(-50%)';
    submitIcon.style.cursor = 'pointer';
    submitIcon.style.fontSize = '40px';
    submitIcon.addEventListener('click', () => guessAnimal(inputElement));
    inputWrapper.appendChild(submitIcon);

    gameBoard.appendChild(inputWrapper);

    const cardElement2 = document.createElement('div');
    cardElement2.classList.add('card');
    cardElement2.innerText = '\u03C0';
    cardElement2.style.fontSize = '650%';
    gameBoard.appendChild(cardElement2);

    const cardElement3 = document.createElement('div');
    cardElement3.classList.add('card');
    cardElement3.innerText = 'O';
    gameBoard.appendChild(cardElement3);
    document.getElementsByName('input')[0].focus();
}

function enterKeyPressed(event, inputElement) {
    if (event.keyCode === 13) {
        guessAnimal(inputElement);
    }
}

function guessAnimal(inputElement) {
    if (inputElement.value.trim().toLowerCase() === 'pollito') {
        document.getElementsByClassName('title')[0].children.item(0).innerText = '¡Felicidades, es!';
        document.getElementById('last').innerText = 'A';
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        const imageElement = document.createElement('img');
        imageElement.src = './imagen.jpeg';
        imageElement.className = 'animated-image';
        gameBoard.appendChild(imageElement);
        confetti();
    } else {
        attempts++;
        if (attempts >= 3) {
            alert('Una pista?\n "La gallina CO y ..."')
        } else {
            alert('¡Inténtalo de nuevo!');
        }
    }
    this.value = '';
}


function confetti() {
    // Create a confetti configuration
    var confettiSettings = { target: 'confetti', size: 1.8, max: 200};
    // Create a confetti instance
    var confetti = new ConfettiGenerator(confettiSettings);

    // Start the confetti animation
    console.log('Confetti!');
    confetti.render();
}

firstBoard();
