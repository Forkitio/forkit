import axios from 'axios';
import {mapApiRecipeTolocalRecipe} from './../utils';

// action constants
export const GET_CREATED_RECIPES = 'GET_CREATED_RECIPES';
export const ADD_CREATED_RECIPE = 'ADD_CREATED_RECIPE';
export const UPDATE_CREATED_RECIPE = 'UPDATE_CREATED_RECIPE';
export const DELETE_CREATED_RECIPE = 'DELETE_CREATED_RECIPE';

// action creators
export const _getCreatedRecipes = recipes => {
  return {
    type: GET_CREATED_RECIPES,
    recipes
  }
}

export const _addCreatedRecipe = recipe => {
  return {
    type: ADD_CREATED_RECIPE,
    recipe
  }
}

export const _updateCreatedRecipe = recipe => {
  return {
    type: UPDATE_CREATED_RECIPE,
    recipe
  }
}

export const _deleteCreatedRecipe = recipe => {
  return {
    type: DELETE_CREATED_RECIPE,
    recipe
  }
}


// thunks

const getCreatedRecipes = (userId) => {
  return (dispatch) => {
    return axios.get(`/api/recipes/${userId}/created`)
      .then(res => res.data)
      .then(recipes => dispatch(_getCreatedRecipes(recipes)))
      .catch(error => console.log(error))
  };
}

const addCreatedRecipe = (recipe) => {
  return (dispatch) => {
    return axios.post(`/api/recipes`, recipe)
      .then(res => res.data)
      .then(recipe => dispatch(_addCreatedRecipe(recipe)))
      .catch(error => console.log(error))
  };
};

const updateCreatedRecipe = (recipe) => {
  return (dispatch) => {
    return axios.put(`/api/recipes/${recipe.id}`, recipe)
      .then(res => res.data)
      .then(recipe => dispatch(_updateCreatedRecipe(recipe)))
      .catch(error => console.log(error))
  };
};

const deleteCreatedRecipe = (recipe, history) => {
  return (dispatch) => {
      return axios.delete(`/api/recipes/${recipe.id}`)
        .then(() => dispatch(_deleteCreatedRecipe(recipe)))
        .then(() => history.back())
        .catch(error => console.log(error))
  }
};


// reducer
const createdRecipeReducer = (state = [], action) => {
  switch(action.type) {
    case GET_CREATED_RECIPES:
      state = action.recipes
      break;
    case ADD_CREATED_RECIPE:
      state = [...state, action.recipe]
      break;
    case UPDATE_CREATED_RECIPE:
      state = [...state.filter(recipe => recipe.id !== action.recipe.id), action.recipe]
      break;
    case DELETE_CREATED_RECIPE:
      state = state.filter(recipe => recipe.id !== action.recipe.id)
      break;
  }
  return state;
}



export {
    createdRecipeReducer,
    getCreatedRecipes,
    updateCreatedRecipe,
    deleteCreatedRecipe,
    addCreatedRecipe
}
