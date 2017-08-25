define(["jquery", "cookie"], function($) {
	
    $.getJSON({
        url: "mock/list.json",
        success: function(data) {
            $.each(data[0].products,function(i,e){
            	var html=`<div class="singel_template">
                    <img src="${e.imgSrc}" alt="">
                    <p>${e.name}</p>
                    <span>${e.price}</span>
                </div>`
            	$(html).appendTo(".hot_sale_list");

            })
             $.each(data[1].products,function(i,e){
            	var html=` <div class="singel_template_2">
                        <img src="${e.imgSrc}" alt="">
                        <p>${e.name}</p>
                        <span>${e.price}</span>
                    </div>`
            	$(html).appendTo(".products_table");
            	console.log(e);
            })
        }
    });
});