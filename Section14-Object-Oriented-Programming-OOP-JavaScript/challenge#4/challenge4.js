'use strict';

// ##Coding Challenge #3
// Your tasks:

/* 1. Use a constructor function to implement an Electric Car (called 'EV') as a child
"class" of 'Car'. Besides a make and current speed, the 'EV' also has the
current battery charge in % ('charge' property) */

/* 2. Implement a 'chargeBattery' method which takes an argument
'chargeTo' and sets the battery charge to 'chargeTo' */

/* 3. Implement an 'accelerate' method that will increase the car's speed by 20,
and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140
km/h, with a charge of 22%' */

/* 4. Create an electric car object and experiment with calling 'accelerate',
'brake' and 'chargeBattery' (charge to 90%). Notice what happens when
you 'accelerate'! Hint: Review the definiton of polymorphism 😉 */

// Test data:
// Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%

//////////////////
//#Coding Challenge #4
//Your tasks:
/* 1. Re-create Challenge #3, but this time using ES6 classes: create an 'EVCl'
child class of the 'CarCl' class */
//2. Make the 'charge' property private
/* 3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl'
class. Then experiment with chaining! */

//Test data:
//Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%

class CarCL{
  constructor(carName, speed){
    this.carName = carName,
    this.speed = speed
  }
  accelerate(){
    this.speed +=20;
    console.log(`${this.carName} going at ${this.speed} km/h`)
  }
  brake(){
    this.speed -=20;
    console.log(`${this.carName} going at ${this.speed} km/h`);
    return this;
  }
}

/* const CarCL = function(carName, speed){
  this.carName = carName,
  this.speed = speed
} */
/* CarCL.prototype.accelerate = function(){
  this.speed +=20;
  console.log(`${this.carName} going at ${this.speed} km/h`)
} */

/* CarCL.prototype.brake = function(){
  this.speed -=20;
  console.log(`${this.carName} going at ${this.speed} km/h`);
} */


class EVCl extends CarCL{
  #charge;
  constructor(carName, speed, charge){
    super(carName, speed);
    this.#charge = charge;
  }
  chargeBattery(chargeTo){
    this.#charge = chargeTo;
    return this;
  }
  accelerate(){
    this.speed +=20,
    this.#charge--,
    console.log(`${this.carName} going at ${this.speed} km/h with a charge of ${this.#charge}`);
    return this;
  }
}


// const EV = function(carName, speed, charge){
//   CarCL.call(this, carName, speed),
//   this.charge = charge
// }

// Linking prototype

// EV.prototype = Object.create(CarCL.prototype);

// EV.prototype.chargeBattery = function(chargeTo){
//   this.charge = chargeTo;
// }

// EV.prototype.accelerate = function(){
//   this.speed +=20,
//   this.charge--,
//   console.log(`${this.carName} going at ${this.speed} km/h with a charge of ${this.charge}`);
// }

const hbku = new EVCl('Rivian', 120, 23);
//'Rivian' going at 120 km/h, with a charge of 23%
console.log(hbku)
// hbku.chargeBattery(10);
// hbku.accelerate();
// hbku.charge;

//chaning
hbku.accelerate().accelerate().accelerate().brake().chargeBattery(50).accelerate();