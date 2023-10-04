
import * as model from './model.js';
import recipeViews from './views/recipeViews.js';
import searchViews from './views/searchViews.js';
import resultsViews from './views/resultsViews.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView.js';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if(module.hot){
//   module.hot.accept();
// }

const controlRecipes = async function(){
  try{
    const recipeId = window.location.hash.slice(1);
    console.log(recipeId);
    recipeViews.renderSpinner();
    //1. Render recipe data
    await model.loadRecipe(recipeId);

    //2.  render recipe data
    recipeViews.render(model.state.recipe);
    
  } catch(err){
    console.log(err);
    recipeViews.renderError();
  }
};
const controlSearchResults = async function(){
  try {
    resultsViews.renderSpinner();

    //1. get query
    const query = searchViews.getQuery();
    if(!query) return;

    //2. load search data
    await model.loadSearchResults(query);

    //3. Render results
    //resultsViews.render(model.state.search.results)
    resultsViews.render(model.getSearchResultsPage(2));

    //4.pagination results
    paginationView.render(model.state.search);

  } catch(err){
    console.log(err);
  }
}

const init = function(){
  recipeViews.addHandlerRender(controlRecipes);
  searchViews.addHandlerSearch(controlSearchResults);
}
init();
