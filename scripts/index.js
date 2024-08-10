import * as dropdownTemplate from "/scripts/templates/dropdownElement.js";
import * as cardTemplate from "/scripts/templates/recipesCard.js";
import * as searchBar from "/scripts/utils/searchBar.js";
import * as state from "/scripts/utils/state.js";
import * as data from "/scripts/utils/data.js";

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