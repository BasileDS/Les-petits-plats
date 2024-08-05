import * as state from "./state.js";

const response = await fetch("./data/recipes.json");
const allRecipes = await response.json(); // All recipes

const allDropdownFilters = [];
const allIngredients = [];
const allAppliances = [];
const allUstensils = [];
const allNames = [];
const allDescriptions = [];

// Init constants to be used as modules
async function initData() {

    for (let i = 0; i < allRecipes.length; i++) {
        const recipe = allRecipes[i];
        state.activeRecipes.push(recipe);

        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i];
            allIngredients.push(ingredient.ingredient); // All ingredients
        };

        for (let i = 0; i < recipe.ustensils.length; i++) {
            const ustensil = recipe.ustensils[i];
            allUstensils.push(ustensil); // All  ustensils
        };
        
        allAppliances.push(recipe.appliance); // All appliances

        allNames.push(recipe.name); // All names
        
        allDescriptions.push(recipe.description); // All description
    };
}

export { 
    allDropdownFilters,
    allRecipes,
    allDescriptions,
    allNames,
    allIngredients,
    allAppliances,
    allUstensils,
    initData
}