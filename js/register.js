require(["config"], function() {

    require(["jquery"], function() {
        // console.log($);
        $(".header").load("/html/include/header.html");
        $(".footer").load("/html/include/footer.html");
    })
})