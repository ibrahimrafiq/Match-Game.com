function createNewCard() {
	  const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <div class="card-down"></div>
      <div class="card-up"></div>
    `;
    return card;
  }
createNewCardTest();



function appendNewCard(parentElement) {
	 const newCard = createNewCard();
    parentElement.appendChild(newCard);
  return newCard;
  }
appendNewCardTest();



function shuffleCardImageClasses() {
  
  let imageClasses = [
    "image-1", "image-1",
    "image-2", "image-2",
    "image-3", "image-3",
    "image-4", "image-4",
    "image-5", "image-5",
    "image-6", "image-6",
  ];

  return _.shuffle(imageClasses);
}
shuffleCardImageClassesTest()



function createCards(parentElement, shuffledImageClasses)  {
  const cards = [];

  for (let i = 0; i < 12; i++) {
    const card = appendNewCard(parentElement);
    card.classList.add(shuffledImageClasses[i]);
    
    const cardObject = {
      index: i,
      element: card,
      imageClass: shuffledImageClasses[i],
    };
    
    cards.push(cardObject);
  }

  return cards;
}
createCardsTest();




function doCardsMatch(cardObject1, cardObject2) {
  return cardObject1.imageClass === cardObject2.imageClass;
}

doCardsMatchTest();




let counters = {};

function incrementCounter(counterName, parentElement) {
{
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}
	

}
incrementCounterTest();




let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  incrementCounter("flips", document.getElementById("flip-count"));

  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  if (doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    incrementCounter("matches", document.getElementById("match-count"));
    
    lastCardFlipped.element.classList.add("matched");
    newlyFlippedCard.element.classList.add("matched");

    if (counters.matches === 6) {
      winAudio.play();
    } else {
      matchAudio.play();
    }
  } else {
    
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
  }

  lastCardFlipped = null;
}




function resetGame() {

  const cardContainer = document.getElementById("card-container");
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }


  const flipCountElement = document.getElementById("flip-count");
  const matchCountElement = document.getElementById("match-count");
  flipCountElement.innerText = "0";
  matchCountElement.innerText = "0";


  counters = {};

  lastCardFlipped = null;


  setUpGame();
}



setUpGame();
