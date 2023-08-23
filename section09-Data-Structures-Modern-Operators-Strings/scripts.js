'use strict'

const weeks = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const openingHours = {
   thu: {
    open: 12,
    close: 22,
   },
   fri: {
    open: 11,
    close: 23,
   },
   sat: {
    open: 0,
    close: 24,
   },
  };
const restaurant = {
 name: 'Classico Italiano',
 location: 'HBKU B1, Education city, Doha Qatar',
 categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
 startMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
 mainMenu: ['Pizza', 'Pasta', 'Risotto'],
 openingHours,
 order: function (startIndex, secondIndex){
  return [this.startMenu[startIndex], this.mainMenu[secondIndex]]
 },
 orderPasta: function (ing1, ing2, ing3) {
  //console.log(`Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`)
 },
 orderPizza: function(mainIngredient, ...otherIngredient){
   // console.log(mainIngredient);
   // console.log(otherIngredient);
 },
};

/*
///////////////////////
*/
//properties name
const properties = Object.keys(openingHours);
let openSr = `We are open on ${properties.length} days:`;
for (const day of properties){
      openSr += ` ${day}`;
}
//console.log(openSr);
//properties value
const value = Object.values(openingHours);
//console.log(value)
for (const [k, {open, close}] of value.entries()) {
   //console.log(`On ${k}, We open at ${open} and close at ${close}`)
}
// for (const [k, day] of value.entries()) {
//    console.log(`On ${k}, We open at ${day.open} and close at ${day.close}`);
// }
/*
///////////////////////
*/
// if(restaurant.openingHours.mon) {
//    console.log(restaurant.openingHours.mon.open);
// }
//with optional chaining
// console.log(restaurant.openingHours.mon?.open);
// console.log(restaurant.openingHours?.mon?.open);

// Example
// const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
// for(const day of days) {
//    const open = restaurant.openingHours[day]?.open ?? 'closed';
//    console.log(`on ${day}, We open at ${open}`);
// }
/*
///////////////////////
for of loop
*/
// const menu = [ ...restaurant.startMenu, ...restaurant.mainMenu ];
// for(const item of menu) {
//    console.log(item);
// }
// for(const item of menu.entries()){
//    console.log(`${item[0] + 1}: ${item[1]}`);
// }
// for(const [key, el] of menu.entries()){
//    console.log(`${key + 1}: ${el}`);
// }

// console.log(3 || 'Bipin');
// console.log('' || 'Bipin');
// console.log(true || 0);
// console.log(undefined || null);
// console.log(undefined || 0 || '' || 'Pal' || 23 || bull);

// Use ANY data type, return ANY data type, short-circuiting
// restaurant.numGuests = 0;
// console.log('------OR------');
// const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
// console.log(guests1);
// const guests2 = restaurant.numGuests || 10;
// console.log(guests2)
// console.log('------AND------');

// console.log(0 && 'Bipin');
// console.log(7 && 'Bipin');
// console.log('Hello' && 23 && null && 'Bipin');

if(restaurant.orderPizza){
 restaurant.orderPizza('mushrooms', 'onion');
}
restaurant.orderPizza && restaurant.orderPizza('patoto', 'paneer');
// console.log(restaurant.order(2, 1));
// const arr = [2, 3, 4];
// const a = arr[0];
// const b = arr[1];
// const c = arr[2];

// const [x, y, z] = arr;
// console.log(x, y, z);

// let [main, secondary] = restaurant.categories;
// // console.log(main, secondary)
// // const temp = main;
// // main = secondary;
// // secondary = temp;
// console.log(main, secondary);
// [main, secondary] = [secondary, main]
// console.log(main, secondary)

const nexted = [2, 3, [5, 6]];
// const [i, , [a, b]] = nexted;
// console.log(i, a, b);

// 1) destructuring 
// SPREAD, Because on the RIGHT side of = 
const arr = [1, 2, ...[3, 4]];

// REST, Because on the LEFT side of = 
const [a, b, ...others] = [1, 2, 3, 4, 5];
// console.log(a, b, others);
const [pizza, , resotto, ...othersFood] = [...restaurant.mainMenu, ...restaurant.startMenu];
// console.log(pizza, resotto, othersFood);
//objects
const {sat, ...otherWeekdays} = {...restaurant.openingHours};
// console.log(otherWeekdays, sat)

// 2) Functions
const add = function (...numbers) {
 let sum =0;
 for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
 }
 // console.log(sum)
};

