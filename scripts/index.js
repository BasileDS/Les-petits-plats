import * as dropdownTemplate from "./templates/dropdownElement.js";
import * as cardTemplate from "./templates/recipesCard.js";
import * as searchBar from "./utils/searchBar.js";
import * as state from "/scripts/utils/state.js";
import * as data from "./utils/data.js";

// Run all index.js scripts
async function init() {
    data.initData();

    cardTemplate.displayRecipesCards(data.allRecipes);

    const dropdownFilters = data.getActiveDropdownFiltersList(data.allRecipes); 
    dropdownTemplate.displayDropdownElements(dropdownFilters);

    searchBar.initSearchBar();
}

init();