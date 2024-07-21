// Get all list elements from a specific dropdown filter
function getDropdownFiltersElements(filter) {
    switch (filter) {
        case "Ingrédients":
            const IngredientFilterList = [];
            const dropdowIngredientListElements = document.querySelectorAll(`.list-element-${filter}`);
            dropdowIngredientListElements.forEach(listElement => {
                IngredientFilterList.push({ ingredients: listElement});
            });

            return IngredientFilterList
    
        case "Appareils":
            const appliancesFilterList = [];
            const dropdowAppliancesListElements = document.querySelectorAll(`.list-element-${filter}`);
            dropdowAppliancesListElements.forEach(listElement => {
                appliancesFilterList.push({ appliances: listElement});
            });

            return appliancesFilterList
    
        case "Ustensiles":
            const ustensilsFilterList = [];
            const dropdowUstensilsListElements = document.querySelectorAll(`.list-element-${filter}`);
            dropdowUstensilsListElements.forEach(listElement => {
                ustensilsFilterList.push({ ustensils: listElement});
            });

            return ustensilsFilterList
    
        default:
            break;
    }
}

// Get all filter DOM elements
function getAllFilterDOMElement() {
    const filtersDOM = new Set;
    const filtersDOMElements = document.querySelectorAll(".dropdow-list-element");
    
    filtersDOMElements.forEach(element => {        
        filtersDOM.add(element);
    });
    
    return filtersDOM
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