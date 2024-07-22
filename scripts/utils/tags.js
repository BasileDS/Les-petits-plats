import * as recipesData from "/scripts/utils/data.js";

const activeTags = new Set();

// Init tag activation/desactivation based on user filters choice
function initTagFiltering() {
    const filtersDOM = document.querySelectorAll(".dropdow-list-element");
    const filtersDOMElements = new Set(filtersDOM);

    filtersDOMElements.forEach(listElement => {
        listElement.addEventListener("click", () => {
            updateActiveTags(listElement);
            updateListElement();
        });
    });
}

// Set list element to active statu
function updateListElement() {
    const allDropdownFilters = document.querySelectorAll(".dropdow-list-element");

    allDropdownFilters.forEach(filter => {
        const isActive = activeTags.has(filter.textContent);

        if (!isActive && filter.lastChild.localName === "img") {
            filter.classList.remove("active-list-element");        
            filter.lastChild.remove();
        } else if (isActive && filter.lastChild.localName !== "img") {
            const cancelCross = document.createElement("img");
            cancelCross.setAttribute("src", "/assets/icons/cross.svg");
            cancelCross.classList.add("cancel-list-element");
            
            filter.classList.add("active-list-element");        
            filter.appendChild(cancelCross);
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
            updateListElement();
        });
    });

    console.log(activeTags);
}

export { initTagFiltering, updateActiveTags, updateListElement }