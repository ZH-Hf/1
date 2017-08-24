require(["config"], function() {
    require(["jquery", "template", "load"], function($, template) {
        require(["bootstrap"], function() {
        	$('.carousel').carousel()
        });
    });
});