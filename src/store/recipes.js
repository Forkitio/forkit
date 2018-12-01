// import axios from 'axios';
// import {mapApiRecipeTolocalRecipe} from './../utils';

// // action constants
// export const GET_RECIPES = 'GET_RECIPES';
// export const ADD_RECIPE = 'ADD_RECIPE';
// export const UPDATE_RECIPE = 'UPDATE_RECIPE';
// export const DELETE_RECIPE = 'DELETE_RECIPE';

// // action creators
// export const _getRecipes = recipes => {
//   return {
//     type: GET_RECIPES,
//     recipes
//   }
// }

// export const _addRecipe = recipe => {
//   return {
//     type: ADD_RECIPE,
//     recipe
//   }
// }

// export const _updateRecipe = recipe => {
//   return {
//     type: UPDATE_RECIPE,
//     recipe
//   }
// }

// export const _deleteRecipe = recipe => {
//   return {
//     type: DELETE_RECIPE,
//     recipe
//   }
// }


// // thunks

// const getRecipes = () => {
//   return (dispatch) => {
//     return axios.get(`/api/recipes`)
//       .then(res => res.data)
//       .then(recipes => dispatch(_getRecipes(recipes)))
//       .catch(error => console.log(error))
//   };
// }

// const getCreatedRecipes = (userId) => {
//   return (dispatch) => {
//     return axios.get(`/api/recipes/${userId}/created`)
//       .then(res => res.data)
//       .then(recipes => dispatch(_getRecipes(recipes)))
//       .catch(error => console.log(error))
//   };
// }

// const getSavedRecipes = (userId) => {
//   return (dispatch) => {
//     return axios.get(`/api/recipes/${userId}/saved`)
//       .then(res => res.data)
//       .then(recipes => dispatch(_getRecipes(recipes)))
//       .catch(error => console.log(error))
//   };
// }

// const getRorkedRecipes = (userId) => {
//   return (dispatch) => {
//     return axios.get(`/api/recipes/${userId}/forked`)
//       .then(res => res.data)
//       .then(recipes => dispatch(_getRecipes(recipes)))
//       .catch(error => console.log(error))
//   };
// }

// const addRecipe = (recipe) => {
//   return (dispatch) => {
//     return axios.post(`/api/recipes`, recipe)
//       .then(res => res.data)
//       .then(recipe => dispatch(_addRecipe(recipe)))
//       .catch(error => console.log(error))
//   };
// };

// // forking a recipe will create a copy of the recipe for the user
// // createdBy will be set to the userId
// // ancestor and parent will be set to the original recipe's values accoring to below comments
// const forkRecipe = (recipe, userId) => {
//   const _recipe = mapApiRecipeTolocalRecipe(recipe);
//   const savedRecipe = Object.assign({}, _recipe);
//   // need parent to determine whether or not this is the original recipie or a fork
//   recipe.ancestoryId === null ? savedRecipe.ancestoryId = recipe.id : savedRecipe.ancestoryId = recipe.ancestoryId;
//   // if the parent's ancestoryId is null then this is an original recipe and the forked revipe
//   // should set ancestoryId to the id of parent recipe
//   // otherwise parent recipe is a fork intself and the ancestoryId should persist
//   recipe.parentId === null ?  savedRecipe.parentId = recipe.id : savedRecipe.parentId = recipe.parentId;
//   savedRecipe.createdBy = userId;
//   return (dispatch) => {
//     return axios.post(`/api/recipes`, savedRecipe)
//       .then(res => res.data)
//       .then(recipe => dispatch(_addRecipe(recipe)))
//       .catch(error => console.log(error))
//   };
// };

// // saving a recipe will create a copy of the recipe for the user
// // createdBy will be set to the originalCreator or null
// // ancestor and parent will be set to the forked recipe's values accoring to below comments
// const saveRecipe = (recipe, userId) => {
//   const _recipe = mapApiRecipeTolocalRecipe(recipe);
//   const savedRecipe = Object.assign({}, _recipe);
//   savedRecipe.userId = userId;
//   return (dispatch) => {
//     return axios.post(`/api/recipes`, savedRecipe)
//       .then(res => res.data)
//       .then(recipe => dispatch(_addRecipe(recipe)))
//       .catch(error => console.log(error))
//   };
// };

// const updateRecipe = (recipe) => {
//   return (dispatch) => {
//     return axios.put(`/api/recipes/${recipe.id}`, recipe)
//       .then(res => res.data)
//       .then(recipe => dispatch(_updateRecipe(recipe)))
//       .catch(error => console.log(error))
//   };
// };

// const deleteRecipe = (recipe, history) => {
//   return (dispatch) => {
//       return axios.delete(`/api/recipes/${recipe.id}`)
//         .then(() => dispatch(_deleteRecipe(recipe)))
//         .then(() => history.back())
//         .catch(error => console.log(error))
//   }
// };


// // reducer
// const recipeReducer = (state = [], action) => {
//   switch(action.type) {
//     case GET_RECIPES:
//       state = action.recipes
//       break;
//     case ADD_RECIPE:
//       state = [...state, action.recipe]
//       break;
//     case UPDATE_RECIPE:
//       state = [...state.filter(recipe => recipe.id !== action.recipe.id), action.recipe]
//       break;
//     case DELETE_RECIPE:
//       state = state.filter(recipe => recipe.id !== action.recipe.id)
//       break;
//   }
//   return state;
// }



// export {
//   recipeReducer,
//   getRecipes,
//   updateRecipe,
//   deleteRecipe,
//   addRecipe,
//   saveRecipe,
//   forkRecipe,
//   getSavedRecipes,
//   getRorkedRecipes,
//   getCreatedRecipes
// }
