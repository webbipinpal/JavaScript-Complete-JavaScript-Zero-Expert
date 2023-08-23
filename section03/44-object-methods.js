const jonas = {
    firstName:'Jonas',
    lastName:'Pal',
    birthYear:1991,
    job:'teacher',
    friends:['abc', 'cde', 'fgh'],
    hasDriversLicense: true,
    
    // calcAge: function(birthYear){
    //     return 2022- birthYear;
    // }
    // calcAge: function(){
    //     console.log(this);
    //     return 2022- this.birthYear;
    // }

    calcAge: function(){
        this.age = 2037- this.birthYear;
        return this.age;
        
    },
    getSummary: function(){
        return (`${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? 'a' : 'not'} driver's license`);
    }
}

// console.log(jonas.calcAge(1993));
// console.log(jonas['calcAge'](1993));

// console.log(jonas.calcAge());
// console.log(this.age);

//Challange
// jonas is a 46-year old teacher, and he has a driver's license
console.log(jonas.getSummary());