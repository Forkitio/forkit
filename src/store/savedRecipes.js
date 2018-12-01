import axios from 'axios';
import {mapApiRecipeTolocalRecipe} from './../utils';

// action constants
export const GET_SAVED_RECIPES = 'GET_SAVED_RECIPES';
export const ADD_SAVED_RECIPE = 'ADD_SAVED_RECIPE';

// action creators
export const _getSavedRecipes = recipes => {
  return {
    type: GET_SAVED_RECIPES,
    recipes
  }
}

export const _addSavedRecipe = recipe => {
  return {
    type: ADD_SAVED_RECIPE,
    recipe
  }
}

// thunks

const getSavedRecipes = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/recipes/${userId}/saved`)
      .then(res => res.data)
      .then(recipes => dispatch(_getSavedRecipes(recipes)))
      .catch(error => console.log(error))
  };
}

// saving a recipe will create a copy of the recipe for the user
// createdBy will be set to the originalCreator or null
// ancestor and parent will be set to the forked recipe's values accoring to below comments
const saveRecipe = (recipe, userId) => {
  const _recipe = mapApiRecipeTolocalRecipe(recipe);
  const savedRecipe = Object.assign({}, _recipe);
  savedRecipe.userId = userId;
  return (dispatch) => {
    return axios.post(`/api/recipes`, savedRecipe)
      .then(res => res.data)
      .then(recipe => dispatch(_addSavedRecipe(recipe)))
      .catch(error => console.log(error))
  };
};


// reducer
const savedRecipeReducer = (state = [], action) => {
  switch(action.type) {
    case GET_SAVED_RECIPES:
      state = action.recipes
      break;
    case ADD_SAVED_RECIPE:
      state = [...state, action.recipe]
      break;
  }
  return state;
}



export {
    savedRecipeReducer,
    getSavedRecipes,
    saveRecipe
}
