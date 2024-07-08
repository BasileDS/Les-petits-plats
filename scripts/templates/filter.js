// Display filter elements
function displayFilters() {
    const filters = ["ingrédients", "appareils", "ustensiles"];

    const filtersContainer = document.querySelector(".filter-elements")

    filters.forEach(filter => {
        const filterElement = document.createElement("div");
        filterElement.classList.add("filter");
        filterElement.setAttribute("id", `filter-${filter}`);
        
        const filterName = document.createElement("p");
        filterName.textContent = filter;
        filterElement.appendChild(filterName);

        filtersContainer.appendChild(filterElement);
    });
}