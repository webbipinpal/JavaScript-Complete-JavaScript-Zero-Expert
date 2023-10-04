'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
//////////////////////
//render contury code here
const renderCountry = function(data, neighbour = ''){
  const html = `
      <article class="country ${neighbour}">
        <img class="country__img" src="${data.flags.png}" />
        <div class="country__data">
          <h3 class="country__name">${data.name.common}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
          <p class="country__row"><span>🗣️</span>${data.languages}</p>
          <p class="country__row"><span>💰</span>
          ${data.currencies}
          </p>
        </div>
      </article>
    `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = '1';
};
const errorRander = function(error){
  countriesContainer.insertAdjacentText('beforeend', error);
  countriesContainer.style.opacity = '1';
}
///////////////////////////////////////

// Get country data from API AJAX
/* const getCountryData = function(countryName){
const request = new XMLHttpRequest();
request.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
request.send();

request.addEventListener('load', function(){
  const [data] = JSON.parse(request.responseText);
  console.log(data);
  const html = `
    <article class="country">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
        <h3 class="country__name">${data.name.common}</h3>
        <h4 class="country__region">${data.region}</h4>
        <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
        <p class="country__row"><span>🗣️</span>${data.languages}</p>
        <p class="country__row"><span>💰</span>
        ${data.currencies}
        </p>
      </div>
    </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = '1';
});
}
getCountryData('Qatar'); */


///////////////////////////
//Country and neighbour code here

/* const getCountryAndNeighbour = function(countryName){

  // AJAX call country 1
  const request1 = new XMLHttpRequest();
  request1.open('GET', `https://restcountries.com/v3.1/name/${countryName}`);
  request1.send();
  
  request1.addEventListener('load', function(){
    const [data] = JSON.parse(request1.responseText);
    console.log(data);
    // render country 1
    renderCountry(data);

    // get neighbour country 
    const [neighbour] = data.borders;
    console.log(neighbour)
    if(!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function(){
      const [data2] = JSON.parse(request2.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    })

    
  });
  }
  getCountryAndNeighbour('india'); */

  ///////////////////
  // fetch data for conutry here
 /*  const fetchCountry = function(country){
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data)
      renderCountry(data[0]);
    })
  } */

  ///////////////
  // with full error code 1
  /* const fetchCountry = function(country){
    //countery 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if(!response.ok){
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json()
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      console.log(neighbour);
      if(!neighbour) return;
      // countery 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    })
    .then(response => {
      if(!response.ok){
        throw new Error(`Country not found ${response.status}`);
      }
      return response.json()
    })
    .then(data => {
      renderCountry(data[0], 'neighbour')
    }).catch(error => {
      errorRander(`something went wrong ${error.message}, Try after some time`);
    }).finally(() => {
      countriesContainer.style.opacity = '1';
    })
  }
  btn.addEventListener('click', function(){
    fetchCountry('Qatar');
  });
  //fetchCountry('dssd'); */

  ////////////
  //with full error code 2

  /* const getJSON = function (url, errorMsg = 'something went wrong'){
    return fetch(url).then(response => {
      if(!response.ok) throw new Error(`${errorMsg} ${response.status}`);
      return response.json()
    })
  }

  const fetchCountry = function(country){
   
    //countery 1
    getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      console.log(data)
      renderCountry(data[0]);
      console.log(data[0])
      const neighbour = data[0].borders[0];
      if(!neighbour){
        throw new Error('No Neighbour Found!')
      };
      // countery 2
      return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour}`, 'Country not found')
    })
    .then(data => {
      renderCountry(data[0], 'neighbour')
    }).catch(err => {
      errorRander(`something went wrong ${err.message}, Try again`);
    }).finally(() => {
      countriesContainer.style.opacity = '1';
    })
  }
  btn.addEventListener('click', function(){
    fetchCountry('Qatar');
  });
  fetchCountry('australia'); 
*/
  /////////////////
  // Event loop in Practic

