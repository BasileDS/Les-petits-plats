import * as data from "/scripts/utils/data.js";
import * as tags from "/scripts/utils/tags.js";

const filtersContainer = document.querySelector(".filter-elements");

// Init filters elements and listeners on page load
async function initFilterElements() {
    const dropdownFilters = await data.getAllDropdownFilters();
    displayDropdownFilterDOMElements(dropdownFilters);
    
    addFilterDropdownAnimation();

    tags.initTagFiltering();
}

// Display dropdown filter elements
function displayDropdownFilterDOMElements(dropdownElements) {
    filtersContainer.innerHTML = "";

    const dropdownFilters = ["Ingrédients", "Appareils", "Ustensiles"];


    dropdownFilters.forEach(dropdownFilter => {

        const filterElement = document.createElement("div");
        filterElement.classList.add("filter-element");

        const filterButton = document.createElement("div");
        filterButton.classList.add("filter");
        filterButton.setAttribute("id", `filter-${dropdownFilter}`);
        
        const filterName = document.createElement("p");
        filterName.textContent = dropdownFilter;

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

        if (dropdownFilter === "Ingrédients") {
            dropdownElements.ingredients.forEach(ingredient => {
                const dropdownListElement = document.createElement("li");
    
                dropdownListElement.classList.add("dropdow-list-element", "list-element-ingredients");
                dropdownListElement.textContent = ingredient;
    
                dropdownList.append(dropdownListElement);
            });
        }

        if (dropdownFilter === "Appareils") {
            dropdownElements.appliances.forEach(appliance => {
                const dropdownListElement = document.createElement("li");
    
                dropdownListElement.classList.add("dropdow-list-element", "list-element-appliances");
                dropdownListElement.textContent = appliance;
    
                dropdownList.append(dropdownListElement);
            });
        }

        if (dropdownFilter === "Ustensiles") {
            dropdownElements.ustensils.forEach(ustensil => {
                const dropdownListElement = document.createElement("li");
    
                dropdownListElement.classList.add("dropdow-list-element", "list-element-ustensils");
                dropdownListElement.textContent = ustensil;
    
                dropdownList.append(dropdownListElement);
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
    });
}

// Init dropdown filter listener
function addFilterDropdownAnimation() {
    const filterButtons = document.querySelectorAll(".filter");

    filterButtons.forEach(filter => {
        let filterClickedOnce = false;
        let filterClickedTwice = false;

        filter.addEventListener("click", () => {
            if (!filterClickedOnce) {
                filterClickedOnce = true;
                filter.parentElement.classList.toggle("dropdown-open");
                filter.lastChild.classList.toggle("rotate180");

            } else if (!filterClickedTwice) {
                filterClickedTwice = true;
                filter.parentElement.classList.toggle("dropdown-open");
                filter.parentElement.classList.add("dropdown-close");
                filter.lastChild.classList.toggle("rotate180");
            } else {
                filter.parentElement.classList.toggle("dropdown-open");
                filter.parentElement.classList.toggle("dropdown-close");
                filter.lastChild.classList.toggle("rotate180");
            }
        });
    });
}

// export used functions for index.js
export { initFilterElements, displayDropdownFilterDOMElements, addFilterDropdownAnimation };