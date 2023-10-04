//Exporting Module js
//console.log('Exporting Module js');

//Blocking data code

// console.log('start user fetching')
// const res = await fetch('https://jsonplaceholder.typicode.com/users');
// const data = await res.json()
// console.log(data)
// console.log('finish user fetching')

export const shoppingCost = 123;
const cart = [];

export const addToCart = function(product, quantity){
 cart.push({product, quantity});
 console.log(`${quantity} ${product} add to your cart`)
}

const totalProce = 234;
const totalQuantity = 23;

export {totalProce, totalQuantity, cart};

export default function(product, quantity){
 cart.push({product, quantity});
 console.log(`${quantity} ${product} add to your cart`)
}