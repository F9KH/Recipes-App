const renderer = new Render();

function searchRecipes() {
  let ingredient = $('#searchInput').val();
  const dairy = $('#diaryFree').is(":checked");
  const gluten = $('#glutenFree').is(":checked");

  $.getJSON(`/recipes/${ingredient}?dairyFree=${dairy}&glutenFree=${gluten}`)
    .then((recipes) => {
      renderer.display(recipes);

      $("#recipe-container img").on("click", function () {
        const index = $(this).closest(".recipe-container").index();
        const recipe = recipes[index];

        alert(`First Ingredient: ${firstIngredient}`);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}
