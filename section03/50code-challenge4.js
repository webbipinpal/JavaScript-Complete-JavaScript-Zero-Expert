
const calcTip = (bills) => {
    return bills >= 50 && bills <= 300 ? bills * 0.15 : bills * 0.20;
}
const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips = [];
const total = [];

for(let i = 1; i < bills.length; i++){
    const tip = calcTip(bills[i]);
    tips.push(tip);
    total.push(tip + bills[i])
}

console.log(tips, total, bills);

const clacAverage = (arr) => {
    let sum = 0;
    for(let i = 0; i < arr.length; i++){
        sum += arr[i]
    }
    return sum/arr.length;
}
clacAverage([2, 3, 6]);
console.log(clacAverage(tips));
console.log(clacAverage(total));
