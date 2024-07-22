import * as recipesData from "/scripts/utils/data.js";
import * as removeAccents from "./removeAccents.js";
import * as tags from "./tags.js";

// Get search bar DOM elements
const mainSearchInput = document.querySelector(".recipes-search-input");
const mainSearchCompletionZone = document.querySelector(".search-completion-container");
const cancelButton = document.querySelector(".cancel-input-button");
const searchButton = document.querySelector("#searchButton");

// Get data from session storage
const recipeIngedients = await recipesData.getAllRecipes("ingredients");
const recipesNames = await recipesData.getAllRecipes("recipeNames");
const recipesDescriptions = await recipesData.getAllRecipes("descriptions");

// Initialize search bar listners
function initSearchBarCompletion() {
    searchButton.addEventListener("click", () => {
        recipeIngedients.forEach(ingredient => {
            const valueToCheck = removeAccents.removeAccents(ingredient.toLowerCase());

            if (valueToCheck === mainSearchInput.value) {
                tags.updateActiveTags(ingredient);
            }
        });

    });

    mainSearchInput.addEventListener("keydown", (e) => {
        console.log(e.key);
        if (e.key === "Enter") {
            recipeIngedients.forEach(ingredient => {
                const valueToCheck = removeAccents.removeAccents(ingredient.toLowerCase());
    
                if (valueToCheck === mainSearchInput.value) {
                    tags.updateActiveTags(ingredient);
                }
            });
        }

    });

    mainSearchInput.addEventListener("input", () => {
        updateCompletionZone();
    });

    mainSearchInput.addEventListener("focus", () => {
        updateCompletionZone();
    });

    mainSearchInput.addEventListener("focusin", () => {
        window.addEventListener("click", () => {
            updateCompletionZone();
        });
    });

    mainSearchInput.addEventListener("focusout", () => {
        window.addEventListener("click", () => {
            hideCompletionZone();
        });
    });

    cancelButton.addEventListener("click", () => {
        hideCompletionZone();
    });
}

// Update mains earch completion zone content
async function updateCompletionZone() {
    mainSearchCompletionZone.innerHTML = "";

    if (mainSearchInput.value.length >= 3) {
        const activeIngredients = isMatchingFilteredRecipes(recipeIngedients, "ingredients");
        const activeRecipeNames = isMatchingFilteredRecipes(recipesNames, "recipeNames");
        const activeDescription = isMatchingFilteredRecipes(recipesDescriptions, "descriptions");

        const SearchInputFilters = document.querySelectorAll(".search-completion-element-text");

        SearchInputFilters.forEach(filter => {
            if (filter.parentNode.firstChild.textContent !== "Recette" && filter.parentNode.firstChild.textContent !== "Dans la description") {
                filter.addEventListener("click", () => {
                    tags.updateActiveTags(filter.textContent);
                    tags.updateListElementTags();
                });
            } else {
                filter.addEventListener("click", () => {
                    console.log("filter recipes");
                });
            }
        });

        const resultsNumber = activeIngredients.length + activeRecipeNames.length;
        displayResultsNumber(resultsNumber)
    } else {
        hideCompletionZone();
    }
}

// Hide main search completion zone
function hideCompletionZone() {
    mainSearchCompletionZone.innerHTML = "";
    mainSearchCompletionZone.style.display = "none";
}

// Check if input value is matching with on of several filter elements (ingredients, appliances, ustensils)
function isMatchingFilteredRecipes(elements, type) {
    const matchingValues = [];

    const inputValue = mainSearchInput.value;

    elements.forEach(element => {
        let key;
        let filterTextValueToCheck;
        let filterTextValueToDisplay;

        if (type === "ingredients") {
            key = "Ingrédient";
            filterTextValueToCheck = element;
            filterTextValueToDisplay = element;
        }

        if (type === "recipeNames") {
            key = "Recette";
            filterTextValueToCheck = element;
            filterTextValueToDisplay = element;
        }
    
        if (type === "descriptions") {
            key = "Dans la description";
            filterTextValueToCheck = element.description;
            filterTextValueToDisplay = element.name;
        }

        const filterTextLowerCase = filterTextValueToCheck.toLowerCase();
        const filterTextToCheck = removeAccents.removeAccents(filterTextLowerCase);

        const inputValueToLowerCase = inputValue.toLowerCase();
        const inputValueToCheck = removeAccents.removeAccents(inputValueToLowerCase);

        const isMatching = filterTextToCheck.includes(inputValueToCheck);

        if (isMatching) {
            displayCompletionMatchingElements(key, filterTextValueToDisplay);

            matchingValues.push(filterTextValueToDisplay);
        }
    });

    return matchingValues
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

export { initSearchBarCompletion }