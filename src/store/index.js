import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './authStore.js'
import recipeAPI from './recipeAPI.js';
//import { recipeReducer } from './recipes';
import userReducer from './userStore.js';
import { forkedRecipeReducer } from './forkedRecipes';
import { savedRecipeReducer } from './savedRecipes';
import { createdRecipeReducer } from './createdRecipes';
import recipeReducer from './recipes'

const reducer = combineReducers({
  auth : authReducer,
  recipeAPI,
  createdRecipes : createdRecipeReducer,
  savedRecipes : savedRecipeReducer,
  forkedRecipes : forkedRecipeReducer,
  user : userReducer,
  allRecipes: recipeReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default store
