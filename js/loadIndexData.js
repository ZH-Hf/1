define(["jquery", "cookie"], function($) {

    $.getJSON({
        url: "mock/list.json",
        success: function(data) {
            console.log(data);
            $.each(data[0].products, function(i, e) {
                var html = `<div class="singel_template">
                    <img src="${e.imgSrc}" alt="">
                    <span style="display:none">${e.id}</span>
                    <p>${e.name}</p>
                    <span>${e.price}</span>
                </div>`
                $(html).appendTo(".hot_sale_list");

            })
            $.each(data[1].products, function(i, e) {

                var html = ` <div class="singel_template_2">
                        <img src="${e.imgSrc}" alt="">
                        <p>${e.name}</p>
                        <span>${e.price}</span>
                    </div>`
                $(html).appendTo(".products_table");
            })
            $.each(data[1].tag, function(i, e) {
                // console.log(e);
                $(".products_list .item li:nth-of-type(" + i + ") a").html(e);
            });
            //点击动态生成商品详情
            $(".singel_template img").click(function() {
                location = "html/detail.html?id=" + $(this).next().html();
            })
        }
    });
});