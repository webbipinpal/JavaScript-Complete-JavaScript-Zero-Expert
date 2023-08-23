const hbkuArray = [
    'HBKU',
    'HBKU Press',
    2011-2022,
    'University',
    ['HBKU Comms', 'HBKU IT', 'HBKU Inter'],
    true
];

for(let i = hbkuArray.length - 1; i > 0; i--){
    console.log(i, hbkuArray[i]);
}

for(let exercise = 1; exercise <= 3; exercise++){
    console.log(`------- Starting exercise ${exercise}`);
    for(let rep = 1; rep <= 5; rep++){
        console.log(`Exercise ${exercise}: Lifting weight repetition ${rep}`);
    }
}