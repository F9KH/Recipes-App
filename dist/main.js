const renderer = new Render();

function searchRecipes() {
    const ingredient = $('#searchInput').val();
    const dairy = $('#diaryFree').is(":checked");
    const gluten = $('#glutenFree').is(":checked");
    const vegetarian = $('#unvegetarianFree').is(":checked");

    const url = `/recipes/${ingredient}?dairyFree=${dairy}&glutenFree=${gluten}&unvegetarianFree=${vegetarian}`;

    $.getJSON(url).then((recipes) => {
        recipes.unvegetarianFree = vegetarian;
        renderer.display(recipes);
    });

  }

