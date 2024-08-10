import * as dropdownTemplate from "/Les-petits-plats/scripts/templates/dropdownElement.js";
import * as cardTemplate from "/Les-petits-plats/scripts/templates/recipesCard.js";
import * as tag from "/Les-petits-plats/scripts/templates/tag.js";
import * as searchBar from "/Les-petits-plats/scripts/utils/searchBar.js";
import * as state from "/Les-petits-plats/scripts/utils/state.js";
import * as data from "/Les-petits-plats/scripts/utils/data.js";
import * as text from "/Les-petits-plats/scripts/utils/text.js";

function filterByTags(dropdownFilter) {
   
    state.toogleActiveTag(dropdownFilter);
    state.toogleActiveFilter(dropdownFilter);
    
    updateDropdownActiveList(dropdownFilter);
    tag.displayActiveTags();
    
    const activeRecipes = state.activeRecipes.map((x) => x);
    const recipesToDisplay = updateRecipesByActiveTags(activeRecipes);
    cardTemplate.displayRecipesCards(recipesToDisplay);
    
    dropdownTemplate.updateActiveDropdownFiltersList(state.activeRecipes);
    dropdownTemplate.displayDropdownElements(state.activeDropdownFiltersList);
    
    const searchTag = document.querySelector(".active-search-tag");
    if (state.activeDropdownFilters.size === 0 && searchTag === null) { // display all recipes if all tags are removed
        searchBar.runSearch("");
        state.activeDropdownFilters.clear();
    }
}

// Set list element to active status
function updateDropdownActiveList(dropdownFilter) {
    const activeDropdownFiltersDOM = document.querySelectorAll(".dropdow-list-element");

    const activeDropdownIngredientsDOM = document.querySelectorAll(".list-element-ingredients");
    const activeDropdownAppliancesDOM = document.querySelectorAll(".list-element-appliances");
    const activeDropdownUstensilsDOM = document.querySelectorAll(".list-element-ustensils");
    
    let isIngredient = false;
    let isAppliance = false;
    let isUstensil = false;

    activeDropdownIngredientsDOM.forEach(filterDOM => {
        filterDOM.textContent === dropdownFilter ? isIngredient = true : "";
    });

    activeDropdownAppliancesDOM.forEach(filterDOM => {
        filterDOM.textContent === dropdownFilter ? isAppliance = true : "";
    });

    activeDropdownUstensilsDOM.forEach(filterDOM => {
        filterDOM.textContent === dropdownFilter ? isUstensil = true : "";
    });

    activeDropdownFiltersDOM.forEach(filterDOM => {
        let isActive = false;
        
        if (filterDOM.textContent === dropdownFilter) {
            
            if (state.activeIngredients.has(dropdownFilter)) {
                isActive = true
            }

            if (state.activeAppliances.has(dropdownFilter)) {
                isActive = true
            }

            if (state.activeUstensils.has(dropdownFilter)) {
                isActive = true
            }
    
            if (!isActive && filterDOM.lastChild.localName !== "img") {
                isIngredient ? state.activeIngredients.add(dropdownFilter) : "" ;
                isAppliance ? state.activeAppliances.add(dropdownFilter) : "" ;
                isUstensil ? state.activeUstensils.add(dropdownFilter) : "" ;

                state.activeDropdownFilters.add(dropdownFilter);
            }
            
            if (isActive && filterDOM.lastChild.localName !== "img") {
                isIngredient ? state.activeIngredients.add(dropdownFilter) : "" ;
                isAppliance ? state.activeAppliances.add(dropdownFilter) : "" ;
                isUstensil ? state.activeUstensils.add(dropdownFilter) : "" ;
            }

            if (isActive && filterDOM.lastChild.localName === "img") {
                isIngredient ? state.activeIngredients.delete(dropdownFilter) : "" ;
                isAppliance ? state.activeAppliances.delete(dropdownFilter) : "" ;
                isUstensil ? state.activeUstensils.delete(dropdownFilter) : "" ;
            }
        }
    });
}

// Check if a filter is actived or not
function hasFilter(filter, data) {
    return filter.includes(data)
}

// Returns an array of active recipes
function getRecipesByInputValue() {
    state.clearArray(state.activeRecipes);

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
        const recipeName = type === "recipeNames" ? data.allNames : false;
        const description = type === "descriptions" ? data.allDescriptions : false;

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

function updateRecipesByActiveTags(recipes) {
    state.clearArray(state.activeRecipes);

    let matchingValues = [];
    let filteredValues = [];

    state.activeDropdownFilters.forEach(activeFilter => {

        recipes.forEach(recipe => {

            // Ingredients
            recipe.ingredients.forEach(ingredient => {
                if (activeFilter === ingredient.ingredient) { 
                    matchingValues.push(recipe);
                    state.activeRecipes.includes(recipe) ? "" : state.activeRecipes.push(recipe) ;
                }
            });
            
            // Appliances
            if (activeFilter === recipe.appliance) {
                matchingValues.push(recipe);
                state.activeRecipes.includes(recipe) ? "" : state.activeRecipes.push(recipe) ;             
            }
    
            // Ustensils
            recipe.ustensils.forEach(ustensil => {
                if (activeFilter === text.capitalize(ustensil)) {
                    matchingValues.push(recipe);
                    state.activeRecipes.includes(recipe) ? "" : state.activeRecipes.push(recipe) ;
                }
            });
        });
    });

    // Return only tag filtered values matching all tags (ordered by tag click)
    if (state.activeDropdownFilters.size > 1) {
        matchingValues.forEach(recipe => {
            const count = countInArray(matchingValues, recipe);
            if (count > state.activeDropdownFilters.size - 1 && !filteredValues.includes(recipe)) {
                filteredValues.push(recipe);
            }
        })

        return filteredValues
    }

    return state.activeRecipes
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

// Check how many time the element occures in the array
function countInArray(array, element) {
    return array.filter(item => item === element).length;
}

export {
    hasFilter, 
    filterByTags, 
    updateDropdownActiveList, 
    getRecipesByInputValue, 
    updateRecipesByActiveTags 
}