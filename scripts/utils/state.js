const activeIngredients = new Set();
const activeAppliances = new Set();
const activeUstensils = new Set();

const activeDropdownIngredients = [];
const activeDropdownAppliances = [];
const activeDropdownUstensils = [];

const activeRecipes = [];
const activeTags = new Set();
const activeDropdownFiltersList = [];
const activeDropdownFilters = new Set();

// Toggle (display/delete) a specific tag
function toogleActiveTag(tag) {
    const isActive = activeTags.has(tag);
    isActive ? activeTags.delete(tag) : activeTags.add(tag);
}

// Toggle (display/delete) a specific tag
function toogleActiveFilter(tag) {
    const isActive = activeDropdownFilters.has(tag);
    isActive ? activeDropdownFilters.delete(tag) : activeDropdownFilters.add(tag);
}

// Clear active recipes array
function clearArray(array) {
    while (array.length > 0) {
        array.pop();
    }
}

// Display variables states for testing purpose
function displayGlobalState() {
    console.log("-------------");
    console.log({activeRecipes});
    console.log({activeTags});
    console.log("-------------");
    console.log(activeDropdownFiltersList);
    console.log({activeDropdownFilters});
    console.log("-------------");
}

export {
    activeIngredients,
    activeAppliances,
    activeUstensils,
    activeRecipes,
    activeTags,
    activeDropdownFiltersList,
    activeDropdownFilters,
    activeDropdownIngredients,
    activeDropdownAppliances,
    activeDropdownUstensils,
    clearArray,
    toogleActiveTag,
    toogleActiveFilter,
    displayGlobalState
} 