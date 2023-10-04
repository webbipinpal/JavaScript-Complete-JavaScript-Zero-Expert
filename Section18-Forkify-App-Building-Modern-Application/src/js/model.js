import { async } from "regenerator-runtime";
import { API__URL, RES_PER_PAGE } from "./views/config";
import { GET_JSON } from "./helper";
export const state = {
 recipe : {},
 search: {
  results: [],
  query: '',
  resultsPerPage: RES_PER_PAGE,
  page: 1,
 },
};

export const loadRecipe = async function(recipeId){
 try{
  const data = await GET_JSON(`${API__URL}/${recipeId}`)
  let {recipe} = data.data;
  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients
  }
  console.log(state.recipe)
 } catch(err){
  // Temp err message
  console.error(`${err} No recipes found for your query. Please try again!`);
  throw err;
 }
};

export const loadSearchResults = async function(query){
  state.search.query = query;
  try{
    const data = await GET_JSON(`${API__URL}?search=${query}`);
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url
      }
    })
  } catch(err){
    console.log(`${err} Search Recipe`);
    throw err;
  }
}

export const getSearchResultsPage = function(page = state.search.page){
  state.search.page = page;
  const start = (page -1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
}

// loadSearchResults('pizza');