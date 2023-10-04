'use strict';

//## Coding Challenge #2
//Your tasks:
/* 1. Re-create Challenge #1, but this time using an ES6 class (call it 'CarCl') */

/* 2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide
by 1.6) */
/* 3. Add a setter called 'speedUS' which sets the current speed in mi/h (but
converts it to km/h before storing the value, by multiplying the input by 1.6) */

/* 4. Create a new car and experiment with the 'accelerate' and 'brake'
methods, and with the getter and setter. */

// Test data:
// § Data car 1: 'Ford' going at 120 km/h

class CarCl {
  constructor(carName, speed){
    let kmh = 'km/h';
    this.carName = carName,
    this.speed = speed
  }
  accelerate(){
    console.log(`${this.carName} is going to at ${this.speed += 10} km/h`);
  };
  brake(){
    console.log(`${this.carName} is going to at ${this.speed -= 10}km/h`);
  };

  get speedUS(){
    return this.speed / 1.6
  }
  set speedUS(sp){
    return this.speed = sp * 1.6
  }
  
}

const Ford = new CarCl('Ford', 120);
console.log(Ford.speedUS)
Ford.accelerate()
Ford.brake()

Ford.speedUS = 50;

console.log(Ford);

