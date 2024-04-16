// game.js
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
let cardElements = [];
let flippedCards = [];
let matchedPairs = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
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
            alert("It's a GIRL!!!");
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

createBoard();