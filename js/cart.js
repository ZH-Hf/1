require(["config"], function() {
    require(["jquery", "cookie", "load"], function($) {
        var products = JSON.parse($.cookie("products"));
        var html, totalPrice;
        //动态加载购物车
        for (var i = 0; i < products.length; i++) {
            totalPrice = (products[i].price * products[i].amount).toFixed(1);
            html = `<tr class="cartList">
                   <td class="firstTd">
                       <input type="checkbox" class="sub_ck">
                   </td>
                   <td>
                       <img src="${products[i].img}">
                   </td>
                   <td>
                       ${products[i].name}
                   </td>
                   <td>
                       ${products[i].price}
                   </td>
                   <td>
                       <a href="javascript:void(0);" class="mius">-</a>
                       <a href="javascript:void(0);" class="amount">${products[i].amount}</a>
                       <a href="javascript:void(0);" class="add">+</a>
                   </td>
                   <td>
                       暂无折扣
                   </td>
                   <td class="totalPrice">
                      ${totalPrice}
                   </td>
                   <td class="lastTd">
                       <a href="javascript:void(0);" data-id="${products[i].id}"><img src="../img/cart/close.png"></a>
                   </td>
               </tr>`

            $(html).appendTo(".table table tbody");
        }
        //点击加减数量
        var _amount, _price;


        //计算总价
        function calTotal() {
            var sum = 0;
            $(".sub_ck").each(function(ele) {
                if ($(this).prop("checked")) {
                    var thisPrice = $(this).parent().parent().find(".totalPrice").html();
                    sum += Number(thisPrice);
                }
            })
            $(".twoprice").html(sum);
        };



        $(".mius").click(function() {
            _amount = $(this).next().html();
            _amount--;
            if (_amount <= 1)
                _amount = 1;
            $(this).next().html(_amount);
            _price = $(this).parent().prev().html();
            totalPrice = (_price * _amount).toFixed(1);
            $(this).parent().next().next().html(totalPrice);
            calTotal();
        });

        $(".add").click(function() {
            _amount = $(this).prev().html();
            _amount++;
            $(this).prev().html(_amount);
            _price = $(this).parent().prev().html();
            totalPrice = (_price * _amount).toFixed(1);
            $(this).parent().next().next().html(totalPrice);
            calTotal();

        })

        //点击删除商品
        $(".lastTd a").click(function() {
            $(this).parent().parent().remove(); //在页面中删除
            $(".shopping_num").html(products.length);
            //在cookie中删除
            var id = $(this).data("id");
            // console.log(id);

            function indexOfId(id) {
                var i;
                for (i = 0; i < products.length; i++) {
                    if (id == products[i].id) {
                        return i;
                    }
                    // productsId.push(products[i].id);
                }
                if (i == products.length)
                    return -1;
            }
            var IdIndex = indexOfId(id);
            // console.log(IdIndex);
            products.splice(IdIndex, 1);
            var _cookie = JSON.stringify(products);
            $.cookie("products", _cookie, { path: "/", expries: 7 });
            $(".shopping_num").html(products.length);
            calTotal();

        });


        //全选功能
        $("#all_ck,#all_ck2").change(function() {
            $(".sub_ck").prop("checked", $(this).prop("checked"));
            calTotal();
            // $(this).prop("checked");
        });
        //批量删除
        $(".delAllCheck").click(function() {
            $(".sub_ck").each(function(ele) {
                if ($(this).prop("checked"))
                    $(this).parent().parent().find(".lastTd a").click();
            })
            calTotal();
        })
        $(".sub_ck").change(function() {
            calTotal();
        });

        //点击结算
        var productsToPay = [];
        $(".clearing").click(function() {
          productsToPay=[];
            $(".sub_ck").each(function(ele) {
                if ($(this).prop("checked")) {
                    var productsToPayID = $(this).parent().parent().find(".lastTd a").data("id");
                    $.each(products,function(ind,ele){
                      if(ele.id==productsToPayID)
                        productsToPay.push(ele);
                    })
                    // console.log(productsToPay);
                };

            });
            var _totalPrice = $(".twoprice").html();
            $.cookie("totalPrice",_totalPrice,{path: "/", expires: 7 });
            var _cookie = JSON.stringify(productsToPay);
            $.cookie("productsToPay", _cookie, {path: "/", expires: 7 });
            location = "confirm.html";

        })


    })
})