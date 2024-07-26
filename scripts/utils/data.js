
import * as text from "./text.js";

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
function getActiveDropdownFiltersList(recipes) {
    const ingredients = [];
    const appliances = [];
    const ustensils = [];

    let sortedIngredients = []
    let sortedAppliances = []
    let sortedUstensils = []

    recipes.forEach(recipe => {

        recipe.ingredients.forEach(ingredient => {
            const name = ingredient.ingredient;
            const capitalizeName = text.capitalize(name);
            ingredients.push(capitalizeName);
        });
        sortedIngredients = [...new Set(ingredients)];

        const name = recipe.appliance; 
        const capitalizeName = text.capitalize(name);
        appliances.push(capitalizeName);
        sortedAppliances = [...new Set(appliances)];

        recipe.ustensils.forEach(ustensil => {
            const capitalizeName = text.capitalize(ustensil);
            ustensils.push(capitalizeName);
        }); 
        sortedUstensils = [...new Set(ustensils)];
    });

    const dropdownFilters = { ingredients: sortedIngredients, 
                        appliances: sortedAppliances, 
                        ustensils: sortedUstensils };

    return dropdownFilters
}

export { 
    allDropdownFilters,
    allRecipes,
    allIngredients,
    allAppliances,
    allUstensils,
    initData, 
    getActiveDropdownFiltersList
}