'use strict';

// ####Coding Challenge #1
// Your tasks:
/* 1. Use a constructor function to implement a 'Car'. A car has a 'make' and a
'speed' property. The 'speed' property is the current speed of the car in
km/h */
/* 2. Implement an 'accelerate' method that will increase the car's speed by 10,
and log the new speed to the console */
/* 3. Implement a 'brake' method that will decrease the car's speed by 5, and log
the new speed to the console */
/* 4. Create 2 'Car' objects and experiment with calling 'accelerate' and
'brake' multiple times on each of them */

// Test data:
// Data car 1: 'BMW' going at 120 km/h
// Data car 2: 'Mercedes' going at 95 km/h

const Car = function(carName, speed){
  let kmh = 'km/h';
  this.carName = carName,
  this.speed = speed
}

const BMW = new Car('BMW', 120);
const Mercedes = new Car('Mercedes', 95);
console.log(BMW);
console.log(Mercedes);

Car.prototype.accelerate = function(){
  console.log(`${this.carName} is going to at ${this.speed += 10}`);
};

Car.prototype.brake = function(){
  console.log(`${this.carName} is going to at ${this.speed -= 10}`);
};

BMW.accelerate();
BMW.accelerate();
BMW.brake();
BMW.accelerate();
Mercedes.accelerate();
Mercedes.brake();
Mercedes.accelerate();
Mercedes.accelerate();

