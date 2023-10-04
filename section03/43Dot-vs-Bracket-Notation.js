const bipinArray = [
    'Bipin ',
    'Pal',
    1993 - 2022,
    'Front-end Developer',
    ['Soni, Priya, Piyush']
];
//console.log(bipinArray[0]);
const bipin = {
    firstName: 'Bipin ',
    lastName: 'Pal',
    age: 2022 - 1993,
    job: 'Front-end Developer',
   family: ['Soni', 'Priya', 'Piyush']
};
console.log(bipin.firstName);
console.log(bipin['age']);
console.log(`${bipin.family.length}`);

//Challenge
//Bipin has 3 family member and Piyush is his son

console.log(bipin.firstName + ' has ' + bipin.family.length + ' family member and ' + bipin.family[2] + ' is his son' );

console.log(`${bipin.firstName} has ${bipin.family.length} family member and ${bipin.family[2]} is his son`);
