const activeIngredients = new Set();
const activeAppliances = new Set();
const activeUstensils = new Set();

const activeDropdownIngredients = [];
const activeDropdownAppliances = [];
const activeDropdownUstensils = [];

const activeRecipes = [];
const activeTags = [];
const activeDropdownFilters = [];

// Clear active recipes array
function clearActiveRecipes() {
    while (activeRecipes.length > 0) {
        activeRecipes.pop();
    }
}

function displayGlobalState() {
    console.log("-------------");
    console.log({activeRecipes});
    console.log({activeTags});
    console.log("-------------");
    console.log({activeDropdownFilters});
}

export {
    activeIngredients,
    activeAppliances,
    activeUstensils,
    activeRecipes,
    activeTags,
    activeDropdownFilters,
    activeDropdownIngredients,
    activeDropdownAppliances,
    activeDropdownUstensils,
    clearActiveRecipes,
    displayGlobalState
} 