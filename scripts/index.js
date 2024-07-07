// Get recipes data from JSON files
let recipes = {};
async function getRecipes() {
    const response = await fetch("./data/recipes.json");
    recipes = await response.json();
}

// Run all index.js scripts
async function init() {
    await getRecipes();
    
    displayFilters();
    
    displayRecipesCards();
    displayRecipesCards();
    displayRecipesCards();
}

init();