add(2, 3);
add(4, 5, 6);
add(7, 8, 9, 10);

const x = [23, 5, 6];
add(...x);

// console.log(restaurant.orderPasta('vegi', 'chees', 'mix sauce'));
restaurant.orderPizza('onion', 'olives', 'paneer', 'tamoto');
restaurant.orderPizza('onion');

/* 
/////////////// new set
*/

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Pasta',
  'Risotto'
]);
// console.log(ordersSet);
// console.log(new Set('Bipin'));
// console.log(ordersSet.has('Pizza'));
// console.log(ordersSet.has('Bread'));
// console.log(ordersSet.size)
// console.log(ordersSet.delete('Pizza'))
// console.log(ordersSet.clear());
for (const order of ordersSet) {
  // console.log(order);
}

const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = new Set(staff);
// console.log([...staffUnique]);
// console.log(staffUnique.size);
// console.log(new Set('bipinkumarpal').size);

/* 
/////////////// Maps
*/

/* 
/////////////// String
*/
// const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];
// const strName = 'Bipin Kumar Pal   ';
// console.log(strName[0])
// console.log(strName.length)
// console.log(beasts.indexOf('camel'));
// console.log(strName.lastIndexOf('r'));
// console.log(strName.slice(-1));

// const checkMiddleSeat = function(seat) {
//   const checkM = seat.slice(-1);
//   if (checkM === 'A' || checkM === 'C') {
//     console.log('your are lucky')
//   } else {
//     console.log('you got middle seat');
//   }
// }

// checkMiddleSeat('22A');
// checkMiddleSeat('10B');
// checkMiddleSeat('3C');

// const replStr = 'HBKU QF Qatar Doha QF Doha'

// console.log(strName.toLowerCase());
// console.log(strName.toUpperCase());
// console.log(strName.trim());
// console.log(replStr.replace('HBKU', 'Hamad Bin'));
// console.log(replStr.replaceAll('Doha', 'Education City'));
// console.log(replStr.replaceAll(/Doha/g, 'Education City'));

// const bstr = 'HBKU QF Education city Doha HBKU';
// console.log(bstr.includes('Doha'));
// console.log(bstr.includes('Qatar'));
// console.log(bstr.startsWith('cit'));
// console.log(bstr.endsWith('BKU'));

// const checkBaggage = function(items){
//   const luggage = items.toLowerCase();
//   if(luggage.includes('knife') || luggage.includes('gun')){
//     console.log('you can not board in the plain, because you have knife or gun')
//   } else {
//     console.log('you can board');
//   }
// }

// checkBaggage('I have a laptop, some Food and a pocket Knife');
// checkBaggage('Socks and camera');
// checkBaggage('Got some snacks and a gun for protection');

/*
///// split and join
*/
// console.log('a+very+easy+task'.split('+'));
// console.log('Bipin Kumar Pal'.split(' '));

// const [fname, mname, lname] = 'Bipin Kumar Pal'.split(' ');

// const joinname = ['Mr.', fname, mname, lname].join(' ');
// console.log(joinname);

// const capitalizeName = function (name) {
//   const sname = name.split(' ');
//   const uppercase = [];
//   for (const n of sname){
//       // uppercase.push(n[0].toUpperCase()+ n.slice(1));
//       uppercase.push(n.replace(n[0], n[0].toUpperCase()));
//   }
//   console.log(...uppercase);
// }
// capitalizeName('bipin kumar Pal');
// capitalizeName('Ambika pal');

// /*
// ///// padStart, padEnd and repeat
// */

// const message = "Looking for job change";
// console.log(message.padStart(30, '+') + message.padEnd(35, '+'));
// console.log('Bipin'.padEnd(35, '+'));

// const maskCardNum = function (number) {
//   // const numStr = String(number);
//   const numStr = number + '';
//   const last = numStr.slice(-4);
//   console.log(last.padStart(numStr.length, '*'));
// }
// maskCardNum(34234234234343434);
// maskCardNum(4234343434);
// maskCardNum(12345678);

// const message2 = 'I need a job in Qatar, ';
// console.log(message2.repeat(4));


/*

///// print missing number
*/
function findMissign(num){
  let no = []
  for(let i = 1; i <= num.length; i++){
    if(!num.includes(i)){
      no.push(i);
    }
  }
console.log(no.toString())
}


let marr = [1,2,3,5,4,6,7,8,10];

console.log(findMissign(marr));
