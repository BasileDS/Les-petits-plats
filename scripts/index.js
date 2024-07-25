import * as filterElements from "./templates/dropdowFilter.js";
import * as recipesCards from "./templates/recipesCard.js";
import * as searchBar from "./utils/mainSearchBar.js";
import * as data from "./utils/data.js";

// Run all index.js scripts
async function init() {
    sessionStorage.clear();

    const allRecipes = await data.getAllRecipes("all");
    
    data.setToSessionStorage(allRecipes);

    recipesCards.displayRecipesCards(allRecipes);

    filterElements.initFilterElements();

    searchBar.initSearchBar();
}

init();