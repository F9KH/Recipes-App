// const renderer = new Renderer();

// function searchRecipes() {
//     const ingredient = $('#searchInput').val();
//     const dairy = $('#diaryFree').is(":checked");
//     const gluten = $('#glutenFree').is(":checked");
//     const vegetarian = $('#unvegetarianFree').is(":checked");

//     const url = `/recipes/${ingredient}?dairyFree=${dairy}&glutenFree=${gluten}&unvegetarianFree=${vegetarian}`;

//     $.getJSON(url).then((recipes) => {
//         recipes.unvegetarianFree = vegetarian;
//         renderer.display(recipes);

//         $(".share-email-btn").on("click", function () {
//             const title = $(this).data("title") 
//             const videoUrl = $(this).data("link")
        
//             const emailSubject = `Check out this recipe! ${title}`;
//             const emailBody = `You can see the recipe in this video: ${videoUrl}`;

//             const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
//             window.location.href = mailtoLink;
//         });
//     });
// }

const renderer = new Renderer();
function searchRecipes(page = 1) {
    const ingredient = $('#searchInput').val();
    const dairy = $('#diaryFree').is(":checked");
    const gluten = $('#glutenFree').is(":checked");
    const vegetarian = $('#unvegetarianFree').is(":checked");

    const limit = 5;
    const offset = (page - 1) * limit;
    const url = `/recipes/${ingredient}?dairyFree=${dairy}&glutenFree=${gluten}&unvegetarianFree=${vegetarian}&limit=${limit}&offset=${offset}`;

    $.getJSON(url).then((recipes) => {
        recipes.unvegetarianFree = vegetarian;
        renderer.display(recipes);
        updatePaginationButtons(Math.ceil(recipes.totalCount / limit));

        $(".share-email-btn").on("click", function () {
            const title = $(this).data("title");
            const videoUrl = $(this).data("link");

            const emailSubject = `Check out this recipe! ${title}`;
            const emailBody = `You can see the recipe in this video: ${videoUrl}`;

            const mailtoLink = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
        });
    });
}


