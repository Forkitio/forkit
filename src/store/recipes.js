import axios from 'axios';
import {mapApiRecipeTolocalRecipe} from './../utils';

// action constants
export const GOT_RECIPES = 'GOT_RECIPES';

// action creators
export const gotRecipes = recipes => {
  return {
    type: GOT_RECIPES,
    recipes
  }
}



// thunks

export const getRecipes = () => {
  return (dispatch) => {
    return axios.get(`/api/recipes`)
      .then(res => res.data)
      .then(recipes => dispatch(gotRecipes(recipes)))
      .catch(error => console.log(error))
  };
}

// reducer
const recipeReducer = (state = [], action) => {
  switch(action.type) {
    case GOT_RECIPES:
      state = action.recipes
      break;
  }
  return state;
}

export default recipeReducer

