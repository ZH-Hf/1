require(["config"], function() {
    require(["jquery", "load","loadCarousel","loadIndexData"], function($) {
        $(".banner>ul>li").hover(function(e){
        	e=e||event;
        	e.stopPropagation();
        	$(this).children(".sub_menu").stop().fadeIn();
        	console.log("show");
        	$(this).css("background","#fff");
            $(".toPrev,.toNext").stop().fadeOut();

        },function(e){
        	e=e||event;
        	// e.stopPropagation();
        	$(this).children(".sub_menu").stop().fadeOut();
        	console.log("hide");
        	$(this).css("background","#F5F5F5");
            $(".toPrev,.toNext").stop().fadeIn();

        })

    });
});