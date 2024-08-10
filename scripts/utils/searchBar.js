import * as dropdownTemplate from "/scripts/templates/dropdownElement.js";
import * as cardTemplate from "/scripts/templates/recipesCard.js";
import * as tag from "/scripts/templates/tag.js";
import * as filters from "/scripts/utils/filters.js";
import * as state from "/scripts/utils/state.js";
import * as data from "/scripts/utils/data.js";
import * as text from "/scripts/utils/text.js";

// Get search bar DOM elements
const mainSearchInput = document.querySelector(".recipes-search-input");
const mainSearchCompletionZone = document.querySelector(".search-completion-container");
const cancelButton = document.querySelector(".cancel-input-button");
const searchButton = document.querySelector("#searchButton");

// Init search bar elements and listeners
function initSearchBar() {

    initSearchBarElements();

    mainSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            hideCompletionZone();
            runSearch();
        }
    });

    searchButton.addEventListener("click", () => {
        hideCompletionZone();
        runSearch();
    });
}

// Run matching data research
async function runSearch(searchValue) {
    mainSearchInput.blur();
    const inputValue = text.sanitizeHtmlInput(mainSearchInput.value);
    
    if (searchValue !== undefined && searchValue.length > 0) {
        filters.getRecipesByInputValue(searchValue);

        cardTemplate.displayRecipesCards(data.allRecipes);

        dropdownTemplate.updateActiveDropdownFiltersList(data.allRecipes);
        dropdownTemplate.displayDropdownElements(data.allDropdownFilters);

        tag.removeAllTags();
    }

    if (inputValue === "" || searchValue === "") {
        filters.getRecipesByInputValue();

        cardTemplate.displayRecipesCards(data.allRecipes);

        dropdownTemplate.updateActiveDropdownFiltersList(data.allRecipes);
        dropdownTemplate.displayDropdownElements(data.allDropdownFilters);

        tag.removeAllTags();
    }

    if (inputValue !== "") {
        tag.removeAllTags();
        state.activeTags.clear();
        state.activeDropdownFilters.clear();

        filters.getRecipesByInputValue();

        data.allDropdownFilters[0].ingredients.forEach(ingredient => {
            const inputCapitalized = text.capitalize(inputValue);

            if (inputCapitalized === ingredient) {
                displaySearchTag(inputCapitalized);
            }
        });

        cardTemplate.displayRecipesCards(state.activeRecipes);
        dropdownTemplate.updateActiveDropdownFiltersList(state.activeRecipes);
        dropdownTemplate.displayDropdownElements(state.activeDropdownFiltersList);

        return

        function displaySearchTag(searchInput) {
            state.toogleActiveTag(searchInput);
            state.toogleActiveFilter(searchInput);
            tag.displayActiveTags();
        }
    }

    mainSearchInput.value = "";
    cancelButton.style.display = "none";
    mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
}

// Display palceholder and close button based on user actions
function initSearchBarElements() {
    mainSearchInput.addEventListener("input", () => {
            updateCompletionZone();
    });

    mainSearchInput.addEventListener("focus", () => {
        cancelButton.style.display = "block";
    });

    mainSearchInput.addEventListener("focusin", () => {
            updateCompletionZone();

        window.addEventListener("click", () => {
            cancelButton.style.display = "block";
            mainSearchInput.placeholder = "";
        });
    });
    
    mainSearchInput.addEventListener("focusout", () => {
        window.addEventListener("click", () => {
            hideCompletionZone();

            if (mainSearchInput.value !== "") {
                cancelButton.style.display = "block";
                mainSearchInput.placeholder = "";
            } else {
                cancelButton.style.display = "none";
                mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
            }
        });
    });

    cancelButton.addEventListener("click", () => {
        mainSearchInput.value = "";
        cancelButton.style.display = "none";
        mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
        runSearch();
    });
}

// Update mains dearch completion zone content
function updateCompletionZone() {
    mainSearchCompletionZone.innerHTML = "";

    if (mainSearchInput.value.length >= 3) {
        hideCompletionZone();
    } else if (mainSearchInput.value.length < 3 && mainSearchInput.value.length !== 0) {
        displayCompletionMatchingElements("errorMessage");
    } else {
        hideCompletionZone();
    }
}

// Hide main search completion zone
function hideCompletionZone() {
    mainSearchCompletionZone.innerHTML = "";
    mainSearchCompletionZone.style.display = "none";
}

// Display results in completion zone
function displayCompletionMatchingElements(key) {
        mainSearchCompletionZone.style.display = "grid";

        const divFilter = document.createElement("div");
        divFilter.classList.add("search-completion-element");
        
        const pFilterText = document.createElement("p");
        pFilterText.classList.add("search-completion-element-text");

        const pKey = document.createElement("p");
        pKey.classList.add("search-completion-element-type");
        pKey.textContent = key;
        
        // divFilter.append(pKey, pFilterText);
        mainSearchCompletionZone.appendChild(divFilter);

        if (key === "errorMessage") {
            displayResultsNumber(-1);

            return
        }
}

// Display the amout of results in completion zone
function displayResultsNumber(resultsNumber) {
    const CompletionFirstFilterNode = document.querySelector(".search-completion-element");

    const pResultsNumber = document.createElement("p");
    pResultsNumber.classList.add("results-number");

    if (resultsNumber === -1) {
        pResultsNumber.textContent = "Veuillez saisir au moins trois caractères";
    }
        
    mainSearchCompletionZone.insertBefore(pResultsNumber, CompletionFirstFilterNode);
}

export { initSearchBar, runSearch }