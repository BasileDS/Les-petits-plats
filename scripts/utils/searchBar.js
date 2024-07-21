const mainSearchInput = document.querySelector(".recipes-search-input");
const mainSearchCompletionZone = document.querySelector(".search-completion-container");
const cancelButton = document.querySelector(".cancel-input-button");

function initSearchBarCompletion(filters) {
    const ingredientsListDOM = getDropdownFiltersElements(filters[0]); // ingredients
    const appliancesListDOM = getDropdownFiltersElements(filters[1]); // appliances
    const ustensilsListDOM = getDropdownFiltersElements(filters[2]); // ustensils

    mainSearchInput.addEventListener("input", (event) => {
        event.preventDefault();

        mainSearchCompletionZone.innerHTML = "";

        if (mainSearchInput.value.length >= 3) {
            searchInRecipes(ingredientsListDOM);
            searchInRecipes(appliancesListDOM);
            searchInRecipes(ustensilsListDOM);
        } else {
            mainSearchCompletionZone.style.display = "none";
        }
    });

    cancelButton.addEventListener("click", () => {
            mainSearchCompletionZone.innerHTML = "";
            mainSearchCompletionZone.style.display = "none";
    });
}

function searchInRecipes(filters) {
    const inputValue = mainSearchInput.value;
    const inputLenght = mainSearchInput.value.length;
    
    filters.forEach(filter => {
        const key = Object.keys(filter);
        const filterTextDOM = Object.values(filter);
        const filerTextValue = filterTextDOM[0].textContent;
        const filterAdjustLength = filerTextValue.slice(0, inputLenght);
        const isMatching = filterAdjustLength.localeCompare(inputValue, 'fr', { sensitivity: "base" });

        if (isMatching === 0) {
            console.log(inputValue);

            mainSearchCompletionZone.style.display = "grid";

            const divFilter = document.createElement("div");
            divFilter.classList.add("search-completion-element");
            
            const pFilter = document.createElement("p");
            pFilter.textContent = filerTextValue;

            const pKey = document.createElement("p");
            pKey.classList.add("search-completion-element-type");
            pKey.textContent = key;
            
            divFilter.append(pKey, pFilter);
            mainSearchCompletionZone.appendChild(divFilter);
        }
    });
}

export { initSearchBarCompletion }