// for(let i = 1; i < 10; i++){
//     console.log(`for loop ${i}`);
// }

let rep = 1;
while(rep <= 5){
    //console.log(`While Loop: ${rep}`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1;
while(dice !== 6){
    console.log(`you rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if(dice === 6){
        console.log(`Loop is about end...`);
    }
}