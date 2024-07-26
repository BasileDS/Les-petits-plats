const activeIngredients = new Set();
const activeAppliances = new Set();
const activeUstensils = new Set();

const activeRecipes = [];
const activeTags = [];
const activeDropdownFilters = [];

// Clear active recipes array
function clearActiveRecipes(activeRecipes) {
    while (activeRecipes.length > 0) {
        activeRecipes.pop();
    }
  }

export {
    activeIngredients,
    activeAppliances,
    activeUstensils,
    activeRecipes,
    activeTags,
    activeDropdownFilters,
    clearActiveRecipes
} 