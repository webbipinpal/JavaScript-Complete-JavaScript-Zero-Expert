'use strict';

//#Coding Challenge #3
/* Rewrite the 'calcAverageHumanAge' function from Challenge #2, but this time
as an arrow function, and using chaining! */

/* Test data:
Data 1: [5, 2, 4, 1, 15, 8, 3]
Data 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀 */

// const calcAverageHumanAge1 = function(ages){
//   const humanAge = ages.map((age) => age <= 2 ? 2 * age : 16 + age * 4);
//   const adult = humanAge.filter((ave) => ave >= 18);
//   const average = adult.reduce((acc, curr) => acc + curr, 0) / adult.length;
//   return average;
// }

const calcAverageHumanAge = ages => ages.map((age) => age <= 2 ? 2 * age : 16 + age * 4).filter((ave) => ave >= 18).reduce((acc, curr, i, arr) => acc + curr / arr.length, 0);

const ave1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const ave2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(ave1, ave2);