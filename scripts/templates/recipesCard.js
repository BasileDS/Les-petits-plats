// Display recipes cards
function displayRecipesCards() {
    const article = document.createElement("article");
    article.classList.add("recipe-card");

    const divImage = document.createElement("div");
    divImage.classList.add("recipe-header");

    const image = document.createElement("img");
    image.setAttribute("src", "./assets/images/Recette32.jpg");
    image.classList.add("recipe-image");

    const duration = document.createElement("p");
    duration.classList.add("recipe-duration");
    duration.textContent = "60min";
    
    const divRecipeContent = document.createElement("div");
    divRecipeContent.classList.add("recipe-content");
    
    const h2 = document.createElement("h2");
    h2.classList.add("recipe-title");
    h2.textContent = "Titre de la recette";
    
    const pRecipeCat = document.createElement("p");
    pRecipeCat.classList.add("card-category");
    pRecipeCat.textContent = "Recette";
    
    const pDescription = document.createElement("p");
    pDescription.textContent = "description";
    
    const pIngredientCat = document.createElement("p");
    pIngredientCat.classList.add("card-category");
    pIngredientCat.textContent = "Ingrédients";
    
    const divIngredients = document.createElement("div");
    divIngredients.textContent = "Ingrédients"
    

    divImage.appendChild(duration);
    divImage.appendChild(image);

    divRecipeContent.appendChild(h2);
    divRecipeContent.appendChild(pRecipeCat);
    divRecipeContent.appendChild(pDescription);
    divRecipeContent.appendChild(pIngredientCat);
    divRecipeContent.appendChild(divIngredients);

    article.appendChild(divImage);
    article.appendChild(divRecipeContent);

    const recipesContainer = document.querySelector(".recipes-cards-wrapper");
    recipesContainer.appendChild(article);

    console.log("hello");
}