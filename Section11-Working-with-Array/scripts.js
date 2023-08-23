'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movement, sort = false) {
   containerMovements.innerHTML = '';
   const movs = sort ? movement.slice('').sort((a, b) => a - b) : movement;
   movs.forEach(function(mov, i){
      const type = mov > 0 ? 'deposit' : 'withdrawal' ;
      const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">
         ${i} ${type}
      </div>
      <div class="movements__value">${mov}€</div>
      </div>
      `
      containerMovements.insertAdjacentHTML("afterbegin", html);
   })
};

// Display all balance
const calcDisplayMovements = function(acc){
   acc.balance = acc.movements.reduce(function(acc, mov){
      return acc += mov
   }, 0);
   labelBalance.textContent = `${acc.balance}€`;
}


// display desposits widthraw and interest
const calcDisplaySummary = function(acc){
   const desposits = acc.movements.filter(cas => cas > 0 ).reduce((acc, curr) => acc + curr, 0);
   labelSumIn.textContent = `${desposits}€`;
   const withdraw = acc.movements.filter(cas => cas < 0).reduce((acc, curr) => acc + curr, 0);
   labelSumOut.textContent = `${Math.abs(withdraw)}€`;
   const interest = acc.movements.filter(cas => cas > 0).map(desp => (desp * acc.interestRate)/100).filter(cas => cas >= 1).reduce((acc, curr) => acc + curr, acc.movements[0]);
   labelSumInterest.textContent = `${interest}€`;
}

//create username
const createUsername = function(accs){
   accs.forEach((acc) => {
      acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
   });
}
createUsername(accounts);

const updateUI = function(updateui) {
   // displayMovements
   displayMovements(updateui.movements);
   // calcDisplayMovements
   calcDisplayMovements(updateui);
   // calcDisplaySummary
   calcDisplaySummary(updateui);
}

/* 
## login and display ui feature 
*/
let currentUser;
btnLogin.addEventListener('click', function(e){
   e.preventDefault();
   currentUser = accounts.find((acc) => acc.username === inputLoginUsername.value)
   if(currentUser?.pin == Number(inputLoginPin.value)){
      labelWelcome.textContent = `Welcome back ${currentUser.owner.split(' ')[0]}`;
   }
   inputLoginPin.value = '';
   inputLoginUsername.value = '';
   containerApp.style.opacity = 100;
   
   updateUI(currentUser);

});

// Transfer amount to other account
btnTransfer.addEventListener('click', function(e){
   e.preventDefault();
   const amount = Number(inputTransferAmount.value);
   const resiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);
   inputTransferAmount.value = inputTransferTo.value = '';

   console.log(amount, resiverAcc);

   if(amount > 0 && resiverAcc && amount <= currentUser.balance && resiverAcc.username !== currentUser.username){
      currentUser.movements.push(-amount);
      resiverAcc.movements.push(amount);
      updateUI(currentUser);
   }
});

// loan account
btnLoan.addEventListener('click', function(e){
   e.preventDefault();
   const amount = Number(inputLoanAmount.value);
   if(amount > 0 && currentUser.movements.some(mov => mov >= amount / 10)){
      currentUser.movements.push(amount);
      inputLoanAmount.value = '';
      updateUI(currentUser);
   }
})
// delete account 
btnClose.addEventListener('click', function(e){
   e.preventDefault();
   if(inputCloseUsername.value === currentUser.username && Number(inputClosePin.value) === currentUser.pin){
      const index = accounts.findIndex(acc =>
         acc.username === currentUser.username
      );
      console.log(index)
      accounts.splice(index, 1);
      containerApp.style.opacity = 0;
   }
   inputClosePin.value = '';
   inputCloseUsername.value = '';
   
});
//sorting
let sorted = false;
btnSort.addEventListener('click', function(e){
   e.preventDefault();
   displayMovements(currentUser.movements, sorted);
   sorted =! sorted;
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b', 'c', 'd', 'e'];
//slice
console.log(arr)
console.log(arr.slice(1, 3))
console.log(arr.slice(2, -1))
console.log(arr.slice(-1))
console.log(...arr)

// splice
let arrsp = ['a', 'b', 'c', 'd', 'e'];
// console.log(arrsp.splice(1, 3))
console.log(arrsp.splice(-1))
console.log(arrsp.splice(''))

// REVERSE
let arrre = ['g', 'h', 'i', 'j', 'f'];
console.log(arrre)
console.log(arrre.reverse())

//CONCAT

let arr1 = [1, 2, 3, 4]
let arr2 = ['Bipin', 'Kumar', 'Pal'];
console.log(arr1.concat(arr2));

//join
console.log(arr2.join(' - '));

*/

/*
//// for and forEach
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for(const movement of movements){
for(const [i, movement] of movements.entries()){
   if(movement > 0){
      console.log(`movement ${i+1}: you credit in your account ${movement}`);
      //break; the loop as your logical
   }else {
      console.log(`movement ${i+1}: you withdraw in your account ${Math.abs(movement)}`);
      //break; the loop as your logical
   }
}
console.log('---- forEach ----');
movements.forEach(function(movement, i, arr){
   if(movement > 0){
      console.log(`movement ${i+1}: you credit in your account ${movement}`);
   }else {
      console.log(`movement ${i+1}: you withdraw in your account ${Math.abs(movement)}`);
   }
   
})
*/

/*
//// forEach with Maps and Sets
*/

//map
/* const currencies = new Map([
   ['USD', 'United States dollar'],
   ['EUR', 'Euro'],
   ['GBP', 'Pound sterling'],
 ]);

 currencies.forEach(function(value, key, map){
   console.log(`${key}: ${value}`);
 });

 // Sets
 const currenciesUnique = new Set(['INR', 'USD', 'QAR', 'INR', 'USD']);
 console.log(currenciesUnique)
 currenciesUnique.forEach(function(value, key, arr){
   console.log(`${key}: ${value}`)
 }) */

 /* 
 ////Map 
 */
 const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
 const eurtoUSD = 1.1;
/*  

//  const movementsUSD = movements.map(function(mov){
//    return mov * eurtoUSD;
//  })
const movementsUSD = movements.map(mov => mov * eurtoUSD);
 console.log(movements)
 console.log(movementsUSD);

 const movementsUSDSt = [];
//  for(const mov of movements){
//    movementsUSDSt.push(mov * eurtoUSD);
//  }
for(const mov of movements) movementsUSDSt.push(mov * eurtoUSD);
 console.log(movementsUSDSt);

 const movementDescription = movements.map((mov, i) => {
   const type = mov > 0 ? 'deposit' : 'withdraw';
   return `movement ${i+1}: you ${type} in your account ${Math.abs(mov)}`
 });

 console.log(movementDescription); */

 /* 
 //filter
  */

 /* const deposites = movements.filter(function(mov){
   return mov > 0;
 });
 console.log(deposites);
 console.log(movements);

 let depositesFor = []
 for(const mov of movements){
   if(mov < 0){
      depositesFor.push(mov);
   }
 }
 console.log(depositesFor);

 const withdraw = movements.filter((mov) => {
   return mov < 0;
 });
 console.log(withdraw); */

/*  
// reduce 
*/

//accumulator = acc
/* const calcDiplayMovements = movements.reduce(function(acc, curr, i, array){
   return acc + curr;
}, 0); */
/* const calcDiplayAllMovements = movements.reduce((acc, curr) => acc + curr, 0);
console.log(calcDiplayAllMovements);

// for
let balance = 0 
for(const mov of movements){
   balance+=mov
}
console.log(balance);

//Max value
const balance2 = movements.reduce(function(acc, mov){
   if(acc > mov){
      return acc
   }else {
      return mov
   }
}, movements[0]);
console.log(balance2);
//Min value
const balance3 = movements.reduce(function(acc, mov){
   if(acc < mov){
      return acc
   }else {
      return mov
   }
}, movements[0]);
console.log(balance3); */

// filter, map , reduce

// const totalDepositsUSD = movements.filter((mov) => mov > 0).map((mov) => mov * eurtoUSD).reduce((acc, curr) => acc + curr);

// console.log(totalDepositsUSD)

/* 
// find 
*/

/* const findwithdrawal = movements.find( mov => mov <0);
console.log(movements);
console.log(findwithdrawal);

const findaccount = accounts.find(acc => acc.owner === 'Sarah Smith');
console.log(findaccount);

const findName = function(acc){
   for(const wname of acc){
      if(wname.owner === 'Steven Thomas Williams'){
         console.log(wname);
      }
   }
}
findName(accounts);
*/

/* 
## find missing number
//tpey 1
*/
/* let arr = [1, 2, 3, 5, 6, 8];
let arrNum = arr[arr.length -1];
let missing = [];
for(let i = 1; i < arrNum; i++){
   if(arr.indexOf(i) == -1){
      missing.push(i);
   }
}
console.log(missing.toString()) */

// type 2 
/* const findMissingNumber = (arr) => {
   for (let i = 1; i <= arr.length; i++) {
     if (arr[i - 1] !== i) {
       return i;
     }
   }
 }
 const arr1 = [1, 2, 3, 5, 6, 8, 10];
 console.log(findMissingNumber(arr1)); */
// type 3 
/* let arr0 = [1, 3, 3, 3, 5];
let arr1 = [1, 2, 3, 4, 4, 7, 7];
let misArr = [];
const findMissingArr = function(arr){
   for(let i = 1; i <= arr1.length; i++ ){
      if(arr[i - 1] !== i){
         misArr.push(i)
      }
   }
}
findMissingArr(arr1);
console.log(misArr.toString());
let arr2 = [4, 3, 7, 8, 2, 1];
console.log(arr2.sort()); */

// type 4 only one letter returning first

/* let arr0 = [1, 2, 3, 5, 6];
let total = ((arr0.length + 1) * (arr0.length + 2))/ 2;
let miss = [];
for(let i=0; i < arr0.length; i++ ){
   total = total - arr0[i];
}
console.log(total); */

// type 5

/* const missingarr = function(arr){
   const minArr = Math.min(...arr);
   const maxArr = Math.max(...arr);
   let miss = [];
   for(let i=minArr; i < maxArr; i++){
      if(arr.indexOf(i) < 0){
         miss.push(i)
      }
   }
   return miss.toString();
}
console.log(missingarr([1, 2, 3, 5, 6, 8])) */


/* 
## some
*/

/* console.log(movements);
console.log(movements.includes(-130));

console.log(movements.some(elm => elm < 0));
console.log(movements.some(elm => elm > 0));
console.log(movements.some(elm => elm === -132));
const anyDeposites = movements.some(elm => elm > 0);
console.log(anyDeposites); */

/* 
## every
*/
/* 
console.log(movements.every(elm => elm > 0));
console.log(account4.movements.every(elm => elm > 0));

// seprate callback
const desposit = mom => mom < 0;
console.log(movements.some(desposit));
console.log(movements.every(desposit));
console.log(movements.filter(desposit)); */

/* 
## flat
*/
// const arr = [[1, 2, 3], [4, 5, 6], [7, 8]];
// console.log(arr.flat());
// const arr1 = [[[1, 2], 3], [4, [5, 6]], [7, 8]];
// console.log(arr1.flat());
// console.log(arr1.flat(2));

// const allMovementArr = accounts.map(mov => mov.movements);
// console.log(allMovementArr);
// const allMovementArrMerge = allMovementArr.flat()
// console.log(allMovementArrMerge)
// const culcMovement = allMovementArrMerge.reduce((acc, mov) => acc += mov, 0);
// console.log(culcMovement)

// //chaning 
// const allMovementCount = accounts.map(mov => mov.movements).flat().reduce((acc, mov) => acc += mov, 0);
// console.log(allMovementCount);

/* 
## flatMap
*/
// const allMovementCount1 = accounts.flatMap(mov => mov.movements).reduce((acc, mov) => acc += mov, 0);
// console.log(allMovementCount1);

/* 
## sorting Array
*/

/* const sortArr = ['Priya', 'Soni', 'Bipin', 'Piyush', 'Ambika'];
const sortNo = [3, 5, 7, 2, 1, 4];
console.log(sortArr);
console.log(sortArr.sort());
console.log(sortNo);
console.log(sortNo.sort());

const movNo = movements.slice('');
console.log(movNo);
console.log(movNo.sort())

// return a < 0 A B (keep order)
// return a > 0 B A (switch order)
movNo.sort((a, b) => {
   if(a < b) return 1;
   if(a > b) return -1;
});
console.log(movNo);


movNo.sort((a, b) => {
   if(a < b) return -1;
   if(a > b) return 1;
});
console.log(movNo)
console.log('--- arrow ----')
console.log(movNo.sort((a, b) => b - a))
console.log(movNo.sort((a, b) => a - b)) */

/* 
## fill() and from() 
*/
/* const x = [1, 2, 3, 4, 5, 6];
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(x);
console.log(new Array([4, 5, 6, 7, 8, 9]));
console.log(x.fill(7, 2, 4));

arr.fill(23, 2, 5);
console.log(arr);

const y = Array.from({ length: 7 }, () => 1);
console.log(y)
const z = Array.from({length: 7}, (curr, i) => i + 1);
console.log(z)

labelBalance.addEventListener('click', function(){
   const updateUI = Array.from(document.querySelectorAll('.movements__value'));
   console.log(updateUI.map( (el) => Number(el.textContent.replace('€', ''))));
});

labelBalance.addEventListener('click', function(){
   const updateUI = Array.from(document.querySelectorAll('.movements__value'), el => Number(el.textContent.replace('€', '')));
   console.log(updateUI);
}) */


/* 
   // Array Methods Practice
*/
// 1. total number of deposit and withdrawals
/* const bankDeposit = accounts
.flatMap(mov => mov.movements)
.filter((des) => des > 0)
.reduce((acc, curr) => acc + curr, 0);

console.log(bankDeposit); */

// 2. count number of deposit 
/* const numbDeposit1000 = accounts
.flatMap(mov => mov.movements)
.filter(des => des >= 1000).length; */

/* const numbDeposit1000 = accounts
.flatMap(mov => mov.movements)
.reduce((count, cur) => {
   return cur >= 1000 ? count + 1 : count
}, 0);

console.log(numbDeposit1000); */

//3. count number of desposit and withdrawal

/* const sums = accounts
.flatMap(mov => mov.movements)
.reduce((sum, cur) => {
   //cur > 0 ? (sum.deposit += cur) : (sum.withdrawal += cur);
   sum[cur > 0 ? 'deposit' : 'withdrawal'] += cur;
   return sum;
}, {deposit : 0, withdrawal : 0});

console.log(sums); */

//4 convert title case excpit of some exceptions

const convertTitleCase = function(title){
   const capitzalize = str => str[0].toUpperCase() + str.slice(1);
   const exceptions = ['is', 'a', 'an', 'are', 'but', 'am', 'not', 'to', 'the', 'or', 'on', 'with', 'in', 'and'];

   //const titleCase = title.toLowerCase().split(' ').map(word => word[0].toUpperCase() + word.slice(1));
   const titleCase = title.toLowerCase().split(' ').map(word => exceptions.includes(word) ? word : capitzalize(word)).join(' ');
   return capitzalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but not to long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));