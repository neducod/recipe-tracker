"use strict";

// Testing API // BUG //FIXME on the firebase permissons

const fetchRecipe = async function (query) {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${query}`
  );
  const data = await res.json();
  console.log(data);
};
fetchRecipe("pizza");

// save recipe

// You can check ou this- for the save recipe button
// const saveRecipe = document.querySelector(".save-recipe");
// const title = document.querySelector("#title").value.trim();
// const description = document.querySelector("#instructions").value.trim();
// const recipeList = document.getElementById("recipe-list");
// saveRecipe.addEventListener("click", function (e) {
//   console.log("Recipe saved!");
//   e.preventDefault(); //-> PUT THIS ON FORMS to perevent the page from reloading when you submit a form. or any links like the ones on navigation bar when working on smooth scrolling.
//   const markup = `li class="recipe-item">
//     <h3 class="recipe-title">${title}</h3>
//     <p class="recipe-description">${description}</p>
//     <button class="delete-recipe">Delete</button>
//     </li>`;

//   recipeList.insertAdjacentHTML("beforeend", markup);
// });
