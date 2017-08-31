require(["config"], function() {
    require(["jquery","template","cookie", "load"], function($,template) {
        $.getJSON({
            url: "/mock/list.json",
            success: function(data) {
               /* console.log(data);
                $.each(data[0].products, function(i, e) {
                    var html = `<div class="singel_template">
                    <img src="${e.imgSrc}" alt="">
                    <span style="display:none">${e.id}</span>
                    <p>${e.name}</p>
                    <span>${e.price}</span>
                </div>`
                    $(html).appendTo(".list");
                })*/

                var temp_data={
                    products:data[0].products
                }
                var html_temp = template("singel_template",temp_data)
                $(".list").html(html_temp);
                //点击动态生成商品详情
                $(".singel_template img").click(function() {
                    location = "detail.html?id=" + $(this).next().html();
                })
            }
        });

    })
})