import * as dropdownTemplate from "./dropdownElement.js";
import * as searchBar from "/scripts/utils/searchBar.js";
import * as cardTemplate from "./recipesCard.js";
import * as filters from "/scripts/utils/filters.js";
import * as state from "/scripts/utils/state.js";
import * as data from "/scripts/utils/data.js";

// Display active tags based on active tags set array
function displayActiveTags() {
    const activeFiltersContainer = document.querySelector(".active-filters");
    const searchTag = document.querySelector(".active-search-tag");

    if (searchTag === null) {
        activeFiltersContainer.innerHTML = "";
    } else {
        activeFiltersContainer.innerHTML = "";
        activeFiltersContainer.appendChild(searchTag);
    }

    state.activeTags.forEach(tag => {
        const activeFilterTag = document.createElement("div");
        activeFilterTag.classList.add("active-filter-tag");
        
        const tagText = document.createElement("p");
        tagText.textContent = tag;
        
        const tagRemoveButton = document.createElement("img");
        tagRemoveButton.classList.add("remove-tag-button");
        tagRemoveButton.setAttribute("src", "/assets/icons/cross.svg");

        activeFilterTag.append(tagText, tagRemoveButton);
        activeFiltersContainer.appendChild(activeFilterTag);
        
        /*** Tags cancel button listeners ******************************/

        tagRemoveButton.addEventListener("click", () => {
            filters.filterByTags(tag);

            // state.displayGlobalState();

        /**************************************************************/
        });
    });
}

//  Display active search tag to keep in mind what is the research keywords
function displayActiveSearchTag(value) {
    const activeFiltersContainer = document.querySelector(".active-filters");
    activeFiltersContainer.innerHTML = "";

    const activeFilterTag = document.createElement("div");
    activeFilterTag.classList.add("active-search-tag");
    
    const tagText = document.createElement("p");
    tagText.textContent = value;
    
    const tagRemoveButton = document.createElement("img");
    tagRemoveButton.classList.add("remove-tag-button");
    tagRemoveButton.setAttribute("src", "/assets/icons/cross.svg");

    activeFilterTag.append(tagText, tagRemoveButton);
    activeFiltersContainer.appendChild(activeFilterTag);
    
    // Tag close cross listeners
    tagRemoveButton.addEventListener("click", () => { 
        removeAllTags();
    });
}

// Remove all tags and reload all recipes
function removeAllTags() {

    const activeFiltersContainer = document.querySelector(".active-filters");
    activeFiltersContainer.innerHTML = "";

    state.activeTags.clear();

    cardTemplate.displayRecipesCards(data.allRecipes);
    dropdownTemplate.displayDropdownElements(data.allDropdownFilters);
}

export { displayActiveTags, removeAllTags, displayActiveSearchTag }