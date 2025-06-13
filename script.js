'use strict';
const score0El = document.querySelector('#score--0')
const score1El = document.querySelector('#score--1')
const diceEl = document.querySelector('.dice')
const btnRol = document.querySelector('.btn--roll')
const btnNew = document.querySelector('.btn--new')
const btnHold = document.querySelector('.btn--hold')
const current0El = document.querySelector('#current--0')
const current1El = document.querySelector('#current--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')

let playing, currentScore, scores, activePlayer, dice;

let init = function () {
    //starting game
    diceEl.classList.add('hidden');
    currentScore = 0
    //hold the score of both player in positoin
    scores = [0, 0]
    activePlayer = Math.trunc(Math.random() * 2);
    playing = true;

    score0El.textContent = 0;
    score1El.textContent = 0;
    //related to newGame btn
    current0El.textContent = 0;
    current1El.textContent = 0;
    player0El.classList.remove('player--active')
    player1El.classList.remove('player--active')
    activePlayer === 0 ? player0El.classList.add('player--active') : player1El.classList.add('player--active')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
}
init();

function swichPlayer() {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')

    setTimeout(function () {
        diceEl.classList.add('hidden')
    }, 750)
}

btnRol.addEventListener('click', function () {
    if (playing) {
        dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`;

        if (dice != 1) {
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        }
        else {
            swichPlayer();
        }
    }
})

btnHold.addEventListener('click', function () {
    if (playing && dice !== 1) {
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer]
        diceEl.classList.add('hidden')

        if (scores[activePlayer] >= 100) {
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
            playing = false
            diceEl.classList.add('hidden')
            document.getElementById(`score--${activePlayer}`).textContent = 'Winner !'
        }
        else {
            swichPlayer();
        }
    }
})

btnNew.addEventListener('click', init)

