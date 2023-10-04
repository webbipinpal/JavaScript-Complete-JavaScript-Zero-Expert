'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

const openModal = function (e) {
   e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => {
   return btn.addEventListener('click', openModal)
});

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/////////////////////////////
// learn more button scroll js start here
btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();

  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  console.log('viewport Height and Width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  )
  //scrolling to

/*   window.scrollTo(
    s1coords.left + window.pageXOffset,
    s1coords.top + window.pageYOffset
  ); */
  // window.scrollTo({
  //     left: s1coords.left + window.pageXOffset,
  //     top: s1coords.top + window.pageYOffset,
  //     behavior: 'smooth'
  // });
  section1.scrollIntoView({ behavior: 'smooth' })
}); 
////////////////////////////


// learn more button scroll js end here

////////////////////
// scrolling to the secton when you click on the nav menu start here 

//1.
// document.querySelectorAll('.nav__link')
// .forEach((el) => el.addEventListener('click', function(e){
//   e.preventDefault();
//   const id = this.getAttribute('href');
//   document.querySelector(id).scrollIntoView({behavior: 'smooth'})
// }));

//2.
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
  }
});

// scrolling to the secton when you click on the nav menu end here 

// tabs feature start here


document.addEventListener('click', function(el){
  const tabsButton = el.target.closest('.operations__tab');
  if(!tabsButton) return;
  console.log(tabsButton);

  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(tc => tc.classList.remove('operations__content--active'))
  //tabs Active
  tabsButton.classList.add('operations__tab--active');
  document.querySelector(`.operations__content--${el.target.dataset.tab}`).classList.add('operations__content--active');
})

// tabs feature end here


// Nav menu hover star here
const menuHandlar = function(e, opacity){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if(el !== link)el.style.opacity = opacity
    });
    logo.style.opacity = opacity;
  }
}
nav.addEventListener('mouseover', function(e){
  menuHandlar(e, 0.5)
});

nav.addEventListener('mouseout', function(e){
  menuHandlar(e, 1)
});

// Nav menu hover end here

// Sticky header start here

// const inisCoods = section1.getBoundingClientRect();
// document.addEventListener('scroll', function(){
//   if(window.scrollY > inisCoods.top) document.querySelector('.nav').classList.add('sticky');
//   else document.querySelector('.nav').classList.remove('sticky');
// });


//API
/* const obsCallback = function(entries, observer){
  entries.forEach( el => {
    console.log(el);
  })
}
const obsOptions = {
  root: null,
  threshold: 0.1
}
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); */

const stickyNav = function(entryies){
  const [entry] = entryies;
  if(!entry.isIntersecting){
    nav.classList.add('sticky');
  } else{
    nav.classList.remove('sticky');
  }
}

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Sticky header end here

// sction reveal animation start here
const allSectionBan = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSectionBan.forEach(section => {
  sectionObserver.observe(section);
  //section.classList.add('section--hidden');
})

// sction reveal animation end here
// Lazy image start load here
const allLazyImg = document.querySelectorAll('img[data-src]');
const lazyImage = function(entries, observer){
  const [entry] = entries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  observer.unobserve(entry.target);
}
const imagLazyObserver = new IntersectionObserver(lazyImage, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
});
allLazyImg.forEach(img => imagLazyObserver.observe(img));

// Lazy image load end here

