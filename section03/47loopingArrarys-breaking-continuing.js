const hbkuArray = [
    'HBKU',
    'HBKU Press',
    2011-2022,
    'University',
    ['HBKU Comms', 'HBKU IT', 'HBKU Inter']
];

for(let i = 0; i <= hbkuArray.length; i++){
    console.log(hbkuArray[i], typeof hbkuArray[i]);
}

const years = [1991, 2007, 1969, 2020]; // age from 2037
const age = [];

for(let i = 0; i < years.length; i++){
    age.push(2037 - years[i]);
}
console.log(age);
console.log('----ONLY -- STRING ----');
for(let i = 0; i <= hbkuArray.length; i++){
    if(typeof hbkuArray[i] !== 'string') continue;
    console.log(hbkuArray[i], typeof hbkuArray[i]);
}
console.log('----AFTER NUMBER -- BREAK ----');
for(let i = 0; i <= hbkuArray.length; i++){
    if(typeof hbkuArray[i] === 'number') break;
    console.log(hbkuArray[i], typeof hbkuArray[i]);
}