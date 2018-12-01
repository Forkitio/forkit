import axios from 'axios';
import {mapApiRecipeTolocalRecipe} from './../utils';

// action constants
export const GET_FORKED_RECIPES = 'GET_FORKED_RECIPES';
export const ADD_FORKED_RECIPE = 'ADD_FORKED_RECIPE';
export const UPDATE_FORKED_RECIPE = 'UPDATE_FORKED_RECIPE';

// action creators
export const _getForkedRecipes = recipes => {
  return {
    type: GET_FORKED_RECIPES,
    recipes
  }
}

export const _addForkedRecipe = recipe => {
  return {
    type: ADD_FORKED_RECIPE,
    recipe
  }
}

export const _updateForkedRecipe = recipe => {
  return {
    type: UPDATE_FORKED_RECIPE,
    recipe
  }
}


// thunks

const updateForkedRecipe = (recipe) => {
  return (dispatch) => {
    return axios.put(`/api/recipes/${recipe.id}`, recipe)
      .then(res => res.data)
      .then(recipe => dispatch(_updateForkedRecipe(recipe)))
      .catch(error => console.log(error))
  };
};

const getForkedRecipes = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/recipes/${userId}/forked`)
      .then(res => res.data)
      .then(recipes => dispatch(_getForkedRecipes(recipes)))
      .catch(error => console.log(error))
  };
}

// forking a recipe will create a copy of the recipe for the user
// createdBy will be set to the userId
// ancestor and parent will be set to the original recipe's values accoring to below comments
const forkRecipe = (recipe, userId) => {
  const _recipe = mapApiRecipeTolocalRecipe(recipe);
  const savedRecipe = Object.assign({}, _recipe);
  // need parent to determine whether or not this is the original recipie or a fork
  recipe.ancestoryId === undefined ? 
    savedRecipe['ancestoryId'] = recipe.uri.split('_')[1]
    : savedRecipe['ancestoryId'] = recipe.ancestoryId;
  // if the parent's ancestoryId is null then this is an original recipe and the forked revipe
  // should set ancestoryId to the id of parent recipe
  // otherwise parent recipe is a fork intself and the ancestoryId should persist
  recipe.parentId === undefined ? 
    savedRecipe['parentId'] = recipe.uri.split('_')[1]
    : savedRecipe['parentId']  = recipe.parentId;
  savedRecipe.createdBy = userId;
  return (dispatch) => {
    return axios.post(`/api/recipes`, savedRecipe)
      .then(res => res.data)
      .then(recipe => dispatch(_addForkedRecipe(recipe)))
      .catch(error => console.log(error))
  };
};

// reducer
const forkedRecipeReducer = (state = [], action) => {
  switch(action.type) {
    case GET_FORKED_RECIPES:
      state = action.recipes
      break;
    case ADD_FORKED_RECIPE:
      state = [...state, action.recipe]
      break;
    case UPDATE_FORKED_RECIPE:
      state = [...state.filter(recipe => recipe.id !== action.recipe.id), action.recipe]
      break;
  }
  return state;
}



export {
    forkedRecipeReducer,
    forkRecipe,
    getForkedRecipes,
    updateForkedRecipe
}
