require(["config"], function() {
    require(["jquery", "cookie", "load"], function() {
        //动态加载商品详情
        var urlId = location.search;
        var shopId = urlId.split("=")[1];
        console.log(shopId);
        $.ajax({
            url: "/mock/list.json",
            success: function(data) {
                var shopData = data[0].products[shopId-1];
                $(".goodsTitle").html(shopData.name);
                $(".goodsPrice .priceNum").html(shopData.price);
                console.log(shopData.price);
                $(".middleImg img").prop("src",shopData.imgSrc);
                require(["zoom"], function() {
                    $("#zoom").elevateZoom({
                        zoomWindowWidth: 400,
                        zoomWindowHeight: 400,
                        borderSize: 1
                    });
                    $("#gal1 a").click(function() {
                        $("#zoom").prop("src", $(this).data("image"));
                        $("#zoom").data("zoom-image", $(this).data("image"));
                        $("#zoom").elevateZoom({
                            zoomWindowWidth: 400,
                            zoomWindowHeight: 400,
                            borderSize: 1
                        });
                        $(this).addClass("activeThumb").siblings().removeClass("activeThumb");
                    });
                    $(".goodsAttr li").each(function() {
                        $(this).find("a").first().addClass("active").end().click(function() {
                            $(this).addClass("active").siblings().removeClass("active");
                        });
                    });
                    var _amount = $("#amount").text();
                    var _color = $(".goodsColor .active").text();
                    var _size = $(".goodsSize .active").text();
                    // $("#mius,#add").mousedown(function(){
                    //     $(this).css("border","1px solid #000");
                    // })
                    $("#mius").click(function() {
                        _amount--;
                        if (_amount <= 1)
                            _amount = 1;
                        $("#amount").text(_amount);
                    });

                    $("#add").click(function() {
                        _amount++;
                        $("#amount").text(_amount);
                    })
                    //点击数字主动输入
                    $("#amount").click(function() {
                        $(this).hide().next().show();
                        $("#iptAmount input").focus();
                    });
                    $("#iptAmount input").blur(function() {
                        console.log(this);
                        $(this).parent("a").hide().prev().show();
                        if ($(this).val())
                            _amount = $(this).val();
                        $("#amount").text(_amount);
                    });
                    $("#insertCart").click(function() {
                        var _cookieObj = [{
                            id:shopId,
                            name: $(".goodsTitle").html(),
                            price: $(".priceNum").text(),
                            img: $("#zoom").prop("src"),
                            color: $(".goodsColor .active").text(),
                            size: $(".goodsSize .active").text(),
                            amount: $("#amount").text()
                        }];
                        console.log(_cookieObj);
                        var _cookie = JSON.stringify(_cookieObj);
                        $.cookie("products", _cookie);
                        alert("加入购物车成功");
                    });



                });
            }
        })



    })
})