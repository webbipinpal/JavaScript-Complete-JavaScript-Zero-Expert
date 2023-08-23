'use strict';

function calAge (birthday) {
 const age = (2023 - birthday);

 function pringAge (){
  const output = `${firstName} you are ${age}, born in ${birthday}`;
  console.log(output)

  if(birthday >= 1986 && birthday <= 1996){
   const firstName = 'Pal';
   const srt = `ohh, you are the millenial ${firstName}`;
   console.log(srt);

   function add (a, b){
    return a + b;
   }
  }
  // console.log(add(2, 3));
 }
 pringAge();
 return age;
}
const firstName = 'Bipin';
calAge(1993);
// console.log(age);
// pringAge();

console.log(addDec(2, 3));
console.log(funExp(2, 2));
// console.log(funArr(2, 1));
function addDec (a, b){
 return a + b;
}

var funExp = function(a, b){
 return a + b;
}
const funArr = (a, b) => a + b;