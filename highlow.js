const readlineSync = require('readline-sync');

function buildDeck() {
  const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  let deck = [];
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < ranks.length; j++) {
      let card = {
        suit: suits[i],
        rank: ranks[j],
        value: j,
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffle(deck) {
  let shuffledDeck = deck;
  let currentIndex = deck.length - 1;
  while (currentIndex !== 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    let temporaryValue = shuffledDeck[currentIndex];
    shuffledDeck[currentIndex] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temporaryValue;
    currentIndex--;
  }
  return shuffledDeck;
}

function compare(card1, card2) {
  return card1.value - card2.value;
}

function guess(card1, card2) {
  console.log(`The current card is the ${card1.rank} of ${card1.suit}`);
  let input = readlineSync.question(
    `Will the next card be higher (h) or lower (l)? `
  );
  if (input === 'h') {
    return compare(card1, card2) < 0;
  } else if (input === 'l') {
    return compare(card1, card2) > 0;
  } else {
    console.log(`it's either h or l bozo, you just lost a turn`);
    return false;
  }
}

function playGame() {
  let unshuffled = buildDeck();
  let deck=shuffle(unshuffled);
  let playerName = readlineSync.question(
    'Welcome friend.  Lemme get that name. '
  );
  let score = 0;
  let currentCard = deck.pop();
  while (score < 5 && 0 < deck.length) {
    let nextCard = deck.pop();
    console.log('-------------------------');
    if (guess(currentCard, nextCard)) {
      score += 1;
      console.log(`Congrats ${playerName}.  Your score is now ${score}.`);
    } else {
      console.log(`You didn't get it. Your score is still ${score}`);
    }
    currentCard = nextCard;
  }
  deck.length > 0
    ? console.log(`You've won sweetie`)
    : console.log(`You lost dumdum`);
}
playGame()
