const appId = 'b05a59ee';
const appKey = '6801923974d13be4ef6ed6509593dd53';

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    fetchRecipes(query);
});

async function fetchRecipes(query) {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=12`;
    const response = await fetch(url);
    const data = await response.json();
    displayRecipes(data.hits);
    if (data.hits.length > 0) {
        setBackgroundImage(data.hits[0].recipe.image);
    }
}

function displayRecipes(recipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');

        recipeElement.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h2>${recipe.label}</h2>
            <p>${recipe.source}</p>
            <a href="${recipe.url}" target="_blank">View Recipe</a>
        `;

        recipesContainer.appendChild(recipeElement);
    });
}

function setBackgroundImage(imageUrl) {
    document.body.style.backgroundImage = `url(${imageUrl})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
}