'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.getElementById('current--0');
const current1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// score condition
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;

let switchPlayer = function(){
   
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0EL.classList.toggle('player--active');
    player1EL.classList.toggle('player--active');
}

//Rolling dice function
btnRoll.addEventListener('click', function(){
   
    if(playing){
        let dice = Math.trunc(Math.random() * 6) + 1;
        diceEL.classList.remove('hidden');
        diceEL.src = `images/dice-${dice}.png`;

        if(dice !== 1){
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
        }else{
            //switch player
            switchPlayer();
        }
    }

});

//Hold scror and add on main score
btnHold.addEventListener('click', function(){
   if(playing){
    const totalScore = Number(document.getElementById(`score--${activePlayer}`).textContent);
    document.getElementById(`score--${activePlayer}`).textContent = currentScore + totalScore;
    current0EL.textContent = 0;

    if((currentScore + totalScore) >= 100){
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        diceEL.classList.add('hidden');
    }
    //Switch player
    switchPlayer();
   }
})

//start new game
btnNew.addEventListener('click', function(){
    playing = true;
    score0EL.textContent = 0;
    score1EL.textContent = 0;
    diceEL.classList.remove('hidden');
    currentScore = 0;
    activePlayer = 0;
    player0EL.classList.remove('player--winner');
    player1EL.classList.remove('player--winner');
    player0EL.classList.add('player--active');
    player1EL.classList.remove('player--active');
})