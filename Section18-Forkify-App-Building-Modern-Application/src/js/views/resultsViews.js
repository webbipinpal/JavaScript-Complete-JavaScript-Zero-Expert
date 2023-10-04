import icons from 'url:../../img/icons.svg';
import views from "./views";

class resultsVeiws extends views{
 _parentElement = document.querySelector('.results');
 _errorMessage = 'No recipes found for your query. Please try again!';
 _successMessage = '';

 _generateMarkup(){
  return this._data.map(this._generateMarkupPrev).join('')
  
 }

 _generateMarkupPrev(results){
  return `
   <li class="preview">
   <a class="preview__link" href="#${results.id}">
     <figure class="preview__fig">
       <img src="${results.image}" alt="${results.title}" />
     </figure>
     <div class="preview__data">
       <h4 class="preview__title">${results.title}</h4>
       <p class="preview__publisher">${results.publisher}</p>
       
     </div>
   </a>
 </li>
  `;
 }
}

export default new resultsVeiws();