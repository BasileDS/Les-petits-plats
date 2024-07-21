const activeTags = new Set();

// Init tag activation/desactivation based on user filters choice
function initTags(filters) {
    const ingredientsListDOM = getDropdownFiltersElements(filters[0]); // ingredients
    const appliancesListDOM = getDropdownFiltersElements(filters[1]); // appliances
    const ustensilsListDOM = getDropdownFiltersElements(filters[2]); // ustensils

    ingredientsListDOM.forEach(listElement => {
        listElement.addEventListener("click", () => {
            updateActiveTags(listElement);
            updateListElement(listElement);
        });
    });

    appliancesListDOM.forEach(listElement => {
        listElement.addEventListener("click", () => {
            updateActiveTags(listElement);
            updateListElement(listElement);
        });
    });

    ustensilsListDOM.forEach(listElement => {
        listElement.addEventListener("click", () => {
            updateActiveTags(listElement);
            updateListElement(listElement);
        });
    });
}

// Get all list elements from a specific dropdown filter
function getDropdownFiltersElements(filter) {

    function getDropdownFiltersList(filter) {
        const filterList = [];
        const dropdowListElements = document.querySelectorAll(`.list-element-${filter}`);
        dropdowListElements.forEach(listElement => {
            filterList.push(listElement);
        });
    
        return filterList
    }

    switch (filter) {
        case "Ingrédients":
            return getDropdownFiltersList(filter);
    
        case "Appareils":
            return getDropdownFiltersList(filter);
    
        case "Ustensiles":
            return getDropdownFiltersList(filter);
    
        default:
            break;
    }
}

// Set list element to active statu
function updateListElement(listElement) {
    const isActive = activeTags.has(listElement.textContent);
    
    if (isActive && listElement.lastChild.localName !== "img") {
        const cancelCross = document.createElement("img");
        cancelCross.setAttribute("src", "/assets/icons/cross.svg");
        cancelCross.classList.add("cancel-list-element");
        
        listElement.classList.add("active-list-element");        
        listElement.appendChild(cancelCross);
    } else if (!isActive && listElement.lastChild.localName === "img") {
        listElement.classList.remove("active-list-element");        
        listElement.lastChild.remove();
    }
}

function removeDisabledListFilters() {
    const allDropdownFilters = document.querySelectorAll(".dropdow-list-element");

    allDropdownFilters.forEach(filter => {
        const isActive = activeTags.has(filter.textContent);

        if (!isActive && filter.lastChild.localName === "img") {
            filter.classList.remove("active-list-element");        
            filter.lastChild.remove();
        }
    });

}

// Update active tags set array
function updateActiveTags(listElement) {
    const tagName = listElement.textContent;
    const isActive = activeTags.has(listElement.textContent);

    if (!isActive) {
        activeTags.add(tagName);
    } else if (isActive) {
        activeTags.delete(tagName);
    } else {
        console.log("Error while checking tag status");
    }
    displayActiveTags();
}

// Display active tags based on active tags set array
function displayActiveTags() {
    const activeFiltersContainer = document.querySelector(".active-filters");
    activeFiltersContainer.innerHTML = "";

    activeTags.forEach(tag => {
        const activeFilterTag = document.createElement("div");
        activeFilterTag.classList.add("active-filter-tag");
        
        const tagText = document.createElement("p");
        tagText.textContent = tag;
        
        const tagRemoveButton = document.createElement("img");
        tagRemoveButton.classList.add("remove-tag-button");
        tagRemoveButton.setAttribute("src", "/assets/icons/cross.svg");
    
        activeFilterTag.append(tagText, tagRemoveButton);
        activeFiltersContainer.appendChild(activeFilterTag);
    });

    const tags = document.querySelectorAll(".active-filter-tag");
    tags.forEach(tag => {
        tag.lastChild.addEventListener("click", () => {
            updateActiveTags(tag.firstChild);
            removeDisabledListFilters();
        });
    });

    console.log(activeTags);
}


export { initTags }