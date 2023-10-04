'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
   '2022-11-18T21:31:17.178Z',
   '2022-12-23T07:42:02.383Z',
   '2023-01-28T09:15:04.904Z',
   '2023-04-01T10:17:24.185Z',
   '2023-05-08T14:11:59.604Z',
   '2023-05-27T17:01:17.194Z',
   '2023-07-11T23:36:17.929Z',
   '2023-07-12T10:51:36.790Z',
 ],
 currency: 'EUR',
 locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
   '2019-11-01T13:15:33.035Z',
   '2019-11-30T09:48:16.867Z',
   '2019-12-25T06:04:23.907Z',
   '2020-01-25T14:18:46.235Z',
   '2020-02-05T16:33:06.386Z',
   '2020-04-10T14:43:26.374Z',
   '2020-06-25T18:49:59.371Z',
   '2020-07-26T12:01:20.894Z',
 ],
 currency: 'USD',
 locale: 'en-US',
};
const account3 = {
   owner: 'Bipin Kumar Pal',
   movements: [8600, 4300, -198, -450, -4567, -10000, 5600, -42],
   interestRate: 1.5,
   pin: 3333,
   movementsDates: [
    '2020-11-01T13:15:33.035Z',
    '2021-11-30T09:48:16.867Z',
    '2022-12-25T06:04:23.907Z',
    '2023-01-25T14:18:46.235Z',
    '2023-02-05T16:33:06.386Z',
    '2023-04-10T14:43:26.374Z',
    '2023-06-25T18:49:59.371Z',
    '2023-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'hi-IN',
 };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

const accounts = [account1, account2, account3];

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


const currencyFormat = function(value, locale, currency){
   const options = {
      style: 'currency',
      unit: 'celsius',
      currency: currency
   }
   return Intl.NumberFormat(locale, options).format(value);
}


const formateMovementsDays = function(date, locale){
   const calcDaysPassed = (date1, date2) => 
   Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
   
   const daysPassed = calcDaysPassed(new Date(), date);
   if(daysPassed === 0) return 'Today';
   if(daysPassed === 1) return 'Yestarday';
   if(daysPassed <= 7) return `${daysPassed} days ago`
   else{
      // const day = `${date.getDate()}`.padStart(2, 0);
      // const month = `${date.getMonth() + 1}`.padStart(2, 0);
      // const year = date.getFullYear();

      return new Intl.DateTimeFormat(locale).format(date) ;
   }
}

const displayMovements = function(acc, sort = false) {
   containerMovements.innerHTML = '';
   const movs = sort ? acc.movements.slice('').sort((a, b) => a - b) : acc.movements;
   
   movs.forEach(function(mov, i){
      const type = mov > 0 ? 'deposit' : 'withdrawal' ;
      const date = new Date(acc.movementsDates[i]);
      const displaydate = formateMovementsDays(date, acc.locale);
      const html = `
      <div class="movements__row">
      <div class="movements__type movements__type--${type}">
         ${i} ${type}
      </div>
      <div class="movements__date">${displaydate}</div>
      <div class="movements__value">${currencyFormat(mov, acc.locale, acc.currency)}</div>
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
   labelBalance.textContent = currencyFormat(acc.balance, acc.locale, acc.currency);
}


// display desposits widthraw and interest
const calcDisplaySummary = function(acc){
   const desposits = acc.movements.filter(cas => cas > 0 ).reduce((acc, curr) => acc + curr, 0);
   labelSumIn.textContent = `${currencyFormat(desposits, acc.locale, acc.currency)}`;

   const withdraw = acc.movements.filter(cas => cas < 0).reduce((acc, curr) => acc + curr, 0);
   labelSumOut.textContent = `${currencyFormat(withdraw, acc.locale, acc.currency)}`;

   const interest = acc.movements.filter(cas => cas > 0).map(desp => (desp * acc.interestRate)/100).filter(cas => cas >= 1).reduce((acc, curr) => acc + curr, acc.movements[0]);
   labelSumInterest.textContent = `${currencyFormat(interest, acc.locale, acc.currency)}`;
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
   displayMovements(updateui);
   // calcDisplayMovements
   calcDisplayMovements(updateui);
   // calcDisplaySummary
   calcDisplaySummary(updateui);
}


const startLogoutTimer = function(){
   const tick = () => {
      const min = String(Math.trunc(time / 60)).padStart(2, 0);
      const sec = String(Math.trunc(time % 60)).padStart(2, 0);
      labelTimer.textContent = `${min}:${sec}`;
      
      if(time === 0){
         clearTimeout(timer);
         labelWelcome.textContent = "Login to get started";
         containerApp.style.opacity = 0;
      }
      time--;
   }
   let time = 120;
   tick();
   const timer =  setInterval(tick, 1000);
   return timer;
}
//////////////////////////////
/* 
## login and display ui feature 
*/
let currentUser, timer;
// FAKE ALWASY LOGIN

currentUser = account1;
updateUI(currentUser)
containerApp.style.opacity = 100;

// default date here
const todayDate = new Date();
// labelDate.textContent = `${todayDate.getDate()}/${todayDate.getMonth() + 1}/${todayDate.getFullYear()}`;
const IntTimeForm = {
   hour: 'numeric',
   minute: 'numeric',
   day: 'numeric',
   month: 'numeric',
   year: 'numeric',
   weekday: 'short'
}
const locale = navigator.language; 
labelDate.textContent = new Intl.DateTimeFormat(locale, IntTimeForm).format(todayDate);


btnLogin.addEventListener('click', function(e){
   e.preventDefault();
   currentUser = accounts.find((acc) => acc.username === inputLoginUsername.value)
   if(currentUser?.pin == +(inputLoginPin.value)){
      labelWelcome.textContent = `Welcome back ${currentUser.owner.split(' ')[0]}`;
   }
   containerApp.style.opacity = 100;

   //Add date under the current balance
   const todayDate = new Date();
   // const day = `${todayDate.getDate()}`.padStart(2, 0);
   // const month = `${todayDate.getMonth() + 1}`.padStart(2, 0);
   // const year = todayDate.getFullYear();
   // const hours = `${todayDate.getHours()}`.padStart(2, 0);
   // const min = `${todayDate.getMinutes()}`.padStart(2, 0);
   // labelDate.textContent = `${day}/${month}/${year}, ${hours}:${min}`;
   const IntTimeForm = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      weekday: 'short'
   }
   const locale = currentUser.locale; 
   labelDate.textContent = new Intl.DateTimeFormat(locale, IntTimeForm).format(todayDate);
   // Clear input fields
   inputLoginPin.value = '';
   inputLoginUsername.value = '';

   // Clear Timer
   if(timer){
      clearInterval(timer)
   }
   timer = startLogoutTimer();

   //Update UI
   updateUI(currentUser);

});

// Transfer amount to other account
btnTransfer.addEventListener('click', function(e){
   e.preventDefault();
   const amount = +(inputTransferAmount.value);
   const resiverAcc = accounts.find((acc) => acc.username === inputTransferTo.value);

   // Clear input fields
   inputTransferAmount.value = inputTransferTo.value = '';

   if(amount > 0 && resiverAcc && amount <= currentUser.balance && resiverAcc.username !== currentUser.username){
      currentUser.movements.push(-amount);
      resiverAcc.movements.push(amount);
      
      currentUser.movementsDates.push(new Date().toISOString());
      resiverAcc.movementsDates.push(new Date().toISOString());

      //Update UI
      updateUI(currentUser);

      // clear Timer
      clearInterval(timer);
      timer = startLogoutTimer();
   }
});

// loan account
btnLoan.addEventListener('click', function(e){
   e.preventDefault();
      const amount = Math.floor(inputLoanAmount.value);
      if(amount > 0 && currentUser.movements.some(mov => mov >= amount / 10)){
         setTimeout(() => {
            currentUser.movements.push(amount);
            currentUser.movementsDates.push(new Date().toISOString());
            //Update UI
            updateUI(currentUser);
            
            // clear Timer
            clearInterval(timer);
            timer = startLogoutTimer();
         }, 2000)
      }
      // Clear input fields
      inputLoanAmount.value = '';
})
// delete account 
btnClose.addEventListener('click', function(e){
   e.preventDefault();
   if(inputCloseUsername.value === currentUser.username && +(inputClosePin.value) === currentUser.pin){
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

/* 
// Number, parseInt, parseFloat, isNaN, isFinite, isInteger 
*/
/* 
//Conversion
console.log('23');
console.log(Number('23'));
console.log(+('23'));
console.log(+('23'));

//Parsing
console.log('Parsing')
console.log(Number.parseInt('23bipi'));
console.log(Number.parseInt('23.4'));

console.log(Number.parseFloat('2.4qwewe'))
console.log(Number.parseFloat('sdsd2.4'))

// if it isNaN
console.log('isNaN')
console.log(Number.isNaN("NaN"));
console.log(Number.isNaN(undefined));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(20));
console.log(Number.isNaN(+'20x'));

// if isFinite
console.log('isFinite')
console.log(Number.isFinite(20))
console.log(Number.isFinite('20'))
console.log(Number.isFinite(undefined))
console.log(Number.isFinite('Bipin'))
console.log(Number.isFinite(+'20'));

//if isInteger
console.log('isInteger');
console.log(Number.isInteger('20'));
console.log(Number.isInteger(20));
console.log(Number.isInteger(+'20')); */

/* // Math and Rounding
 */

/* console.log(Math.sqrt(25));
console.log(25 ** (1/2));
console.log(8 ** (1/3));

console.log(Math.max(3, 5, 4, 8, '23'))
console.log(Math.max(3, 5, 4, 8, 23));
console.log(Math.max(3, 5, 4, 8, '23px'));

console.log(Math.min('3', 5, 4, 8, 23))
console.log(Math.min(3, 5, 4, 8, 23));
console.log(Math.min('3px', 5, 4, 8, 23));

 console.log(Math.PI * Number.parseFloat('10px') ** 2);

 console.log(Math.trunc(Math.random() * 6 ) + 1);

 const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min;
 }
 console.log(randomInt(10, 20));

 //Rounding integers

console.log(Math.round(24.3));
console.log(Math.round(24.9));

console.log(Math.ceil(23.2));
console.log(Math.ceil(23.9));

console.log(Math.floor(23.2));
console.log(Math.floor(23.9));

console.log(Math.floor(23.2));
console.log(Math.floor('23.9'));

console.log(Math.trunc(23.3));

console.log(Math.trunc(-25.3));
console.log(Math.floor(-25.9));

//rounding decimals

console.log(2.7.toFixed(0));
console.log(2.7.toFixed(3));
console.log(2.234.toFixed(2));
console.log(+(2.78).toFixed(2)); */

/* 
// Remainder operator 
*/

/* console.log(5 % 2); // 5 = 2 * 2 + 1
console.log(5 / 2);

console.log(8 % 3);
console.log(8 / 3); // 8 = 3 * 2 + 2

console.log(7 % 2);
console.log(7 / 2); // 8 = 3 * 2 + 1

const isEven = n => n % 2 === 0;
console.log(isEven(20));
console.log(isEven(23));
console.log(isEven(27));

labelBalance.addEventListener('click', function(){
   [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
      if(i % 2 === 0){
         row.style.backgroundColor= 'orange'
      }else{
         row.style.backgroundColor= 'lightyellow'
      }
   });
}); */

/* 
// Numeric Separators 
*/
/* const diameter = 287_460_000_000;
console.log(diameter);

const price = 345_99;
console.log(price);

const transferfee = 15_00;
const transferfee1 = 1_500;
console.log(transferfee, transferfee1)

const PI = 3.1415;
console.log(PI);

console.log(Number(231_23_23));
console.log(parseInt(34_34_3)) */

/* 
// Working with BigInt
*/
/* 
console.log(Number.MAX_SAFE_INTEGER);
console.log(2 ** 53 -1);
console.log(2 ** 53 +1);
console.log(2 ** 53 +2);
console.log(2 ** 53 +3);
console.log(2 ** 53 +4);

console.log(123456789123456789123456789n);
console.log(BigInt(123456789123456789123456789123456789))

//Operation
console.log(10000n * 10000n);
console.log(12321342423452345346457865865756445n * 10000000n);

const huge = 1278048750834758454573485458405834758457305n;
const num = 23;

console.log(huge * BigInt(num));

//Exceptions

console.log(20n > 15);
console.log(20 > 15n);
console.log(20n === 20);
console.log(20n == 20);
console.log(typeof(20n));
console.log(20n === '20');

console.log(huge + ' is REALLY big!!!');

//Divisions
// console.log(11n / 3); not working
console.log(11n / 3n);
console.log(12n / 3n);
console.log(10 / 3); */

// Creating Dates
/* 
const newdate = new Date();
console.log(newdate);

console.log(new Date(2023, 11, 11, 15, 5, 9));
console.log(new Date('August 24, 2014'));
console.log(new Date('Sun Aug 24 2014 12:32:33'));
console.log(new Date(account1.movementsDates[0]))

console.log(new Date(2023, 9, 16));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

//Working with Dates
console.log('------Working with Dates----')
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMinutes());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(2142246180000));
console.log(Date.now());
future.setFullYear(2040);
console.log(future); */

/* 
// Operations With Dates
 */

/* const future1 = new Date(2037, 10, 19);
console.log(future1)
console.log(Number(future1));

const calcDaysPassed = (date1, date2) => {
   return Math.abs(Math.round((date1 - date2) / (1000 * 60 * 60 * 24)))
};

const days1 = calcDaysPassed(new Date(2037, 10, 14), new Date(2037, 10, 22));
console.log(days1); */


/* 
// Internationalizing Numbers (Intl) 
*/

/* const num = 2324545.76;
const options = {
   style: 'currency',
   unit: 'celsius',
   currency: 'EUR'
}

console.log('US: ' + Intl.NumberFormat('en-US', options).format(num));
console.log('GB: ' + Intl.NumberFormat('en-GB', options).format(num));
console.log('QA: ' + Intl.NumberFormat('ar-QA', options).format(num));
console.log('IN: ' + Intl.NumberFormat('hi-IN', options).format(num));
console.log(navigator.language + ': ' + Intl.NumberFormat(navigator.language, options).format(num)); */

// Timers: setTimeout and setInterval
/* 
setTimeout(() => console.log('setTimeout'), 1000);
console.log('Hi without setTimeout');

// setInterval(() => {
//    console.log(new Date())
// }, 1000)
const ingredients = ['olives', 'spinach'];
const pizzaTimer = setTimeout((ing1, ing2) => {
   console.log(`Here is your pizza with ${ing1} and ${ing2}`)
}, 3000, ...ingredients);

if(ingredients.includes('spinach')){
   clearTimeout(pizzaTimer);
}; */