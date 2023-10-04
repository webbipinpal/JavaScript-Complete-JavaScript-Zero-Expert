//importing Module js
import {shoppingCost, addToCart, totalProce, totalQuantity, cart} from './shoppingCart.mjs';
// import * as shopping from './shoppingCart.mjs';
// console.log(shopping.shoppingCost)
 console.log('Importing Module js');

console.log(shoppingCost);
addToCart('Apple', 5);
addToCart('Apple', 5);
addToCart('Apple', 5);

console.log(totalProce, totalQuantity);

console.log(cart)

/* console.log('start data fetching');
const res = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await res.json()
console.log(data)
console.log('finish data fetching'); */

/* const getDataPost = async function(){
 const res = await fetch('https://jsonplaceholder.typicode.com/posts');
 const data = await res.json()
 return {title: data.at(-1).title, text: data.at(-1).body}
}
// not very clean
// const lastdata  = getDataPost().then(last => console.log(last));
// console.log(lastdata)

const lastData2 = await getDataPost();
console.log(lastData2) */

/////////////////
// Module Pattern
/* 
const shoppingCart2 = (function(){
 const shopingCost = 123;
 const cart = [];
 const totalPrice = 234;
 const totalQuantity = 23;

 const addToCart = function(product, quantity){
  cart.push({product, quantity});
  console.log(`${quantity} ${product} add to your cart`)
 };

 const orderStock = function(product, quantity){
  console.log(`${quantity} ${product} order from Supplier`)
 };

 return{
  cart,
  totalPrice,
  totalQuantity,
  addToCart,
  orderStock
 }

})();
shoppingCart2.addToCart('Apple', 5);
shoppingCart2.addToCart('Apple', 5);
console.log(shoppingCart2.totalPrice);
console.log(shoppingCart2.shopingCost);
console.log(shoppingCart2); */

//////////////////
//Common JS Modules

/* // Export
export.addToCart = function(product, quantity){
 cart.push({product, quantity});
 console.log(`${quantity} ${product} add to your cart`)
};

//Import

const {addToCart} = require('./shoppingCart.mjs'); */

import cloneDeep from './node_modules/lodash-es/cloneDeep.js'; 


const state = {
 cart: [
  {product: 'Apple', auantity: 5},
  {product: 'Pizza', auantity: 5}
 ],
 user: {loggedIn: true}
}

const clonestate = Object.assign({}, state);
console.log(clonestate)
const cloneDeepState = cloneDeep(state);
state.user.loggedIn = false;
console.log(cloneDeepState)