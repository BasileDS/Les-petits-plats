import * as dropdownTemplate from "./templates/dropdownElement.js";
import * as cardTemplate from "./templates/recipesCard.js";
import * as searchBar from "./utils/searchBar.js";
import * as state from "/scripts/utils/state.js";
import * as data from "./utils/data.js";

// Run all index.js scripts
async function init() {
    data.initData();

    cardTemplate.displayRecipesCards(data.allRecipes);

    data.updateActiveDropdownFiltersList(data.allRecipes); 
    dropdownTemplate.displayDropdownElements(data.allDropdownFilters);

    searchBar.initSearchBar();
}

init();