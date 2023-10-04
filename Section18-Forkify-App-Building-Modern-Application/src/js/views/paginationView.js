import icons from 'url:../../img/icons.svg';
import views from "./views";

class paginationView extends views{
 _parentElement = document.querySelector('.pagination');

 _generateMarkup(){
   const currPage = this._data.page;
  const numPage = Math.ceil(this._data.results.length / this._data.resultsPerPage);

  //page 1 and there are other pages.
   if(currPage === 1 && numPage > 1){
    return `
    <button class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
       
     </button>
    `;
   }
  // last page
  if(currPage === numPage && numPage > 1){
   return `
    <button class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currPage - 1}</span>
     </button>
    `;
  }
  // others pages
  if(currPage < numPage && currPage > 1){
   return `
    <button class="btn--inline pagination__btn--prev">
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${currPage - 1}</span>
     </button>
     <button class="btn--inline pagination__btn--next">
      <span>Page ${currPage + 1}</span>
       <svg class="search__icon">
         <use href="${icons}#icon-arrow-right"></use>
       </svg>
       
     </button>
    `;
  }
  // page 1 or there are no other pages.
  return '';
 }
}
export default new paginationView();
