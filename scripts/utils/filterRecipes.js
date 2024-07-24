import * as tags from "./tags.js";
import * as data from "./data.js";
import * as searchBar from "./mainSearchBar.js";
import * as removeAccents from "./removeAccents.js";
import * as cardTemplate from "/scripts/templates/recipesCard.js";
import * as dropdownFilter from "/scripts/templates/dropdowFilter.js";

const mainSearchInput = document.querySelector(".recipes-search-input");

const recipeIngedients = await data.getAllRecipes("ingredients");
const recipesNames = await data.getAllRecipes("recipeNames");
const recipesDescriptions = await data.getAllRecipes("descriptions");

const allRecipes = await data.getAllRecipes("all");

function filterBy(filter) {
    let result;

    switch (filter) {
        case "searchBar":
            result = filterByInputValue();

            break;
    
        case "tag":
            filterByTags();

            break;
    
        default:
            break;
    }

    return result
}

// Update page elements : tags, dropdown filters, recipe cards
async function updatePageElements() {
    recipeIngedients.forEach(ingredient => {

        const valueToCheck = removeAccents.removeAccents(ingredient.toLowerCase());
        const inputValueToCheck = removeAccents.removeAccents(mainSearchInput.value.toLowerCase());

        const isActive = tags.isTagActive(inputValueToCheck);
        
        const inputValueLength = inputValueToCheck.length;
        const valueIndex = valueToCheck.indexOf(inputValueToCheck);
        const inputValueIndex = valueIndex + inputValueLength;
        const slicedValueToCheck = valueToCheck.slice(valueIndex, inputValueIndex);

        if (!isActive && slicedValueToCheck === inputValueToCheck) {
            
            if (!isActive && valueToCheck === inputValueToCheck) {
                tags.updateActiveTags(ingredient);

                filterBy("tag");
            }

            tags.initTagFiltering();
            
            tags.updateListElementTags();
            
            const recipesToDisplay = filterBy("searchBar");
            console.log("check before", recipesToDisplay);


            cardTemplate.displayRecipesCards(recipesToDisplay);
        }
    });
}

// Returns an array of active recipes
function filterByInputValue() {
    let recipesFromInput = [];

    const matchingInputData = getAllInputMatchingRecipesValues();
    const matchingInputDataValues = matchingInputData.activeFilters;
    matchingInputDataValues.forEach(matchingInputArray => {

        matchingInputArray.forEach(matchingInputValue => {
            const key = Object.keys(matchingInputValue);

            allRecipes.forEach(recipe => {

                const matchingRecipe = getMatchingRecipe(key[0], matchingInputValue, recipe)
                const isInclude = recipesFromInput.includes(matchingRecipe);
                
                if(matchingRecipe !== undefined && !isInclude) {
                    recipesFromInput.push(matchingRecipe);
                }
            });
        });
    });

    
    const dropdownElements = data.getDropdownFiltersFromCardsDOM(recipesFromInput);
    dropdownFilter.displayDropdownFilterDOMElements(dropdownElements);
    dropdownFilter.addFilterDropdownAnimation();

    
    if (recipesFromInput.length !== 0) {
        console.log("check", recipesFromInput);
        setToSessionStorage(recipesFromInput);
    }

    return recipesFromInput
}

// Filter cards by tag
async function filterByTags() {
    const activeTagsArr = new Set();
    const activeTags = [];
    const activeTagsDOM = tags.getActiveTags();

    activeTagsDOM.forEach(tagDOM => {
        activeTagsArr.add(tagDOM.firstChild.textContent);
    });

    activeTagsArr.forEach(tagName => {
        const tag = getTypeByTagName(tagName);
        activeTags.push(tag);
    });

    const recipesFromTag = [];
    const activeFilteredRecipes = await getFilteredRecipesFromSessionStorage();

    activeFilteredRecipes.forEach(recipe => {
        activeTags.forEach(activeTag => {
            const matchingRecipe = getMatchingRecipe(activeTag.type, activeTag.value, recipe);

            if(matchingRecipe !== undefined) {
                recipesFromTag.push(matchingRecipe);
            }
        });
    });

    setToSessionStorage(recipesFromTag);

    if (activeTagsDOM.length !== 0) {
        cardTemplate.displayRecipesCards(recipesFromTag);
    }

    const dropdownElements = data.getDropdownFiltersFromCardsDOM(recipesFromTag);
    dropdownFilter.displayDropdownFilterDOMElements(dropdownElements);
    dropdownFilter.addFilterDropdownAnimation();

    if (activeTagsDOM.length === 0) {
        cardTemplate.displayRecipesCards(allRecipes);
        dropdownFilter.initFilterElements();

        setToSessionStorage(allRecipes);
    }
}

