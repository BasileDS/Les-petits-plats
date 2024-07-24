import * as tags from "./tags.js";
import * as recipes from "./filterRecipes.js";
import * as removeAccents from "./removeAccents.js";

// Get search bar DOM elements
const mainSearchInput = document.querySelector(".recipes-search-input");
const mainSearchCompletionZone = document.querySelector(".search-completion-container");
const cancelButton = document.querySelector(".cancel-input-button");
const searchButton = document.querySelector("#searchButton");

// Initialize search bar listners
async function initSearchBarCompletion() {
    mainSearchInput.value = "";

    searchButton.addEventListener("click", () => {
        tags.clearTags();

        recipes.updatePageElements();

        hideCompletionZone();
    });

    cancelButton.addEventListener("click", () => {
        hideCompletionZone();

        mainSearchInput.value = "";
        cancelButton.style.display = "none";
        mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
    });

    mainSearchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            tags.clearTags();

            recipes.updatePageElements();

            hideCompletionZone();

            mainSearchInput.value = "";
            cancelButton.style.display = "none";
            mainSearchInput.placeholder = "Rechercher une recette, un ingrédient, ...";
        }
    });

    mainSearchInput.addEventListener("input", () => {
        updateCompletionZone();
    });

    mainSearchInput.addEventListener("focus", () => {
        updateCompletionZone();

        cancelButton.style.display = "block";
    });

    mainSearchInput.addEventListener("focusin", () => {
        window.addEventListener("click", () => {
            updateCompletionZone();

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
}

// Update mains dearch completion zone content
function updateCompletionZone() {
    mainSearchCompletionZone.innerHTML = "";

    if (mainSearchInput.value.length >= 3) {
        const activeFilters = recipes.getAllInputMatchingRecipesValues();

        const SearchInputFilters = document.querySelectorAll(".search-completion-element-text");

        SearchInputFilters.forEach(filter => {
            if (filter.parentNode.firstChild.textContent !== "Recette" && filter.parentNode.firstChild.textContent !== "Dans la description") {
                filter.addEventListener("click", () => {
                    const inputValueToCheck = removeAccents.removeAccents(mainSearchInput.value.toLowerCase());
                    const isActive = tags.isTagActive(inputValueToCheck);
            
                    if (!isActive) {
                        tags.clearTags();

                        tags.updateActiveTags(filter.textContent);
                        
                        recipes.filterBy("tag");
                        
                        tags.updateListElementTags();
                    }
                });
            } else {
                filter.addEventListener("click", () => {
                    console.log("filter recipes");
                });
            }
        });
        displayResultsNumber(activeFilters.length);
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
    } else {
        pResultsNumber.textContent = "Aucun éléments correspondent à votre recherche";
    }
    
    mainSearchCompletionZone.insertBefore(pResultsNumber, CompletionFirstFilterNode);
}

export { initSearchBarCompletion, displayCompletionMatchingElements }