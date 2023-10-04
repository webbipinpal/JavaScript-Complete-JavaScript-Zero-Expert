const measureKalvin = function(){
    const measurement = {
        temp: '',
        unit: '',
        value: Number( prompt('Degrees celsius: '))
    }
    console.log(measurement);
    console.table(measurement);
    //console.log(measurement.value + 10);
    // console.warn(measurement.value);
    // console.error(measurement.value)
    const kalvin = measurement.value + 10;
    return kalvin
}

console.log(measureKalvin());