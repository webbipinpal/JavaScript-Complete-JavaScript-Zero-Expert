

const calctip = (bill) =>{
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.20;
};

const bills = [125, 555, 44];
const tips = [calctip(bills[0]), calctip(bills[1]), calctip(bills[2])];
const total = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];
console.log(bills, tips, total);
