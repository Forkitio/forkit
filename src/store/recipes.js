import axios from 'axios';

// action constants
export const GOT_ALL_RECIPES = 'GOT_ALL_RECIPES';

// action creators
export const gotAllRecipes = recipes => {
  return {
    type: GOT_ALL_RECIPES,
    recipes
  }
}

// thunks

export const getAllRecipes = () => {
  return (dispatch) => {
    return axios.get(`/api/recipes`)
      .then(res => res.data)
      .then(recipes => dispatch(gotAllRecipes(recipes)))
      .catch(error => console.log(error))
  };
}

// reducer
const recipeReducer = (state = [], action) => {
  switch(action.type) {
    case GOT_ALL_RECIPES:
      state = action.recipes
      break;
  }
  return state;
}

export default recipeReducer

