import axios from 'axios'

const initialState = {
  cuisine: [],
  protein: [],
  time: []
}

const GOT_RECIPES = 'GOT_RECIPES'

const gotRecipes  = (recipes) => ({
  type: GOT_RECIPES,
  recipes
})

// Thunks - gets recipes from Edamam based on the input
// input is in the form of of an object:
// { 
//     category: "cuisine",
//     preference: "asian"
// }

export const getRecipes = (type) => {
    return dispatch => (
        axios.get(`/api/edamam/${type}`)
        .then(res => dispatch(gotRecipes(res.data.hits)))
        .catch(ex => console.log(ex)) 
    )
}


const recipeAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RECIPES:
      state = {...state, cuisine: action.recipes}
      return state
    default:
      return state
  }
}

export default recipeAPIReducer
