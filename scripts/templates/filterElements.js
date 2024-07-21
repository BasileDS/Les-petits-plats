// Init filters elements and listeners on page load
function initFilterElements(ingredients, appliances, ustensils) {

    const filters = activateDropdownFilterDOMElements(ingredients, appliances, ustensils);
    
    initSearchBars();

    addFilterDropdownAnimation();

    return filters
}

// Display filter elements
function activateDropdownFilterDOMElements(ingredients, appliances, ustensils) {
    const filters = ["Ingrédients", "Appareils", "Ustensiles"];

    const filtersContainer = document.querySelector(".filter-elements");

    filters.forEach(filter => {

        const filterElement = document.createElement("div");
        filterElement.classList.add("filter-element");

        const filterButton = document.createElement("div");
        filterButton.classList.add("filter");
        filterButton.setAttribute("id", `filter-${filter}`);
        
        const filterName = document.createElement("p");
        filterName.textContent = filter;

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

        if (filter === "Ingrédients") {
            ingredients.forEach(ingredient => {
                const dropdownListElement = document.createElement("li");
    
                dropdownListElement.classList.add("dropdow-list-element", `list-element-${filter}`);
                dropdownListElement.textContent = ingredient;
    
                dropdownList.append(dropdownListElement);
            });
        }

        if (filter === "Appareils") {
            appliances.forEach(appliance => {
                const dropdownListElement = document.createElement("li");
    
                dropdownListElement.classList.add("dropdow-list-element", `list-element-${filter}`);
                dropdownListElement.textContent = appliance;
    
                dropdownList.append(dropdownListElement);
            });
        }

        if (filter === "Ustensiles") {
            ustensils.forEach(ustensil => {
                const dropdownListElement = document.createElement("li");
    
                dropdownListElement.classList.add("dropdow-list-element", `list-element-${filter}`);
                dropdownListElement.textContent = ustensil;
    
                dropdownList.append(dropdownListElement);
            });
        }
        
        dropdownSearch.append(dropdownSearchInput, dropdownCancelButton, dropdownSearchButton);
        filterDropDown.append(dropdownSearch, dropdownList);
        filterButton.append(filterName, arrowIcon);
        filterElement.append(filterButton, filterDropDown);
        filtersContainer.appendChild(filterElement);
    });

    return filters
}

// Init search bar listners
function initSearchBars() {
    const searchInput = document.querySelectorAll(".search-input");

    searchInput.forEach(input => {
        input.value = "";
        input.nextElementSibling.style.display = "none";

        const cancelButton = input.nextElementSibling;
    
        input.addEventListener("focus", () => {
            cancelButton.style.display = "block";
            if (cancelButton.parentElement.classList[0] === "dropdown-search" ) {
                cancelButton.previousElementSibling.style.width = "113px";
            }
        });
        
        input.addEventListener("focusout", () => {
            if (!input.value) {
                cancelButton.style.display = "none";
                if (cancelButton.parentElement.classList[0] === "dropdown-search" ) {
                    cancelButton.previousElementSibling.style.width = "130px";
                }
            } 
        });

        cancelButton.addEventListener("click", () => {
            cancelButton.style.display = "none";
            input.value = "";
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
export { initFilterElements };