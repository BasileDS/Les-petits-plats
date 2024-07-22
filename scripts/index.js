import * as recipesData from "./utils/data.js";
import * as filterElements from "./templates/dropdowFilter.js";
import * as recipesCards from "./templates/recipesCard.js";
import * as tags from "./utils/tags.js";
import * as searchBar from "./utils/mainSearchBar.js";

// Run all index.js scripts
async function init() {
    recipesCards.displayRecipesCards();

    const ingredients = await recipesData.getDropdownFiltersList("ingredients");
    const appliances = await recipesData.getDropdownFiltersList("appliances");
    const ustensils = await recipesData.getDropdownFiltersList("ustensils");

    const filters = filterElements.initFilterElements(ingredients, appliances, ustensils);

    tags.initTagFiltering(filters);
    searchBar.initSearchBarCompletion(filters);
}

init();