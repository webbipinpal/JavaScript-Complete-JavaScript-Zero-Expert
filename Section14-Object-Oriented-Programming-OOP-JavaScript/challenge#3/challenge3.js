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

const Car = function(carName, speed){
  this.carName = carName,
  this.speed = speed
}
Car.prototype.accelerate = function(){
  this.speed +=20;
  console.log(`${this.carName} going at ${this.speed} km/h`)
}

Car.prototype.brake = function(){
  this.speed -=20;
  console.log(`${this.carName} going at ${this.speed} km/h`);
}

const EV = function(carName, speed, charge){
  Car.call(this, carName, speed),
  this.charge = charge
}

// Linking prototype

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function(chargeTo){
  this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
  this.speed +=20,
  this.charge--,
  console.log(`${this.carName} going at ${this.speed} km/h with a charge of ${this.charge}`);
}

const tesla = new EV('Tesla', 120, '23%');
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake()
tesla.accelerate();
