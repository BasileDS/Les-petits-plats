import * as recipesData from "/scripts/utils/data.js";
import * as removeAccents from "./removeAccents.js";
import * as tags from "./tags.js";

// Get search bar DOM elements
const mainSearchInput = document.querySelector(".recipes-search-input");
const mainSearchCompletionZone = document.querySelector(".search-completion-container");
const cancelButton = document.querySelector(".cancel-input-button");

// Initialize search bar listners
function initSearchBarCompletion(filters) {

    const descriptionListDOM = recipesData.getAllDescriptionsDOMElement();
    const titlesListDOM = recipesData.getAllTitlesDOMElement();

    mainSearchInput.addEventListener("input", () => {
        updateCompletionZone(filters, descriptionListDOM, titlesListDOM);
    });

    mainSearchInput.addEventListener("focus", () => {
        updateCompletionZone(filters, descriptionListDOM, titlesListDOM);
    });

    cancelButton.addEventListener("click", () => {
        hideCompletionZone();
    });
}

// Update mains earch completion zone content
function updateCompletionZone(filters, descriptionDOM, titlesDOM) {
    const ingredientsListDOM = recipesData.getDropdownFiltersElements(filters[0]); // ingredients
    const appliancesListDOM = recipesData.getDropdownFiltersElements(filters[1]); // appliances
    const ustensilsListDOM = recipesData.getDropdownFiltersElements(filters[2]); // ustensils

    mainSearchCompletionZone.innerHTML = "";

    if (mainSearchInput.value.length >= 3) {
        const ingredientsNb = searchInElements(ingredientsListDOM, "filter");
        const appliancesNb = searchInElements(appliancesListDOM, "filter");
        const ustensilsNb = searchInElements(ustensilsListDOM, "filter");
        const descriptionsNb = searchInElements(descriptionDOM, "description");
        const titlesNb = searchInElements(titlesDOM, "title");

        const resultsNumber = ingredientsNb + appliancesNb + ustensilsNb + descriptionsNb + titlesNb;

        const CompletionFirstFilterNode = document.querySelector(".search-completion-element");
        const pResultsNumber = document.createElement("p");
        pResultsNumber.classList.add("results-number");
        pResultsNumber.textContent = `${resultsNumber} éléments correspondent à votre recherche`;
        mainSearchCompletionZone.insertBefore(pResultsNumber, CompletionFirstFilterNode);

        if (resultsNumber === 0) {
            pResultsNumber.classList.add("no-results");
        } else {
            pResultsNumber.classList.remove("no-results");
        }

        const SearchInputFilters = document.querySelectorAll(".search-completion-element-text");
        console.log(SearchInputFilters);

        SearchInputFilters.forEach(filter => {
            filter.addEventListener("click", () => {
                tags.updateActiveTags(filter);
                tags.updateListElement();
            });
        });

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
function searchInElements(filters, type) {
    const inputValue = mainSearchInput.value;
    
    let resultsNumber = 0;

    filters.forEach(filter => {
        let key;

        const filterValue = () => {
            switch (type) {
                case "filter":
                    
                    key = Object.keys(filter);
                    const filterTextDOM = Object.values(filter);
                    const filterTextValue = filterTextDOM[0].textContent;
    
                    return filterTextValue
            
                case "description":
                    key = "Description";
                    const descriptionTextValue = filter.textContent;
                    return descriptionTextValue
            
                case "title":
                    key = "Recette";
                    const recipeTextValue = filter.textContent;
                    return recipeTextValue

                default:
                    break;
            }
        }

        const filterTextValue = filterValue();

        console.log(filterTextValue);

        const filterTextLowerCase = filterTextValue.toLowerCase();
        const filterTextToCheck = removeAccents.removeAccents(filterTextLowerCase);

        const inputValueToLowerCase = inputValue.toLowerCase();
        const inputValueToCheck = removeAccents.removeAccents(inputValueToLowerCase);

        const isMatching = filterTextToCheck.includes(inputValueToCheck);

        if (isMatching) {
            resultsNumber += 1;

            mainSearchCompletionZone.style.display = "grid";

            const divFilter = document.createElement("div");
            divFilter.classList.add("search-completion-element");
            
            const pFilterText = document.createElement("p");
            pFilterText.classList.add("search-completion-element-text");
            pFilterText.textContent = filterTextValue;

            const pKey = document.createElement("p");
            pKey.classList.add("search-completion-element-type");
            pKey.textContent = key;
            
            divFilter.append(pKey, pFilterText);
            mainSearchCompletionZone.appendChild(divFilter);
        }
    });

    return resultsNumber
}

// // Check if input value is matching with on of several description elements
// function searchInDescriptionElements(descriptionsDOM) {
//     const inputValue = mainSearchInput.value;
    
//     let resultsNumber = 0;

//     descriptionsDOM.forEach(description => {
//         const description = description.textContent;

//         const descriptionLowerCase = description.toLowerCase();
//         const descriptionToCheck = removeAccents.removeAccents(descriptionLowerCase);

//         const inputValueToLowerCase = inputValue.toLowerCase();
//         const inputValueToCheck = removeAccents.removeAccents(inputValueToLowerCase);

//         const isMatching = filterTextToCheck.includes(inputValueToCheck);

//         if (isMatching) {
//             resultsNumber += 1;

//             mainSearchCompletionZone.style.display = "grid";

//             const divFilter = document.createElement("div");
//             divFilter.classList.add("search-completion-element");
            
//             const pFilterText = document.createElement("p");
//             pFilterText.classList.add("search-completion-element-text");
//             pFilterText.textContent = filterTextValue;

//             const pKey = document.createElement("p");
//             pKey.classList.add("search-completion-element-type");
//             pKey.textContent = key;
            
//             divFilter.append(pKey, pFilterText);
//             mainSearchCompletionZone.appendChild(divFilter);
//         }
//     });

//     return resultsNumber
// }

export { initSearchBarCompletion }