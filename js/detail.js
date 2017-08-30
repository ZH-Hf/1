require(["config"], function() {
    require(["jquery", "cookie", "load"], function() {
        //动态加载商品详情
        var urlId = location.search;
        var shopId = urlId.split("=")[1];
        // console.log(shopId);
        if (shopId)
            $.ajax({
                url: "/mock/list.json",
                success: function(data) {
                    var shopData = data[0].products[shopId - 1];
                    // console.log(shopData);
                    $(".goodsTitle").html(shopData.name);
                    $(".goodsPrice .priceNum").html(shopData.price);
                    // console.log(shopData.price);
                    var thumbLength = shopData.detailImg.length;
                    $("#gal1").html("");
                    for (var i = 0; i < thumbLength; i++) {
                        let thumbList = ` <a class="activeThumb" href="javascript:void(0);" data-image="${shopData.detailImg[i]}" data-zoom-image="${shopData.detailImg[i]}">
                            <img src="${shopData.detailImg[i]}"/>
                        </a>`
                        $(thumbList).appendTo("#gal1");
                    }
                    $("#zoom").prop("src", shopData.detailImg[0]);
                    $("#zoom").data("zoom-image", shopData.detailImg[0])
                }
            })
        require(["zoom"], function() {
            $("#zoom").elevateZoom({
                zoomWindowWidth: 400,
                zoomWindowHeight: 400,
                borderSize: 1,
                zoomWindowFadeIn: 500, //镜头窗口淡入速度 
                zoomWindowFadeOut: 750, //镜头窗口淡出速度 
                lensFadeIn: 200,
                scrollZoom: true
            });
            $("#gal1 a").click(function() {
                $("#zoom").prop("src", $(this).data("image"));
                $("#zoom").data("zoom-image", $(this).data("image"));
                $("#zoom").elevateZoom({
                    zoomWindowWidth: 400,
                    zoomWindowHeight: 400,
                    borderSize: 1,
                    zoomWindowFadeIn: 500, //镜头窗口淡入速度 
                    zoomWindowFadeOut: 750, //镜头窗口淡出速度 
                    lensFadeIn: 200,
                    scrollZoom: true
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
            // shopId = shopId || -1;
            var _cookie = $.cookie("products") || "[]";

            var products = JSON.parse(_cookie);
            $("#insertCart").click(function() {
                var product = {
                    id: shopId,
                    name: $(".goodsTitle").html(),
                    price: $(".priceNum").text(),
                    img: $("#zoom").prop("src"),
                    color: $(".goodsColor .active").text(),
                    size: $(".goodsSize .active").text(),
                    amount: Number($("#amount").text())
                };
                // products.push(product);
                var productsId = [];
                var isExist = false;

                function indexofId() {
                    var i;
                    for (i = 0; i < products.length; i++) {
                        if (product.id == products[i].id) {
                            isExist = true;
                            return i;
                        }
                        // productsId.push(products[i].id);
                    }
                    if (i == products.length)
                        return -1;
                }
                indexofId();
                // console.log(productsId);
                if (isExist) {
                    products[indexofId()].amount += product.amount;
                } else {
                    products.push(product);
                }
                // if(productsId.index(product.id));
                console.log(products);
                _cookie = JSON.stringify(products);
                $.cookie("products", _cookie);
                alert("加入购物车成功");
            });
        });



    })
})