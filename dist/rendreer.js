class Render{

    display(recipes){
        $(".menu").empty()
        const source = $("#recipe-template").html()
        const template = Handlebars.compile(source);
        let html = template(  recipes );
        $(".menu").append(html);
    }
}
