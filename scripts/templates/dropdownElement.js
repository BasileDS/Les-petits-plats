import * as filters from "/scripts/utils/filters.js";
import * as state from "/scripts/utils/state.js";

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
    arrowIcon.classList.add("filter-arrow");
    arrowIcon.setAttribute("src", "/assets/icons/down-arrow.svg");

    const filterDropDown = document.createElement("div");
    filterDropDown.classList.add("filter-dropdown");
    
    const dropdownSearch = document.createElement("div");
    dropdownSearch.classList.add("dropdown-search");
    
    const dropdownSearchInput = document.createElement("input");
    dropdownSearchInput.setAttribute("type", "text");
    dropdownSearchInput.classList.add("dropdow-input", "search-input");

    const dropdownCancelButton = document.createElement("img");
    dropdownCancelButton.classList.add("dropdown-button", "dropdown-cancel-button", "cancel-button");
    dropdownCancelButton.setAttribute("src", "/assets/icons/cross.svg");

    const dropdownSearchButton = document.createElement("img");
    dropdownSearchButton.classList.add("dropdown-button", "dropdown-search-button");
    dropdownSearchButton.setAttribute("src", "/assets/icons/search.svg");
    
    const dropdownList = document.createElement("ul");
    dropdownList.classList.add("dropdow-list");

    if (key === "ingredients") {
        dropdownFilters.ingredients.forEach(ingredient => {
            const dropdownListElement = document.createElement("li");

            dropdownListElement.classList.add("dropdow-list-element", "list-element-ingredients");
            dropdownListElement.textContent = ingredient;

            dropdownList.append(dropdownListElement);

            dropdownListElement.addEventListener("click", () => {
                console.log("Run search by tag");

        /***  Start function to run to filter recipes and dropdown filters  ***/

                filters.filterByTag(ingredient);
                

        /**********************************************************************/
            });
        });
    }

    if (key === "appliances") {
        dropdownFilters.appliances.forEach(appliance => {
            const dropdownListElement = document.createElement("li");

            dropdownListElement.classList.add("dropdow-list-element", "list-element-appliances");
            dropdownListElement.textContent = appliance;

            dropdownList.append(dropdownListElement);

            dropdownListElement.addEventListener("click", () => {
                console.log("Run search by tag");
                
                // Searching functions to run
                filters.filterByTag(appliance);
                /********************************/
            });
        });
    }

    if (key === "ustensils") {
        dropdownFilters.ustensils.forEach(ustensil => {
            const dropdownListElement = document.createElement("li");

            dropdownListElement.classList.add("dropdow-list-element", "list-element-ustensils");
            dropdownListElement.textContent = ustensil;

            dropdownList.append(dropdownListElement);

            dropdownListElement.addEventListener("click", () => {
                console.log("Run search by tag");
                
                // Searching functions to run
                filters.filterByTag(ustensil);
                /********************************/
            });
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

    cancelButton.addEventListener("click", () => {
        cancelButton.style.display = "none";
        dropdownSearchInput.value = "";
        if (cancelButton.parentElement.classList[0] === "dropdown-search" ) {
            cancelButton.previousElementSibling.style.width = "130px";
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
}

export { displayDropdownElements }