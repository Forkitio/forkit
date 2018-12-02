
const getRecipeById = (recipes, id) => {
    if(!recipes || recipes.length === 0){
        return null;
    }
    return recipes.find(recipe => recipe.id == id)
}

const mapApiRecipeTolocalRecipe = (recipe) => {
    let res = {};
    res.title = recipe.label;
    // res.healthLabels = recipe.healthLabels;
    res.ingredients = recipe.ingredientLines;
    res.time = recipe.totalTime;
    res.image = recipe.image;
    // res.dietLabels = recipe.dietLabels;
    // no servings info on API recipies and we require that
    res.serving = 0;
    if(recipe.healthLabels.length !== 0){
        res.healthLabels = recipe.healthLabels.map((label) => {
            let labelObj = {};
            getAllHealthLables().find(obj => {
                const foundKey = getKeyByValue(obj, label)
                if(foundKey){
                    labelObj['key'] = obj.key;
                    labelObj['label'] = obj.label;
                }
            })
            return labelObj;
        })
    }
    if(recipe.dietLabels.length !== 0){
        res.dietLabels = recipe.dietLabels.map((label) => {
            let labelObj = {};
            getAllDietLables().find(obj => {
                const foundKey = getKeyByValue(obj, label)
                if(foundKey){
                    labelObj['key'] = obj.key;
                    labelObj['label'] = obj.label;
                }
            })
            return labelObj;
        })
    }
    return res;
}

const getLatestForkId = (forkedRecipes) => {
    if(forkedRecipes.length === 0 || !forkedRecipes){
        return null;
    }
    return forkedRecipes[forkedRecipes.length-1].id
}

const getLatestCreatedId = (createdRecipes) => {
    if(createdRecipes.length === 0 || !createdRecipes){
        return null;
    }
    return createdRecipes[createdRecipes.length-1].id
}

const getKeyByValue = (object, value) => {
    return Object.keys(object).find(keyToFind => {
        let _value = value.toUpperCase().replace(new RegExp('-', 'g'), '_')
        return object[keyToFind] === _value
    });
}

const getAllHealthLables = () => {
    return [
        { key: 0, label: "FAT_FREE" },
        { key: 1, label: "LOW_FAT_ABS" },
        { key: 2, label: "LOW_POTASSIUM" },
        { key: 3, label: "KIDNEY_FRIENDLY" },
        { key: 4, label: "VEGAN" },
        { key: 5, label: "VEGETARIAN" },
        { key: 6, label: "PESCATARIAN" },
        { key: 7, label: "PALEO" },
        { key: 8, label: "SPECIFIC_CARBS" },
        { key: 9, label: "DAIRY_FREE" },
        { key: 10, label: "GLUTEN_FREE" },
        { key: 11, label: "EGG_FREE" },
        { key: 12, label: "WHEAT_FREE" },
        { key: 13, label: "MILK_FREE" },
        { key: 14, label: "PEANUT_FREE" },
        { key: 15, label: "TREE_NUT_FREE" },
        { key: 16, label: "FISH_FREE" },
        { key: 17, label: "SHELLFISH_FREE" },
        { key: 18, label: "PORK_FREE" },
        { key: 19, label: "RED_MEAT_FREE" },
        { key: 20, label: "ALCOHOL_FREE" },
        { key: 21, label: "NO_OIL_ADDED" },
        { key: 22, label: "KOSHER" },
        { key: 23, label: "SUGAR_CONSCIOUS" }
    ]
}

const getAllDietLables = () => {
    return [
        { key: 0, label: "LOW_CARB" },
        { key: 1, label: "HIGH_CARB" },
        { key: 2, label: "LOW_FAT" },
        { key: 3, label: "HIGH_FAT" }
    ]
}

export {
    mapApiRecipeTolocalRecipe,
    getRecipeById,
    getLatestForkId,
    getLatestCreatedId,
    getAllHealthLables,
    getAllDietLables
}
