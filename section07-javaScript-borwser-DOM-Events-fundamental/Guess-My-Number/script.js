"use strict";

// console.log(document.querySelector('.message').textContent);
// document.querySelector('.message').textContent = 'Correct Number!';
// document.querySelector('.number').textContent = 13;
// document.querySelector('.score').textContent = 10;
// document.querySelector('.guess').value = 23;
// console.log(document.querySelector('.guess').value);

let secretNumber = Math.trunc(Math.random()*20 + 1);
let score = 20;
let highscore = 0;
const displayFunction = function(message){
    document.querySelector('.message').textContent  = message;
}

document.querySelector('.check').addEventListener('click', function(){
    const guess = Number(document.querySelector('.guess').value);
    console.log(guess, typeof guess);

    if(!guess){
        //document.querySelector('.message').textContent  = '🎇 Please Enter Number';
        displayFunction('🎇 Please Enter Number');
    } else if(guess === secretNumber){
        //When code is equal
        document.querySelector('.number').textContent = secretNumber; 
        //document.querySelector('.message').textContent = 'Correct Number!';
        displayFunction('Correct Number!');
        document.querySelector('body').style.backgroundColor = 'green';
        document.querySelector('.number').style.width = '30rem';
        if(score > highscore){
            highscore = score;
            document.querySelector('.highscore').textContent = highscore;
        }
    }else if(guess !== secretNumber){
    // When code is wrong
    if(score > 1){
        //document.querySelector('.message').textContent = guess > secretNumber ? 'Too High!' : 'Too Low!';
        displayFunction(guess > secretNumber ? 'Too High!' : 'Too Low!');
        score--;
        document.querySelector('.score').textContent = score;
       }else{
        //document.querySelector('.message').textContent = 'You lose the Game';
        displayFunction('You lose the Game');
        document.querySelector('.score').textContent = 0;
       }
    } 
    // else if(guess > secretNumber){
    //     if(score > 1){
    //         document.querySelector('.message').textContent = 'Too High!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //        }else{
    //         document.querySelector('.message').textContent = 'You lose the Game';
    //         document.querySelector('.score').textContent = 0;
    //        }
       
    // }else if(guess < secretNumber){
    //     if(score > 1){
    //         document.querySelector('.message').textContent = 'Too Low!';
    //         score--;
    //         document.querySelector('.score').textContent = score;
    //        }else{
    //         document.querySelector('.message').textContent = 'You lose the Game';
    //         document.querySelector('.score').textContent = 0;
    //        }
    // }
});

document.querySelector('.again').addEventListener('click', function(){
    secretNumber = Math.trunc(Math.random()*20 + 1);
    score = 20;
    document.querySelector('.number').textContent = '?';
    //document.querySelector('.message').textContent = 'Start guessing...';
    displayFunction('Start guessing...');
    document.querySelector('body').style.backgroundColor = '';
    document.querySelector('.number').style.width = '15rem';
    document.querySelector('.score').textContent = score;
    document.querySelector('.guess').value = ''
    
});