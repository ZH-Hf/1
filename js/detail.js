require(["config"], function() {
    require(["jquery", "cookie", "load"], function() {
        //动态加载商品详情
        var urlId = location.search;
        var shopId = urlId.split("=")[1];
        // console.log(shopId);
        // shopId = shopId||-2;
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
                    id: shopId||-2,
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
                $(".shopping_num").html(products.length);
                _cookie = JSON.stringify(products);
                $.cookie("products", _cookie, {path: "/", expires: 7 });
                // alert("加入购物车成功");
                require(["fly"], function() {
                    var _offsetStart = $("#insertCart").offset(),
                        _offsetStop = $(".shopping_bag").offset();
                    var flyer = $('<img style="width:100px;height:100px;border-radius:50%" class="flyer" src=' + $("#zoom").prop("src") + '>');
                    flyer.fly({
                        start: {
                            left: _offsetStart.left, //开始位置（必填）#fly元素会被设置成position: fixed
                            top: _offsetStart.top, //开始位置（必填）
                            width: 100, //结束时高度
                            height: 100, //结束时高度
                        },
                        end: {
                            left: _offsetStop.left + 50, //结束位置（必填）
                            top: _offsetStop.top, //结束位置（必填）
                            width: 10, //结束时高度
                            height: 10, //结束时高度
                        },
                        // autoPlay: false, //是否直接运动,默认true
                        speed: 1.1, //越大越快，默认1.2
                        vertex_Rtop: 100, //运动轨迹最高点top值，默认20
                        onEnd: function() {
                            $(".flyer").hide().remove();
                        } //结束回调
                    });

                })
            });
        });
    })
})