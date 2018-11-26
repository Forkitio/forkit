import axios from 'axios';

// action constants
export const GET_RECIPES = 'GET_RECIPES';
export const ADD_RECIPE = 'ADD_RECIPE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';

// action creators
export const _getRecipes = recipes => {
  return {
    type: GET_RECIPES,
    recipes
  }
}

export const _addRecipe = recipe => {
  return {
    type: ADD_RECIPE,
    recipe
  }
}

export const _updateRecipe = recipe => {
  return {
    type: UPDATE_RECIPE,
    recipe
  }
}

export const _deleteRecipe = recipe => {
  return {
    type: DELETE_RECIPE,
    recipe
  }
}


// thunks

const getRecipes = () => {
  return (dispatch) => {
    return axios.get(`/api/recipes`)
      .then(res => res.data)
      .then(recipes => dispatch(_getRecipes(recipes)))
      .catch(error => console.log(error))
  };
}

const addRecipe = (recipe) => {
  return (dispatch) => {
    return axios.post(`/api/recipes`, recipe)
      .then(res => res.data)
      .then(recipe => dispatch(_addRecipe(recipe)))
      .catch(error => console.log(error))
  };
};

const updateRecipe = (recipe) => {
  return (dispatch) => {
    return axios.put(`/api/recipes/${recipe.id}`, recipe)
      .then(res => res.data)
      .then(recipe => dispatch(_updateRecipe(recipe)))
  };
};

const deleteRecipe = (recipe, history) => {
  return (dispatch) => {
      return axios.delete(`/api/recipes/${recipe.id}`)
        .then(() => dispatch(_deleteRecipe(recipe)))
        .then(() => history.back())
  }
};


// reducer
const recipeReducer = (state = [], action) => {
  switch(action.type) {
    case GET_RECIPES:
      state = action.recipes
      break;
    case ADD_RECIPE:
      state = [...state, action.recipe]
      break;
    case UPDATE_RECIPE:
      state = [...state.filter(recipe => recipe.id !== action.recipe.id), action.recipe]
      break;
    case DELETE_RECIPE:
      state = state.filter(recipe => recipe.id !== action.recipe.id)
      break;
  }
  return state;
}



export {
  recipeReducer,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  addRecipe
}
