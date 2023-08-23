'use strict';

// #Coding Challenge #4
// Write a program that receives a list of variable names written in underscore_case
// and convert them to camelCase.
// The input will come from a textarea inserted into the DOM (see code below to
// insert the elements), and conversion will happen when the button is pressed.
// Test data (pasted to textarea, including spaces):

// document.body.append(document.createElement('textarea'));
// document.body.append(document.createElement('button'));

function getButton () {
  const row = document.querySelector('textarea').value;
  const varName = row.split('\n');
  for (const [i, row] of varName.entries()) {
    const [first, secont] = row.toLowerCase().trim().split('_');
    const ourtput = `${first}${secont.replace(secont[0], secont[0].toUpperCase())}`;
    console.log(`${ourtput.padEnd(20)}${'*'.repeat(i + 1)}`)
  }
}

// Should produce this output (5 separate console.log outputs):
// underscoreCase ✅
// firstName ✅✅
// someVariable ✅✅✅
// calculateAge ✅✅✅✅
// delayedDeparture ✅✅✅✅✅
// Hints:
// § Remember which character defines a new line in the textarea 😉
// § The solution only needs to work for a variable made out of 2 words, like a_b
// § Start without worrying about the ✅. Tackle that only after you have the variable
// name conversion working 😉
// § This challenge is difficult on purpose, so start watching the solution in case
// you're stuck. Then pause and continue!
// Afterwards, test with your own test data!
// GOOD LUCK 😀