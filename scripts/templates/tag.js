import * as filters from "/scripts/utils/filters.js";
import * as state from "/scripts/utils/state.js";

// Display active tags based on active tags set array
function displayActiveTags() {
    const activeFiltersContainer = document.querySelector(".active-filters");
    activeFiltersContainer.innerHTML = "";

    const filtersData = [filters.activeIngredients, filters.activeAppliances, filters.activeUstensils ]

    filtersData.forEach(type => {

        type.forEach(filter => {
            const activeFilterTag = document.createElement("div");
            activeFilterTag.classList.add("active-filter-tag");
            
            const tagText = document.createElement("p");
            tagText.textContent = filter;
            
            const tagRemoveButton = document.createElement("img");
            tagRemoveButton.classList.add("remove-tag-button");
            tagRemoveButton.setAttribute("src", "/assets/icons/cross.svg");

            activeFilterTag.append(tagText, tagRemoveButton);
            activeFiltersContainer.appendChild(activeFilterTag);

            tagRemoveButton.addEventListener("click", () => { // Tag close cross
                filters.deleteFilter(type, filter);
                displayActiveTags();
                filters.updateDropdownActiveList();
            });
        });
    });
}

function removeAllTags() {
    const tags = document.querySelectorAll(".active-filter-tag");
    tags.forEach(tag => {
        tag.remove();
    });
}

export { displayActiveTags, removeAllTags }