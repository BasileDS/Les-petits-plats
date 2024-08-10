import * as filters from "/Les-petits-plats/scripts/utils/filters.js";
import * as state from "/Les-petits-plats/scripts/utils/state.js";
import * as text from "/Les-petits-plats/scripts/utils/text.js";
import * as data from "/Les-petits-plats/scripts/utils/data.js";

const filtersContainer = document.querySelector(".filter-elements");

// Display dropdown filter elements
async function displayDropdownElements(dropdownFilters) {
    filtersContainer.innerHTML = "";

    createDropdownElement(dropdownFilters, "ingredients", "Ingrédients");
    createDropdownElement(dropdownFilters, "appliances", "Appareils");
    createDropdownElement(dropdownFilters, "ustensils", "Ustensiles");
}

// Create and append dropdown element and filters list
function createDropdownElement(dropdownFilters, key, elementName) {
    const filterElement = document.createElement("div");
    filterElement.classList.add("filter-element");

    const filterButton = document.createElement("div");
    filterButton.classList.add("filter");
    filterButton.setAttribute("id", `filter-${key}`);
    
    const filterName = document.createElement("p");
    filterName.textContent = elementName;

    const arrowIcon = document.createElement("img");
    arrowIcon.setAttribute("src", "/assets/icons/down-arrow.svg");
    arrowIcon.setAttribute("alt", "down-arrow icon");
    arrowIcon.classList.add("filter-arrow");

    const filterDropDown = document.createElement("div");
    filterDropDown.classList.add("filter-dropdown");
    
    const dropdownSearch = document.createElement("div");
    dropdownSearch.classList.add("dropdown-search");
    
    const dropdownSearchInput = document.createElement("input");
    dropdownSearchInput.setAttribute("type", "text");
    dropdownSearchInput.classList.add("dropdow-input", "search-input");

    const dropdownCancelButton = document.createElement("img");
    dropdownCancelButton.setAttribute("src", "/assets/icons/cross.svg");
    dropdownCancelButton.setAttribute("alt", "cross icon");
    dropdownCancelButton.classList.add("dropdown-button", "dropdown-cancel-button", "cancel-button");

    const dropdownSearchButton = document.createElement("img");
    dropdownSearchButton.setAttribute("src", "/assets/icons/search.svg");
    dropdownSearchButton.setAttribute("alt", "search icon");
    dropdownSearchButton.classList.add("dropdown-button", "dropdown-search-button");
    
    const dropdownList = document.createElement("ul");
    dropdownList.classList.add("dropdow-list");

    if (key === "ingredients") {
        dropdownFilters[0].ingredients.forEach(ingredient => {
            const dropdownListElement = document.createElement("li");

            dropdownListElement.classList.add("dropdow-list-element", "list-element-ingredients");
            dropdownListElement.textContent = ingredient;

            dropdownList.append(dropdownListElement);
            
            toggleDropdownFilter(dropdownListElement, ingredient);
    
            // Filter based on active tags
            dropdownListElement.addEventListener("click", () => {
                filters.filterByTags(ingredient);
            });
        });

        // Display dropdown filters list based on dropdown search input filed value
        dropdownSearchInput.addEventListener("input", () => {
            filterDropdownElements(".list-element-ingredients");
        });
    }

    if (key === "appliances") {
        dropdownFilters[1].appliances.forEach(appliance => {
            const dropdownListElement = document.createElement("li");

            dropdownListElement.classList.add("dropdow-list-element", "list-element-appliances");
            dropdownListElement.textContent = appliance;

            dropdownList.append(dropdownListElement);

            activateDropdownFilter(dropdownListElement, appliance);
            dropdownListElement.addEventListener("click", () => {
                console.log("Run search by appliance tag");
                filters.filterByTags(appliance);
            });
        });

        dropdownSearchInput.addEventListener("input", () => {
            filterDropdownElements(".list-element-appliances");
        });
    }

    if (key === "ustensils") {
        dropdownFilters[2].ustensils.forEach(ustensil => {
            const dropdownListElement = document.createElement("li");

            dropdownListElement.classList.add("dropdow-list-element", "list-element-ustensils");
            dropdownListElement.textContent = ustensil;

            dropdownList.append(dropdownListElement);

            activateDropdownFilter(dropdownListElement, ustensil);
            dropdownListElement.addEventListener("click", () => {
                console.log("Run search by ustensil tag");
                filters.filterByTags(ustensil);
            });
        });

        // Display dropdown filters list based on dropdown search input filed value
        dropdownSearchInput.addEventListener("input", () => {
            filterDropdownElements(".list-element-ustensils");
        });
    }
    
    dropdownSearch.append(dropdownSearchInput, dropdownCancelButton, dropdownSearchButton);
    filterDropDown.append(dropdownSearch, dropdownList);
    filterButton.append(filterName, arrowIcon);
    filterElement.append(filterButton, filterDropDown);
    filtersContainer.appendChild(filterElement);

    dropdownSearchInput.value = "";
    dropdownSearchInput.nextElementSibling.style.display = "none";

    const cancelButton = dropdownSearchInput.nextElementSibling;

    // Dropdown search cancel button listener
    cancelButton.addEventListener("click", () => {
        const elementsList = document.querySelectorAll(".dropdow-list-element");
        elementsList.forEach(element => {
            element.style.display = "flex";
        })

        cancelButton.style.display = "none";
        dropdownSearchInput.value = "";

        if (cancelButton.parentElement.classList[0] === "dropdown-search" ) {
            cancelButton.previousElementSibling.style.width = "130px";
        }
    });

    // Dropdown opening/closing animations on click
    dropdownSearchInput.addEventListener("focus", () => {
        cancelButton.style.display = "block";
        if (cancelButton.parentElement.classList[0] === "dropdown-search" ) {
            cancelButton.previousElementSibling.style.width = "113px";
        }
    });
    
    dropdownSearchInput.addEventListener("focusout", () => {
        if (!dropdownSearchInput.value) {
            cancelButton.style.display = "none";
            if (cancelButton.parentElement.classList[0] === "dropdown-search" ) {
                cancelButton.previousElementSibling.style.width = "130px";
            }
        } 
    });

    let filterClickedOnce = false;
    let filterClickedTwice = false;

    filterButton.addEventListener("click", () => {
        if (!filterClickedOnce) {
            filterClickedOnce = true;
            filterButton.parentElement.classList.toggle("dropdown-open");
            filterButton.lastChild.classList.toggle("rotate180");
        } else if (!filterClickedTwice) {
            filterClickedTwice = true;
            filterButton.parentElement.classList.toggle("dropdown-open");
            filterButton.parentElement.classList.add("dropdown-close");
            filterButton.lastChild.classList.toggle("rotate180");
        } else {
            filterButton.parentElement.classList.toggle("dropdown-open");
            filterButton.parentElement.classList.toggle("dropdown-close");
            filterButton.lastChild.classList.toggle("rotate180");
        }
    });

    function filterDropdownElements(cssClass) {
        const elementsList = document.querySelectorAll(cssClass);
        const inputValue = text.sanitizeHtmlInput(dropdownSearchInput.value.toLocaleLowerCase());

        elementsList.forEach(element => {
            const elementToCompare = element.textContent.toLocaleLowerCase();
            
            if (!elementToCompare.includes(inputValue)) {
                element.style.display = "none";    
            } else {
                element.style.display = "flex";    
            }
        })
    }
}

