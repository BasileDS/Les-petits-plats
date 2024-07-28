import * as cardTemplate from "/scripts/templates/recipesCard.js";
import * as state from "/scripts/utils/state.js";
import * as tag from "/scripts/templates/tag.js";
import * as data from "./data.js";
import * as text from "./text.js";

function filterByTag(dropdownFilter) {
    tag.displayActiveTags();
    updateDropdownActiveList();
    
    console.log(dropdownFilter);
    toggleFilter(state.activeDropdownFilters, dropdownFilter);

    getRecipesByActiveTags(state.activeRecipes);
    cardTemplate.displayRecipesCards(state.activeRecipes);

    // state.displayGlobalState();
}

// Set list element to active status
function updateDropdownActiveList() {
    const activeDropdownFiltersDOM = document.querySelectorAll(".dropdow-list-element");
    
    activeDropdownFiltersDOM.forEach(filterDOM => {
        let isActive = false;
        const filterName = filterDOM.textContent;
        state.activeIngredients.has(filterName) || state.activeAppliances.has(filterName) || state.activeUstensils.has(filterName)? isActive = true : isActive = false;

        if (!isActive && filterDOM.lastChild.localName === "img") {
            disableFilterList(filterDOM);
        }
        if (isActive && filterDOM.lastChild.localName !== "img") {
            activateFilterList(filterDOM);
        } 
    });

    function activateFilterList(filterDOM) {
        const cancelCross = document.createElement("img");
        cancelCross.setAttribute("src", "/assets/icons/cross.svg");
        cancelCross.classList.add("cancel-list-element");
        
        filterDOM.classList.add("active-list-element");        
        filterDOM.appendChild(cancelCross);
    }

    function disableFilterList(filterDOM) {
        filterDOM.classList.remove("active-list-element");        
        filterDOM.lastChild.remove();
    }

}

// Activate a filter
function addFilter(filter, data) {
    type.push(data);
    console.log(filter);
}

// Toggle a filter
function toggleFilter(filter, data) {

    console.log(data, filter);

    const isActive = hasFilter(data, filter);
    !isActive ? filter.push(data) : filter.delete(data);
}

// Desactivate a filter
function deleteFilter(filter, data) {
    filter.delete(data);
    console.log(filter);
}

// Check if a filter is actived or not
function hasFilter(filter) {
    return filter.includes(data)
}

// Returns an array of active recipes
function getRecipesByInputValue() {
    state.clearActiveRecipes();

    const matchingInputData = getMatchingDataFromInput();
    const matchingInputDataValues = matchingInputData.activeFilters;

    matchingInputDataValues.forEach(matchingInputArray => {
        matchingInputArray.forEach(matchingInputValue => {
            const key = Object.keys(matchingInputValue);
            data.allRecipes.forEach(recipe => {
                const matchingRecipe = getMatchingRecipe(key[0], matchingInputValue, recipe)
                const isInclude = state.activeRecipes.includes(matchingRecipe);
                
                if(matchingRecipe !== undefined && !isInclude) {
                    state.activeRecipes.push(matchingRecipe);
                }
            });
        });
    });

    return state.activeRecipes

    /***  End function to filter recipes  ***/

    // Returns an array of all active recipes matching values and the number of active recipes
    function getMatchingDataFromInput() {
        let activeFilters = [];
        let recipesValues = [];

        const activeIngredients = getMatchingRecipesFromInput("ingredients");
        const activeRecipeNames = getMatchingRecipesFromInput("recipeNames");
        const activeDescriptions = getMatchingRecipesFromInput("descriptions");

        activeFilters.push(activeIngredients.activeFilterValues, activeRecipeNames.activeFilterValues, activeDescriptions.activeFilterValues);
        recipesValues.push(activeIngredients.valuesToDisplay, activeRecipeNames.valuesToDisplay, activeDescriptions.valuesToDisplay);

        const length = activeIngredients.valuesToDisplay.length + activeRecipeNames.valuesToDisplay.length;

        return { activeFilters, length }
    }

    // Return an array of values that are matching a specific recipe's data (ingredients, appliances, ustensils)
    function getMatchingRecipesFromInput(type) {

        const valuesToDisplay = [];
        const activeFilterValues = [];

        const mainSearchInput = document.querySelector(".recipes-search-input");
        const inputValue = mainSearchInput.value;

        const ingredient = type === "ingredients" ? data.allIngredients : false;
        const recipeName = type === "recipeNames" ? data.allAppliances : false;
        const description = type === "descriptions" ? data.allUstensils : false;

        const elements = !ingredient ? !recipeName ? !description ? console.log("error") : description : recipeName : ingredient ;

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
                filterTextValueToCheck = element;
                filterTextValueToDisplay = element.name;
            }

            const filterTextLowerCase = filterTextValueToCheck.toLowerCase();
            const filterTextToCheck = text.removeAccents(filterTextLowerCase);

            const inputValueToLowerCase = inputValue.toLowerCase();
            const inputValueToCheck = text.removeAccents(inputValueToLowerCase);

            const isMatching = filterTextToCheck.includes(inputValueToCheck);

            if (isMatching && type !== "descriptions") {

                valuesToDisplay.push(filterTextValueToDisplay);
            }

            if (isMatching) {
                if (type === "ingredients") {
                    activeFilterValues.push({ ingredient: filterTextValueToCheck});
                }
        
                if (type === "recipeNames") {
                    activeFilterValues.push({ name: filterTextValueToCheck});
                }
            
                if (type === "descriptions") {
                    activeFilterValues.push({ description: filterTextValueToCheck});
                }
            }
        });

        return { valuesToDisplay, activeFilterValues }
    }
}

