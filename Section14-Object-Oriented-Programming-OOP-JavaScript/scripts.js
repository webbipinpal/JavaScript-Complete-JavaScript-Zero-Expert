'use strict';

////////////////////////////
// constructor Function and the new Operator

// const Person = function(firstName, birthYear){
//   //instance function

//   this.firstName = firstName,
//   this.birthYear = birthYear

//   //never to like this
//   /* this.callAge = function(){
//     this.birthYear - 2023
//   } */

// }
// const HBKU1 = new Person('HBKU1', 1993);
// console.log(HBKU1)

//1. New {} create empty
//2. linked to the function this = {}
//3. {} linked to the prototypes
//4. function automatically return {}

/* const HBKU2 = new Person('HBKU2', 2017);
console.log(HBKU2);

const HBKU3 = new Person('HBKU3', 2021);
console.log(HBKU3);

console.log(HBKU3 instanceof Person);

Person.hey = function(){
  console.log('Hey there :)');
  console.log(this);
}

Person.hey(); */

//////////////////////
// Prototypes
/* console.log(Person.prototype);

Person.prototype.callAge = function(){
  console.log(2023 - this.birthYear);
}
console.log(HBKU1.callAge());
console.log(HBKU2.callAge());
console.log(HBKU3.callAge());

console.log(HBKU1.__proto__);
console.log(HBKU1.__proto__ === Person.prototype);

console.log(Person.prototype.isPrototypeOf(HBKU1));
console.log(Person.prototype.isPrototypeOf(HBKU2));
console.log(Person.prototype.isPrototypeOf(Person));

Person.prototype.color = 'Middle fairs';

console.log(HBKU1.color, HBKU3.color)
console.log(HBKU1.hasOwnProperty('firstName'));
console.log(HBKU2.hasOwnProperty('color')); */

/////////////////
// ES6 Classes

 // class expression
//const PersonalCl = class personal {};

// class declaration
/* class PersonalCl{

  constructor(firstName, age){
    this.firstName = firstName,
    this.age = age
  }

  calcAge() {
    console.log(2023 - this.age);
  }

  greet(){
    console.log(`Hi ${this.firstName}`)
  }

  get dob(){
    return 2023 - this.age
  }

  set firstName(nam){
    if(nam.includes(' ')) this._firstName = nam;
    else alert(`${name} is not a full name`)
  }

  get firstName(){
    return this._firstName;
  }

  static hey(){
    console.log('Hey There :)');
    console.log(this);
  }
}

const Bipin = new PersonalCl('Bipin Pal', 1993);
console.log(Bipin);
console.log(Bipin.calcAge());
console.log(Bipin.greet());
console.log(Bipin.dob);

PersonalCl.hey(); */

//1. Classes are NOT hoisted
//2. Classes are first-class citizes
//3. Classess are executed in strict mode. 

///////////
// Setter and Getters
/* 
const account = {
  owner: 'HBKU',
  movements: [200, 300, 120, 300],

  get latest(){
    return this.movements.splice(-1).pop();
  },

  set latest(mov){
     this.movements.push(mov);
  }
}

console.log(account.latest);
account.latest = 50;
console.log(account.movements); */


////////////////
// Object.create
/* const PersonProto = {
  calcAge(){
    console.log(2023 - this.birthYear);
  },
  init(fullName, birthYear){
    this.fullName = fullName,
    this.birthYear = birthYear
  }
}

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'HBKU';
steven.birthYear = 2011;
steven.calcAge();

const hbku = Object.create(PersonProto)
hbku.init('HBKU', 2010);

hbku.calcAge(); */

///////////////////
//Inheritance Between Classes : Constructor Functions

