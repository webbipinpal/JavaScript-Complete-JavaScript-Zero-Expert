'use strict'
/*
let bookings = [];
const ticktBooking = (flight = 'Air100', noPass = 1, price = 100) => {
 const booking = {
  flight,
  noPass,
  price : price * noPass
 }
 bookings.push(booking);
}
ticktBooking('Air 200', 2, 200);
ticktBooking('Air 200', 3, 300);
ticktBooking('Air 200', undefined, 300);
console.log(bookings)

*/

/*
const flight = 'Air902';
const bipin = {
 name: 'Bipin',
 passport: '123456789'
}

const chickin = (flightNum, passanger) => {
 if (passanger.passport === '123456789'){
    alert('Chicked In!');
 } else {
  alert('Your information is not correct. Please check it.');
 }

}

chickin(flight, bipin);
console.log(flight);
console.log(bipin);
*/

/* 
///function accepting callback function

*/

/*
const onward = function (str) {
 return str.replace(/ /g, '');
}

const uperfirstword = function (str) {
 const [first, ...others] = str.toLowerCase().split(' ');
 return [first.toUpperCase(), ...others].join(' ');
}

// Higer-order function
const transform = function (str, fn) {
 console.log(`Original String : ${str}`);
 console.log(`Transform String : ${fn(str)}`);
 console.log(`Transform String : ${fn.name}`);
}

transform('Bipin Kumar Pal', uperfirstword);
transform('Bipin Kumar Pal', onward);

//Use callback function all the time

const high5 = function(){
 console.log('Hello');
}

// document.getElementById('id1').addEventListener('click', high5);
document.body.addEventListener('click', () => {
 console.log('mouse click');
});
['Bipin', 'Kumar', 'Pal'].forEach(high5);
*/

/*
//// FUNCTION RETURNING FUNCTION
*/

// const greeting = (greeting) => {
//  return (name) => {
//   console.log(`${greeting} ${name}`)
//  }
// }

// // arrow

// const greetingArr = greeting => name => console.log(`${greeting} ${name}`);
// const storeGreating = greeting('Hello');
// storeGreating('Pal');
// greeting('Hey')('Bipin');
// greetingArr('Hi')('Kumar');


/*
//// THE CALL AND APPLY METHODS
*/

// const airindia = {
//  airlince: 'AirIndia',
//  iatacode: 'Air',
//  booking: [],
//  book (flightNum, name) {
//   console.log(
//    `${name} booked a seat on flight ${this.iatacode}${flightNum} `
//   )
//   this.booking.push({flight: `${this.iatacode}${flightNum}`, name});
//  }
// }
// airindia.book('702', "Bipin Kumar Pal");
// airindia.book('802', "Piyush Kumar Pal");
// console.log(airindia);

// const qa = {
//  airlince: 'Qatar Airways',
//  iatacode: 'QA',
//  booking: []
// }
// const indo = {
//  airlince: 'Indogo Airways',
//  iatacode: 'IN',
//  booking: []
// }

// const bookIn = airindia.book;
// bookIn.call(qa, '902', 'Priya Kumari');
// console.log(qa);

// bookIn.call(indo, '602', 'Soni Kumari');

// // Apply methods
// const flightdata = ['502', 'Piyush Kumar Pal'];
// bookIn.apply(indo, flightdata);
// bookIn.call(indo, ...flightdata);

// // Bind Methods
// const qaBM = bookIn.bind(qa);
// const indoBM = bookIn.bind(indo);
// const airBM = bookIn.bind(airindia);
// qaBM(23, 'Bipin Qatar');
// indoBM(24, 'Bipin Bind Indigo');
// airBM(10, 'Bipin Bind airindia');
// const airBM12 = bookIn.bind(airindia, 12);
// airBM12('Bipin Bind airIndia 12')

// // With event listeners
// airindia.plains = 300;
// airindia.BuyPlains = function () {
//  console.log(this)
//  this.plains++
//  console.log(this.plains)
// }

// document.getElementById('buy1').addEventListener('click', airindia.BuyPlains.bind(airindia));

// const addTex = (rate, value) => value + (value * rate);
// console.log(addTex(.10, 200));

// const addVat = addTex.bind(null, 0.23);
// console.log(addVat(100));
// console.log(addVat(10));

// // type 1
// const functionRfun = function () {
//  return (rate, value) => {
//   console.log(`function return function : ${value + (value * rate)}`)
//  }
// }
// functionRfun()(.10, 200);

// //type 2

// const addVatRate = function (rate) {
//  return function (value) {
//   return value + value * rate;
//  }
// }
// const addVat2 = addVatRate(.23);
// console.log(addVat2(100))
// console.log(addVat2(23))

/*
//// Closure functon
*/

const secureBooking = function (){
   let passangerCount = 0;
   return function(){
      passangerCount++;
      console.log(`${passangerCount} Passangers`)
   } 
}

const booker = secureBooking();
booker();
booker();
booker();

//exampal 1

let f;

const g = function(){
   const a = 20;
   f = function () {
      console.log(a * 2);
   }
}
const h = function () {
   const b = 777;
   f = function () {
      console.log(b * 2);
   }
}
g();
f();
console.dir(f)
h();
f();
console.dir(f);

//exampal 2

const boardpassanger = function (n, wait) {
   const perGroup = n /3;
   setTimeout(() => {
      console.log(`We board all the ${n} passanger in the plain`);
      console.log(`All passanger have in 3 group, each group have ${perGroup} passanger`);
   }, wait * 1000)

   console.log(`we will board all passanger in ${wait} second`);
}
const perGroup = 1500;
boardpassanger(180, 3);