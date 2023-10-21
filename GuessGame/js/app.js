let cardSymbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle", "fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bomb", "fa-bicycle"]
let visibleCard;
let firstCard;
let secondCard;
let matchCardnumber = 0;
let movescount = 0;
let stars = [document.querySelectorAll('.fa-star')];
let ratingvalue = 0;
let timercount = new Timer();


function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function generateGameBoard() {

    let cardItemList = shuffle(cardSymbols);
  

    cardItemList.forEach(function (cardClassName, index) {
    

        let cardDeck = document.querySelector(".deck");
        let cardItem = document.createElement("li");


        cardItem.setAttribute('id', index);
        cardItem.setAttribute('name', cardClassName);
        cardItem.classList.add("card");
        
        cardItem.setAttribute('onclick', 'startGame(this)');

        let symbolsItem = document.createElement("i");
        symbolsItem.classList.add("fa");
        symbolsItem.classList.add(cardClassName);

        cardItem.appendChild(symbolsItem);
        cardDeck.appendChild(cardItem);
       
    });

};


function startGame(tempCard) {

    timer();

    tempCard.classList.add('open');
    tempCard.classList.add('show');

  
    if (firstCard && secondCard) {
      

        firstCard.classList.remove('open');
        firstCard.classList.remove('show');

        secondCard.classList.remove('open');
        secondCard.classList.remove('show');

        firstCard = null;
        secondCard = null;

    }
  
    if (!visibleCard) {

        visibleCard = tempCard;
        movescount++;
     
        
        moveCounter();
    } else {
      
        let item = {
            id: tempCard.getAttribute('id'),
            name: tempCard.getAttribute('name')
        };

        if (checkMatchCard(item)) {

            tempCard.classList.add('match');
            tempCard.removeAttribute('onclick');

            visibleCard.classList.add('match');
            visibleCard.removeAttribute('onclick');

            matchCardnumber += 1;
        
            gameOver();
        }

        firstCard = tempCard;
        secondCard = visibleCard;
        visibleCard = null;

        
        clearSelectedCards();
    }
}

function checkMatchCard(item) {
    let card = {
        id: visibleCard.getAttribute('id'),
        name: visibleCard.getAttribute('name'),
        cardIsOpen: visibleCard.classList.contains('open')
    };

    return (item.name === card.name && item.id !== card.id && card.cardIsOpen);
}


function clearSelectedCards() {
    setTimeout(() => {
        if (firstCard) {
            firstCard.classList.remove('open');
            firstCard.classList.remove('show');
            firstCard = null;
        }

        if (secondCard) {
            secondCard.classList.remove('open');
            secondCard.classList.remove('show');
            secondCard = null;
        }
    }, 1000);
}



function gameOver() {
    
    if (matchCardnumber == 8) {

        let modal = document.querySelector('.popup');
        let close = document.querySelector('.close');

        document.querySelector("#moves").textContent = movescount;
        document.querySelector("#rating").textContent = ratingvalue;
        document.querySelector('#timer').textContent = timercount.getTimeValues().toString();

      
        modal.style.display = "block";

        close.onclick = function () {
            modal.style.display = "none";
            location.reload()
        }
    }
}


function moveCounter() {

    let movesContainer = document.querySelector('.moves');
    movesContainer.textContent = movescount;
    rating();
};



function playAgain() {

    let restartbtn = document.querySelector('.restart');
    restartbtn.onclick = function () {
        location.reload();
    }

}

function rating() {
  
    for (star of stars) {
       
        if (movescount === 20) {
            star[2].classList.remove("gold-star");
            ratingvalue = "  Diamond " + 2;
        } else if (movescount === 25) {
            star[1].classList.remove("gold-star");
            ratingvalue = " Gold " + 1;
        } else if (movescount === 30) {
            star[0].classList.remove("gold-star");
        } else if (movescount <= 19) {
            ratingvalue = " Silver " + 3;
        }
    }

}



 function timer() {
   
    timercount.start();
    timercount.addEventListener('secondsUpdated', function (e) {

        let basicUsagetimer = document.querySelector('#basicUsage');
        basicUsagetimer.textContent = timercount.getTimeValues().toString();
    });

};




generateGameBoard();
playAgain();