/* const People = function(firstName, birthYear){
  this.firstName = firstName,
  this.birthYear = birthYear
}

People.prototype.calcAge = function(){
  console.log(2023 - this.birthYear)
}

const Student = function(firstName, birthYear, course){
  People.call(this, firstName, birthYear);
  this.course = course
}
Student.prototype = Object.create(People.prototype);

Student.prototype.introduce = function(){
  console.log(`My name is ${this.firstName}.  I am ${2023 - this.birthYear} years old and study in ${this.course}`)
}

const hbku = new Student('HBKU', 1993, 'Front-end Developer');
hbku.introduce();
hbku.calcAge();

console.log(hbku.__proto__);
console.log(hbku.__proto__.__proto__);

Student.prototype.constructor = Student;

console.log(hbku instanceof Student);
console.log(hbku instanceof People);
console.log(hbku instanceof Object);

console.dir(Student.prototype.constructor) */

///////////////////
// Inheritance Between "Classes": ES6 Classess
/* 
class PersonalCl{

  constructor(firstName, birthYear){
    this.firstName = firstName,
    this.birthYear = birthYear
  }

  calcAge() {
    console.log(2023 - this.birthYear);
  }

  greet(){
    console.log(`Hi ${this.firstName}`)
  }

  get dob(){
    return 2023 - this.birthYear
  }

  set firstName(nam){
    if(nam.includes(' ')) this._firstName = nam;
    else alert(`${name} is not a full name`)
  }

  get firstName(){
    return this._firstName;
  }
// static method

  static hey(){
    console.log('Hey There :)');
    console.log(this);
  }
}

class StudentCl extends PersonalCl{
  constructor(firstName, birthYear, course){
    super(firstName, birthYear),
    this.course = course
  }
  introduce(){
    console.log(`My name is ${this.firstName} and I am ${2023 - this.birthYear} years old. I study ${this.course}`)
  }
  calcAge(){
    console.log(`I am ${2023 - this.birthYear} years old but as a student I feel more like ${2023 - this.birthYear + 10}`)
  }
}

const hbkupress = new StudentCl('HBKU Press', 2014, 'computer science');
console.log(hbkupress);
hbkupress.introduce();
hbkupress.calcAge(); */

///////////////////
// Inheritance Between "Classes": Object.create

/* const PersonProto = {
  calcAge(){
    console.log(2023 - this.birthYear)
  },
  init(firstName, birthYear){
    this.firstName = firstName,
    this.birthYear = birthYear

  }
}

const steve = Object.create(PersonProto);
const StudentProto = Object.create(PersonProto);

StudentProto.init = function(firstName, birthYear, course){
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course
}
StudentProto.introduce = function(){
  console.log(`My name is ${this.firstName} and I am ${2023 - this.birthYear} years old. I study ${this.course}`)
}

const jay = Object.create(StudentProto);
jay.init('Jay', 2012, 'Computer');
jay.introduce();
jay.calcAge(); */

///////////////////
// Another Class Example
//1.) Public Fields 
//2.) Private Fields
//3.) Public Method
//4.) Private Method
//5.) Static
class account{
//1.) Public Fields
  locale = navigator.language
    //2.) Private Fields (instances)
    #movements = []
    #pin;
  constructor(owner, currency, pin, locale){
    this.owner = owner,
    this.currency = currency,
    //protractor
    this.#pin = pin,
    //this._movements = [],
    //this.locale = navigator.language

    console.log(`Thanks for createing accoutn ${this.owner}`);
  }
  //3.) Public Method
  // public interface
  getMovements(){
    return this.#movements;
    return this;
  }
  deposite(val){
    this.#movements.push(val);
    return this;
  }
  withdraw(val){
    this.deposite(-val);
    return this;
  }
  
  loanrequest(val){
    if(this.#loanapprove(val)){
      this.deposite(val);
      console.log('Loan approved');
      return this;
    }
  }
  //4.) Private Method
  #loanapprove(){
    return true
  }

  // static
  static helper(){
    console.log('Helper')
  }
}

const acc1 = new account('Bipin', 'INR', 1111, []);

acc1.deposite(250);
acc1.withdraw(140);
acc1.loanrequest(1000);
console.log(acc1._pin);
console.log(acc1.getMovements());
console.log(acc1);
//console.log(acc1.#loanapprove())
//console.log(acc1.#movement)
console.log(account.helper())

/////////////
//Chaining Methods
acc1.deposite(500).withdraw(300).loanrequest(200);


