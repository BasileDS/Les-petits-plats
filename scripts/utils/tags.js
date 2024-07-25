import * as recipes from "./filterRecipes.js";
import * as removeAccents from "./removeAccents.js";


const activeTags = new Set();

// Init tag activation/desactivation based on user filters choice
function initDropdownFiltering() {
    const filtersDOM = document.querySelectorAll(".dropdow-list-element");
    const filtersDOMElements = new Set(filtersDOM);

    filtersDOMElements.forEach(listElement => { // Listen to dropdown filters
        listElement.addEventListener("click", () => {
            updateActiveTags(listElement.textContent);

            recipes.filterBy("tag");
        });
    });
}

// Set list element to active statu
function updateListElementTags() {
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
async function updateActiveTags(tagName) {
    const isActive = activeTags.has(tagName);

    if (!isActive) {
        activeTags.add(tagName);
    } else if (isActive) {
        activeTags.delete(tagName);
    } else {
        console.log("Error while checking tag status");
    }
    
    displayActiveTags();
}

// Returns true if tag is active
function isTagActive(tagToCheck) {    
    const activeTags = document.querySelectorAll(".active-filter-tag");

    if (activeTags.length === 0) {
        return false
    } else {
        activeTags.forEach(tag => {
            const tagName = removeAccents.removeAccents(tag.textContent.toLowerCase());
            const tagNameToCheck = removeAccents.removeAccents(tagToCheck.toLowerCase());
            
            if (tagName === tagNameToCheck) {
                return true
            }
        });
    }
    
}

// Display active tags based on active tags set array
async function displayActiveTags() {
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
        tag.lastChild.addEventListener("click", () => { // Tag close cross
            updateActiveTags(tag.firstChild.textContent);
            initDropdownFiltering();

            recipes.filterBy("tag");
        });
    });
}

// Clear all active tags
function clearTags() {
    const activeFiltersContainer = document.querySelector(".active-filters");
    activeFiltersContainer.innerHTML = "";
    activeTags.clear();
}

// Returns all active tags
function getActiveTags() {
    const activeTags = document.querySelectorAll(".active-filter-tag");
    return activeTags;
}

export { initDropdownFiltering, displayActiveTags, updateActiveTags, updateListElementTags, isTagActive, clearTags, getActiveTags }