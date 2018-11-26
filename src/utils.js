export const getRecipe = (id, recipes) => {
    return recipes.find(recipe => recipe.id === id)
}