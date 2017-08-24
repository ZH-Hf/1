require(["config"], function(){
	require(["jquery", "template", "load"], function($, template){
		$.getJSON("/mock/list.json", function(data){
			var html = template("prod_detail", {list:data});
			$(html).appendTo(".detail");
		});
	});
})