// Get on page dropdown filters list in an object { ingredients, appliances, ustensils }
function updateActiveDropdownFiltersList(recipes) {

    state.clearArray(state.activeDropdownFiltersList);

    let sortedIngredients = [];
    let sortedAppliances = [];
    let sortedUstensils = [];

    state.clearArray(state.activeDropdownIngredients); // Clear active dropdown variables to make
    state.clearArray(state.activeDropdownAppliances);  // sure that only active ones remains
    state.clearArray(state.activeDropdownUstensils);   // after filtering recipes

    recipes.forEach(recipe => {
        // Ingredients filters list
        recipe.ingredients.forEach(ingredient => {
            const name = ingredient.ingredient;
            const capitalizeName = text.capitalize(name);
            state.activeDropdownIngredients.push(capitalizeName);
        });
        sortedIngredients = [...new Set(state.activeDropdownIngredients.sort())];

        // Appliances filters list
        const name = recipe.appliance; 
        const capitalizeName = text.capitalize(name);
        state.activeDropdownAppliances.push(capitalizeName);
        sortedAppliances = [...new Set(state.activeDropdownAppliances.sort())];

        // Ustensils filters list
        recipe.ustensils.forEach(ustensil => {
            const capitalizeName = text.capitalize(ustensil);
            state.activeDropdownUstensils.push(capitalizeName);
        }); 
        sortedUstensils = [...new Set(state.activeDropdownUstensils.sort())];
    });

    // Gets all dropdown filters on page load
    if (state.activeDropdownFiltersList.length === 0 && data.allDropdownFilters.length === 0) {
        data.allDropdownFilters.push(
            {ingredients: sortedIngredients}, 
            {appliances: sortedAppliances}, 
            {ustensils: sortedUstensils}
        );
    }

    // Update active filters list after tag or input search
    state.activeDropdownFiltersList.push(
        {ingredients: sortedIngredients}, 
        {appliances: sortedAppliances}, 
        {ustensils: sortedUstensils}
    );
}

function toggleDropdownFilter(DOMelement, textValue) {
    state.activeDropdownFilters.has(DOMelement) ? disableFilterList(filterDOM) : activateDropdownFilter(DOMelement, textValue);
}

function activateDropdownFilter(DOMelement, textValue) {
    if (state.activeTags.has(textValue)) {
        const cancelCross = document.createElement("img");
        cancelCross.setAttribute("src", "/assets/icons/cross.svg");
        cancelCross.classList.add("cancel-list-element");
        
        DOMelement.classList.add("active-list-element");        
        DOMelement.appendChild(cancelCross);
    }
}

function disableFilterList(filterDOM) {
    filterDOM.classList.remove("active-list-element");        
    filterDOM.lastChild.remove();
}

export { displayDropdownElements, updateActiveDropdownFiltersList, disableFilterList }