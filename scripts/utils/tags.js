let activeTags = [];

// Init tag activation/desactivation based on user filters choice
function initTags() {

    const dropdowListElements = document.querySelectorAll(".dropdow-list-element");
    dropdowListElements.forEach(listElement => {
        listElement.addEventListener("click", () => {
            updateListElement(listElement, dropdowListElements);
            console.log(activeTags);
        });
    });
}

// Set list element to activate status
function updateListElement(listElement, dropdowListElements) {

    const activeListElements = [];
    const dropdownListNames = [];
    dropdowListElements.forEach(li => {
        dropdownListNames.push(li.textContent);
    })
    
    activeTags.forEach(tag => {
        activeListElements.push(dropdownListNames.indexOf(tag));
    });

    activeListElements.forEach(listElement => {
        const tagName = listElement.textContent;  
      
        const cancelCross = document.createElement("img");
        cancelCross.setAttribute("src", "/assets/icons/cross.svg");
        cancelCross.classList.add("cancel-list-element");
        
        listElement.classList.add("active-list-element");        
        listElement.appendChild(cancelCross);
    
        updateActiveTags(tagName, "add");
    });
}

function updateActiveTags(tagName, action) {
    switch (action) {
        case "add":
            activeTags.push(tagName);
            break;
    
        case "remove":
            const tagIndex = activeTags.indexOf(tagName)
            activeTags.splice(tagIndex, 1);
            break;
    
        default:
            break;
    }
    
    displayActiveTags();
}

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
        const tagName = tag.firstChild.textContent;
        const tagRemoveButton = tag.lastChild;
        console.log(tagRemoveButton);
        
        tagRemoveButton.addEventListener("click", () => {
            updateActiveTags(tagName, "remove");
            console.log(activeTags);
        });
    });
    
}

export { initTags }