function getMatchingRecipe(key, value, recipe) {
    let recipeToCheck;
    let filterToCheck;

    let matchingRecipe;
    
    if (key === "ingredient") {
        recipe.ingredients.forEach(ingredient => {
            recipeToCheck = removeAccents.removeAccents(ingredient.ingredient.toLowerCase());
            filterToCheck = removeAccents.removeAccents(value.ingredient.toLowerCase());

            if (recipeToCheck.includes(filterToCheck)) {
                matchingRecipe = recipe;
            }
        })
    }
    
    if (key === "appliance") {
            recipeToCheck = removeAccents.removeAccents(recipe.appliance.toLowerCase());
            filterToCheck = removeAccents.removeAccents(value.appliance.toLowerCase());

            if (recipeToCheck === filterToCheck) {
                matchingRecipe = recipe;
            }
    }
    
    if (key === "ustensil") {
            recipe.ustensils.forEach(ustensil => {
                recipeToCheck = removeAccents.removeAccents(ustensil.toLowerCase());
                filterToCheck = removeAccents.removeAccents(value.ustensil.toLowerCase());

                if (recipeToCheck === filterToCheck) {
                    matchingRecipe = recipe;
                }
            });
    }
    
    if (key === "name") {
            recipeToCheck = removeAccents.removeAccents(recipe.name.toLowerCase());
            filterToCheck = removeAccents.removeAccents(value.name.toLowerCase());

            if (recipeToCheck.includes(filterToCheck)) {
                matchingRecipe = recipe;
            }
    }
    
    if (key === "description") {
            recipeToCheck = removeAccents.removeAccents(recipe.description.toLowerCase());
            filterToCheck = removeAccents.removeAccents(value.description.toLowerCase());

            if (recipeToCheck.includes(filterToCheck)) {
                matchingRecipe = recipe;
            }
    }

    return matchingRecipe
}

// Returns an array of all active recipes matching values and the number of active recipes
function getAllInputMatchingRecipesValues() {
    let activeFilters = [];
    let recipesValues = [];

    const activeIngredients = getInputMatchingRecipesValues("ingredients");
    const activeRecipeNames = getInputMatchingRecipesValues("recipeNames");
    const activeDescriptions = getInputMatchingRecipesValues("descriptions");

    activeFilters.push(activeIngredients.activeFilterValues, activeRecipeNames.activeFilterValues, activeDescriptions.activeFilterValues);
    recipesValues.push(activeIngredients.valuesToDisplay, activeRecipeNames.valuesToDisplay, activeDescriptions.valuesToDisplay);

    const length = activeIngredients.valuesToDisplay.length + activeRecipeNames.valuesToDisplay.length;

    return { activeFilters, length }
}

// Returns the type of tag based on the tag name
function getTypeByTagName(tagName) {
    let type;
    let object;

    const filteredDropdownIngredients = document.querySelectorAll(".list-element-ingredients");
    const filteredDropdownAppliances = document.querySelectorAll(".list-element-appliances");
    const filteredDropdownUstensils = document.querySelectorAll(".list-element-ustensils");

    filteredDropdownIngredients.forEach(ingredient => {
        const isIn = ingredient.textContent.includes(tagName);
        if (isIn) {
            type = "ingredient";
            const value = {ingredient: tagName}
            object = { type, value }
        }  
    });
    
    filteredDropdownAppliances.forEach(appliance => {
        const isIn = appliance.textContent.includes(tagName);
        if (isIn) {
            type = "appliance";
            const value = {appliance: tagName}
            object = { type, value }
        }  
    });

    filteredDropdownUstensils.forEach(ustensil => {
        const isIn = ustensil.textContent.includes(tagName);
        if (isIn) {
            type = "ustensil";
            const value = {ustensil: tagName}
            object = { type, value }
        }  
    });

    return object
}

// Return an array of values that are matching a specific recipe's data (ingredients, appliances, ustensils)
function getInputMatchingRecipesValues(type) {
    const valuesToDisplay = [];
    const activeFilterValues = [];

    const mainSearchInput = document.querySelector(".recipes-search-input");
    const inputValue = mainSearchInput.value;

    const ingredient = type === "ingredients" ? recipeIngedients : false;
    const recipeName = type === "recipeNames" ? recipesNames : false;
    const description = type === "descriptions" ? recipesDescriptions : false;

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
            filterTextValueToCheck = element.description;
            filterTextValueToDisplay = element.name;
        }

        const filterTextLowerCase = filterTextValueToCheck.toLowerCase();
        const filterTextToCheck = removeAccents.removeAccents(filterTextLowerCase);

        const inputValueToLowerCase = inputValue.toLowerCase();
        const inputValueToCheck = removeAccents.removeAccents(inputValueToLowerCase);

        const isMatching = filterTextToCheck.includes(inputValueToCheck);

        if (isMatching && type !== "descriptions") {
            searchBar.displayCompletionMatchingElements(key, filterTextValueToDisplay);

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

// Set filtered recipes to session storage
function setToSessionStorage(filteredRecipes) {
    const sessionData = JSON.stringify(filteredRecipes);
    window.sessionStorage.setItem("filteredRecipes", sessionData);
}

// Set filtered recipes to session storage
async function getFilteredRecipesFromSessionStorage() {
    const sessionStorage = window.sessionStorage.getItem("filteredRecipes");
    const responseData = JSON.parse(sessionStorage);

    return responseData
}

export { updatePageElements, filterByInputValue, getInputMatchingRecipesValues, getAllInputMatchingRecipesValues, filterBy, setToSessionStorage }