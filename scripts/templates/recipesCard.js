// Display recipes cards
function displayRecipesCards(recipes) {
    const recipesContainer = document.querySelector(".recipes-cards-wrapper");
    recipesContainer.innerHTML = "";

    recipes.forEach(recipe => {
        const article = document.createElement("article");
        article.classList.add("recipe-card");
        
        const divImage = document.createElement("div");
        divImage.classList.add("recipe-header");
        
        const image = document.createElement("img");
        image.setAttribute("src", `./assets/images/${recipe.image}`);
        image.classList.add("recipe-image");
        
        const duration = document.createElement("p");
        duration.classList.add("recipe-duration");
        duration.textContent = `${recipe.time}min`;
        
        const divRecipeContent = document.createElement("div");
        divRecipeContent.classList.add("recipe-content");
        
        const h2 = document.createElement("h2");
        h2.classList.add("recipe-title");
        h2.textContent = `${recipe.name}`;
        
        const pRecipeCat = document.createElement("p");
        pRecipeCat.classList.add("card-category");
        pRecipeCat.textContent = "Recette";
        
        const pDescription = document.createElement("p");
        pDescription.classList.add("card-description");
        pDescription.textContent = `${recipe.description}`;
        
        const pIngredientCat = document.createElement("p");
        pIngredientCat.classList.add("card-category"); 
        pIngredientCat.textContent = "Ingrédients";
        
        const divIngredients = document.createElement("div");
        divIngredients.classList.add("card-ingredients");

        recipe.ingredients.forEach(ingredient => {
            const pIngredient = document.createElement("div");
            pIngredient.classList.add("card-ingredient");
            const pIngredientName = document.createElement("p");
            pIngredientName.classList.add("card-ingredient-name");
            const pIngredientQuantity = document.createElement("p");

            pIngredientName.textContent = ingredient.ingredient;

            if (ingredient.unit && ingredient.unit === "cl" || ingredient.unit === "kg") {
                pIngredientQuantity.textContent = `${ingredient.quantity}${ingredient.unit}`;
            } else if (ingredient.unit) {
                pIngredientQuantity.textContent = `${ingredient.quantity} ${ingredient.unit}`;
            } else {
                pIngredientQuantity.textContent = ingredient.quantity;
            }

            pIngredient.append(pIngredientName, pIngredientQuantity);
            divIngredients.appendChild(pIngredient);
        });

        divImage.append(duration, image);
        divRecipeContent.append(h2, pRecipeCat, pDescription, pIngredientCat, divIngredients);
        article.append(divImage, divRecipeContent);
        
        recipesContainer.appendChild(article);
    });
}

export { displayRecipesCards };