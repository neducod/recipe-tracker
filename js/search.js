"use strict";
// script.js
//SELECTIONS
const form = document.querySelector(".search");
const recipeContainer = document.querySelector(".show-clicked");
const input = document.querySelector(".search__field");
const resultList = document.querySelector(".results__list");
const resultsLoader = document.querySelector(".results-loader");
const clickedLoader = document.querySelector(".clicked-loader");
const spinner = document.querySelector(".loading");

//SPINNER FUNCTIONS
function showLoader(loader) {
  loader.classList.remove("hidden");
}
function hideLoader(loader) {
  loader.classList.add("hidden");
}

//Fetch recipe form API
async function fetchRecipes(query) {
  try {
    //RenderSpinner

    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    // console.log(data);
    const { recipes } = data.data;
    // console.log(recipes);

    //'check if empty
    if (!recipes || recipes.length === 0) {
      resultList.innerHTML = "<p>No recipes found. Please try again.</p>";
      return;
    }
    // Clear and render results
    resultList.innerHTML = "";
    recipes.forEach((recipe) => {
      const li = document.createElement("li");
      li.dataset.id = recipe.id; // store id-they contain more info about the items
      li.innerHTML = `
          <img src="${recipe.image_url}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>Publisher: ${recipe.publisher}</p>
        `;
      resultList.appendChild(li);
    });
  } catch (err) {
    resultList.innerHTML = `<li style="color:red;">${err.message}</li>`;

    // console.error("Error fetching recipes:", err);
  } finally {
    hideLoader(resultsLoader); // hide results spinner
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  showLoader(resultsLoader); // show results spinner

  // console.log("Searching for:", query);
  //CLEAR SEARCH INPUT AFTER CLICK
  input.value = "";
  fetchRecipes(query);
});

resultList.addEventListener("click", async function (e) {
  const clicked = e.target.closest("li");
  //IF NO CLICKED ITEM RETURN DON'T DO ANYTHING.
  if (!clicked) return;

  const id = clicked.dataset.id;
  // console.log("Recipe clicked:", id);

  showLoader(clickedLoader); // show clicked spinner
  try {
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    const data = await res.json();
    // console.log(data);
    //Get the actual recipe data via destructuring (also works const recipe=data.data.recipe)

    const { recipe } = data.data;

    // Render details
    recipeContainer.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image_url}" alt="${recipe.title}" width="100%">
      <p>Publisher: ${recipe.publisher}</p>
      <p>Cooking Time: ${recipe.cooking_time} minutes</p>
      <p>Servings: ${recipe.servings}</p>
      <h3>Ingredients:</h3>
      <ul>
        ${recipe.ingredients
          .map(
            (ing) =>
              `<li>${ing.quantity || ""} ${ing.unit || ""} ${
                ing.description
              }</li>`
          )
          .join("")}
      </ul>
    `;
    recipeContainer.classList.add("active");
  } catch (err) {
    recipeContainer.innerHTML = `<p style="color:red;">${err.message}</p>`;
    // console.error("Error fetching recipe:", err);
  } finally {
    hideLoader(clickedLoader); // hide clicked recipe spinner
  }
});
