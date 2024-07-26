import * as dropdownTemplate from "/scripts/templates/dropdownElement.js";
import * as cardTemplate from "/scripts/templates/recipesCard.js";
import * as tag from "/scripts/templates/tag.js";
import * as filters from "./filters.js";
import * as data from "./data.js";

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
async function runSearch() {
    mainSearchInput.blur();

    if (mainSearchInput.value === "") {
        console.log("Display all recipes");
        cardTemplate.displayRecipesCards(data.allRecipes);

        const allDropdownFilters = data.getActiveDropdownFiltersList(allRecipes);
        dropdownTemplate.displayDropdownElements(allDropdownFilters);

        tag.removeAllTags();

    } else {
        console.log("Run search");

        tag.removeAllTags();

    /***  Start function to run to filter recipes and dropdown filters  ***/

        const filteredRecipes = filters.getRecipesByInputValue();
        cardTemplate.displayRecipesCards(filteredRecipes);

        const activeDropdownFilters = data.getActiveDropdownFiltersList(filteredRecipes);
        dropdownTemplate.displayDropdownElements(activeDropdownFilters);
        

    /**********************************************************************/
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
        cancelButton.style.display = "none";
        mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
    });
}

// Update mains dearch completion zone content
function updateCompletionZone() {
    mainSearchCompletionZone.innerHTML = "";

    if (mainSearchInput.value.length >= 3) {
        displayCompletionMatchingElements("key", mainSearchInput.value)
        displayResultsNumber(mainSearchInput.value.length)
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
function displayCompletionMatchingElements(key, filterTextValue) {
    mainSearchCompletionZone.style.display = "grid";

        const divFilter = document.createElement("div");
        divFilter.classList.add("search-completion-element");
        
        const pFilterText = document.createElement("p");
        pFilterText.classList.add("search-completion-element-text");

        if (key === "description") {
            const startIndex = filterTextValue.indexOf(inputValue);
            const endIndex = startIndex + mainSearchInput.value.length;
            pFilterText.innerHTML = `${filterTextValue.slice(0, startIndex)}<span class="is-active-in-description">${filterTextValue.slice(startIndex, endIndex)}</span>${filterTextValue.slice(endIndex)}`;
        } else if (key === "errorMessage") {
            displayResultsNumber(-1);

            return
        } else {
            pFilterText.textContent = filterTextValue;
        }

        const pKey = document.createElement("p");
        pKey.classList.add("search-completion-element-type");
        pKey.textContent = key;
        
        divFilter.append(pKey, pFilterText);
        mainSearchCompletionZone.appendChild(divFilter);
}

// Display the amout of results in completion zone
function displayResultsNumber(resultsNumber) {
    const CompletionFirstFilterNode = document.querySelector(".search-completion-element");

    const pResultsNumber = document.createElement("p");
    pResultsNumber.classList.add("results-number");

    if (resultsNumber === 1) {
        pResultsNumber.textContent = `${resultsNumber} élément correspond à votre recherche`;
    } else if (resultsNumber > 1) {
        pResultsNumber.textContent = `${resultsNumber} éléments correspondent à votre recherche`;
    } else if (resultsNumber === -1) {
        pResultsNumber.textContent = "Veuillez saisir au moins trois caractères";
    } else {
        pResultsNumber.textContent = "Aucun éléments correspondent à votre recherche";
    }
    
    mainSearchCompletionZone.insertBefore(pResultsNumber, CompletionFirstFilterNode);
}

export { initSearchBar }