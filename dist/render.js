class Renderer {
    display(recipes) {
        $(".menu").empty();
        const source = $("#recipe-template").html();
        const template = Handlebars.compile(source);
        let html = template(recipes);
        $(".menu").append(html);


        if (recipes.unvegetarianFree) {
            $(".recipe-container").each(function (index) {
                $(this).append('<img id="vegetarian-icon" src="vegan.jpg" alt="Vegetarian Icon">');
            });
        }

        $(".recipe-container").each(function (index) {
            const chefName = recipes.recipes[index].chef;
            const rating = recipes.recipes[index].rating
            $(this).append(`<p id="chef-name">Chef : ${chefName}</p>`);
            $(this).append(`<p id="rating-str">Rating : ${'⭐'.repeat(rating)}</p>`);
        });

    }

}

