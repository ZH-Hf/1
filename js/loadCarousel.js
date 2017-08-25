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
        var autoPlay = setInterval(function() {
            $('.carousel').carousel('next');
        }, 2000);
        $(".banner").hover(function() {
            clearInterval(autoPlay);
        }, function() {
            autoPlay = setInterval(function() {
                $('.carousel').carousel('next');
            }, 2000);
        })
    });
});