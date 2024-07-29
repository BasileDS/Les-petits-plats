import * as dropdownTemplate from "./templates/dropdownElement.js";
import * as cardTemplate from "./templates/recipesCard.js";
import * as searchBar from "./utils/searchBar.js";
import * as state from "./utils/state.js";
import * as data from "./utils/data.js";

// Run all index.js scripts
async function init() {
    const mainSearchInput = document.querySelector(".recipes-search-input");
    mainSearchInput.value = "";

    data.initData();

    cardTemplate.displayRecipesCards(data.allRecipes);

    dropdownTemplate.updateActiveDropdownFiltersList(data.allRecipes); 
    dropdownTemplate.displayDropdownElements(data.allDropdownFilters);

    searchBar.initSearchBar();

    state.displayGlobalState();
}

init();