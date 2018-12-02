import axios from 'axios'

const initialState = {
  cuisine: [],
  protein: [],
  time: [],
  selectedRecipe: {}
}

const GOT_RECIPES = 'GOT_RECIPES'
const GOT_ONE_RECIPE = 'GOT_ONE_RECIPE'

const gotRecipes  = (field, recipes) => ({
  type: GOT_RECIPES,
  field,
  recipes,
})

const gotOneRecipe = (recipe) => ({
  type: GOT_ONE_RECIPE,
  recipe
})

// Thunks - gets recipes from Edamam based on the input
// input is in the form of of an object:
// { 
//     category: "cuisine",
//     preference: "asian"
// }

export const getAPIRecipes = (field, type) => {
    console.log('**********GETTING RECIPES')
    return dispatch => (
        axios.get(`/api/edamam/recommendations/${field}/${type}`)
        .then(res => dispatch(gotRecipes(field, res.data.hits)))
        .catch(ex => console.log(ex)) 
    )
}

export const getOneAPIRecipe = (id) => {
  return dispatch => (
    axios.get(`/api/edamam/getRecipeInfo/${id}`)
    .then(res => {
      dispatch(gotOneRecipe(res.data[0]))
    })
    .catch(ex => console.log(ex))
  )
}

const recipeAPIReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_RECIPES:
      if (action.field === 'cuisine'){
        state = {...state, cuisine: action.recipes}
      } if (action.field === 'protein'){
        state = {...state, protein: action.recipes}
      } if (action.field === 'time'){
        state = {...state, time: action.recipes}
      }
      return state
    
    case GOT_ONE_RECIPE:
      return state = {...state, selectedRecipe: action.recipe}

    default:
      return state
  }
}

export default recipeAPIReducer
