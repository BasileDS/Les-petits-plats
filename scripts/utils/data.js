import * as state from "/scripts/utils/state.js";

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

    allRecipes.forEach(recipe => {
        state.activeRecipes.push(recipe);

        recipe.ingredients.forEach(ingredient => {
            allIngredients.push(ingredient.ingredient); // All ingredients
        })

        recipe.ustensils.forEach(ustensil => {
            allUstensils.push(ustensil); // All  ustensils
        });
        
        allAppliances.push(recipe.appliance); // All appliances

        allNames.push(recipe.name); // All names
        
        allDescriptions.push(recipe.description); // All description
    });
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