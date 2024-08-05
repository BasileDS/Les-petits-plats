import * as dropdownTemplate from "/scripts/templates/dropdownElement.js";
import * as cardTemplate from "/scripts/templates/recipesCard.js";
import * as tag from "/scripts/templates/tag.js";
import * as filters from "./filters.js";
import * as state from "./state.js";
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
async function runSearch(searchValue) {
    mainSearchInput.blur();

    const inputValue = sanitizeHtmlInput(mainSearchInput.value);

    if (searchValue !== undefined && searchValue.length > 0) {
        console.log("hello", searchValue.length);

        filters.getRecipesByInputValue(searchValue);

        cardTemplate.displayRecipesCards(data.allRecipes);

        dropdownTemplate.updateActiveDropdownFiltersList(data.allRecipes);
        dropdownTemplate.displayDropdownElements(data.allDropdownFilters);

        tag.removeAllTags();

        // state.displayGlobalState();
    }

    if (inputValue === "" || searchValue === "") {
        filters.getRecipesByInputValue();

        cardTemplate.displayRecipesCards(data.allRecipes);

        dropdownTemplate.updateActiveDropdownFiltersList(data.allRecipes);
        dropdownTemplate.displayDropdownElements(data.allDropdownFilters);

        tag.removeAllTags();

        // state.displayGlobalState();
    }

    if (inputValue !== "") {
        let inputText;
        searchValue !== undefined ? inputText = searchValue : inputText = inputValue;
        
        tag.removeAllTags();
        // tag.displayActiveSearchTag(inputText);
        filters.getRecipesByInputValue();
        cardTemplate.displayRecipesCards(state.activeRecipes);
        dropdownTemplate.updateActiveDropdownFiltersList(state.activeRecipes);
        dropdownTemplate.displayDropdownElements(state.activeDropdownFiltersList);

        // state.displayGlobalState();

        // mainSearchInput.value = "";
        // cancelButton.style.display = "none";
        // mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";

        return
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

// Sanitize HTML input
function sanitizeHtmlInput(input) {
    // Pattern to match script, iframe, object, embed, link, style, base, form, img, and a tags
    const TAGS_REGEX = /<\/?(script|iframe|object|embed|link|style|base|form|img|a)\b[^>]*>/gi;

    // Pattern to match event handler attributes like onclick, onload, etc.
    const ATTRS_REGEX = /\s*(on\w+|style)\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi;

    // Remove matching tags
    let sanitizedText = input.replace(TAGS_REGEX, '');

    // Remove matching attributes
    sanitizedText = sanitizedText.replace(ATTRS_REGEX, '');

    return sanitizedText;
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