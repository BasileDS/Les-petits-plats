import * as dropdownTemplate from "/Les-petits-plats/scripts/templates/dropdownElement.js";
import * as cardTemplate from "/Les-petits-plats/scripts/templates/recipesCard.js";
import * as searchBar from "/Les-petits-plats/scripts/utils/searchBar.js";
import * as state from "/Les-petits-plats/scripts/utils/state.js";
import * as data from "/Les-petits-plats/scripts/utils/data.js";

// import * as dropdownTemplate from "/scripts/templates/dropdownElement.js";
// import * as cardTemplate from "/scripts/templates/recipesCard.js";
// import * as searchBar from "/scripts/utils/searchBar.js";
// import * as state from "/scripts/utils/state.js";
// import * as data from "/scripts/utils/data.js";

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