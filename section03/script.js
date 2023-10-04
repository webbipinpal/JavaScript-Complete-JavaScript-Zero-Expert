
// const cutPices = (fruit) => {
//     return fruit * 4;
// }

// function fruitProcesser(apples, oranges) {
//     const applePices = cutPices(apples);
//     const orangePices = cutPices(oranges);
//     const juice = `juice with ${applePices} apple and ${orangePices} oranges`;
//     return juice;
// }

// console.log(fruitProcesser(2, 3));


const calcAverage = (v1, v2, v3) =>{
    const cal = v1 + v2 + v3;
    return cal / 3;
}

const scoreA = calcAverage(24, 23, 31);
const scoreB = calcAverage(65, 84, 79);
console.log(scoreA, scoreB);

const checkWinner = (avgScoreaA, avgScoreB) => {
    if(avgScoreaA >= 2*avgScoreB){
        console.log('ScroreA Win');
    } else if(avgScoreB >= 2*avgScoreaA){
        console.log('ScroreB Win');
    }else{
        console.log('No Team Wins');
    }
}
checkWinner(scoreA, scoreB);

