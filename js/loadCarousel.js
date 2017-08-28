define(["jquery"], function($) {
    require(["bootstrap"], function() {
        $.ajax({
            url: "html/include/carousel.html",
            success: function(data) {
                $(data).appendTo(".banner");
                $('.carousel').carousel({
                    interval: 1500
                });
                $('.carousel').carousel('cycle');
                $(".toPrev").click(function() {
                    $('.carousel').carousel('prev');
                });
                $(".toNext").click(function() {
                    $('.carousel').carousel('next');
                });
                console.log("cycle");
                $(".banner").hover(function() {
                    $(".toPrev,.toNext").fadeIn();
                }, function() {
                    $(".toPrev,.toNext").fadeOut();
                })
            }
        });

    });
});