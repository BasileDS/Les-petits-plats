// Get all recipes from JSON file and add in to session storage if not already done
async function getAllRecipes(prop) {
    let responseData = {};
    const sessionStorageData = window.sessionStorage.getItem("recipes");

    if (sessionStorageData === null) {
        const response = await fetch("./data/recipes.json");
        responseData = await response.json();

        const sessionsData = JSON.stringify(responseData); 
        window.sessionStorage.setItem("recipes", sessionsData);
    }

    if (sessionStorageData) {
        const sessionStorage = window.sessionStorage.getItem("recipes");
        responseData = JSON.parse(sessionStorage);
    }
    
    if (prop === "all") {
        return responseData
    }

    if (prop === "titles") {
        let titles = [];

        responseData.forEach(recipe => {
            titles.push(recipe.name);
        });

        return titles
    }
}

//  Get dropdown filter's names list
async function getDropdownFiltersList(filtersName) {
    const recipes = await getAllRecipes("all");
    
    const filtersRow = [];

    if (filtersName === "ingredients") {
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                filtersRow.push(ingredient.ingredient.charAt(0).toUpperCase() + ingredient.ingredient.slice(1));
            })
        });
    }

    if (filtersName === "appliances") {
        recipes.forEach(recipe => {
            filtersRow.push(recipe.appliance.charAt(0).toUpperCase() + recipe.appliance.slice(1));
        });
    }

    if (filtersName === "ustensils") {
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                filtersRow.push(ustensil.charAt(0).toUpperCase() + ustensil.slice(1));
            }); 
        });
    }

    if (filtersName === "all") {
        const ingredientsLists = await getDropdownFiltersList("ingredients");
        const appliancesLists = await getDropdownFiltersList("appliances");
        const ustensilsLists = await getDropdownFiltersList("ustensils");

        const allDropdownFilters = [...new Set(ingredientsLists, appliancesLists, ustensilsLists)];

        const sortedFilters = allDropdownFilters.sort();

        return sortedFilters
    }

    const filters = [...new Set(filtersRow)];

    const sortedFilters = filters.sort();

    return sortedFilters
}

// Get all list elements from a specific dropdown filter
function getDropdownFiltersDOMElements(filter) {
    switch (filter) {
        case "Ingrédients":
            const IngredientFilterList = [];
            const dropdowIngredientListElements = document.querySelectorAll(`.list-element-${filter}`);
            dropdowIngredientListElements.forEach(listElement => {
                IngredientFilterList.push({ Ingrédients: listElement});
            });

            return IngredientFilterList
    
        case "Appareils":
            const appliancesFilterList = [];
            const dropdowAppliancesListElements = document.querySelectorAll(`.list-element-${filter}`);
            dropdowAppliancesListElements.forEach(listElement => {
                appliancesFilterList.push({ Appareils: listElement});
            });

            return appliancesFilterList
    
        case "Ustensiles":
            const ustensilsFilterList = [];
            const dropdowUstensilsListElements = document.querySelectorAll(`.list-element-${filter}`);
            dropdowUstensilsListElements.forEach(listElement => {
                ustensilsFilterList.push({ Ustensiles: listElement});
            });

            return ustensilsFilterList
    
        default:
            break;
    }
}

// Get all filter names
function getAllFilterNames() {
    const filtersNames = new Set;
    const filtersDOM = document.querySelectorAll(".dropdow-list-element");
    
    filtersDOM.forEach(element => {
        const name = element.firstChild.textContent;
        
        capitalize(name);
        
        filtersNames.add(name);
    });
    
    return filtersNames
}

function capitalize(text) {
    return text[0].toUpperCase() + text.slice(1);
}

export { getAllRecipes, getDropdownFiltersDOMElements, getDropdownFiltersList, getAllFilterNames }