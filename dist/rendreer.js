class Render {
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
    }

    
}

