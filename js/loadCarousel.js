define(["jquery"], function($) {
    require(["bootstrap"], function() {
        $.ajax({
            url: "html/include/carousel.html",
            success: function(data) {
                $(data).appendTo(".banner");
            }
        });
        $(".toPrev").click(function() {
            $('.carousel').carousel('prev');
        });
        $(".toNext").click(function() {
            $('.carousel').carousel('next');
        });
        var autoPlay=null;
        autoPlay = setInterval(function() {
            $('.carousel').carousel('next');
        }, 2000);

        $(".banner").hover(function() {
            clearInterval(autoPlay);
            autoPlay=null;
            $(".toPrev,.toNext").fadeIn();
        }, function() {
            autoPlay = setInterval(function() {
                $('.carousel').carousel('cycle');
            }, 2000);
            $(".toPrev,.toNext").fadeOut();

        })
    });
});