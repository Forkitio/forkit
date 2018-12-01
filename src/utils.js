const getRecipeById = (recipes, id) => {
    if(!recipes || recipes.length === 0){
        return null;
    }
    return recipes.find(recipe => recipe.id == id)
}

const mapApiRecipeTolocalRecipe = (recipe) => {
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

const getLatestForkId = (forkedRecipes) => {
    if(forkedRecipes.length === 0 || !forkedRecipes){
        return null;
    }
    return forkedRecipes[forkedRecipes.length-1].id
}

export {
    mapApiRecipeTolocalRecipe,
    getRecipeById,
    getLatestForkId
}