// slider image star here
const slide = function(){

  const slides = document.querySelectorAll('.slide');
  const buttonLeft = document.querySelector('.slider__btn--left');
  const buttonRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  let maxSlide = slides.length - 1;

  // slides.forEach((s, i) => {
  //   s.style.transform = `translateX(${100 * i}%)`;
  // });

  const createDots = function(){
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-silde="${i}">`)
    })
  }

  const activeDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(e =>
    e.classList.remove('dots__dot--active')
  )
  document.querySelector(`.dots__dot[data-silde="${slide}"]`).classList.add('dots__dot--active');
  }

  const goToSlide = function(slide){
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  }

  const prevArrow = function(){
    if(curSlide === maxSlide){
      curSlide = 0
    }else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDots(curSlide)
  }
  const nextArrow = function(){
    if(curSlide === 0){
      curSlide = maxSlide
    }else{
      curSlide--;
    }
    goToSlide(curSlide);
    activeDots(curSlide)
  }
  const init = function(){
    goToSlide(0)
    createDots();
    activeDots(0);
  }
  init();
  //Function 
  buttonRight.addEventListener('click', prevArrow);
  buttonLeft.addEventListener('click', nextArrow);

  document.addEventListener('keydown', function(e){
    if(e.key === "ArrowRight") prevArrow();
    e.key === 'ArrowLeft' && nextArrow()
  });

  document.addEventListener('click', function(e){
    if(e.target.classList.contains('dots__dot')){
      const slide = e.target.dataset.silde;
      goToSlide(slide);
      activeDots(slide);
    }
  })
}
slide();
// slider image end here

/////////////////////////////
////////////////////////////
///////// practice code

/* 
/// Element Selector 
*/

/* console.log(document.documentElement);
console.log(document.head);
console.log(document.body);
const header = document.querySelector('header');
console.log(header)
const allSection = document.querySelectorAll('section');
console.log(allSection);


const allButton = document.getElementsByTagName('button');
console.log(allButton)
document.getElementById('section--1');

console.log(document.getElementsByClassName('btn'));
 */
/* 
// Create and Insert Element
*/
/* const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = 'We us cookied for improved functionality and analytic. <button class="btn btn--cookie-delete">Got It!</button>';

// header.prepend(message);
 header.append(message);
// header.before(message);
// header.after(message);
document.querySelector('.btn--cookie-delete').addEventListener('click', () =>
   message.remove()
) 
 */
//styles
/* message.style.backgroundColor = '#888888';
message.style.width = '120%';
message.style.height = Number.parseFloat( getComputedStyle(message).height, 5) + 10 + 'px';
console.log(message.style.color);
console.log(message.style.backgroundColor)

document.documentElement.style.setProperty('--color-primary' , 'orange') */

//Attribute
/* const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);
console.log(logo.designer);

console.log(logo.getAttribute('src'));
logo.setAttribute('name', 'Bipin');
console.log(logo.dataset.versionNumber); */

/* 
// Event Propagation Practice
 */

/* const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function(){
  this.style.backgroundColor = randomColor();
});

document.querySelector('.nav__links').addEventListener('click', function(){
  this.style.backgroundColor = randomColor();
});
document.querySelector('.nav').addEventListener('click', function(){
  this.style.backgroundColor = randomColor();
}); */

/* 
// DOM Traversign
*/
/* 
const h1 = document.querySelector('h1');

// Going : downwards : child

 console.log(h1.querySelectorAll('.highlight'));
 console.log(h1);
 console.log(h1.childNodes);
 console.log(h1.children);
 h1.firstElementChild.style.color = 'blue';
 h1.lastElementChild.style.color = 'orangered';

 // Going : Upwards : parents

 console.log(h1.parentNode);
 console.log(h1.parentElement);
 h1.closest('.header').style.backgroundColor = 'lightblue';
 h1.closest('h1').style.backgroundColor = 'white';

 // Going sideways : siblings

 console.log(h1.previousElementSibling);
 console.log(h1.nextElementSibling);
 console.log(h1.previousSibling);
 console.log(h1.nextSibling);

 console.log(h1.parentElement.children);

 [...h1.parentElement.children].forEach( (el) => {
  if(el !== 'h1') el.style.transform = 'scale(0.5)'
 }) */

 //API
 // Sticky header start here

/* const obsCallback = function(entries, observer){
  entries.forEach( el => {
    console.log(el);
  })
}
const obsOptions = {
  root: null,
  threshold: 0.1
}
const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1); */

/* 
// Lifecycle DOM Events
*/

document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree build!', e)
});

window.addEventListener('load', function(e){
  console.log('Page fully loaded', e)
})

/* window.addEventListener('beforeunload', function(e){
  e.preventDefault();
  console.log(e);
  e.returnValue = 'Message'
}); */
