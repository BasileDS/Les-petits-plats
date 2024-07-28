import * as text from "./text.js";
import * as data from "./data.js";
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

// Get on page dropdown filters list in an object { ingredients, appliances, ustensils }
function updateActiveDropdownFiltersList(recipes) {
    let sortedIngredients = [];
    let sortedAppliances = [];
    let sortedUstensils = [];


     recipes.forEach(recipe => {

        recipe.ingredients.forEach(ingredient => {
            const name = ingredient.ingredient;
            const capitalizeName = text.capitalize(name);
            state.activeDropdownIngredients.push(capitalizeName);
        });
        sortedIngredients = [...new Set(state.activeDropdownIngredients)];

        const name = recipe.appliance; 
        const capitalizeName = text.capitalize(name);
        state.activeDropdownAppliances.push(capitalizeName);
        sortedAppliances = [...new Set(state.activeDropdownAppliances)];

        recipe.ustensils.forEach(ustensil => {
            const capitalizeName = text.capitalize(ustensil);
            state.activeDropdownUstensils.push(capitalizeName);
        }); 
        sortedUstensils = [...new Set(state.activeDropdownUstensils)];
    });


    data.allDropdownFilters.push(
        {ingredients: sortedIngredients}, 
        {appliances: sortedAppliances}, 
        {ustensils: sortedUstensils});
}

export { 
    allDropdownFilters,
    allRecipes,
    allIngredients,
    allAppliances,
    allUstensils,
    initData, 
    updateActiveDropdownFiltersList
}