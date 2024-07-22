import * as filterElements from "./templates/filterElements.js";
import * as recipesCards from "./templates/recipesCard.js";
import * as recipes from "./utils/recipes.js";
import * as tags from "./utils/tags.js";
import * as searchBar from "./utils/searchBar.js";

// Get recipes data from JSON files
let data = {};
async function getRecipes() {
    const response = await fetch("./data/recipes.json");
    data = await response.json();
}

// Run all index.js scripts
async function init() {
    await getRecipes();
    recipesCards.displayRecipesCards(data);

    const ingredients = recipes.getIngredients(data);
    const appliances = recipes.getAppliances(data);
    const ustensils = recipes.getUstensils(data);
    const filters = filterElements.initFilterElements(ingredients, appliances, ustensils);

    tags.initTagFiltering(filters);
    searchBar.initSearchBarCompletion(filters); 
}

init();
