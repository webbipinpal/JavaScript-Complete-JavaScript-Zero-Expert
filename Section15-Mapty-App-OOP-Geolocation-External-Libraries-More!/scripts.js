'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class workout{
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;
  constructor(coords, distance, duration){
    //this.date = ...
    //this.id = ...
    this.coords = coords; // [lat, lan]
    this.distance = distance; // in km
    this.duration = duration; //in min
  }
  _setdescription(){
    // prettier-ignore
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;

  }
  click(){
    this.clicks++;
  }
}

class Running extends workout{
  type = 'running';
  constructor(coords, distance, duration, cadence){
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setdescription();
  }
  calcPace(){
    //min/km
    this.pace = this.distance / this.duration;
    return this.pace;
  }
}
class Cycling extends workout{
  type = 'cycling';
  constructor(coords, distance, duration, elevationGain){
    super(coords, distance, duration)
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this._setdescription();
  }
  calcSpeed(){
    this.Speed = this.distance / (this.duration / 60);
    return this.Speed;
  }
}

const run1 = new Running([27.1054879, 84.4550881], 10, 5, 345);
const cycle = new Cycling([27.1054879, 84.4550881], 10, 5, 345);
// console.log(run1, cycle)

////////////////////////////
// Application Architecture

let mapEvent;
let map;
class App{
  #mapEvent;
  #map;
  #workout = [];
  constructor(){
    //add user position
    this._getPosition();
    //get data from local storage
    this._getDataLOcalStorage();
    //Attached event hanlder
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField.bind(this));
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this))
  }
  _getPosition(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function(){
        console.log('Could not get your possiton')
      });
      }
  }
  _loadMap(position){
      const latitude = 27.1365666;
      const longitude = 84.4895405;
      //console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
    
      const coords = [latitude, longitude];
      this.#map = L.map('map').setView(coords, 13);
    
      L.tileLayer(`https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.#map);
    
      this.#map.on('click', this._showForm.bind(this));
      this.#workout.forEach(work => {
        this._randerWorkoutMarker(work);
      })
  }
  _showForm(mapE){
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }
  _hideForm(){
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(()=> {
      form.style.display = 'grid';
    }, 1000)
  }
  _toggleElevationField(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }
  _newWorkout(e){
    e.preventDefault();
    const validInput = (...inputs) => inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const {lat, lng} = this.#mapEvent.latlng;
    let workout;

    // Check if data is valid

    // If workout running, craete running object
    if(type === 'running'){
      const candence = +inputCadence.value;
      if(
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(candence)
        !validInput(distance, duration, candence) || !allPositive(distance, duration, candence)
        ) return alert('Inputs have to be positive numbers!');

       workout = new Running([lat, lng], distance, duration, candence);
      
    }
    // if workout cycling, create cycling object
    if(type === 'cycling'){
      const elevation = +inputElevation.value;

      if(
        !validInput(distance, duration, elevation) || !allPositive(distance, duration)
        ) return alert('Inputs have to be positive numbers!');

        workout = new Cycling([lat, lng], distance, duration, elevation);
    }
    // Add new object to workout array
    this.#workout.push(workout);
    // console.log(workout);
    // console.log(workout.type)

    // Rander workout on map as marker
    this._randerWorkoutMarker(workout)

    // Rander workout on list
   this. _randerWorkout(workout);
    // Hide form + clear input fields
    this._hideForm();

    // add data in local storage
    this._setDataLocalStorage();

  }
  _randerWorkoutMarker(workout){
    L.marker(workout.coords).addTo(this.#map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: `${workout.type}-popup`
      })
    )
    .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' :'🚴‍♀️' }${workout.description}`)
    .openPopup();
  }
  _randerWorkout(workout){
    let html = `
      <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' :'🚴‍♀️' }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
    `
    if(workout.type === 'running'){
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `
    }
    if(workout.type === 'cycling'){
      html += `
      <div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.Speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
      `
    }
    form.insertAdjacentHTML("afterend", html);
  }
  _moveToPopup(e){
    const workoutEl = e.target.closest('.workout');
    if(!workoutEl) return;
    //console.log(workoutEl);
    const workout = this.#workout.find(work => work.id === workoutEl.dataset.id);
    //console.log(workout)
    this.#map.setView(workout.coords, 13, {
      animation: true,
      pan:{
        duration: 1
      }
    });
    //workout.click();
  }
  _setDataLocalStorage(){
    localStorage.setItem('workouts', JSON.stringify(this.#workout));
  }
  _getDataLOcalStorage(){
    const data = JSON.parse(localStorage.getItem('workouts'));
   // console.log(data);
    if(!data) return;
    this.#workout = data;
    this.#workout.forEach(work => {
      this._randerWorkout(work);
    })
  }
resetData(){
  localStorage.removeItem('workouts');
  location.reload();
}
}
const app = new App();
// console.log(app)


//  function capTitle(name){
//   const cap = name.toLowerCase().split(' ').map(item => item[0].toUpperCase() + item.slice(1));
//   console.log(cap);
// }
// capTitle('sdsd sdasd sdasdsd');