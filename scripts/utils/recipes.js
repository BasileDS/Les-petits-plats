function getIngredients(recipes) {
    let ingredientsWithDuplciates = [];

    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            ingredientsWithDuplciates.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1));
        })
    });

    const ingredients = [...new Set(ingredientsWithDuplciates)];

    const sortedIngredients = ingredients.sort();

    return sortedIngredients
}

function getAppliances(recipes) {
    let appliancesWithDuplciates = [];

    recipes.forEach(recipe => {
        appliancesWithDuplciates.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));
    });

    const appliances = [...new Set(appliancesWithDuplciates)];

    const sortedAppliances = appliances.sort();

    return sortedAppliances
}

function getUstensils(recipes) {
    let ustensilsWithDuplciates = [];

    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => {
            ustensilsWithDuplciates.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
        }); 
    });
    
    const ustensils = [...new Set(ustensilsWithDuplciates)];
    



    const sortedUstensils = ustensils.sort();

    return sortedUstensils
}

export { getIngredients, getAppliances, getUstensils }