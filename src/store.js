//complete store is in store/index.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { getRecipe } from './utils';
import {
  recipeReducer,
  getRecipes,
} from './store/recipes';


const reducer = combineReducers({
  recipes: recipeReducer
});

const store = createStore(reducer, applyMiddleware(thunk, logger));


export default store;

export {
  getRecipes,
  getRecipe
};