function getRecipesByActiveTags(recipes) {
    state.clearActiveRecipes();

    state.activeDropdownFilters.forEach(activeFilters => {
        
        activeFilters.forEach(activeFilter => {
            
            recipes.forEach(recipe => {

                // Appliances
                if (activeFilter === recipe.appliances) {
                    console.log(activeFilter, recipe.appliances);
                    state.activeRecipes.push(recipe);
                }  
                // Ustensils
                recipe.ustensils.forEach(ustensil => {
                    if (activeFilter === ustensil) {
                        console.log(activeFilter, ustensil);
                        state.activeRecipes.push(recipe);
                    }
                });
                // Ingredients
                recipe.ingredients.forEach(ingredient => {
                    if (activeFilter === ingredient.ingredient) {
                        console.log(activeFilter, ingredient.ingredient);
                        state.activeRecipes.push(recipe);
                    }
                });
            });
        });
    });

    return state. activeRecipes
}

// Returns the recipe if test is passed
function getMatchingRecipe(key, value, recipe) {
    let recipeToCheck;
    let filterToCheck;

    let matchingRecipe;
    
    if (key === "ingredient") {
        recipe.ingredients.forEach(ingredient => {
            recipeToCheck = text.removeAccents(ingredient.ingredient.toLowerCase());
            filterToCheck = text.removeAccents(value.ingredient.toLowerCase());

            if (recipeToCheck.includes(filterToCheck)) {
                matchingRecipe = recipe;
            }
        })
    }
    
    if (key === "appliance") {
            recipeToCheck = text.removeAccents(recipe.appliance.toLowerCase());
            filterToCheck = text.removeAccents(value.appliance.toLowerCase());

            if (recipeToCheck === filterToCheck) {
                matchingRecipe = recipe;
            }
    }
    
    if (key === "ustensil") {
            recipe.ustensils.forEach(ustensil => {
                recipeToCheck = text.removeAccents(ustensil.toLowerCase());
                filterToCheck = text.removeAccents(value.ustensil.toLowerCase());

                if (recipeToCheck === filterToCheck) {
                    matchingRecipe = recipe;
                }
            });
    }
    
    if (key === "name") {
            recipeToCheck = text.removeAccents(recipe.name.toLowerCase());
            filterToCheck = text.removeAccents(value.name.toLowerCase());

            if (recipeToCheck.includes(filterToCheck)) {
                matchingRecipe = recipe;
            }
    }
    
    if (key === "description") {
            recipeToCheck = text.removeAccents(recipe.description.toLowerCase());
            filterToCheck = text.removeAccents(value.description.toLowerCase());

            if (recipeToCheck.includes(filterToCheck)) {
                matchingRecipe = recipe;
            }
    }

    return matchingRecipe
}

export { 
    addFilter, 
    toggleFilter, 
    deleteFilter, 
    hasFilter, 
    filterByTag, 
    updateDropdownActiveList, 
    getRecipesByInputValue, 
    getRecipesByActiveTags 
}