export const getRecipe = (id, recipes) => {
    return recipes.find(recipe => recipe.id === id)
}

export const mapApiRecipeTolocalRecipe = (recipe) => {
    let res = {};
    res.title = recipe.label;
    res.healthLabels = recipe.healthLabels;
    res.ingredients = recipe.ingredientLines;
    res.time = recipe.totalTime;
    res.image = recipe.image;
    res.dietLabels = recipe.dietLabels;
    // no servings info on API recipies and we require that
    res.serving = 0;
    return res;
}