const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 15, 14, 9, 5];

const calcTem = function(arr){
    let max = arr[0];
    let min = arr[0];
    for(let i = 0; i < arr.length; i++){
        if(typeof arr[i] !== 'number') continue;
        if(arr[i] > max){
            max = arr[i]
        }
        if(arr[i] < min){
            min = arr[i]
        }
    }
    console.log('max :' + max + ' min:' + min );
    return max - min;
}

const amplitude = calcTem(temperatures);
console.log(amplitude);

// two arrar pass in function

const calcTemNew = function(a1, a2){
    let arr = a1.concat(a2);
    console.log(arr);
    let max = arr[0];
    let min = arr[0];
    for(let i = 0; i < arr.length; i++){
        if(typeof arr[i] !== 'number') continue;
        if(arr[i] > max){
            max = arr[i]
        }
        if(arr[i] < min){
            min = arr[i]
        }
    }
    console.log('max :' + max + ' min:' + min );
    return max - min;
}

const amplitudeNew = calcTemNew([2, 7, 4], [3, 6, 8]);
console.log(amplitudeNew);