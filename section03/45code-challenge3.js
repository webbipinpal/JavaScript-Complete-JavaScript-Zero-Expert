
const mark = {
    name: 'Mark Miller',
    height: 1.69,
    mass: 78,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}
const johan = {
    name: 'Johan Smith',
    height: 1.95,
    mass: 92,
    calcBMI: function () {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
}

mark.calcBMI();
johan.calcBMI();

if(mark.bmi > johan.bmi){
    console.log(`${mark.name}'s BMI (${mark.bmi}) is hegher then ${johan.name}'s (${johan.bmi})`);
}else{
    console.log(`${johan.name}'s BMI (${johan.bmi}) is hegher then ${mark.name}'s (${mark.bmi})`);
}