/*   console.log('Test start');
  setTimeout(() => console.log('timer 0'), 0)
  Promise.resolve('Promise resolve 1').then(res => console.log(res));
  Promise.resolve('Promis resolve 2').then(res => {
    for(let i =0; i < 1000000000; i++){}
    console.log(res)
  })

  console.log('Test end'); */

  /////////////////////
  //Building a simple Promise

  /* const lotteryPromise = new Promise(function(resolve, reject){
    setTimeout(() => {
      if(Math.random() >= 0.5){
        resolve('You WIN it💰');
      }else {
        reject(new Error('You LOSE it 💰'))
      }
    }, 2000)
  });

  lotteryPromise.then(res => {
    console.log(res);
  }).catch(err => console.error(err))

  //prmissifying setTimeout
  const wait = function(second){
    return new Promise(function(reslove){
      setTimeout(reslove, second * 1000);
    })
  }
  wait(2).then(() => {
    console.log('I waited for 1 min')
    return wait(1)
  })
  .then(() => {
    console.log('I waited for 2 min')
    return wait(1)
  })
  .then(() => {
    console.log('I waited for 3 min')
    return wait(1)
  })
  .then(() => {
    console.log('I waited for 4 min')
    return wait(1)
  });

  Promise.resolve('abc').then((res) => console.log(res));
  Promise.reject(new Error('Error')).catch((res) => console.error(res)); */

  /////////////////////
  //Geolocation
  /*
  const getPosition = function(){
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        err => reject(err))
    })
  }
  //getPosition().then(res => console.log(res));

   const whereAmI = function(){
    getPosition().then(res => {
      console.log(res);
      const {latitude:lat, longitude:lan} = res.coords;
      return fetch(`https://geocode.xyz/${lat},${lan}?geoit=json`)
    })
    .then(response => {
      if(!response.ok) throw new Error(`Problem with GEO location ${response.status}`)
      return response.json()
    })
    .then(data => {
      console.log(data)
      console.log(`You are in ${data.city}, ${data.country}`)
      return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
    })
    .then(response => {
      console.log(response)
      if(!response.ok) throw new Error(`Country not found ${response.status}`)
      return response.json()
    })
    .then(data => {
      console.log(data[0])
      renderCountry(data[0]);
    })
    .catch(error => console.error(error.message))
  }
  
  btn.addEventListener('click', whereAmI); */


  ////////////////////////
  //Geolocation whereAmI asyng and await function

  /* const getPosition = function(){
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        err => reject(err))
    })
  }
  const whereAmI = async function(){
    try{
    //Geolocation
    const pos = await getPosition();
    const {latitude, longitude}= await pos.coords;

    //Reverse Geocoding
    const GetCouName = await fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`);
    const setData = await GetCouName.json();
    if(!setData.country) throw new Error('location not found, Please check Geo api')
    //Country data
    const res = await fetch(`https://restcountries.com/v3.1/name/${setData.country}`);
    const data = await res.json();
    if(!setData.country) throw new Error('Country not found, Please check api')
    renderCountry(data[0]);
    console.log(data[0])
    return `you are in ${data[0].capital}, ${data[0].name.common}`
    }catch(err){
      console.log(`Please check your component ${err.message}`);
      throw err;
    }
  }

  console.log('1. We will get location')
  // const city = whereAmI();
  // console.log(city)
  // whereAmI()
  // .then(city => {
  //   console.log(`2. ${city}`)
  // })
  // .catch(error => {
  //   console.log(`2. ${error.message}`)
  // }).finally(() => {
  //   console.log('3. Finished geting location');
  // })

  const cityf = async function(){
   try{
    const city = await whereAmI()
    console.log(`2. ${city}`)
   }catch(err){
    console.log(`2. ${err.message}`)
   }
   console.log('3. Finished geting location');
   };
   cityf(); */

   /////////////////////////
   // get 3 country data async, await and promise
   const getJSON = function (url, errorMsg = 'something went wrong'){
    return fetch(url).then(response => {
      if(!response.ok) throw new Error(`${errorMsg} ${response.status}`);
      return response.json()
    })
  }
   /* const get3countries = async function(c1, c2, c3){
    try{
      //  const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
      //  const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
      //  const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);
      // console.log([data1.capital[0], data2.capital[0], data3.capital[0]]);
      const data = await Promise.all([getJSON(`https://restcountries.com/v3.1/name/${c1}`), getJSON(`https://restcountries.com/v3.1/name/${c2}`), getJSON(`https://restcountries.com/v3.1/name/${c3}`)]);

      console.log(data.map(d => d[0].capital));

    }catch(err){
      console.error(err.message)
    }
   }
   get3countries('India', 'Qatar', 'Oman'); */

   //////////////////////
   //Promise race, AllSettled and any.

   //race
  const racePromise = async function(){
    const res = await Promise.race([
      getJSON(`https://restcountries.com/v3.1/name/India`),
      getJSON(`https://restcountries.com/v3.1/name/Qatar`),
      getJSON(`https://restcountries.com/v3.1/name/Nepal`)
    ]);
    console.log(res[0])
  }
  racePromise();

  const timeout = function(sec){
    return new Promise(function(_, reject){
      setTimeout(function(){
        reject(new Error('Request took to long'))
      }, sec * 1000)
    });
  }
  Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/India`),
    timeout(1)
  ])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err.message));

  // Promise.allSettled
  Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success'),
  ]).then(res => console.log(res))
  .catch(err => console.error(err.message));


  Promise.all([
    Promise.resolve('Success'),
    Promise.reject('ERROR'),
    Promise.resolve('Another Success'),
  ]).then(res => console.log(res))
  .catch(err => console.error(err));

 // Promise.allSettled
 Promise.any([
  Promise.reject('Any ERROR'),
  Promise.resolve('Any Success'),
  Promise.resolve('Any Another Success'),
]).then(res => console.log(res))
.catch(err => console.error(err));