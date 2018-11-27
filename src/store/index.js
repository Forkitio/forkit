import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import authReducer from './authStore.js'
import recipeAPI from './recipeAPI.js'
import { recipeReducer } from './recipes.js'

const reducer = combineReducers({
  auth : authReducer,
  recipeAPI,
  recipes : recipeReducer
});

const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default store
